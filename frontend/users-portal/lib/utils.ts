import { customAlphabet } from 'nanoid'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export const getUniqueKey = (): string => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuxyz', 12);
  return nanoid();
}

export const getTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimestampFormatted = (timestamp: string, format = 'LLL'): string => {
  const tz = getTimezone();
  return dayjs(timestamp).tz(tz).format(format);
}

export const getTimestampInstance = (timestamp: string): dayjs.Dayjs => {
  return dayjs(timestamp);
}
