import {
  Description,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Select from "react-select";
import {
  customStyles,
  groupIntroInfo,
} from "@/components/modals/create-connection/constants";
import { CreateConnectionModalBodyProps } from "@/types/components/modals/create-connection";

export const CreateConnectionModalBody = ({
  closeModalAction,
  groupIntroValue,
  name,
  onChange,
  value,
  options,
  inputValue,
  onInputChange,
  createConnectionAction,
  onGroupInputChange,
  onGroupIntroAction,
  setSelectGroupInputValue,
  groupInputValue,
  selectGroupInputValue,
}: CreateConnectionModalBodyProps) => {
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-10000 flex flex-col gap-4">
            <DialogTitle
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              <div className="flex items-center justify-between">
                <div>Create connection from {name} to:</div>
                <div
                  className="h-5 w-5 relative flex-end cursor-pointer"
                  onClick={() => closeModalAction()}
                >
                  <XMarkIcon />
                </div>
              </div>
            </DialogTitle>
            <Description className="mt-2 text-sm text-gray-500">
              This will create connection between two users.
            </Description>
            <div className="flex flex-col gap-4">
              <Select
                onChange={onChange}
                value={value}
                options={options}
                inputValue={inputValue}
                onInputChange={(_newValue: string) => {
                  onInputChange(_newValue);
                }}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : undefined
                }
                menuPosition="fixed"
                styles={{ ...customStyles }}
              />
              <Select
                onChange={setSelectGroupInputValue}
                value={selectGroupInputValue}
                options={groupIntroInfo}
                inputValue={groupInputValue}
                onInputChange={(_newValue: string) => {
                  onGroupInputChange(_newValue);
                }}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : undefined
                }
                menuPosition="fixed"
                styles={{ ...customStyles }}
              />
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="groupIntro"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group intro
                </label>
                <textarea
                  id="groupIntro"
                  name="groupIntro"
                  value={groupIntroValue}
                  onChange={(e) => onGroupIntroAction(e.target.value)}
                  className={
                    "block w-full h-56 rounded-md border-2 border-gray-300 shadow-sm sm:text-lg p-2"
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={createConnectionAction}
              >
                Create Connection
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  );
};
