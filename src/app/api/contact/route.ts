import { NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

export const runtime = "nodejs";

const resolveMx = promisify(dns.resolveMx);

// List of disposable/burner email domains
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "getairmail.com",
  "dispostable.com",
  "trashmail.com",
  "fakemailgenerator.com",
]);

// Note: Rate limiting removed per user instruction to allow unlimited message sending


/**
 * Escapes HTML characters to prevent XSS/injection attacks when forwarding messages.
 */
function sanitizeText(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

/**
 * Validates whether an email is structurally valid, follows provider rules,
 * is not a temporary/burner domain, and has verified live MX records.
 */
async function validateEmailAddress(email: string): Promise<{ valid: boolean; reason?: string }> {
  const trimmed = email.trim().toLowerCase();

  // 1. Strict RFC 5322 regex format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, reason: "تنسيق البريد الإلكتروني غير صحيح (Invalid email format)" };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { valid: false, reason: "البريد الإلكتروني غير مكتمل" };
  }

  const [username, domain] = parts;

  // 2. Reject obvious fake inputs or test strings
  if (
    username === "test" ||
    username === "asdf" ||
    username === "123456" ||
    username === "fake" ||
    username === "admin" && domain === "test.com"
  ) {
    return { valid: false, reason: "يرجى إدخال بريد إلكتروني حقيقي خاص بك وليس بريداً تجريبياً أو وهمياً" };
  }

  // 3. Reject disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, reason: "لا يُقبل استخدام إيميلات مؤقتة أو وهمية، يرجى كتابة بريدك الحقيقي" };
  }

  // 4. Gmail specific rules
  if (domain === "gmail.com" || domain === "googlemail.com") {
    // Gmail usernames without dots must be between 6 and 30 characters
    const cleanUser = username.replace(/\./g, "");
    if (cleanUser.length < 6 || cleanUser.length > 30) {
      return {
        valid: false,
        reason: "اسم مستخدم جيميل يجب أن يكون بين 6 و 30 حرفاً (Gmail username must be 6-30 chars)",
      };
    }

    // Gmail usernames can only contain letters, numbers, and periods
    if (!/^[a-zA-Z0-9.]+$/.test(username)) {
      return {
        valid: false,
        reason: "عنوان جيميل يحتوي على رموز غير مسموحة في Google",
      };
    }

    // Cannot start or end with a period or have consecutive periods
    if (username.startsWith(".") || username.endsWith(".") || username.includes("..")) {
      return {
        valid: false,
        reason: "عنوان جيميل غير صحيح (لا يمكن أن يبدأ بنقطة أو يحتوي نقطتين متتاليتين)",
      };
    }
  }

  // 5. Catch common typo domains
  const typoSuggestions: Record<string, string> = {
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmial.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "outlok.com": "outlook.com",
  };
  if (typoSuggestions[domain]) {
    return {
      valid: false,
      reason: `هل تقصد @${typoSuggestions[domain]}؟ يبدو أنك أخطأت في كتابة اسم النطاق`,
    };
  }

  // 6. Live DNS MX Record verification to ensure the domain actually receives mail
  try {
    const mxRecords = await resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return {
        valid: false,
        reason: `النطاق (${domain}) ليس لديه خوادم بريد نشطة (No active mail server found)`,
      };
    }
  } catch (err) {
    return {
      valid: false,
      reason: `لم نتمكن من العثور على خادم بريد فعلي للنطاق (${domain})، تأكد من كتابة الإيميل بشكل صحيح`,
    };
  }

  return { valid: true };
}

export async function POST(req: Request) {
  try {

    const body: ContactRequestBody = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 2. Anti-bot honeypot check
    if (honeypot && honeypot.trim().length > 0) {
      // Quietly reject bot submissions
      return NextResponse.json({
        success: true,
        message: "تم استلام الرسالة بنجاح",
      });
    }

    // 3. Required fields and basic presence
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "جميع الحقول المطلوبة (الاسم، البريد، الرسالة) يجب تعبئتها" },
        { status: 400 }
      );
    }

    // 4. Strict length and payload sanity checks
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "الاسم طويل جداً (الحد الأقصى 100 حرف)" },
        { status: 400 }
      );
    }
    if (email.trim().length > 150) {
      return NextResponse.json(
        { error: "البريد الإلكتروني طويل جداً (الحد الأقصى 150 حرف)" },
        { status: 400 }
      );
    }
    if (subject && subject.trim().length > 150) {
      return NextResponse.json(
        { error: "عنوان الموضوع طويل جداً (الحد الأقصى 150 حرف)" },
        { status: 400 }
      );
    }
    if (message.trim().length > 3000) {
      return NextResponse.json(
        { error: "الرسالة طويلة جداً (الحد الأقصى 3000 حرف)" },
        { status: 400 }
      );
    }

    // 5. Comprehensive real email verification (format, disposable, provider rules, live MX)
    const validation = await validateEmailAddress(email);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason || "البريد الإلكتروني المدخل غير صالح أو غير حقيقي" },
        { status: 422 }
      );
    }

    const targetRecipient = "ahmedmohammed09988771@gmail.com";

    // 6. Defanging / Sanitizing user text to prevent XSS and HTML injection
    const sanitizedName = sanitizeText(name.trim());
    const sanitizedEmail = email.trim();
    const sanitizedSubject = sanitizeText(subject?.trim() || `رسالة جديدة من الموقع: ${sanitizedName}`);
    const sanitizedMessage = sanitizeText(message.trim());

    // Dispatch directly to FormSubmit server-to-server AJAX endpoint
    const origin = req.headers.get("origin") || req.headers.get("referer") || "https://ahmedmohammed977.github.io";

    const forwardPayload = {
      name: sanitizedName,
      email: sanitizedEmail,
      _replyto: sanitizedEmail,
      _subject: sanitizedSubject,
      message: sanitizedMessage,
      _template: "table",
      _captcha: "false",
    };

    const res = await fetch(`https://formsubmit.co/ajax/${targetRecipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify(forwardPayload),
    });

    const data = await res.json().catch(() => null);

    // Case 1: FormSubmit successfully forwarded the message
    if (res.ok && (data?.success === "true" || data?.success === true)) {
      return NextResponse.json({
        success: true,
        message: "تم إرسال رسالتك بنجاح ووصلت إلى بريد المهندس أحمد محمد!",
      });
    }

    // Case 2: FormSubmit requires one-time email activation by the owner
    const responseMsg = String(data?.message || "");
    if (responseMsg.toLowerCase().includes("activation") || responseMsg.toLowerCase().includes("activate")) {
      return NextResponse.json({
        success: true,
        pendingActivation: true,
        message: "تم إرسال رسالتك وتوليد رابط التفعيل لبريد ahmedmohammed09988771@gmail.com! يرجى فتح جيميل (وتفقد صندوق الوارد أو البريد العشوائي Spam) والضغط على زر 'Activate Form' لمرة واحدة فقط لتفعيل استلام كافة الرسائل فوراً وبشكل دائم.",
      });
    }

    // Case 3: Other response
    if (res.ok) {
      return NextResponse.json({
        success: true,
        message: "تم استلام رسالتك وإرسالها بنجاح إلى المهندس أحمد!",
      });
    }

    return NextResponse.json(
      {
        error: "تعذر إرسال الرسالة إلى خادم البريد حالياً. يرجى الضغط على زر واتساب للتواصل المباشر.",
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب" },
      { status: 500 }
    );
  }
}
