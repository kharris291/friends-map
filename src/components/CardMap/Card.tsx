import React from "react";
import cx from "classnames";

export function Card(props: {
  childConnection: boolean;
  name: string;
  onClick: (e: React.MouseEvent) => void;
  selected?: string | null;
}) {
  return (
    <div
      className={cx(
        "content-center text-center p-4 self-center place-self-center rounded-full border border-gray-300 m-4 overflow-hidden text-ellipsis",
        {
          "bg-blue-500 text-white": props.selected === props.name,
          "grid grid-cols-1 gap-y-4": !props.selected,
          "flex gap-x-4": props.selected,
        },
      )}
      onClick={props.onClick}
    >
      <h1 className="text-2xl font-bold">{props.name}</h1>
    </div>
  );
}
