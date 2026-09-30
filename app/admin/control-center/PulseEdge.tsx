import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";

export default function PulseEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "rgba(63,216,232,0.15)", strokeWidth: 1.5 }}
      />
      <circle
        cx={sourceX}
        cy={sourceY}
        r="3"
        fill="#F4E400"
        style={{ filter: "drop-shadow(0 0 3px #F4E400)" }}
      />
      <circle
        cx={targetX}
        cy={targetY}
        r="3"
        fill="#F4E400"
        style={{ filter: "drop-shadow(0 0 3px #F4E400)" }}
      />
      <circle r="4" fill="#3FD8E8" style={{ filter: "drop-shadow(0 0 4px #3FD8E8)" }}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <circle r="4" fill="#F4E400" style={{ filter: "drop-shadow(0 0 4px #F4E400)" }}>
        <animateMotion
          dur="2.6s"
          repeatCount="indefinite"
          begin="1.3s"
          path={edgePath}
        />
      </circle>
    </>
  );
}
