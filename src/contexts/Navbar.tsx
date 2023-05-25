import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

interface NavbarOpenContext {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

interface NavbarOpenProviderProps {
  children: ReactNode;
}
export const NavbarOpen = createContext<NavbarOpenContext>(
  {} as NavbarOpenContext
);

export const NavbarOpenProvider = ({ children }: NavbarOpenProviderProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <NavbarOpen.Provider value={{ opened, setOpened }}>
      {children}
    </NavbarOpen.Provider>
  );
};
