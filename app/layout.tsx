import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://ezrarahmaditya.vercel.app"),
  title: {
    default: "Ezra Rahmaditya",
    template: "%s | Ezra Rahmaditya",
  },
  description:
    "Portofolio Ezra Rahmaditya, mahasiswa Teknik Informatika Universitas Budi Luhur yang berfokus pada pengembangan front-end dan software engineering.",
  keywords: [
    "Ezra Rahmaditya",
    "Raden Ezra Rahmaditya",
    "Ezra Rahmaditya portofolio",
    "Ezra Rahmaditya developer",
    "Portfolio Developer",
    "Teknik Informatika",
    "Front End Development",
    "Universitas Budi Luhur",
  ],
  authors: [{ name: "Ezra Rahmaditya", url: "https://ezrarahmaditya.vercel.app" }],
  creator: "Ezra Rahmaditya",
  publisher: "Ezra Rahmaditya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "https://ezrarahmaditya.vercel.app" },
  icons: {
    icon: [
      { url: "/ico/ezra-rahmaditya.ico" },
      { url: "/ico/ezra-rahmaditya-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/ico/ezra-rahmaditya-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/ico/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/ico/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Ezra Rahmaditya",
    locale: "id_ID",
    title: "Ezra Rahmaditya",
    description: "Portofolio Ezra Rahmaditya, mahasiswa Teknik Informatika yang berfokus pada pengembangan perangkat lunak dan frontend.",
    images: ["https://ezrarahmaditya.vercel.app/gmi/ezra-rahmaditya.webp"],
    url: "https://ezrarahmaditya.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezra Rahmaditya",
    description: "Portofolio Ezra Rahmaditya, mahasiswa Teknik Informatika yang berfokus pada pengembangan perangkat lunak dan frontend.",
    images: ["https://ezrarahmaditya.vercel.app/gmi/momen-5.jpg"],
  },
  other: {
    "msapplication-TileColor": "#1e1510",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "google-site-verification": "-Y1H0qnowNjaw235i6sfEA-zZklNfi5p-ex9QbCdqDc",
  },
};

// data theme
const themeInitScript = `
(function () {
  try {
    var t =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", t);
    var m = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "theme-color");
      document.head.appendChild(m);
    }
    m.setAttribute("content", t === "dark" ? "#1e1510" : "#f5f0e8");
  } catch (e) {}
})();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ezra Rahmaditya",
  alternateName: "Raden Ezra Rahmaditya",
  jobTitle: "Mahasiswa Teknik Informatika",
  description:
    "Mahasiswa Teknik Informatika Universitas Budi Luhur yang berfokus pada pengembangan front-end dan software engineering.",
  url: "https://ezrarahmaditya.vercel.app",
  image: "https://ezrarahmaditya.vercel.app/gmi/ezra-rahmaditya.webp",
  email: "mailto:ezrarahmadityaa@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Budi Luhur",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Budi Luhur",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Depok",
    addressCountry: "ID",
  },
  sameAs: [
    "https://github.com/ejerai",
    "https://www.linkedin.com/in/ezra-rahmaditya-16671a328/",
    "https://www.instagram.com/ejeraaiii",
    "https://www.youtube.com/@ezragenS",
    "https://www.tiktok.com/@ejerayy",
    "https://www.blogger.com/profile/17646699077233676938",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ezra Rahmaditya",
  url: "https://ezrarahmaditya.vercel.app",
  inLanguage: "id-ID",
  about: { "@type": "Person", name: "Ezra Rahmaditya" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f0e8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1e1510" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}