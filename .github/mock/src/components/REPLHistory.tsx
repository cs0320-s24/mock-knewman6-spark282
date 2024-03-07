import React from "react";
import "../styles/main.css";

interface CommandHistoryEntry {
  command: string;
  result: String | String[][];
  mode: "brief" | "verbose";
}

interface REPLHistoryProps{
  history: CommandHistoryEntry[];
}

export function REPLHistory({ history }: REPLHistoryProps) {
  const renderResult = (result: String | String[][]) => {
    if (typeof result === "string") {
      return <p>{result}</p>;
    } else {
      return (
        <table>
          <tbody>
            {(result as String[][]).map((row: String[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: String, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }; 

  return (
    <div className="repl-history">
      {history.map((entry, index) => (
        <div key={index}>
          {entry.mode === "verbose" && <p>Command: {entry.command}</p>}
          {entry.mode === "verbose" && <p>Results:</p>}
          {renderResult(entry.result)}
        </div>
      ))}
    </div>
  );
}
