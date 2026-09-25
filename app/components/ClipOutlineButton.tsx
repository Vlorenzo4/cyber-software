import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

type ClipOutlineButtonProps = {
  href: string;
  borderColorClass: string;
  fillClass: string;
  textColorClass: string;
  hoverClass?: string;
  className?: string;
  children: React.ReactNode;
};

export default function ClipOutlineButton({
  href,
  borderColorClass,
  fillClass,
  textColorClass,
  hoverClass = "",
  className = "",
  children,
}: ClipOutlineButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block p-[2px] ${borderColorClass}`}
      style={{ clipPath: CUT_CORNERS_CLIP }}
    >
      <span
        className={`flex items-center justify-center transition-colors ${fillClass} ${textColorClass} ${hoverClass} ${className}`}
        style={{ clipPath: CUT_CORNERS_CLIP }}
      >
        {children}
      </span>
    </a>
  );
}
