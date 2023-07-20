import {
  DefinedRange,
  MonthsLabels,
  RangeLabels,
  WeekDaysLabels,
} from 'models';

import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';

export const MARKERS: { [key: string]: symbol } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
};

export const WEEK_DAYS: WeekDaysLabels = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
];

export const MONTHS: MonthsLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const PLACEHOLDER_RANGE_LABELS: RangeLabels = {
  startOfRangeLabel: 'Start Date',
  endOfRangeLabel: 'End Date',
};

const getDefaultRanges = (date: Date): DefinedRange[] => [
  {
    label: 'Today',
    startDate: date,
    endDate: date,
  },
  {
    label: 'Yesterday',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: 'This Week',
    startDate: startOfWeek(date),
    endDate: endOfWeek(date),
  },
  {
    label: 'Last Week',
    startDate: startOfWeek(addWeeks(date, -1)),
    endDate: endOfWeek(addWeeks(date, -1)),
  },
  {
    label: 'Last 7 Days',
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: 'This Month',
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: 'Last Month',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
];

export const DEFAULT_RANGES = getDefaultRanges(new Date());
