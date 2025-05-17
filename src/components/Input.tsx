"use client";
import { ChangeEvent, useEffect, useRef } from "react";

export default function Input({
  onClick,
  autoFocus,
  value,
  onChange,
}: {
  onClick?: () => void;
  autoFocus?: true;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    if (autoFocus) inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder="0xf1..."
      onClick={onClick}
      type="text"
      onChange={onChange}
      value={value}
      className={`focus:outline-6 focus:outline-brand-dark border-2 border-black rounded-full text-base text-black bg-white p-2 px-4 placeholder-black/50`}
    />
  );
}
