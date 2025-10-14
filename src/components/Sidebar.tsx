import { Dispatch, SetStateAction } from "react";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export default function Sidebar({ page, setPage }: Props) {
  const menu = ["home", "about", "login", "float"];
  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-white shadow-lg flex items-center justify-center space-x-10 z-40">
      {menu.map((item) => (
        <button
          key={item}
          className={`text-sm font-semibold ${
            page === item ? "text-blue-600" : "text-gray-600"
          } hover:text-blue-500 transition`}
          onClick={() => setPage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
