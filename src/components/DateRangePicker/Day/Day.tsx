import React, { FC } from 'react';

import { Theme } from '@mui/material/styles';
import { IconButton, Typography, Box } from '@mui/material';

import { mergeSx } from 'utils';

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  value: number | string;
}

const styles = {
  leftBorderRadius: {
    borderRadius: '50% 0 0 50%',
  },
  rightBorderRadius: {
    borderRadius: '0 50% 50% 0',
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    '&.MuiIconButton-root': {
      height: '36px',
      width: '36px',
      p: 0,
    },
  },
  buttonText: {
    lineHeight: 1.6,
  },
  outlined: (theme: Theme) => ({
    border: `1px solid ${theme.palette.primary.dark}`,
  }),
  filled: (theme: Theme) => ({
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    backgroundColor: theme.palette.primary.dark,
  }),
  highlighted: (theme: Theme) => ({
    backgroundColor: theme.palette.action.hover,
  }),
  contrast: (theme: Theme) => ({
    color: theme.palette.primary.contrastText,
  }),
};

export const Day: FC<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  value,
  onClick,
}) => (
  <Box
    sx={mergeSx(
      styles.buttonContainer,
      startOfRange ? styles.leftBorderRadius : null,
      endOfRange ? styles.rightBorderRadius : null,
      !disabled && highlighted ? styles.highlighted : null
    )}
  >
    <IconButton
      sx={mergeSx(
        styles.button,
        !disabled && outlined ? styles.outlined : null,
        !disabled && filled ? styles.filled : null
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <Typography
        color={!disabled ? 'initial' : 'textSecondary'}
        sx={(styles.buttonText, !disabled && filled ? styles.contrast : null)}
        variant="body2"
      >
        {value}
      </Typography>
    </IconButton>
  </Box>
);
