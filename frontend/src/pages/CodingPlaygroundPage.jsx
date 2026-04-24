import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { useLocation } from "react-router-dom"
import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStopwatch } from "@fortawesome/free-solid-svg-icons"

const items = [
  { label: "Java", value: "java", id: 91 },
  { label: "C#", value: "csharp", id: 51 },
  { label: "Python", value: "python", id: 71 },
  { label: "JavaScript", value: "javascript", id: 102 },
  { label: "C++", value: "cpp", id: 76 },
]

export default function CodingPlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("java")
  const location = useLocation()

  const example = location.state || {
    question: "No problem data available. Please navigate from the dashboard.",
    duration: 10,
  }

  const [handleOutput, setHandleOutput] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleOutputChange = () => {
    setHandleOutput((prev) => !prev)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  useEffect(() => {
    const totalSeconds = (example.duration || 0) * 60
    setTimeLeft(totalSeconds)
  }, [example.duration])

  useEffect(() => {
    if (isPaused) return
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, timeLeft])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex h-screen w-full flex-col gap-2 bg-white p-2">

      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faStopwatch} className="text-xl" />
          <span className={timeLeft <= 60 ? "text-red-500 font-semibold" : ""}>
            {formatTime(timeLeft)}
          </span>
          <Button onClick={togglePause} className="ml-3">
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>

        <div className="flex justify-end gap-5">
          <Select
            items={items}
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-32">Submit</Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup orientation="horizontal" className="h-full rounded-md border">

          <ResizablePanel defaultSize={70} className="min-h-0">
            <div className="h-full">
              <Editor
                height="100%"
                language={selectedLanguage}
                defaultValue="// enter your code here"
                theme="vs"
                options={{
                  minimap: { enabled: false },
                  fontSize: 15,
                  quickSuggestions: true,
                  suggestOnTriggerCharacters: true,
                  wordBasedSuggestions: true,
                  tabCompletion: "on",
                  parameterHints: { enabled: true },
                }}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={60} className="min-h-0">
            <ResizablePanelGroup orientation="vertical" className="h-full">

              <ResizablePanel defaultSize={40} className="min-h-0">
                <div className="h-full overflow-auto p-4">
                  <p className="text-3xl">Placeholder title</p>
                  <pre className="font-inherit text-sm whitespace-pre-wrap">
                    {example.problemDescription}
                  </pre>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={30} className="min-h-0">
                <div className="flex h-full flex-col">
                  <Tabs defaultValue="preview" onValueChange={handleOutputChange}>
                    <TabsList>
                      <TabsTrigger value="preview">
                        <AppWindowIcon />
                        Preview
                      </TabsTrigger>
                      <TabsTrigger value="code">
                        <CodeIcon />
                        Code
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex-1 overflow-auto p-2 text-sm text-gray-600">
                    {handleOutput
                      ? "No output to display."
                      : "Test cases will be displayed here after submission."}
                  </div>
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}