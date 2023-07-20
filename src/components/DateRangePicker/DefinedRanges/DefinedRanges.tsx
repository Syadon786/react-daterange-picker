import React, { FC, useCallback } from 'react';
import { isSameDay } from 'date-fns';

import { List, ListItemButton, ListItemText } from '@mui/material';

import { DefinedRange, DateRange, SxProp } from 'models';

interface DefinedRangesProps extends SxProp {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
}

const styles = {
  sameRange: {
    fontWeight: 'bold',
  },
  notSameRange: {
    fontWeight: 'normal',
  },
};

export const DefinedRanges: FC<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
  sx,
}) => {
  const isSameRange = useCallback(
    (
      { startDate: firstStartDate, endDate: firstEndDate }: DateRange,
      { startDate: secondStartDate, endDate: secondEndDate }: DateRange
    ) =>
      firstStartDate && secondStartDate && firstEndDate && secondEndDate
        ? isSameDay(firstStartDate, secondStartDate) &&
          isSameDay(firstEndDate, secondEndDate)
        : false,
    []
  );

  return (
    <List sx={sx}>
      {ranges.map((range, index) => (
        <ListItemButton key={index} onClick={() => setRange(range)}>
          <ListItemText
            primaryTypographyProps={{
              variant: 'body2',
              sx: {
                ...(isSameRange(range, selectedRange)
                  ? styles.sameRange
                  : styles.notSameRange),
              },
            }}
          >
            {range.label}
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};
