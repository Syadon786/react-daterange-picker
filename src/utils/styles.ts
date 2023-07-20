import type { SxProps, Theme } from '@mui/material/styles';

import { arrayify } from 'utils';

export const mergeSx = (...sx: (SxProps<Theme> | null | undefined)[]) =>
  sx
    .map((style) => [...arrayify<SxProps<Theme>>(style)])
    .flat() as SxProps<Theme>;
