/* single portofolio project */
export interface Project {
  id: string;
  ariaLabel: string;
  tabLabel: string;
  titleLines: string[];
  meta: string;
  tags: string[];
  refYear: string;
  img: string;
  imgAlt: string;
  modalTitleLines: string[];
  desc: string;
  metaValue: string;
  chips: { color: string; label: string }[];
  actionHref: string;
  actionTarget?: string | null;
  actionLabel: string;
}

export interface EspItem {
  title: string;
  meta?: string;
  img: string;
  pdf?: string;
  desc: string;
}

export type EspCategory = "akademik" | "prestasi";

export type EspData = Record<EspCategory, EspItem[]>;
