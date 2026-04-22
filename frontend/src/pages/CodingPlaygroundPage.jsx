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

const example = {
  question: `Design an advanced Library Management System with the following classes:

Book:
  - ISBN, title, author, genre, totalCopies, availableCopies

Member:
  - memberId, name, membershipTier (BASIC, PREMIUM, VIP)
  - borrowedBooks (BASIC: max 2, PREMIUM: max 5, VIP: max 10)
  - borrowingHistory (list of past borrows with return dates)
  - fine (accumulated fine for overdue books — $1/day after due date)

Reservation:
  - reservationId, memberId, ISBN, reservedAt, expiresAt (48hrs)

Library — must support:
  - addBook(book)
  - registerMember(member)
  - borrowBook(memberId, ISBN)
      * fails if no available copies
      * fails if member reached their tier borrow limit
      * fails if member has unpaid fines over $10
      * if book is reserved by another member, that member gets priority
  - returnBook(memberId, ISBN)
      * calculates and adds fine if overdue (due date = 14 days from borrow)
      * if returned book has a pending reservation, auto-assigns to reserver
  - reserveBook(memberId, ISBN)
      * only allowed if all copies are currently borrowed
      * reservation expires after 48 hours if not picked up
  - payFine(memberId, amount)
  - renewBook(memberId, ISBN)
      * extends due date by 7 days
      * fails if book has a pending reservation by another member
      * fails if already renewed twice
  - getOverdueMembers(days)
  - getMostBorrowedBooks(n)
  - getRecommendations(memberId)
      * returns books in the same genre as the member's borrowing history`,

  testCases: [
    {
      id: 1,
      description: "BASIC member cannot borrow more than 2 books",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 3,
            availableCopies: 2,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "BASIC",
            borrowedBooks: ["002", "003"],
            fine: 0,
          },
        ],
      },
      input: { method: "borrowBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Borrow limit reached for BASIC tier",
    },
    {
      id: 2,
      description: "Member with unpaid fines over $10 cannot borrow",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 3,
            availableCopies: 2,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "PREMIUM",
            borrowedBooks: [],
            fine: 15,
          },
        ],
      },
      input: { method: "borrowBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Unpaid fines exceed $10. Please pay your fines first",
    },
    {
      id: 3,
      description:
        "Reserved book gives priority to reserver over regular borrower",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 1,
            availableCopies: 1,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "PREMIUM",
            borrowedBooks: [],
            fine: 0,
          },
          {
            memberId: "M02",
            name: "Jane",
            membershipTier: "PREMIUM",
            borrowedBooks: [],
            fine: 0,
          },
        ],
        reservations: [
          {
            reservationId: "R01",
            memberId: "M02",
            ISBN: "001",
            reservedAt: "2026-04-21T00:00:00",
            expiresAt: "2026-04-23T00:00:00",
          },
        ],
      },
      input: { method: "borrowBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Book is reserved by another member",
    },
    {
      id: 4,
      description: "Returning an overdue book adds a fine to the member",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 2,
            availableCopies: 1,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "PREMIUM",
            fine: 0,
            borrowedBooks: [
              {
                ISBN: "001",
                borrowedAt: "2026-03-01",
                dueDate: "2026-03-15",
                renewCount: 0,
              },
            ],
          },
        ],
      },
      input: { method: "returnBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: { returned: true, fineAdded: 37, totalFine: 37 },
    },
    {
      id: 5,
      description:
        "Returning a book auto-assigns it to a member with a pending reservation",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 1,
            availableCopies: 0,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "PREMIUM",
            fine: 0,
            borrowedBooks: [
              {
                ISBN: "001",
                borrowedAt: "2026-04-07",
                dueDate: "2026-04-21",
                renewCount: 0,
              },
            ],
          },
          {
            memberId: "M02",
            name: "Jane",
            membershipTier: "PREMIUM",
            fine: 0,
            borrowedBooks: [],
          },
        ],
        reservations: [
          {
            reservationId: "R01",
            memberId: "M02",
            ISBN: "001",
            reservedAt: "2026-04-20T00:00:00",
            expiresAt: "2026-04-22T00:00:00",
          },
        ],
      },
      input: { method: "returnBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: {
        returned: true,
        autoAssignedTo: "M02",
        reservationId: "R01",
      },
    },
    {
      id: 6,
      description: "Member cannot renew a book that has a pending reservation",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 1,
            availableCopies: 0,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "VIP",
            fine: 0,
            borrowedBooks: [
              {
                ISBN: "001",
                borrowedAt: "2026-04-07",
                dueDate: "2026-04-21",
                renewCount: 0,
              },
            ],
          },
          {
            memberId: "M02",
            name: "Jane",
            membershipTier: "BASIC",
            fine: 0,
            borrowedBooks: [],
          },
        ],
        reservations: [
          {
            reservationId: "R01",
            memberId: "M02",
            ISBN: "001",
            reservedAt: "2026-04-19T00:00:00",
            expiresAt: "2026-04-21T00:00:00",
          },
        ],
      },
      input: { method: "renewBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Cannot renew. Book has a pending reservation",
    },
    {
      id: 7,
      description: "Member cannot renew a book more than twice",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 2,
            availableCopies: 1,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "VIP",
            fine: 0,
            borrowedBooks: [
              {
                ISBN: "001",
                borrowedAt: "2026-04-01",
                dueDate: "2026-04-21",
                renewCount: 2,
              },
            ],
          },
        ],
        reservations: [],
      },
      input: { method: "renewBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Renewal limit reached. Maximum 2 renewals allowed",
    },
    {
      id: 8,
      description:
        "getRecommendations returns books in same genre as borrowing history",
      predefinedState: {
        books: [
          {
            ISBN: "001",
            title: "Clean Code",
            author: "Robert Martin",
            genre: "Programming",
            totalCopies: 2,
            availableCopies: 2,
          },
          {
            ISBN: "002",
            title: "Design Patterns",
            author: "GoF",
            genre: "Programming",
            totalCopies: 2,
            availableCopies: 2,
          },
          {
            ISBN: "003",
            title: "Atomic Habits",
            author: "James Clear",
            genre: "Self-Help",
            totalCopies: 2,
            availableCopies: 2,
          },
        ],
        members: [
          {
            memberId: "M01",
            name: "John",
            membershipTier: "PREMIUM",
            fine: 0,
            borrowedBooks: [],
            borrowingHistory: [{ ISBN: "001", genre: "Programming" }],
          },
        ],
      },
      input: { method: "getRecommendations", args: { memberId: "M01" } },
      expectedOutput: [
        { ISBN: "002", title: "Design Patterns", genre: "Programming" },
      ],
    },
  ],
}

const items = [
  { label: "Java", value: "java", id: 91 },
  { label: "C#", value: "csharp", id: 51 },
  { label: "Python", value: "python", id: 71 },
  { label: "JavaScript", value: "javascript", id: 102 },
  { label: "C++", value: "cpp", id: 76 },
]

export default function CodingPlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("java")

  return (
    <div className="flex h-screen w-full flex-col gap-2 bg-white p-2">
      {/* TOP BAR */}
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

      {/* MAIN RESIZABLE AREA */}
      <div className="min-h-0 flex-1">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full rounded-md border"
        >
          {/* LEFT: PROBLEM */}
          <ResizablePanel defaultSize={40} className="min-h-0">
            <div className="h-full overflow-auto p-4">
              <pre className="font-inherit text-sm whitespace-pre-wrap">
                {example.question}
              </pre>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT SIDE */}
          <ResizablePanel defaultSize={60} className="min-h-0">
            <ResizablePanelGroup orientation="vertical" className="h-full">
              {/* EDITOR */}
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
                    }}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* BOTTOM PANEL */}
              <ResizablePanel defaultSize={30} className="min-h-0">
                <div className="flex h-full flex-col">
                  {/* TABS */}
                  <div className="flex gap-2 border-b pb-2">
                    <Button variant="outline">Test Cases</Button>
                    <Button variant="outline">AI Response</Button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 overflow-auto p-2 text-sm text-gray-600">
                    Select a tab to view output
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
