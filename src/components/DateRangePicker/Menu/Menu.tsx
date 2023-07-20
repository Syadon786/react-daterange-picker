import React, { FC, useMemo } from 'react';
import { format, differenceInCalendarMonths } from 'date-fns';

import { Theme } from '@mui/material/styles';
import { Paper, Grid, Typography, Divider, Box } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';

import { Month, DefinedRanges } from 'components';
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
  SxProp,
  WeekDaysLabels,
  MonthsLabels,
  RangeLabels,
} from 'models';
import { MARKERS, mergeSx } from 'utils';

const styles = {
  root: {
    '&.MuiPaper-root': {
      display: 'inline-block',
    },
  },
  rootGrid: {
    wrap: 'nowrap',
  },
  monthGrid: {
    justifyContent: 'center',
    wrap: 'nowrap',
    p: 0.5,
  },
  header: {
    p: '20px 70px',
    alignItems: 'center',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: (theme: Theme) => ({
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    mb: 2.5,
  }),
};

interface MenuProps extends SxProp {
  dateRange: DateRange;
  weekDaysLabels: WeekDaysLabels;
  monthsLabels: MonthsLabels;
  placeholderRangeLabels: RangeLabels;
  dateFormat: string;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  onDayClick: (day: Date) => void;
  onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
}

export const Menu: FC<MenuProps> = ({
  ranges,
  dateFormat,
  monthsLabels,
  weekDaysLabels,
  placeholderRangeLabels,
  dateRange,
  minDate,
  maxDate,
  firstMonth,
  setFirstMonth,
  secondMonth,
  setSecondMonth,
  setDateRange,
  onDayClick,
  onMonthNavigate,
  sx,
}) => {
  const { startDate, endDate } = dateRange;
  const canNavigateCloser = useMemo(
    () => differenceInCalendarMonths(secondMonth, firstMonth) >= 2,
    [firstMonth, secondMonth]
  );
  return (
    <Paper elevation={5} square sx={mergeSx(styles.root, sx)}>
      <Grid container sx={styles.rootGrid}>
        <Grid>
          <Grid container sx={styles.header}>
            <Grid item sx={styles.headerItem}>
              <Typography variant="subtitle1">
                {startDate
                  ? format(startDate, dateFormat)
                  : placeholderRangeLabels.startOfRangeLabel}
              </Typography>
            </Grid>
            <Grid item sx={styles.headerItem}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item sx={styles.headerItem}>
              <Typography variant="subtitle1">
                {endDate
                  ? format(endDate, dateFormat)
                  : placeholderRangeLabels.endOfRangeLabel}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={styles.monthGrid}>
            <Month
              dateRange={dateRange}
              dateFormat={dateFormat}
              monthsLabels={monthsLabels}
              weekDaysLabels={weekDaysLabels}
              maxDate={maxDate}
              minDate={minDate}
              onDayClick={onDayClick}
              onMonthNavigate={onMonthNavigate}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <Box sx={styles.divider} />
            <Month
              dateRange={dateRange}
              dateFormat={dateFormat}
              monthsLabels={monthsLabels}
              weekDaysLabels={weekDaysLabels}
              maxDate={maxDate}
              minDate={minDate}
              onDayClick={onDayClick}
              onMonthNavigate={onMonthNavigate}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <Box sx={styles.divider} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
