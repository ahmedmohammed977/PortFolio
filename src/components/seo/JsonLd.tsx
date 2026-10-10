import React from "react";
import { portfolioData } from "@/data/portfolioData";

export const JsonLd: React.FC = () => {
  const { personal, projects } = portfolioData;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ahmedtashtash.dev/#person",
        "name": personal.fullName.en,
        "alternateName": [personal.alias.en, personal.alias.ar, personal.fullName.ar],
        "jobTitle": `${personal.title.en} & Graphic Designer`,
        "description": personal.bio.en,
        "url": "https://ahmedtashtash.dev",
        "email": personal.email,
        "telephone": personal.phone,
        "sameAs": [
          personal.github,
          personal.linkedin,
          personal.facebook,
          personal.tiktok,
          personal.instagram,
          personal.threads,
          personal.telegram,
        ],
        "knowsAbout": [
          "Full Stack Software Engineering",
          "Frontend Architecture (2 Years Experience)",
          "Backend Systems Engineering (1 Year Experience)",
          "Desktop Application Development (2 Years Experience)",
          "Python (100%)",
          "Angular (100%)",
          "React (100%)",
          "SQL Database Architecture (100%)",
          "MySQL Database Management (100%)",
          "C# (.NET / Windows Apps) (95%)",
          "Kali Linux & Security (75%)",
          "JavaScript & TypeScript",
          "Django & REST APIs",
          "Object-Oriented Programming (OOP)",
          "Data Structures & Algorithms",
          "Graphic Design & UI/UX"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ahmedtashtash.dev/#website",
        "url": "https://ahmedtashtash.dev",
        "name": `${personal.fullName.en} (${personal.alias.en}) | ${personal.fullName.ar} (${personal.alias.ar})`,
        "description": personal.bio.en,
        "author": {
          "@id": "https://ahmedtashtash.dev/#person"
        },
        "inLanguage": ["en", "ar"]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://ahmedtashtash.dev/#profilepage",
        "url": "https://ahmedtashtash.dev",
        "name": `${personal.fullName.en} (${personal.alias.en}) - Official Portfolio`,
        "mainEntity": {
          "@id": "https://ahmedtashtash.dev/#person"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
