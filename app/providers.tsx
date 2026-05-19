"use client";

import { Provider } from "react-redux";

import { store } from "./redux/store";

import ThemeContextProvider from "./context/ThemeContext";

import {
  AppRouterCacheProvider,
} from "@mui/material-nextjs/v15-appRouter";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeContextProvider>
          {children}
        </ThemeContextProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}