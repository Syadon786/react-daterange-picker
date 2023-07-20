import React, { FC, useState, useCallback, useMemo } from 'react';
import {
  addMonths,
  isSameDay,
  isWithinInterval,
  isAfter,
  isBefore,
  isSameMonth,
  addYears,
  max,
  min,
} from 'date-fns';

import {
  DateRange,
  NavigationAction,
  DefinedRange,
  SxProp,
  WeekDaysLabels,
  MonthsLabels,
  RangeLabels,
} from 'models';
import { Menu } from 'components';
import {
  parseOptionalDate,
  DEFAULT_RANGES,
  MARKERS,
  getValidatedMonths,
  WEEK_DAYS,
  MONTHS,
  PLACEHOLDER_RANGE_LABELS,
} from 'utils';

interface DateRangePickerProps extends SxProp {
  open: boolean;
  dateFormat?: string;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  weekDaysLabels?: WeekDaysLabels;
  monthsLabels?: MonthsLabels;
  placeholderRangeLabels?: RangeLabels;
  onChange: (dateRange: DateRange) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  open,
  initialDateRange,
  dateFormat = 'dd/MM/yyyy',
  definedRanges = DEFAULT_RANGES,
  weekDaysLabels = WEEK_DAYS,
  monthsLabels = MONTHS,
  placeholderRangeLabels = PLACEHOLDER_RANGE_LABELS,
  onChange,
  maxDate,
  minDate,
  sx,
}) => {
  const today = useMemo(() => new Date(), []);

  const minDateValid = useMemo(
    () => parseOptionalDate(minDate, addYears(today, -10)),
    [minDate, today]
  );
  const maxDateValid = useMemo(
    () => parseOptionalDate(maxDate, addYears(today, 10)),
    [maxDate, today]
  );
  const [intialFirstMonth, initialSecondMonth] = useMemo(
    () =>
      getValidatedMonths(initialDateRange ?? {}, minDateValid, maxDateValid),
    [initialDateRange, maxDateValid, minDateValid]
  );

  const [dateRange, setDateRange] = useState<DateRange>({
    ...initialDateRange,
  });
  const [firstMonth, setFirstMonth] = useState<Date>(intialFirstMonth ?? today);
  const [secondMonth, setSecondMonth] = useState<Date>(
    initialSecondMonth ?? addMonths(firstMonth, 1)
  );

  const { startDate, endDate } = dateRange;

  const setFirstMonthValidated = useCallback(
    (date: Date) => {
      if (isBefore(date, secondMonth)) {
        setFirstMonth(date);
      }
    },
    [secondMonth]
  );

  const setSecondMonthValidated = useCallback(
    (date: Date) => {
      if (isAfter(date, firstMonth)) {
        setSecondMonth(date);
      }
    },
    [firstMonth]
  );

  const setDateRangeValidated = useCallback(
    (range: DateRange) => {
      let { startDate: newStart, endDate: newEnd } = range;
      if (newStart && newEnd) {
        range.startDate = newStart = max([newStart, minDateValid]);
        range.endDate = newEnd = min([newEnd, maxDateValid]);
        setDateRange(range);
        onChange(range);
        setFirstMonth(newStart);
        setSecondMonth(
          isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
        );
      }
    },
    [maxDateValid, minDateValid, onChange]
  );

  const onDayClick = useCallback(
    (day: Date) => {
      if (startDate && !endDate && !isBefore(day, startDate)) {
        const newRange = { startDate, endDate: day };
        onChange(newRange);
        setDateRange(newRange);
      } else {
        setDateRange({ startDate: day, endDate: undefined });
      }
    },
    [endDate, onChange, startDate]
  );

  const onMonthNavigate = useCallback(
    (marker: symbol, action: NavigationAction) => {
      if (marker === MARKERS.FIRST_MONTH) {
        const firstNew = addMonths(firstMonth, action);
        if (isBefore(firstNew, secondMonth)) {
          setFirstMonth(firstNew);
        }
      } else {
        const secondNew = addMonths(secondMonth, action);
        if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
      }
    },
    [firstMonth, secondMonth]
  );

  return open ? (
    <Menu
      sx={sx}
      monthsLabels={monthsLabels}
      weekDaysLabels={weekDaysLabels}
      placeholderRangeLabels={placeholderRangeLabels}
      dateFormat={dateFormat}
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      onDayClick={onDayClick}
      onMonthNavigate={onMonthNavigate}
      ranges={definedRanges}
    />
  ) : null;
};
