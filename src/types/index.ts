import { ReactNode } from "react";
export interface NavLink {
  name: string;
  href: string;
  icon?: ReactNode; // The '?' means it is optional
}
