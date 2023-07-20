import React, { FC } from 'react';
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from 'date-fns';

import { Paper, Grid, Typography } from '@mui/material';

import { Header, Day } from 'components';
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
  mergeSx,
} from 'utils';
import {
  NavigationAction,
  DateRange,
  SxProp,
  MonthsLabels,
  WeekDaysLabels,
} from 'models';

const styles = {
  root: {
    maxWidth: '290px',
  },
  weekDaysContainer: {
    mt: 1.25,
    px: 3.75,
    justifyContent: 'space-between',
  },
  daysContainer: {
    px: 1.875,
    mt: 1.875,
    mb: 2.5,
    gap: 0.1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  dayContainer: {
    justifyContent: 'center',
  },
};

interface MonthProps extends SxProp {
  value: Date;
  monthsLabels: MonthsLabels;
  weekDaysLabels: WeekDaysLabels;
  dateFormat: string;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  onDayClick: (day: Date) => void;
  onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
}

export const Month: FC<MonthProps> = ({
  value,
  marker,
  monthsLabels,
  weekDaysLabels,
  dateFormat,
  dateRange,
  minDate,
  maxDate,
  navState,
  setValue,
  onDayClick,
  onMonthNavigate,
  sx,
}) => {
  const [back, forward] = navState;
  return (
    <Paper square elevation={0} sx={mergeSx(styles.root, sx)}>
      <Grid container>
        <Header
          date={value}
          monthsLabels={monthsLabels}
          setDate={setValue}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() => onMonthNavigate(marker, NavigationAction.Next)}
        />

        <Grid item container sx={styles.weekDaysContainer}>
          {weekDaysLabels.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid item container sx={styles.daysContainer}>
          {chunks(getDaysInMonth(value), 7).map((week, index) => (
            <Grid key={index} container sx={styles.dayContainer}>
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day);
                return (
                  <Day
                    key={format(day, dateFormat)}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(value, day) ||
                      !isWithinInterval(day, {
                        start: minDate,
                        end: maxDate,
                      })
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => onDayClick(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};
