import { useState, useEffect } from "react"

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
    let timeInterval = null
    const { unit: unitInterval } = timeago

    if (unitInterval === "second") {
      timeInterval = 1000
    }

    if (unitInterval === "minute") {
      timeInterval = 60000
    }

    console.log({ timeInterval, unitInterval })
    const interval = setInterval(() => {
      !timeInterval && clearInterval(interval)

      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, timeInterval)

    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  })

  const { value, unit } = timeago

  return rtf.format(-value, unit)
}
