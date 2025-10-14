import { Dispatch, SetStateAction } from "react";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export default function Navbar({ page, setPage }: Props) {
  const menu = ["home", "dashboard", "login"];

  return (
    <div className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50 flex justify-end items-center px-10 py-4 space-x-8">
      {menu.map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={`capitalize font-semibold text-lg transition-all duration-300 ${
            page === item
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "text-gray-700 hover:text-blue-600 hover:scale-105"
          }`}
        >
          {item}
        </button>
      ))}

      {/* Sign Up button — blue background */}
      <button
        onClick={() => setPage("signup")}
        className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
      >
        Sign Up
      </button>
    </div>
  );
}
