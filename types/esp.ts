export interface EspItem {
  title: string;
  meta?: string;
  img: string;
  pdf?: string;
  desc: string;
}

export type EspCategory = "akademik" | "prestasi";

export type EspData = Record<EspCategory, EspItem[]>;
