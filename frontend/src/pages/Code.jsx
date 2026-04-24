import React, { useState } from "react"
import Editor from "@monaco-editor/react"

function Code() {
  const [code, setCode] = useState("// enter your code here")

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs"
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          contextMenu: false,
          scrollBeyondLastLine: false,
          automaticLayout: true, // 🔥 critical fix
        }}
      />
    </div>
  )
}

export default Code