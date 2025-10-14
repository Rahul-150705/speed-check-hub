import { Dispatch, SetStateAction } from "react";

type Props = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
};

export default function Navbar({ page, setPage }: Props) {
  const menu = ["home", "dashboard", "login"];
  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50 flex justify-end items-center px-8 py-4 space-x-8">
      {menu.map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={`capitalize font-semibold text-lg transition-all ${
            page === item ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => setPage("signup")}
        className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all"
      >
        Sign Up
      </button>
    </div>
  );
}
