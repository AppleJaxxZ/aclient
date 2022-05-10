import React from 'react';
import styles from './Button.module.scss';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
const Button = ({
  label,
  id,
  variant,
  isDisabled,
  isLoading = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      id={id}
      disabled={isDisabled || isLoading}
      {...rest}
      className={styles.button}
    >
      {children}
      {isLoading ? (
        <LoadSpinner height={'25px'} style={{ marginLeft: '10px' }} />
      ) : null}
    </button>
  );
};

export default Button;
