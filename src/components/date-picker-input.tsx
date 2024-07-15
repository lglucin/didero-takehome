import type { SyntheticEvent } from 'react';
import React, { forwardRef } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';

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
          className="form-input appearance-none block w-full px-2.5 py-0 text-sm font-body text-gray-950 bg-transparent border border-gray-600/20 rounded-lg placeholder-gray-600/60 focus:outline-none focus:ring-0 focus:border-gray-600 shadow-input--resting dark:text-gray-50 dark:border-gray-400/20 dark:focus:border-gray-400 dark:shadow-input--focus--dark"
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
