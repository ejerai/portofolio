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
