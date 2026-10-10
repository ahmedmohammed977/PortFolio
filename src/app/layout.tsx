import type { Metadata, Viewport } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedtashtash.dev"),
  title: {
    default: "Ahmed Mohammed Ahmed (TashTash) | أحمد محمد أحمد — Full-Stack Software Engineer",
    template: "%s | Ahmed Mohammed Ahmed",
  },
  description:
    "الموقع الرسمي للمهندس أحمد محمد أحمد (أحمد طشطش) — مهندس برمجيات متكامل وطالب الفرقة الثالثة بكلية علوم الحاسب. خبرة متقدمة في بايثون (3+ سنوات)، واجهات أنجولار ورياكت، تطبيقات سطح المكتب C#، وهندسة قواعد البيانات SQL & MySQL. Official portfolio of Ahmed Mohammed Ahmed (Ahmed TashTash).",
  keywords: [
    "Ahmed Mohammed Ahmed",
    "أحمد محمد أحمد",
    "Ahmed Mohammed",
    "أحمد محمد",
    "Ahmed TashTash",
    "أحمد طشطش",
    "Ahmed Tash Tash",
    "أحمد طش طش",
    "Full Stack Software Engineer",
    "مهندس برمجيات فول ستاك",
    "Software Engineer Egypt",
    "مهندس برمجيات مصر",
    "Python Developer",
    "مطور بايثون",
    "Angular Developer",
    "React Developer",
    "Desktop App Developer C#",
    "SQL Database Engineer",
    "MySQL Optimization",
    "Computer Science Galala University",
    "علوم حاسب جامعة الجلالة",
    "علوم حاسب الفرقة الثالثة",
    "Ahmed Mohammed Ahmed CV",
    "Ahmed Mohammed Resume",
    "سيرة ذاتية أحمد محمد أحمد",
    "Kali Linux Security",
    "Graphic Designer",
    "مصمم جرافيك",
    "RESTful API Architecture",
  ],
  authors: [{ name: "Ahmed Mohammed Ahmed", url: "https://ahmedtashtash.dev" }],
  creator: "Ahmed Mohammed Ahmed",
  publisher: "Ahmed Mohammed Ahmed",
  alternates: {
    canonical: "https://ahmedtashtash.dev",
    languages: {
      "en-US": "https://ahmedtashtash.dev",
      "ar-EG": "https://ahmedtashtash.dev",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "https://ahmedtashtash.dev",
    title: "Ahmed Mohammed (Ahmed TashTash) | Full Stack Software Engineer",
    description:
      "3rd-Year Computer Science undergraduate & Full-Stack Software Engineer building mission-critical architectures to Google & Microsoft standards.",
    siteName: "Ahmed Mohammed (Ahmed TashTash) Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Ahmed Mohammed (Ahmed TashTash) - Full Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Mohammed (Ahmed TashTash) | Full Stack Software Engineer",
    description:
      "3rd-Year Computer Science undergraduate & Full-Stack Software Engineer building mission-critical web applications.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"],
    creator: "@ahmedtashtash",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="bg-[#050508] text-white selection:bg-cyan-500/30 selection:text-cyan-300 font-sans antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
