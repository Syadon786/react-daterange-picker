export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export type Setter<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1,
}

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

export interface RangeLabels {
  startOfRangeLabel: string;
  endOfRangeLabel: string;
}

export type WeekDaysLabels = [
  string,
  string,
  string,
  string,
  string,
  string,
  string
];
export type MonthsLabels = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];
