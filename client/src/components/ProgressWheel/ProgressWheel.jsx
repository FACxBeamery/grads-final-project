// https://codepen.io/bbrady/pen/ozrjKE
import React from 'react';

import PropTypes from 'prop-types';

import styles from './ProgressWheel.module.css';

const ProgressWheel = ({
  strokeWidth,
  sqSize,
  percentage,
  numerator,
  denominator,
}) => {
  // Size of the enclosing square
  // const sqSize = this.props.sqSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Get 0-1 percentage
  const dashOffset = dashArray * (1 - percentage);
  return (
    <svg
      className={styles['svg-box']}
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
    >
      <circle
        className={styles['circle-background']}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={styles['circle-progress']}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className={styles['circle-text']}
        x='50%'
        y='50%'
        dy='.3em'
        textAnchor='middle'
      >
        {`${numerator}/${denominator}`}
      </text>
      <text
        className={styles['circle-text--smaller']}
        x='50%'
        y='65%'
        dy='.3em'
        textAnchor='middle'
      >
        {`respondents`}
      </text>
    </svg>
  );
};

ProgressWheel.propTypes = {
  strokeWidth: PropTypes.string.isRequired,
  sqSize: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
};

export default ProgressWheel;
