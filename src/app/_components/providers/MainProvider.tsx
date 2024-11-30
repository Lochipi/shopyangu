"use client";

import { MantineProvider } from "@mantine/core";
import React, { type ReactNode } from "react";

interface MainProviderProps {
  children: ReactNode;
}
const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <MantineProvider
      theme={{
        primaryColor: "green",
        primaryShade: { dark: 5 },
        colors: {
          green: [
            "#B8FFDF",
            "#6BFFBC",
            "#24FF9C",
            "#00D676",
            "#008F4F",
            "#004526",
            "#00331C",
            "#002414",
            "#000F08",
            "#000A06",
          ],
          dark: [
            "#D0D4E1",
            "#A1A9C4",
            "#7581A8",
            "#515C80",
            "#333A51",
            "#161923",
            "#101219",
            "#0C0D13",
            "#060709",
            "#020203",
          ],
        },
        fontFamily: "Kumbh Sans, sans-serif",
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default MainProvider;
