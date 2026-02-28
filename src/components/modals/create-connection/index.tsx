"use client";
import { Fragment, useState } from "react";
import { Dialog, Portal, Transition, TransitionChild } from "@headlessui/react";
import { UserItem } from "@/types/app/userItem";
import { createConnection } from "@/lib/createConnection";
import { CreateConnectionModalBody } from "@/components/modals/create-connection/CreateConnectionModalBody";

export const CreateConnection = ({
  from,
  isOpen,
  setIsOpenAction,
  usersList,
}: {
  from?: UserItem;
  isOpen: boolean;
  setIsOpenAction: (value: boolean) => void;
  usersList: UserItem[];
}) => {
  const [selectInputValue, setSelectInputValue] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [selectGroupInputValue, setSelectGroupInputValue] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [groupFilterValue, setGroupFilterValue] = useState("");
  const [groupIntroValue, setGroupIntroValue] = useState("");

  const optionsList = isOpen
    ? usersList.map((user) => ({ label: user.name, value: user._id }))
    : [];

  return (
    <Portal>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-9999"
          onClose={() => {
            setIsOpenAction(false);
          }}
          unmount={true}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <CreateConnectionModalBody
            createConnectionAction={() => {
              createConnection({
                broughtBy: selectGroupInputValue?.value,
                groupIntro: groupIntroValue,
                from: from?._id,
                to: selectInputValue?.value,
              }).then((response) => {
                if (response.ok) {
                  setFilterValue("");
                  setGroupFilterValue("");
                  setSelectGroupInputValue(null);
                  setSelectInputValue(null);
                  setIsOpenAction(false);
                }
              });
            }}
            groupInputValue={groupFilterValue}
            groupIntroValue={groupIntroValue}
            inputValue={filterValue}
            name={from?.name}
            closeModalAction={() => setIsOpenAction(false)}
            onChange={(value) => setSelectInputValue(value)}
            onGroupIntroAction={setGroupIntroValue}
            onGroupInputChange={setGroupFilterValue}
            onInputChange={setFilterValue}
            options={optionsList}
            selectGroupInputValue={selectGroupInputValue}
            setSelectGroupInputValue={setSelectGroupInputValue}
            value={selectInputValue}
          />
        </Dialog>
      </Transition>
    </Portal>
  );
};
