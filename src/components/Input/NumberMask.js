import React from 'react';
import NumberFormat from 'react-number-format';
import { Controller } from 'react-hook-form';
import styles from './Input.module.scss';

/**
 * Limiting month values based on value and max value
 * @param val = Current value
 * @param max = Max allowed value
 */

const limit = (val, max) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = `0${val}`;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';

      // this can happen when user paste number so resetting the value to max number if it is greater than max value
    } else if (val > max) {
      val = max;
    }
  }
  // return finalized value
  return val;
};

/**
 * Format number based on type of input
 * @param type
 */
const numberFormat = (type) => (val) => {
  if (type.includes('month')) {
    // If type is month, we should not allow more than 12
    return limit(val.slice(0, 2), '12');
  }
  if (type.includes('date')) {
    // If type is date, we should not allow more than 31
    return limit(val.slice(0, 2), '31');
  }
  if (type.includes('year')) {
    // if type is year, allow 4 digits
    return val.slice(0, 4);
  }
  // in other cases just return the value
  return val;
};

/**
 * Mask component for Number inputs
 * @param props
 * @constructor
 */
export const NumberMask = (props) => {
  const {
    inputRef,
    label,
    id,
    touched,
    error,
    name,
    onChange,
    control,
    inputClassname,
    leftIcon = null,
    type,
    ...other
  } = props;

  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <div>
        <Controller
          render={({ field }) => (
            <>
              {leftIcon ? <span>{leftIcon}</span> : null}
              <NumberFormat
                autoComplete={type}
                {...field}
                name={name}
                getInputRef={inputRef}
                format={numberFormat(name)}
                {...other}
              />
            </>
          )}
          name={name}
          control={control}
          {...other}
        />
      </div>
      {error ? <span style={{ color: 'red' }}>{error.message}</span> : null}
    </div>
  );
};

export default NumberMask;
