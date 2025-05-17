"use client";
import Link from "next/link";
import Input from "./Input";
import { useSearch } from "./Search";

export default function Nav() {
  const { setToggled, value, onChange } = useSearch();
  return (
    <nav className="bg-brand-light flex items-center rounded-full border-2 border-black justify-between p-1.5 md:p-2 pl-3 md:pl-4">
      <Link
        href="/"
        className="cursor-pointer flex hover:bg-brand-dark rounded-full box-content focus:outline-4 outline-brand-dark border-2 focus:border-black border-transparent bg-[url(/Logomark.svg)] bg-contain bg-no-repeat h-9 w-9 md:h-10 md:w-10 -m-[2px]"
      />
      <Input
        onClick={() => {
          setToggled(true);
        }}
        value={value}
        onChange={onChange}
      />
    </nav>
  );
}
