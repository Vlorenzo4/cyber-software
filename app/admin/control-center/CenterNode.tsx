import { Handle, Position } from "@xyflow/react";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

const HANDLE_STYLE = {
  opacity: 0,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
} as const;

export default function CenterNode() {
  return (
    <div
      className="relative flex h-[150px] w-[150px] flex-col items-center justify-center gap-3 border-2 border-yellow bg-[#131313]"
      style={{
        clipPath: CUT_CORNERS_CLIP,
        boxShadow: "0 0 50px rgba(244,228,0,0.25)",
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={false}
        style={HANDLE_STYLE}
      />

      <svg width="34" height="38" viewBox="0 0 34 38" fill="none" aria-hidden="true">
        <path
          d="M17 1L32.5 9.5V28.5L17 37L1.5 28.5V9.5L17 1Z"
          stroke="#F4E400"
          strokeWidth="2"
        />
        <path d="M17 10L24.5 14.5V23.5L17 28L9.5 23.5V14.5L17 10Z" fill="#F4E400" />
      </svg>
      <span className="text-center font-display text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-foreground">
        Centro de
        <br />
        control
      </span>
    </div>
  );
}
