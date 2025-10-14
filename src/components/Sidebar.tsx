import { Dispatch, SetStateAction } from "react";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export default function Sidebar({ page, setPage }: Props) {
  const menu = ["home", "float", "login", "about"];
  return (
    <div className="fixed top-1/4 right-0 flex flex-col bg-white shadow-lg rounded-l-full py-4 px-2 space-y-6 z-50">
      {menu.map((item) => (
        <button
          key={item}
          className={`w-16 h-12 rounded-full text-sm font-semibold flex items-center justify-center transition-all
            ${page === item ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"}`}
          onClick={() => setPage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
