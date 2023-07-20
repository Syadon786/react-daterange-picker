import { DateRangePicker } from 'components/DateRangePicker/DateRangePicker';
import { DateRange } from 'models';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const handleChange = (values: DateRange) => {
  console.log(values);
};

root.render(<DateRangePicker open onChange={handleChange} />);
