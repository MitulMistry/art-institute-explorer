import React from 'react';

export const ErrorsList = ({ errorsArray }) => (
  <div className="errors-list">
    <ul>
      {errorsArray.map((error, i) => (
        <li key={`error-${i}`}>{error}</li>
      ))}
    </ul>
  </div>
);