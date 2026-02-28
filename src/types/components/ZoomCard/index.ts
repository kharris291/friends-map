import { UserItem } from "@/types/app/userItem";

export interface ConnectionItemProps {
  currentUser: UserItem;
  index: number;
  connections: Array<UserItem> | undefined;
  selected?: UserItem;
  user: UserItem;
  handleTicketSelected: (value?: UserItem) => () => void;
}
