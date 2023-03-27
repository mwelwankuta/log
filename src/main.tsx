import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { PackageDependencyListProvider } from "./context/dependency-list";
import { InstallListProvider } from "./context/install-list";
import { ProjectPathProvider } from "./context/project-path";
import { ToggleSyncedProvider } from "./context/toggle-synced";
import "./index.scss";

const rootElement = document.getElementById("root") as
  | Element
  | DocumentFragment;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ToggleSyncedProvider>
        <PackageDependencyListProvider>
          <ProjectPathProvider>
            <InstallListProvider>
              <App />
            </InstallListProvider>
          </ProjectPathProvider>
        </PackageDependencyListProvider>
      </ToggleSyncedProvider>
    </ChakraProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
