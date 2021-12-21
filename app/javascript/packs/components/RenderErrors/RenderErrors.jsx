import React from 'react';

// Errors are received as an object with error groups as keys and arrays of errors
// as values. This component will turn this structure into an unordered list of errors.
export class RenderErrors extends React.Component {
  render() {
    const { errors } = this.props;

    let errorsList = null;

    if (Object.keys(errors).length > 0 ) {
      let errorsArray = [];
      for (const errorGroup in errors) {
        errors[errorGroup].forEach(error => errorsArray.push(`${errorGroup}: ${error}`));
      }

      errorsList = (
        <div className="errors-list">
          <ul>
            {errorsArray.map((error, i) => (
              <li key={`error-${i}`}>{error}</li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      errorsList
    );
  }
}
