import React, { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


function DashboardPage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categoryProblems, setCategoryProblems] = useState([])
  const navigate = useNavigate()

  const handleToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }
  const visibleProblems = categoryProblems
    .filter((cat) => selectedCategories.includes(cat.categoryDescription))
    .flatMap((cat) => cat.problems)

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["categoriesData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8081/api/v1/categories/all")
      return await response.json()
      
    },
    staleTime: 60000, // 1 min cache
  })

  useEffect(() => {
    if (data) {
      setCategoryProblems(data)
      console.log("Fetched problems data:", data) 
    }
}, [data])

  if (isPending) return "Loading..."
  if (error) return "An error has occurred: " + error.message
  return (
    <main className="flex h-full w-full flex-col ">

      <header className="border-b px-6 py-4">
        <h1 className="text-center text-lg font-semibold tracking-wide">
          SOLVE PROBLEMS USING OOP CONCEPTS
        </h1>
      </header>

   
      <div className="flex flex-1 overflow-hidden">

        <aside className="w-72 overflow-y-auto border-r p-4">
          <FieldSet>
            <FieldLegend variant="label">Select OOP Categories</FieldLegend>

            <FieldDescription>
              Choose which topics you want to practice.
            </FieldDescription>

            <FieldGroup className="mt-4 flex flex-col gap-3">
              {categoryProblems != null && categoryProblems.map((item) => (
                <Field orientation="horizontal" key={item.categoryDescription}>
                  <Checkbox
                    id={item.categoryDescription}
                    checked={selectedCategories.includes(item.categoryDescription)}
                    onCheckedChange={() => handleToggle(item.categoryDescription)}
                  />
                  <FieldLabel htmlFor={item.categoryDescription} className="font-normal">
                    {item.categoryDescription}
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </aside>


        <section className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedCategories.length === 0
              ? categoryProblems != null && categoryProblems.flatMap((item) =>
                  item.problems.map((problem, index) => (
                    <Card key={`${item.categoryDescription}-${index}`}>
                      <CardHeader>
                        <CardTitle>{problem.problemTitle }Placeholder</CardTitle>
                        <CardDescription>
                          {problem.duration} minutes
                        </CardDescription>
                        <CardAction>{problem.difficulty}</CardAction>
                      </CardHeader>

                      <CardContent>
                        <p>{problem.problemDescription}</p>
                      </CardContent>

                      <CardFooter className="flex justify-end">
                        <Button className="w-full p-5" onClick={() => navigate(`solve/problem/${index}`,{state: {problemId: problem.problemId, problemDescription: problem.problemDescription, problemTitle: problem.problemTitle, duration: problem.duration, difficulty: problem.difficulty}})}>
                          Solve
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )
              : visibleProblems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{item.problemTitle}Placeholder</CardTitle>
                      <CardDescription>{item.duration} minutes</CardDescription>
                      <CardAction>{item.difficulty}</CardAction>
                    </CardHeader>

                    <CardContent>
                      <p>{item.problemDescription}</p>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                      <Button className="w-full p-5" onClick={() => navigate(`solve/problem/${index}`,{state: {problemId: item.id, problemDescription: item.description, problemTitle: item.name, duration: item.duration, difficulty: item.difficulty}})}>
                        Solve
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
