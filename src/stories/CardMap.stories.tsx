import type { Meta } from "@storybook/nextjs-vite";
import { CardMap } from "@/components/CardMap";
import { useState } from "react";

const meta = {
  title: "CardMap/CardMap",
  component: CardMap,
} satisfies Meta<typeof CardMap>;

export default meta;

const sampleRoot = {
  name: "Our Download Family",
  children: [
    { name: "Dan" },
    { name: "Kirsten" },
    {
      name: "Bear",
      connections: ["Dan", "Kirsten", "Jeeves", "Dotso", "Robbo", "Robo Jr."],
    },
  ],
};

export const Default = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className={"flex items-center justify-center h-full w-full"}>
      {sampleRoot.children.map((child) => (
        <CardMap
          key={child.name}
          name={child.name}
          connections={child.connections}
          isSelected={selectedCard}
          onClick={() => {
            setSelectedCard((prev) =>
              prev === child.name ? null : child.name,
            );
          }}
        />
      ))}
    </div>
  );
};
