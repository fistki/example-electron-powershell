import React, { useState } from "react";

function App() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCommand = async () => {
    const result = await window.electronAPI.runPowerShellCommand(command);
    setOutput(result);
  };

  return (
    <div>
      <h1>Electron React PowerShell Runner</h1>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter PowerShell command"
      />
      <button onClick={handleRunCommand}>Run Command</button>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
