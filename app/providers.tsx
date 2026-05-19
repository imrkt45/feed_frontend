"use client";

import { Provider } from "react-redux";

import { store } from "./redux/store";

import ThemeContextProvider from "./context/ThemeContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </Provider>
  );
}