import React, { FC, useCallback } from 'react';
import { setMonth, getMonth, setYear, getYear } from 'date-fns';

import {
  Grid,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { generateYears } from 'utils';
import { MonthsLabels } from 'models';

interface HeaderProps {
  date: Date;
  monthsLabels: MonthsLabels;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const styles = {
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    p: 0.625,
  },
  icon: {
    p: 0.625,
    '&:hover': {
      background: 'none',
    },
  },
};

export const Header: FC<HeaderProps> = ({
  date,
  setDate,
  monthsLabels,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}) => {
  const handleMonthChange = useCallback(
    (event: SelectChangeEvent) => {
      setDate(setMonth(date, parseInt(event.target.value)));
    },
    [date, setDate]
  );

  const handleYearChange = useCallback(
    (event: SelectChangeEvent) => {
      setDate(setYear(date, parseInt(event.target.value)));
    },
    [date, setDate]
  );

  return (
    <Grid container sx={styles.container}>
      <Grid item sx={styles.iconContainer}>
        <IconButton
          sx={styles.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date).toString()}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {monthsLabels.map((month, index) => (
            <MenuItem key={month} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date).toString()}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 10).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item sx={styles.iconContainer}>
        <IconButton
          sx={styles.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
