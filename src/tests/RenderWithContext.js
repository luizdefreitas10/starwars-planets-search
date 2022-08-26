import React from "react";
import { render } from "@testing-library/react";
import PlanetsProvider from "../context/PlanetsProvider";

export const renderWithContext = (component) => ({
  ...render(<PlanetsProvider>{component}</PlanetsProvider>),
});