"use client";

import React, { useState } from "react";
import { Language, portfolioData } from "@/data/portfolioData";
import { playCyberClick, playCyberSuccess } from "@/lib/sound";
import {
  Mail,
  Send,
  Copy,
  Check,
  MessageSquare,
  Linkedin,
  Github,
  ShieldAlert,
  Sparkles,
  Phone,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [lastSentMethod, setLastSentMethod] = useState<"whatsapp" | "email" | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPendingActivation, setIsPendingActivation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    playCyberSuccess();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#00f0ff", "#a855f7"],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const validateForm = () => {
    setErrorMessage(null);
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      const msg = lang === "ar" ? "يرجى كتابة الاسم والبريد الإلكتروني والرسالة أولاً" : "Please fill in your name, email, and message first";
      setErrorMessage(msg);
      return false;
    }

    // Client-side quick check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      const msg = lang === "ar" ? "البريد الإلكتروني المدخل غير صالح. يرجى كتابة بريد صحيح (مثال: name@gmail.com)" : "Invalid email format. Please provide a valid email.";
      setErrorMessage(msg);
      return false;
    }

    return true;
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    playCyberClick(1200, 0.05);

    const text =
      lang === "ar"
        ? `السلام عليكم يا بشمهندس أحمد،\n\nأنا: ${formData.name}\nالبريد: ${formData.email}\nالموضوع: ${formData.subject || "استفسار مشروع"}\n\nنص الرسالة:\n${formData.message}`
        : `Hello Eng. Ahmed,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || "Project Inquiry"}\n\nMessage:\n${formData.message}`;

    const cleanPhone = personal.phone.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/20${cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");

    setLastSentMethod("whatsapp");
    setFormSent(true);
    playCyberSuccess();
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const handleSendEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    playCyberClick(1100, 0.05);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (lang === "ar" ? "فشل إرسال الرسالة. يرجى التأكد من صحة البريد والمحاولة مرة أخرى." : "Failed to transmit message."));
      }

      setIsPendingActivation(Boolean(data.pendingActivation));
      setLastSentMethod("email");
      setFormSent(true);
      playCyberSuccess();
      try {
        confetti({ particleCount: 90, spread: 90, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || (lang === "ar" ? "تعذر التحقق من البريد أو إرسال الرسالة، يرجى التأكد من اتصالك والمحاولة مجدداً." : "Transmission error occurred."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Links List
  const socialLinks = [
    {
      name: "WhatsApp",
      url: personal.whatsapp,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-400">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
        </svg>
      ),
      color: "hover:border-emerald-500/50 hover:text-emerald-400",
    },
    {
      name: "LinkedIn",
      url: personal.linkedin,
      icon: <Linkedin className="w-4 h-4 text-cyan-400" />,
      color: "hover:border-cyan-500/50 hover:text-cyan-400",
    },
    {
      name: "GitHub",
      url: personal.github,
      icon: <Github className="w-4 h-4 text-zinc-300" />,
      color: "hover:border-white/40 hover:text-white",
    },
    {
      name: "Telegram",
      url: personal.telegram,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-sky-400">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
      color: "hover:border-sky-500/50 hover:text-sky-400",
    },
    {
      name: "Facebook",
      url: personal.facebook,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-blue-500">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
        </svg>
      ),
      color: "hover:border-blue-500/50 hover:text-blue-400",
    },
    {
      name: "Instagram",
      url: personal.instagram,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-pink-500">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "hover:border-pink-500/50 hover:text-pink-400",
    },
    {
      name: "TikTok",
      url: personal.tiktok,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.31 6.31 0 0 0 1.86-4.5V8.9a8.2 8.2 0 0 0 4.91 1.63V7.1a4.8 4.8 0 0 1-1-.41z" />
        </svg>
      ),
      color: "hover:border-rose-500/50 hover:text-rose-400",
    },
    {
      name: "Threads",
      url: personal.threads,
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-200">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
      color: "hover:border-purple-500/50 hover:text-purple-300",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === "ar" ? "قناة الاتصال المباشرة" : "Direct Transmission"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          <span className="gradient-text-cyan-purple font-mono">
            {lang === "ar" ? "تواصل معي وابدأ مشروعك" : "Let's Build Something Legendary"}
          </span>
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base">
          {lang === "ar"
            ? "سواء كان لديك فكرة ناشئة ضخمة، استشارة معمارية برمجية، أو عرض عمل مميز، مكتبي وواتساب مفتوحان دائماً."
            : "Available for high-impact contracts, technical architecture advisory, and full-stack software leadership."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info Sidebar (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{lang === "ar" ? "بيانات التواصل الرسمية" : "Direct Channels"}</span>
            </h3>

            {/* Email Box with copy */}
            {personal.email && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === "ar" ? "البريد الإلكتروني المباشر" : "Direct Email"}</span>
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono text-white font-semibold truncate" title={personal.email}>
                    {personal.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors shrink-0"
                    title="Copy email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Phone & WhatsApp Direct Links */}
            {(personal.phone || personal.whatsapp) && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === "ar" ? "الهاتف وواتساب" : "Direct Phone & WhatsApp"}</span>
                </span>
                <div className="flex flex-col gap-2 text-sm font-mono text-white">
                  {personal.phone && (
                    <a
                      href={`tel:${personal.phone}`}
                      onClick={() => playCyberClick(1000, 0.03)}
                      className="p-2.5 rounded-xl bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/20 hover:border-cyan-400/40 text-cyan-300 transition-all flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{personal.phone}</span>
                      </span>
                      <span className="text-xs text-zinc-400 font-sans">{lang === "ar" ? "اتصال هاتفي" : "Call"}</span>
                    </a>
                  )}
                  {personal.whatsapp && (
                    <a
                      href={personal.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playCyberClick(1100, 0.04)}
                      className="p-2.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 hover:border-emerald-400/40 text-emerald-300 transition-all flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{lang === "ar" ? "محادثة فورية على واتساب" : "Chat on WhatsApp"}</span>
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">⚡ 24/7</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Security & Response Guarantee */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <span>
                {lang === "ar"
                  ? "جميع الاتصالات سرية ومباشرة ويتم الرد عادة في أقل من ساعتين."
                  : "All inquiries encrypted via TLS 1.3. Guaranteed response window < 2 hours."}
              </span>
            </div>

            {/* Complete Social Channels Grid */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {lang === "ar" ? "قنوات التواصل الاجتماعي الرسمية:" : "Social Citadel:"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberClick(900, 0.03)}
                    className={`p-2 rounded-xl glass-pill flex items-center gap-2 text-xs font-mono text-zinc-300 transition-all border border-white/5 ${social.color}`}
                  >
                    {social.icon}
                    <span className="truncate">{social.name}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500 ml-auto opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transmission Form (3 cols) */}
        <div className="md:col-span-3">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            {formSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                  {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Transmission Successfully Sent!"}
                </h4>
                <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                  {lang === "ar"
                    ? lastSentMethod === "email"
                      ? "تم تسليم رسالتك ومعالجتها للإرسال إلى بريد المهندس أحمد (ahmedmohammed09988771@gmail.com). تم التحقق من صحة بريدك الإلكتروني وسيتم الرد عليك في أسرع وقت."
                      : "تم فتح محادثة واتساب برسالتك بالكامل مع المهندس أحمد، يمكنك متابعة الحديث معه الآن."
                    : lastSentMethod === "email"
                    ? "Your message was transmitted and queued for Ahmed's Gmail (ahmedmohammed09988771@gmail.com). Your email was verified and you will receive a response shortly."
                    : "Your message details have been queued to WhatsApp directly with Ahmed."}
                </p>

                {isPendingActivation && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-right space-y-1.5 max-w-lg mx-auto leading-relaxed">
                    <p className="font-bold flex items-center justify-end gap-1.5 text-amber-400">
                      <span>خطوة واحدة لتفعيل استلام كافة الرسائل في بريدك:</span>
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    </p>
                    <p className="text-zinc-300">
                      أرسلت خدمة التوصيل رابط تفعيل لمرة واحدة إلى <strong>ahmedmohammed09988771@gmail.com</strong>. يرجى فتح جيميل (والتحقق من الوارد أو مجلد Spam) والضغط على زر <strong>Activate Form</strong> لتفعيل استلام كافة الرسائل مباشرة ومجاناً مدى الحياة.
                    </p>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap gap-3 justify-center">
                  <a
                    href={personal.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono transition-all inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === "ar" ? "متابعة على واتساب" : "Follow up on WhatsApp"}</span>
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=ahmedmohammed09988771@gmail.com&su=${encodeURIComponent(formData.subject || (lang === 'ar' ? 'رسالة تواصل من موقع البورتفوليو' : 'Portfolio Contact Inquiry'))}&body=${encodeURIComponent(formData.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === "ar" ? "فتح في جيميل مباشرة" : "Compose in Gmail Web"}</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setErrorMessage(null);
                      setIsPendingActivation(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-5 py-2.5 rounded-xl glass-pill text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-400 transition-all"
                  >
                    {lang === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 animate-pulse">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span className="leading-relaxed font-sans">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      {lang === "ar" ? "الاسم الكريم *" : "Your Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === "ar" ? "مثال: م. عمر علي" : "e.g. John Doe"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      {lang === "ar" ? "البريد الإلكتروني *" : "Your Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    {lang === "ar" ? "موضوع الرسالة / نوع المشروع" : "Project Subject"}
                  </label>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={lang === "ar" ? "مشروع برمجيات / استشارة تقنية" : "Software Project / Architecture Consultation"}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    {lang === "ar" ? "التفاصيل أو رسالتك *" : "Transmission Payload / Message *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === "ar" ? "أخبرني عن فكرتك أو متطلبات المشروع بالتفصيل..." : "Describe scope, timeline, and goals..."}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Real Transmission Dual Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* WhatsApp Instant Send */}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSendWhatsApp()}
                    className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs sm:text-sm tracking-wider font-mono shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>{lang === "ar" ? "إرسال فوري عبر واتساب" : "Send via WhatsApp"}</span>
                  </button>

                  {/* Direct Send from inside website */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold text-xs sm:text-sm tracking-wider font-mono shadow-neon-cyan hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{lang === "ar" ? "جارٍ التحقق والإرسال..." : "Verifying & Transmitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === "ar" ? "إرسال مباشر من داخل الموقع" : "Transmit Directly from Website"}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-mono text-zinc-500 text-center pt-1">
                  {lang === "ar"
                    ? "⚡ يتم إرسال الرسالة فوراً من داخل الموقع إلى بريد المهندس أحمد دون مغادرة الصفحة أو فتح أي برنامج خارجي."
                    : "⚡ Transmitted directly from inside the website to Ahmed's inbox without leaving the page or opening any external app."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
