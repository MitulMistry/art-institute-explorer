import React from 'react';

export class Footer extends React.Component {
  render() {
    let currentYear = new Date().getFullYear();

    return (
      <div className="footer">
        <p><a href="https://github.com/MitulMistry/art-institute-explorer">Github repo for this site</a><br />
        &copy; Mitul Mistry { currentYear }</p>
      </div>
    );
  }
}