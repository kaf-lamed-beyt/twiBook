import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const dateFromNow = (value: string) => {
  return dayjs(value).fromNow()
}
