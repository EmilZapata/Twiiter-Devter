import { useState, useEffect } from "react"
import { formatDate } from "./useDateTimeFormat"

// const isDateTimeFormatSupported = false
const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["days", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  console.log("getDateDiffs")
  const now = Date.now()
  const elapsed = (now - timestamp) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (elapsed > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    if (isDateTimeFormatSupported) {
      let timeInterval = null
      const { unit: unitInterval } = timeago

      if (unitInterval === "second") {
        timeInterval = 1000
      }

      if (unitInterval === "minute") {
        timeInterval = 60000
      }

      const interval = setInterval(() => {
        !timeInterval && clearInterval(interval)

        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, timeInterval)

      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isDateTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  })

  const { value, unit } = timeago

  return rtf.format(-value, unit)
}
