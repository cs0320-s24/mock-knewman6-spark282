import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import { registerCommand } from "./components/REPLFunction";
import { modeHandler, loadFileHandler, viewHandler, searchHandler } from "./components/CommandHandlers";

registerCommand("mode", modeHandler);
registerCommand("load_file", loadFileHandler);
registerCommand("view", viewHandler);
registerCommand("search", searchHandler);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
