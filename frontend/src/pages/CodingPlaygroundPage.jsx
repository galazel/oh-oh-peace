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
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 3, availableCopies: 2 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "BASIC", borrowedBooks: ["002", "003"], fine: 0 },
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
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 3, availableCopies: 2 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "PREMIUM", borrowedBooks: [], fine: 15 },
        ],
      },
      input: { method: "borrowBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Unpaid fines exceed $10. Please pay your fines first",
    },
    {
      id: 3,
      description: "Reserved book gives priority to reserver over regular borrower",
      predefinedState: {
        books: [
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 1, availableCopies: 1 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "PREMIUM", borrowedBooks: [], fine: 0 },
          { memberId: "M02", name: "Jane", membershipTier: "PREMIUM", borrowedBooks: [], fine: 0 },
        ],
        reservations: [
          { reservationId: "R01", memberId: "M02", ISBN: "001", reservedAt: "2026-04-21T00:00:00", expiresAt: "2026-04-23T00:00:00" },
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
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 2, availableCopies: 1 },
        ],
        members: [
          {
            memberId: "M01", name: "John", membershipTier: "PREMIUM", fine: 0,
            borrowedBooks: [{ ISBN: "001", borrowedAt: "2026-03-01", dueDate: "2026-03-15", renewCount: 0 }],
          },
        ],
      },
      input: { method: "returnBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: { returned: true, fineAdded: 37, totalFine: 37 },
    },
    {
      id: 5,
      description: "Returning a book auto-assigns it to a member with a pending reservation",
      predefinedState: {
        books: [
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 1, availableCopies: 0 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "PREMIUM", fine: 0, borrowedBooks: [{ ISBN: "001", borrowedAt: "2026-04-07", dueDate: "2026-04-21", renewCount: 0 }] },
          { memberId: "M02", name: "Jane", membershipTier: "PREMIUM", fine: 0, borrowedBooks: [] },
        ],
        reservations: [
          { reservationId: "R01", memberId: "M02", ISBN: "001", reservedAt: "2026-04-20T00:00:00", expiresAt: "2026-04-22T00:00:00" },
        ],
      },
      input: { method: "returnBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: { returned: true, autoAssignedTo: "M02", reservationId: "R01" },
    },
    {
      id: 6,
      description: "Member cannot renew a book that has a pending reservation",
      predefinedState: {
        books: [
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 1, availableCopies: 0 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "VIP", fine: 0, borrowedBooks: [{ ISBN: "001", borrowedAt: "2026-04-07", dueDate: "2026-04-21", renewCount: 0 }] },
          { memberId: "M02", name: "Jane", membershipTier: "BASIC", fine: 0, borrowedBooks: [] },
        ],
        reservations: [
          { reservationId: "R01", memberId: "M02", ISBN: "001", reservedAt: "2026-04-19T00:00:00", expiresAt: "2026-04-21T00:00:00" },
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
          { ISBN: "001", title: "Clean Code", author: "Robert Martin", genre: "Programming", totalCopies: 2, availableCopies: 1 },
        ],
        members: [
          { memberId: "M01", name: "John", membershipTier: "VIP", fine: 0, borrowedBooks: [{ ISBN: "001", borrowedAt: "2026-04-01", dueDate: "2026-04-21", renewCount: 2 }] },
        ],
        reservations: [],
      },
      input: { method: "renewBook", args: { memberId: "M01", ISBN: "001" } },
      expectedOutput: "Renewal limit reached. Maximum 2 renewals allowed",
    },
    {
      id: 8,
      description: "getRecommendations returns books in same genre as borrowing history",
      predefinedState: {
        books: [
          { ISBN: "001", title: "Clean Code",       author: "Robert Martin", genre: "Programming", totalCopies: 2, availableCopies: 2 },
          { ISBN: "002", title: "Design Patterns",  author: "GoF",           genre: "Programming", totalCopies: 2, availableCopies: 2 },
          { ISBN: "003", title: "Atomic Habits",    author: "James Clear",   genre: "Self-Help",   totalCopies: 2, availableCopies: 2 },
        ],
        members: [
          {
            memberId: "M01", name: "John", membershipTier: "PREMIUM", fine: 0,
            borrowedBooks: [],
            borrowingHistory: [{ ISBN: "001", genre: "Programming" }],
          },
        ],
      },
      input: { method: "getRecommendations", args: { memberId: "M01" } },
      expectedOutput: [{ ISBN: "002", title: "Design Patterns", genre: "Programming" }],
    },
  ],
}

const items = [
  { label: "Java", value: "java" },
  { label: "C#", value: "c-sharp" },
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "c++" },
]

export default function CodingPlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("")

  return (
<div className="flex max-h-full flex-col gap-2">
      <div className="flex justify-end ">
        <Select
          items={items}
          value={selectedLanguage}
          onValueChange={(value) => {
            setSelectedLanguage(value)
          }}
        >
          <SelectTrigger className="w-45">
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
      </div>
      <ResizablePanelGroup orientation="horizontal" className="bg-white p-1">
        <ResizablePanel>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
            {example["question"]}
          </pre>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ResizablePanelGroup orientation="vertical" className="bg-white p-1">
            <ResizablePanel>
              <Editor
                height="90vh"
                defaultLanguage={selectedLanguage}
                defaultValue="//enter your code here"
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="flex flex-col p-2">
              <div className="flex gap-2 border-b border-gray-100 pb-2">
                <Button>Test Cases</Button>
                <Button>AI Response</Button>
              </div>
              <div className="h-full"></div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
