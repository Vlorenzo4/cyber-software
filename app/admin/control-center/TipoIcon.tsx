import type { TipoProyecto } from "@prisma/client";

type TipoIconProps = {
  tipo: TipoProyecto;
  className?: string;
};

export default function TipoIcon({ tipo, className }: TipoIconProps) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true,
    className,
  } as const;

  switch (tipo) {
    case "SISTEMA_GESTION":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="16" height="3" fill="#F4E400" />
          <rect x="2" y="8.5" width="11" height="3" fill="#F4E400" opacity="0.7" />
          <rect x="2" y="14" width="7" height="3" fill="#F4E400" opacity="0.45" />
        </svg>
      );
    case "TIENDA_WEB":
      return (
        <svg {...common}>
          <path
            d="M4 7L5.5 2.5H14.5L16 7"
            stroke="#F4E400"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect
            x="3.5"
            y="7"
            width="13"
            height="10.5"
            stroke="#F4E400"
            strokeWidth="1.6"
          />
          <path d="M7.5 7V9.5C7.5 11 8.6 12 10 12C11.4 12 12.5 11 12.5 9.5V7" stroke="#F4E400" strokeWidth="1.6" />
        </svg>
      );
    case "SAAS":
      return (
        <svg {...common}>
          <path
            d="M6 15C4 15 2.5 13.4 2.5 11.5C2.5 9.7 3.9 8.2 5.7 8C6.2 5.7 8.2 4 10.5 4C13 4 15 5.9 15.3 8.3C16.9 8.7 18 10.1 18 11.7C18 13.5 16.5 15 14.7 15H6Z"
            stroke="#F4E400"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "AUTOMATIZACION_IA":
      return (
        <svg {...common}>
          <path
            d="M11 2L4.5 11.5H9.5L8.5 18L15.5 8H10.5L11 2Z"
            fill="#F4E400"
          />
        </svg>
      );
    case "OTRO":
    default:
      return (
        <svg {...common}>
          <rect
            x="4.5"
            y="4.5"
            width="11"
            height="11"
            transform="rotate(45 10 10)"
            stroke="#F4E400"
            strokeWidth="1.6"
          />
        </svg>
      );
  }
}
