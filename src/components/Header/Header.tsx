import "./header.css";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({
  options,
}: {
  options: Array<{
    onClick?: () => void;
    name?: string;
  }>;
}) => (
  <header>
    <div className="flex items-center gap-4 w-full p-10">
      <div>
        <h1>Download family</h1>
      </div>
      <div>
        <ul className="flex flex-row items-center gap-2">
          {options?.map((option, i) => (
            <li
              key={`${i}-${option}`}
              className="cursor-pointer"
              onClick={() => {
                option.onClick?.();
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
);
