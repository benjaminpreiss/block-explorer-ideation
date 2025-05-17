import type { ReactNode } from "react";

type Button = {
  text: ReactNode;
  action?: () => void;
};

type Props = {
  head?: {
    title: string;
    button?: Button;
    inverseMobile?: true;
  };
  text?: string;
  children?: ReactNode; // none, or exactly one child.
  footer?: Button & { centered?: true };
  variant: "light" | "dark";
};

export default function Card({ head, text, children, variant, footer }: Props) {
  return (
    <div
      className={`${variant === "dark" ? "bg-black" : "bg-brand-light border-2"} border-black rounded-4xl md:rounded-[2.5rem] p-5 md:p-10 md:pl-14 md:pr-14 flex flex-col gap-3 h-full`}
    >
      {head && (
        <div
          className={`flex justify-between md:flex-row gap-3 ${head.inverseMobile ? "flex-col-reverse" : "flex-col"}`}
        >
          <span
            className={`${variant === "dark" ? "text-white" : "text-black"} font-semibold text-xl md:text-2xl`}
          >
            {head.title}
          </span>
          {head.button && (
            <span className="text-left md:text-right font-semibold text-base md:text-xl mb-2 md:mb-0">
              {head.button?.action ? (
                <button
                  className={`underline underline-offset-2 cursor-pointer [text-align:inherit]`}
                  onClick={head.button.action}
                >
                  {head.button?.text}
                </button>
              ) : (
                head.button?.text
              )}
            </span>
          )}
        </div>
      )}
      {text && (
        <span
          className={`${variant === "dark" ? "text-white" : "text-black"} font-bold text-3xl md:text-4xl`}
        >
          {text}
        </span>
      )}
      {children}
      {footer && (
        <span
          className={`${footer.centered ? "text-center" : "text-left"} ${footer.action ? "font-semibold" : "font-normal"} text-base md:text-xl mt-3`}
        >
          {footer.action ? (
            <button
              className={`underline underline-offset-2 cursor-pointer [text-align:inherit]`}
              onClick={footer.action}
            >
              {footer.text}
            </button>
          ) : (
            footer?.text
          )}
        </span>
      )}
    </div>
  );
}
