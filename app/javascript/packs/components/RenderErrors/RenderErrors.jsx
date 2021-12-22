import React from 'react';
import { ErrorsList } from './ErrorsList';

// Errors are received as an object with error groups as keys and arrays of errors
// as values. This component will turn this structure into an unordered list of errors.
export class RenderErrors extends React.Component {
  render() {
    const { errors } = this.props;

    let errorsList = null;

    if (errors && Array.isArray(errors)) {
      errorsList = (
        <ErrorsList
          errorsArray={errors}
        />
      );

    } else if (errors && Object.keys(errors).length > 0 ) {
      let errorsArray = [];

      // Convert object of arrays into single array of error messages
      for (const errorGroup in errors) {
        if (Array.isArray(errors[errorGroup])) {
          errors[errorGroup].forEach(error => errorsArray.push(`${errorGroup}: ${error}`));
        } else {
          errorsArray.push(`${errorGroup}: ${errors[errorGroup]}`);
        }
      }

      errorsList = (
        <ErrorsList
          errorsArray={errorsArray}
        />
      );
    }

    return (
      errorsList
    );
  }
}
