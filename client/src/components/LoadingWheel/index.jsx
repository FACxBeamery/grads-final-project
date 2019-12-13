import React from 'react';
import styles from './LoadingWheel.module.css';

const LoadingWheel = () => (
  <div id={styles['loader-container']}>
    <div className={styles.loader} />
  </div>
);

export default LoadingWheel;
