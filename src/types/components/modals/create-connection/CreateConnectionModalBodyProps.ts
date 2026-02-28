export interface CreateConnectionModalBodyProps {
  createConnectionAction: () => void;
  groupInputValue: string;
  groupIntroValue: string | undefined;
  inputValue: string;
  name: string | undefined;
  onChange: (value: { label: string; value: string } | null) => void;
  closeModalAction: () => void;
  onGroupInputChange: (_newValue: string) => void;
  onGroupIntroAction: (_newValue: string) => void;
  onInputChange: (_newValue: string) => void;
  options: { label: string; value: string }[];
  selectGroupInputValue: { label: string; value: string } | null;
  setSelectGroupInputValue: (
    value: { label: string; value: string } | null,
  ) => void;
  value: { label: string; value: string } | null;
}
