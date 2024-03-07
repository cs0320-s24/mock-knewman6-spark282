import React, { useState } from "react";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { getCurrentMode } from "./CommandHandlers";
import "../styles/main.css";

interface CommandHistoryEntry {
  command: string;
  result: String | String[][];
  mode: "brief" | "verbose";
}

export default function REPL() {
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);

  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr />
      <REPLInput
        onCommandSubmit={(command, result) => {
          const newEntry: CommandHistoryEntry = {
            command,
            result,
            mode: getCurrentMode(),
          };
          setHistory([...history, newEntry]);
        }}
      />
    </div>
  );
}
