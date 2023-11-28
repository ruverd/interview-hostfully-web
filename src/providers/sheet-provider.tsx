"use client"

import { SheetContext } from "@/contexts/sheet-context";
import { ReactNode, useState } from "react";

interface SheetProviderProps {
  children: ReactNode;
}

export function SheetProvider({ children }:SheetProviderProps){
  const [show, setShow] = useState(false);

  return (
    <SheetContext.Provider value={{show, setShow}}>
      {children}
    </SheetContext.Provider>
  )
}
