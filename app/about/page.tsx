import type { Metadata } from "next";
import { AboutClient } from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenali lebih dekat Ezra Rahmaditya — mahasiswa Teknik Informatika Universitas Budi Luhur, galeri momen, sertifikat, dan cara menghubungi.",
  alternates: { canonical: "https://ezrarahmaditya.vercel.app/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}