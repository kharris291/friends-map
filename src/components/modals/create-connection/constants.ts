import { GroupBase, StylesConfig } from "react-select";

export const customStyles: StylesConfig<
  {
    label: string;
    value: string;
  },
  false,
  GroupBase<{
    label: string;
    value: string;
  }>
> = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 11000,
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: "white",
  }),
};

export const groupIntroInfo = [
  { label: "Brought me into the madness", value: "brought-me-into-group" },
  { label: "Brought them into the madness", value: "brought-them-into-group" },
];
