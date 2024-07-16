import type { SyntheticEvent } from 'react';
import React, { forwardRef } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker styles

interface DatePickerInputProps extends Omit<ReactDatePickerProps, 'onChange'> {
  onChange: (
    date: Date | null,
    event: SyntheticEvent<HTMLDivElement> | undefined,
  ) => void;
  className?: string;
}

const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
  (props, ref) => {
    const { selected, onChange, className, ...rest } = props;
    return (
      <div
        className={`${className} w-full relative flex flex-col items-start gap-2`}
        ref={ref}
      >
        <DatePicker
          className="form-input appearance-none block w-full px-2.5 py-1 text-sm font-body text-gray-950 bg-white border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-input--resting dark:text-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          selected={selected}
          wrapperClassName="relative"
          {...rest}
        />
      </div>
    );
  },
);
DatePickerInput.displayName = 'DatePickerInput';

export { DatePickerInput };
