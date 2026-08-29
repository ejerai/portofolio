/* icon svg project card */
function normalize(label: string): string {
  return label.trim().toLowerCase();
}

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function AstroIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-2.6 2.8-4 6.6-4 11.5L9.3 15h5.4l1.3-1.5C16 8.6 14.6 4.8 12 2Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M9.3 15c-1.8.4-2.6 1.6-2.8 4.2 1.8-.6 3-1.3 3.6-2.4" />
      <path d="M14.7 15c1.8.4 2.6 1.6 2.8 4.2-1.8-.6-3-1.3-3.6-2.4" />
      <path d="M10.3 19.5c.5.8 1 1.3 1.7 1.5.7-.2 1.2-.7 1.7-1.5" />
    </svg>
  );
}

function SatelliteIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-6" />
      <path d="M8 17a5 5 0 0 1 8 0" />
      <path d="M5 14a9 9 0 0 1 14 0" />
      <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PythonIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.2c-3.3 0-3.6 1.4-3.6 3.2v2.1h7.1v.9H6.4C4.5 9.4 3 10.5 3 13.6s1.5 4.2 3.4 4.2h1.4v-2.4c0-2.1 1.8-3.9 3.9-3.9h4.5c1.4 0 2.5-1.1 2.5-2.5V6.4c0-1.8-.3-3.2-3.6-3.2Z" />
      <path d="M12 20.8c3.3 0 3.6-1.4 3.6-3.2v-2.1H8.5v-.9h9.1c1.9 0 3.4-1.1 3.4-4.2s-1.5-4.2-3.4-4.2h-1.4v2.4c0 2.1-1.8 3.9-3.9 3.9H7.8c-1.4 0-2.5 1.1-2.5 2.5v3.6c0 1.8.3 3.2 3.6 3.2Z" />
      <circle cx="10" cy="6" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="18" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BracesIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4c-1.5 0-2 .8-2 2v3c0 1-.5 1.5-1.5 1.5v2C5.5 12.5 6 13 6 14v3c0 1.2.5 2 2 2" />
      <path d="M16 4c1.5 0 2 .8 2 2v3c0 1 .5 1.5 1.5 1.5v2c-1 0-1.5.5-1.5 1.5v3c0 1.2-.5 2-2 2" />
    </svg>
  );
}

function TailwindIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      <path d="M3 16c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
    </svg>
  );
}

function AtomIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(45 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-45 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AngleBracketsIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
    </svg>
  );
}

function PaintRollerIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="14" height="5" rx="2" />
      <path d="M7 9v3h4v8" />
    </svg>
  );
}

function PlugIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" />
      <path d="M12 17v5" />
    </svg>
  );
}

function CoffeeCupIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 4c-.5 1 .5 1.5 0 2.5M12 4c-.5 1 .5 1.5 0 2.5" />
    </svg>
  );
}

function PeaksIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18 9 9l4 5 3-4 5 8" />
      <path d="M3 18h18" />
    </svg>
  );
}

function FlameIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-1 4-5 5-5 10a5 5 0 0 0 10 0c0-2-1-3-2-4 .5 2-.5 3-1 3-1 0-1-1-1-2 0-2 1-4-1-7Z" />
    </svg>
  );
}

function DatabaseIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </svg>
  );
}

function ExchangeIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
      <path d="M20 16H7M7 16l3-3M7 16l3 3" />
    </svg>
  );
}

function ElephantIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16c-1.2-.9-1.8-2.2-1.5-3.6.3-1.6 1.7-2.4 3-2 .5-2.3 2.7-4.4 6-4.4 3.9 0 6.5 2.7 6.5 6 0 .7-.1 1.3-.3 1.9.9.2 1.3 1 1.3 1.9 0 1.1-.9 2-2 2h-.5" />
      <path d="M6 14v3.5a2 2 0 0 0 2 2h.5" />
      <path d="M9.5 14v3.5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V15" />
      <circle cx="8" cy="10" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FlaskIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-9V3" />
      <path d="M8 15h8" />
    </svg>
  );
}

function BarChartIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V12M10 20V6M15 20V14M20 20V9" />
      <path d="M3 20h18" />
    </svg>
  );
}

function CardIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M6 15h4" />
    </svg>
  );
}

function TagIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 12.6 12 21l-9-9V4h8l9.5 8.6Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICON_MAP: Record<string, (props: IconProps) => React.JSX.Element> = {
  astro: AstroIcon,
  "nasa firms api": SatelliteIcon,
  python: PythonIcon,
  javascript: BracesIcon,
  "tailwind css": TailwindIcon,
  jsx: AtomIcon,
  api: PlugIcon,
  html: AngleBracketsIcon,
  css: PaintRollerIcon,
  java: CoffeeCupIcon,
  kotlin: PeaksIcon,
  firebase: FlameIcon,
  "php rest api": ExchangeIcon,
  mysql: DatabaseIcon,
  "google colab": FlaskIcon,
  streamlit: BarChartIcon,
  php: ElephantIcon,
  midtrans: CardIcon,
  "jupyter notebook": FlaskIcon,
};

export function TechIcon({ label, className, style }: { label: string; className?: string; style?: React.CSSProperties }) {
  const Icon = ICON_MAP[normalize(label)] ?? TagIcon;
  return <Icon className={className} style={style} />;
}