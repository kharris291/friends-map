import React, { forwardRef } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { UserItem } from "@/types/app/userItem";

type CardItemProps = {
  onClick: () => void;
  onCreateConnectionsAction: () => void;
  onTransitionEnd?: (e: React.TransitionEvent<HTMLDivElement>) => void;
  selected?: UserItem;
  user?: UserItem;
};

export const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  function CardItem(
    { onClick, onCreateConnectionsAction, onTransitionEnd, selected, user },
    ref,
  ) {
    return (
      <div
        onTransitionEnd={onTransitionEnd}
        ref={ref}
        className={clsx(
          "rounded-2xl bg-white shadow-xl p-8 w-64 h-40",
          "origin-center will-change-transform flex flex-col items-center justify-center",
          selected?._id === user?._id
            ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 z-50"
            : "relative scale-100",
        )}
        style={{
          transitionProperty: "transform",
          transitionDuration: "1000ms",
          transitionTimingFunction: "cubic-bezier(.19,1,.22,1)",
        }}
      >
        <XMarkIcon
          className={clsx("", {
            "absolute self-end h-5 w-5 -translate-y-10 cursor-pointer":
              selected?._id === user?._id,
            hidden: selected?._id !== user?._id,
          })}
          onClick={onClick}
        />
        <div className="cursor-pointer" onClick={onClick}>
          {user?.name}
        </div>
        <div
          className={clsx(
            "absolute bottom-4 text-sm text-gray-500 transition-opacity duration-300",
            selected?._id !== user?._id ? "opacity-0" : "opacity-100",
          )}
          onClick={onCreateConnectionsAction}
        >
          Create connections
        </div>
      </div>
    );
  },
);
