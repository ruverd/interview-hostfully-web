"use client"

import { createContext } from "react";

interface SheetContext {
  show: boolean;
  setShow: (showed: boolean) => void;
}

export const SheetContext = createContext({
  show: false
} as SheetContext)