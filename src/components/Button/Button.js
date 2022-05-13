import React from 'react';
import styles from './Button.module.scss';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
const Button = ({
  label,
  id,
  variant,
  isDisabled = false,
  isLoading = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      id={id}
      disabled={isDisabled}
      {...rest}
      className={styles.button}
      style={isDisabled ? { backgroundColor: 'gray' } : {}}
    >
      {children}
      {isLoading ? (
        <LoadSpinner height={'25px'} style={{ marginLeft: '10px' }} />
      ) : null}
    </button>
  );
};

export default Button;
