"use client";

import "@xyflow/react/dist/base.css";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import CenterNode from "./CenterNode";
import ProjectNode from "./ProjectNode";
import PulseEdge from "./PulseEdge";
import type { ProyectoResumen } from "./types";

const nodeTypes: NodeTypes = {
  center: CenterNode,
  project: ProjectNode,
};

const edgeTypes: EdgeTypes = {
  pulse: PulseEdge,
};

const RADIUS = 300;

export default function ControlCenterFlow({
  proyectos,
}: {
  proyectos: ProyectoResumen[];
}) {
  const router = useRouter();

  const initialNodes = useMemo<Node[]>(() => {
    const center: Node = {
      id: "center",
      type: "center",
      position: { x: 0, y: 0 },
      data: {},
      draggable: false,
      selectable: false,
    };

    const angleStep = (2 * Math.PI) / Math.max(proyectos.length, 1);

    const projectNodes: Node[] = proyectos.map((p, i) => {
      const angle = i * angleStep - Math.PI / 2;
      return {
        id: p.id,
        type: "project",
        position: {
          x: Math.cos(angle) * RADIUS,
          y: Math.sin(angle) * RADIUS,
        },
        data: {
          nombreProyecto: p.nombreProyecto,
          clienteNombre: p.clienteNombre,
          tipo: p.tipo,
          hasTicketUrgente: p.hasTicketUrgente,
        },
      };
    });

    return [center, ...projectNodes];
  }, [proyectos]);

  const initialEdges = useMemo<Edge[]>(
    () =>
      proyectos.map((p) => ({
        id: `edge-${p.id}`,
        source: "center",
        target: p.id,
        type: "pulse",
      })),
    [proyectos]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={[0.5, 0.5]}
      fitView
      fitViewOptions={{ padding: 0.35 }}
      minZoom={0.4}
      maxZoom={1.5}
      nodesConnectable={false}
      onError={(code, message) => {
        // El código 008 es un warning benigno del primer render, antes de
        // que React Flow termine de medir los handles — se recalcula bien
        // enseguida. Cualquier otro error sí se loguea.
        if (code === "008") return;
        console.error(message);
      }}
      onNodeClick={(_, node) => {
        if (node.type === "project") {
          router.push(`/admin/proyectos/${node.id}`);
        }
      }}
      className="bg-background"
    >
      <Background
        color="rgba(255,255,255,0.06)"
        variant={BackgroundVariant.Dots}
        gap={28}
        size={1.5}
      />
    </ReactFlow>
  );
}
