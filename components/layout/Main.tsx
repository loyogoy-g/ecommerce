import { Box } from "@chakra-ui/react";
import * as React from "react";
import WithSubnavigation from "./Navbar";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  return (
    <Box>
      <WithSubnavigation />
      {children}
    </Box>
  );
}
