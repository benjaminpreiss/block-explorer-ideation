import type { ReactNode } from "react";

type Button = {
  text: string;
  action: () => void;
};

type Props = {
  head?: {
    title: string;
    button?: Button;
  };
  text?: string;
  children?: ReactNode; // none, or exactly one child.
  footer?: Button;
  variant: "light" | "dark";
};

export default function Card({ head, text, children, variant }: Props) {
  return (
    <div
      className={`${variant === "dark" ? "bg-black" : "bg-brand-light border-2"} border-black rounded-4xl md:rounded-[2.5rem] p-5 md:p-10 md:pl-14 md:pr-14 flex flex-col gap-3 h-full`}
    >
      {head && (
        <span
          className={`${variant === "dark" ? "text-white" : "text-black"} font-semibold text-xl md:text-2xl`}
        >
          {head.title}
        </span>
      )}
      {text && (
        <span
          className={`${variant === "dark" ? "text-white" : "text-black"} font-bold text-3xl md:text-4xl`}
        >
          {text}
        </span>
      )}
      {children}
    </div>
  );
}
