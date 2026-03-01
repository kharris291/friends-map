"use client";

import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { CardItem } from "@/components/ZoomCard/CardItem";
import { CreateConnection } from "@/components/modals/create-connection";
import { UserItem } from "@/types/app/userItem";
import { retrieveUserConnections } from "@/lib/retrieveUserConnections";
import { ConnectionItem } from "@/components/ZoomCard/ConnectionItem";

export default function ZoomCard({
  selected,
  setSelectedAction,
  user,
  usersList,
}: {
  selected?: UserItem;
  setSelectedAction: (value?: UserItem) => void;
  user: UserItem;
  usersList: UserItem[];
}) {
  const [expandedState, setExpandedState] = useState(false);
  const [connections, setConnections] = useState<Array<UserItem> | undefined>(
    undefined,
  );
  const [openCreateConnection, setOpenCreateConnection] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (selected?._id === user?._id) {
      t = setTimeout(() => {
        setExpandedState(true);
      }, 520);
    }

    return () => {
      if (t) clearTimeout(t);
    };
  }, [selected, user]);

  useEffect(() => {
    if (selected?._id !== user?._id && expandedState) {
      const id = setTimeout(() => {
        setExpandedState(false);
      }, 0);
      return () => clearTimeout(id);
    }
    return;
  }, [selected, user, expandedState]);

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    const prop =
      e.propertyName ?? (e.nativeEvent as TransitionEvent)?.propertyName;
    if (prop && prop !== "transform") return;

    if (selected?._id === user?._id) {
      console.log("Transition ended, setting expanded state to true");
      setExpandedState(true);
    }
  }

  function handleTicketSelected(value?: UserItem) {
    return () => {
      if (selected?._id === value?._id) {
        setSelectedAction(undefined);
        return;
      }
      setSelectedAction(value);
    };
  }

  useEffect(() => {
    if (selected?._id === user?._id && expandedState) {
      retrieveUserConnections(user?._id)
        .then(
          (result: { _id: string; connections: Array<{ userId: string }> }) => {
            if (result) {
              console.log(result);
              setConnections(
                usersList?.filter((o) =>
                  result.connections.some(({ userId }) => userId === o._id),
                ),
              );
            }
          },
        )
        .catch((error) => {
          if (error instanceof Error) {
            if (error?.cause === "Not Found") {
              setConnections([]);
              return;
            }
            console.error("Error retrieving user connections:", error.message);
          } else {
            console.error("Unknown error retrieving user connections:", error);
          }
        });
    }
  }, [selected, user, expandedState, usersList]);
  return (
    <>
      <div
        onClick={() => setSelectedAction(undefined)}
        className={clsx(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          selected?._id === user?._id
            ? "opacity-100 pointer-events-auto z-40"
            : "opacity-0 pointer-events-none",
        )}
      />

      <CardItem
        onTransitionEnd={handleTransitionEnd}
        onCreateConnectionsAction={() => setOpenCreateConnection(true)}
        onClick={handleTicketSelected(user)}
        selected={selected}
        user={user}
      />
      {expandedState &&
        connections?.map((currentUser, index) => (
          <ConnectionItem
            key={`${currentUser}-${index}`}
            currentUser={currentUser}
            index={index}
            connections={connections}
            selected={selected}
            user={currentUser}
            handleTicketSelected={(value) => handleTicketSelected(value)}
          />
        ))}
      <CreateConnection
        isOpen={openCreateConnection}
        setIsOpenAction={setOpenCreateConnection}
        from={selected}
        usersList={usersList}
      />
    </>
  );
}
