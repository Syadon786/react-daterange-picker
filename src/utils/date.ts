import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  toDate,
  parseISO,
  isValid,
  max,
  min,
  isSameMonth,
  addMonths,
} from 'date-fns';
import { DateRange } from 'models';

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );

export const getDaysInMonth = (date: Date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  startDate ? isSameDay(day, startDate) : false;

export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
  endDate ? isSameDay(day, endDate) : false;

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  startDate && endDate
    ? isWithinInterval(day, { start: startDate, end: endDate }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate)
    : false;

export const isRangeSameDay = ({ startDate, endDate }: DateRange) =>
  startDate && endDate ? isSameDay(startDate, endDate) : false;

type Falsy = false | null | undefined | 0;

export const parseOptionalDate = (
  date: Date | string | Falsy,
  defaultValue: Date
) => {
  if (date instanceof Date) {
    const parsed = toDate(date);
    if (isValid(parsed)) {
      return parsed;
    }
  } else if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) {
      return parsed;
    }
  }
  return defaultValue;
};

export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date
) => {
  let { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  } else {
    return [startDate, endDate];
  }
};

export const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i);
};
