import React, { useMemo } from "react"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
} from "@/components/kibo-ui/contribution-graph"
import { formatISO } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// ─── YOUR DATA ───────────────────────────────────────────────────────────────
// Add or remove entries here. Any date not listed shows as level 0 (empty).
// level: 0 = none, 1 = light, 2 = medium, 3 = dark, 4 = darkest
const myRawData = [
  { date: "2026-01-03", count: 2 },
  { date: "2026-01-07", count: 5 },
  { date: "2026-01-10", count: 12 },
  { date: "2026-01-15", count: 8 },
  { date: "2026-01-20", count: 3 },
  { date: "2026-01-25", count: 18 },
  { date: "2026-02-02", count: 7 },
  { date: "2026-02-08", count: 14 },
  { date: "2026-02-14", count: 20 },
  { date: "2026-02-20", count: 9 },
  { date: "2026-02-27", count: 4 },
  { date: "2026-03-05", count: 11 },
  { date: "2026-03-12", count: 6 },
  { date: "2026-03-19", count: 17 },
  { date: "2026-03-26", count: 2 },
  { date: "2026-04-01", count: 13 },
  { date: "2026-04-07", count: 8 },
  { date: "2026-04-14", count: 19 },
  { date: "2026-04-20", count: 5 },
]

const MAX_LEVEL = 4

function buildData(raw) {
  const maxCount = Math.max(...raw.map((d) => d.count), 1)
  return raw.map(({ date, count }) => ({
    date,
    count,
    level: count === 0 ? 0 : Math.ceil((count / maxCount) * MAX_LEVEL),
  }))
}

function ProfilePage() {
  const data = useMemo(() => buildData(myRawData), [])

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-full w-[68vw] flex-col p-10">
        <div className="grid h-140 grid-cols-[25rem_1fr]">
          <div className="flex h-full w-full flex-col gap-3 p-1">
            <div className="w-full overflow-hidden rounded-full">
              <img
                src="http://i.scdn.co/image/ab67616d0000b2732f8c0fd72a80a93f8c53b96c"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="font-bold">Username</p>
              <span>she/her</span>
              <p>Achievements</p>
              <ul className="flex gap-5">
                <li>fdsa</li>
                <li>fdsa</li>
                <li>fdsa</li>
              </ul>
            </div>
          </div>

          <div className="grid h-full grid-rows-2 gap-2 p-2">
            <div className="flex flex-col">
              <p className="font-bold">Problems Solved</p>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item}>
                    <CardHeader>
                      <CardTitle>Card {item}</CardTitle>
                      <CardDescription>Sample Description</CardDescription>
                      <CardAction>Action</CardAction>
                    </CardHeader>
                    <CardContent>
                      <p>Sample content for card {item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex h-40 w-full justify-center p-2">
              <ContributionGraph data={data} className="w-full">
                <ContributionGraphCalendar>
                  {({ activity, dayIndex, weekIndex }) => (
                    <ContributionGraphBlock
                      activity={activity}
                      className={cn(
                        'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                        'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                        'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                        'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                        'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                      )}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  )}
                </ContributionGraphCalendar>
                <ContributionGraphFooter />
              </ContributionGraph>
            </div>
          </div>
        </div>

        <div className="h-full">
          <p className="font-bold">Contribution Activity</p>
          <p>Solved OOP problems</p>
          <p>dfsadfs</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
