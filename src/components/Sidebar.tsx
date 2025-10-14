import { Dispatch, SetStateAction } from "react";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export default function Sidebar({ page, setPage }: Props) {
  const menu = ["home", "about", "login", "float"];
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white shadow-lg flex flex-col items-center py-4 space-y-4">
      {menu.map((item) => (
        <button
          key={item}
          className={`text-sm font-semibold ${page === item ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setPage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
