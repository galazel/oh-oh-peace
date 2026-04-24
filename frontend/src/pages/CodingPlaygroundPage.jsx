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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

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
  const [userCode, setUserCode] = useState("// enter your code here")
  const [submittedResponse, setSubmittedResponse] = useState({})

  const example = location.state || {
    question: "No problem data available. Please navigate from the dashboard.",
    duration: 10,
  }

  const [handleOutput, setHandleOutput] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
  const handleSubmittion = async () => {
    setIsLoading(true)
    alert(userCode)
    fetch("http://localhost:8081/api/v1/code-assistant/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        problemId: example.problemId,
        problemDescription: example.problemDescription,
        sourceCode: userCode,
        languageId:
          items.find((item) => item.value === selectedLanguage)?.id || 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        console.log("Submission response:", data)
        setSubmittedResponse(data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error submitting code:", error)
      })
  }
  function TestCaseCard({ testCase }) {
    return (
      <Card className={`border ${testCase.status == 'PASS' ? "bg-green-500" : "bg-red-500"}`}>
        <CardHeader >
          <CardTitle>{testCase.testCase}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Expected Output: {testCase.expectedOutput}</p>
          <p>Actual Output: {testCase.actualOutput}</p>
        </CardContent>
      </Card>
    )
  }

  function TestCase() {
    return submittedResponse == null ? <p>Submit your code to see the response from the AI</p> : (
      <div className="flex flex-col gap-2">
        {
          submittedResponse.testCaseDTOList?.map((testCase, index) => (
            <TestCaseCard key={index} testCase={testCase} />
          ))
        }
    </div>
    )
  }
  function AiResponse() {
    return submittedResponse ==null ? <p>Submit your code to see the response from the AI</p> : (
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">AI Review</p>
        <p>{submittedResponse.aiMessage}</p>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 bg-white p-2 ">
      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faStopwatch} className="text-xl" />
          <span className={timeLeft <= 60 ? "font-semibold text-red-500" : ""}>
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
          <Button className="w-32" onClick={handleSubmittion}>
            Submit {isLoading && <Spinner className="ml-2" />}
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full rounded-md border"
        >
          <ResizablePanel defaultSize={70} className="min-h-0">
            <div className="h-full">
              <Editor
                height="100%"
                language={selectedLanguage}
                defaultValue={userCode}
                onChange={(value) => setUserCode(value)}
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
                  <Tabs
                    defaultValue="test-case"
                    onValueChange={handleOutputChange}
                  >
                    <TabsList>
                      <TabsTrigger value="test-case">
                        <AppWindowIcon />
                        Test Cases
                      </TabsTrigger>
                      <TabsTrigger value="ai-review">
                        <CodeIcon />
                        AI Review
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="my-2 flex-1 overflow-auto  p-2 text-sm text-gray-600">
                  
                    {handleOutput ? <AiResponse /> : <TestCase />}
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
