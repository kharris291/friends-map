import { Card } from "@/components/CardMap/Card";

export const OrbitConnections = ({
  names,
  radius = 180,
  onPick,
}: {
  names: string[];
  radius?: number;
  onPick?: (name: string) => void;
}) => {
  const count = names.length;
  console.log("Rendering OrbitConnections with names:", names);
  return (
    <>
      {names.map((n, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
              cursor: onPick ? "pointer" : "default",
              width: "max-content",
              zIndex: 9998,
            }}
            key={`${n}-${i}`}
          >
            <Card
              childConnection={true}
              key={n}
              name={n}
              onClick={() => onPick?.(n)}
            />
          </div>
        );
      })}
    </>
  );
};
