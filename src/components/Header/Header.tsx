import "./header.css";
import { handleSignIn, handleSignOut } from "@/lib/auth";
import { useSession } from "next-auth/react";
import clsx from "clsx";

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const LoggedInOptions = ({
  options,
}: {
  options: Array<{
    onClick?: () => void;
    name?: string;
  }>;
}) => {
  return (
    <ul className="flex flex-row items-center gap-4">
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
  );
};

export const Header = ({
  options,
}: {
  options: Array<{
    onClick?: () => void;
    name?: string;
  }>;
}) => {
  const { data: session } = useSession();

  return (
    <header>
      <div
        className={clsx(
          "flex items-center gap-4 w-full p-10 bg-gradient-to-b from-black via-zinc-900 to-red-900 text-white",
          {
            "space-between": session,
            "justify-between": !session,
          },
        )}
      >
        <div className="flex flex-row min-w-fit gap-2">
          <h1>Download family</h1>
        </div>
        <div
          className={clsx("flex", {
            "justify-between w-full": session,
            "justify-end": !session,
          })}
        >
          {session ? (
            <>
              <LoggedInOptions options={options} />
              <div className="flex flex-row items-center space-x-4">
                <h2 className="text-lg font-medium text-white">
                  Welcome, {session?.user?.name}!
                </h2>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
