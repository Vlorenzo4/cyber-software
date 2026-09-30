import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { tipoLabel } from "@/lib/proyectos";
import TipoIcon from "./TipoIcon";
import type { ProyectoNodoData } from "./types";

type ProjectNodeType = Node<ProyectoNodoData, "project">;

const HANDLE_STYLE = {
  opacity: 0,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
} as const;

export default function ProjectNode({ data }: NodeProps<ProjectNodeType>) {
  return (
    <div
      className={`relative ${data.hasTicketUrgente ? "bg-cyan p-[2px]" : "bg-white/15 p-[1px]"}`}
      style={{ clipPath: CUT_CORNERS_CLIP, width: 210 }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={HANDLE_STYLE}
      />

      <div
        className="relative flex cursor-pointer flex-col gap-3 bg-[#131313] p-5 transition-colors hover:bg-[#181818]"
        style={{ clipPath: CUT_CORNERS_CLIP }}
      >
        {data.hasTicketUrgente && (
          <span
            className="absolute right-4 top-4 h-[10px] w-[10px] animate-pulse rounded-full bg-red-500"
            style={{ boxShadow: "0 0 10px 3px rgba(239,68,68,0.7)" }}
            title="Tiene tickets de prioridad alta sin resolver"
          />
        )}

        <TipoIcon tipo={data.tipo} />

        <div className="min-w-0">
          <div className="truncate text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
            {data.clienteNombre}
          </div>
          <div className="truncate font-display text-sm font-semibold uppercase text-foreground">
            {data.nombreProyecto}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.06em] text-cyan">
            {tipoLabel(data.tipo)}
          </div>
        </div>
      </div>
    </div>
  );
}
