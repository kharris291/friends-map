import { CardItem } from "@/components/ZoomCard/CardItem";
import React from "react";
import { ConnectionItemProps } from "@/types/components/ZoomCard";

export const ConnectionItem = ({
  currentUser,
  index,
  connections,
  selected,
  user,
  handleTicketSelected,
}: ConnectionItemProps) => {
  const angle = (index / (connections?.length ?? 0)) * 2 * Math.PI;
  const radius = selected?._id !== user?._id ? 300 : 0;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      className={"opacity-100"}
      style={{
        position: "fixed",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
        width: "max-content",
        zIndex: 9855,
      }}
      key={`${currentUser}-${index}`}
    >
      <CardItem
        onClick={handleTicketSelected(currentUser)}
        selected={selected}
        user={currentUser}
        onCreateConnectionsAction={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
