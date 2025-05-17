"use client";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Card from "./Card";
import Input from "./Input";
import { isAddress } from "viem";
import { useRouter } from "next/navigation";

type SearchContextType = {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [value, setValue] = useState("");

  return (
    <SearchContext.Provider
      value={{
        toggled,
        setToggled,
        value,
        setValue,
        onChange: (e) => setValue(e.target.value),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchContextProvider");
  }
  return context;
};

export default function Search() {
  const { toggled, setToggled, value, onChange, setValue } = useSearch();
  const router = useRouter();
  return (
    toggled && (
      <div className="fixed h-full w-full bg-white/60 z-30 backdrop-blur-2xl p-3 pt-[20vh]">
        <div className="max-w-3xl mx-auto">
          <Card
            variant="light"
            head={{
              title: "Search for address",
              button: {
                text: "Close (esc)",
                action: () => {
                  setToggled(false);
                },
              },
              inverseMobile: true,
            }}
            footer={
              value.length === 0
                ? { text: "Type to find address" }
                : isAddress(value)
                  ? {
                      text: `Show ${value}`,
                      action: () => {
                        setToggled(false);
                        router.push(`/wallet/${value}`);
                      },
                    }
                  : { text: "! Invalid address" }
            }
          >
            <Input autoFocus value={value} onChange={onChange} />
          </Card>
        </div>
      </div>
    )
  );
}
