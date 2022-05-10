import React from 'react';
import RInputMask from 'react-number-format';
import { Controller } from 'react-hook-form';

import styles from './Input.module.scss';

export const InputMask = (props) => {
  const {
    inputRef,
    label,
    id,
    touched,
    error,
    name,
    mask,
    format,
    maskChar,
    onChange,
    control,
    type,
    disabled,
    iconRight,
    ...other
  } = props;

  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <Controller
        render={({ field: ControllerField }) => {
          const {
            onBlur: ControllerOnBlur,
            onChange: ControllerOnChange,
            value: ControllerValue,
            name: ControllerName,
            ...ControllerRef
          } = ControllerField;
          return (
            <div {...ControllerRef} tabIndex={'0'}>
              <RInputMask
                value={ControllerValue}
                onBlur={ControllerOnBlur}
                autoComplete={type}
                data-testid={name}
                disabled={disabled}
                name={name}
                getInputRef={inputRef}
                format={format}
                mask={mask}
                maskchar={maskChar}
                onChange={(event) => {
                  ControllerOnChange(event);
                  if (onChange) onChange(event);
                }}
                {...other}
              />
              <div>{iconRight}</div>
            </div>
          );
        }}
        name={name}
        control={control}
        {...other}
      />
      {error ? (
        <span data-testid={'error.' + name} style={{ color: 'red' }}>
          {error.message}
        </span>
      ) : null}
    </div>
  );
};

export default InputMask;
