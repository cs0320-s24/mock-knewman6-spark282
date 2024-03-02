import React, { useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { executeCommand } from "./REPLFunction";

interface REPLInputProps {
  onCommandSubmit: (command: string, result: String | String[][]) => void;
}

export function REPLInput({ onCommandSubmit }: REPLInputProps) {
  const [commandString, setCommandString] = useState("");

  async function handleSubmit() {
    const result = await executeCommand(commandString);
    onCommandSubmit(commandString, result);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit} aria-label="Submit">
        Submit
      </button>
    </div>
  );
}
