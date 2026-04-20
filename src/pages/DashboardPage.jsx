import React, { useState } from "react"
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

const mockCategories = [
  {
    category: "Basic OOP",
    problems: [
      {
        name: "Class Creation Basics",
        difficulty: "EASY",
        duration: 10,
        description: "Create a class and instantiate objects with attributes",
      },
    ],
  },

  {
    category: "Core OOP Principles",
    problems: [
      {
        name: "Inheritance Hierarchy",
        difficulty: "MEDIUM",
        duration: 20,
        description:
          "Create parent and child classes demonstrating inheritance",
      },
      {
        name: "Polymorphism Demo",
        difficulty: "MEDIUM",
        duration: 25,
        description: "Implement method overriding and runtime polymorphism",
      },
      {
        name: "Encapsulation Challenge",
        difficulty: "EASY",
        duration: 15,
        description: "Use private fields and controlled access methods",
      },
    ],
  },

  {
    category: "Class Design",
    problems: [
      {
        name: "Student Management System",
        difficulty: "MEDIUM",
        duration: 30,
        description: "Design classes for managing students and courses",
      },
      {
        name: "Library System Design",
        difficulty: "MEDIUM",
        duration: 35,
        description: "Model books, users, and borrowing system",
      },
    ],
  },

  {
    category: "Object Relationships",
    problems: [
      {
        name: "Composition vs Aggregation",
        difficulty: "MEDIUM",
        duration: 20,
        description: "Demonstrate both relationships in real scenarios",
      },
    ],
  },

  {
    category: "Method Behavior",
    problems: [
      {
        name: "Static vs Instance Methods",
        difficulty: "EASY",
        duration: 15,
        description: "Differentiate and implement both method types",
      },
      {
        name: "Method Overriding Practice",
        difficulty: "MEDIUM",
        duration: 20,
        description: "Override parent methods and test behavior",
      },
    ],
  },

  {
    category: "Real World Systems",
    problems: [
      {
        name: "Banking System",
        difficulty: "HARD",
        duration: 60,
        description: "Create accounts, transactions, and balance management",
      },
      {
        name: "E-Commerce Cart System",
        difficulty: "HARD",
        duration: 70,
        description: "Implement products, cart, checkout, and discounts",
      },
      {
        name: "Hospital Management System",
        difficulty: "HARD",
        duration: 80,
        description: "Manage patients, doctors, and appointments",
      },
    ],
  },

  {
    category: "Data Handling",
    problems: [
      {
        name: "Inventory Tracker",
        difficulty: "MEDIUM",
        duration: 25,
        description: "Manage stock and product updates",
      },
    ],
  },

  {
    category: "Simulation Systems",
    problems: [
      {
        name: "Traffic Light Simulation",
        difficulty: "MEDIUM",
        duration: 30,
        description: "Simulate state changes using OOP patterns",
      },
      {
        name: "Bank Queue System",
        difficulty: "HARD",
        duration: 40,
        description: "Simulate customer queue processing",
      },
      {
        name: "Parking System Simulation",
        difficulty: "MEDIUM",
        duration: 35,
        description: "Track vehicle entry and exit slots",
      },
    ],
  },

  {
    category: "Advanced OOP",
    problems: [
      {
        name: "Singleton Pattern",
        difficulty: "HARD",
        duration: 20,
        description: "Ensure only one instance of a class exists",
      },
      {
        name: "Observer Pattern System",
        difficulty: "HARD",
        duration: 45,
        description: "Build a publish-subscribe notification system",
      },
    ],
  },
]
function DashboardPage() {
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const visibleProblems = mockCategories
    .filter((cat) => selectedCategories.includes(cat.category))
    .flatMap((cat) => cat.problems)

  return (
    <main className="h-full w-full">
      <h1 className="text-center">SOLVE PROBLEMS USING OOP CONCEPTS</h1>
      <div className="m-5 mt-10 grid grid-cols-[20%_1fr] gap-5">
        <FieldSet className="border-r-2">
          <FieldLegend variant="label">Select OOP Categories</FieldLegend>

          <FieldDescription>
            Choose which topics you want to practice.
          </FieldDescription>

          <FieldGroup className="gap-3">
            {mockCategories.map((item) => (
              <Field orientation="horizontal" key={item.category}>
                <Checkbox
                  id={item.category}
                  checked={selectedCategories.includes(item.category)}
                  onCheckedChange={() => handleToggle(item.category)}
                />
                <FieldLabel htmlFor={item.category} className="font-normal">
                  {item.category}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>

        <div className="grid grid-cols-3 gap-2">
          {selectedCategories.length == 0
            ? mockCategories.map((item) => {
                return item.problems.map((problem, index2) => {
                  return (
                    <Card key={index2}>
                      <CardHeader>
                        <CardTitle>{problem.name}</CardTitle>
                        <CardDescription>
                          {item.category} minutes
                        </CardDescription>
                        <CardDescription>
                          {problem.duration} minutes
                        </CardDescription>

                        <CardAction>{problem.difficulty}</CardAction>
                      </CardHeader>
                      <CardContent>
                        <p>{problem.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button className="w-full p-5">Solve</Button>
                      </CardFooter>
                    </Card>
                  )
                })
              })
            : visibleProblems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.duration} minutes</CardDescription>
                    <CardAction>{item.difficulty}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="w-full p-5">Solve</Button>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
