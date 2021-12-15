import React from 'react';

export class Footer extends React.Component {
  render() {
    let currentYear = new Date().getFullYear();

    return (
      <div className="footer">
        <p>
          Website Copyright &copy; Mitul Mistry { currentYear }<br />
          <a href="https://github.com/MitulMistry/art-institute-explorer">Github repo for this site</a><br />
          Powered by the <a href="https://www.artic.edu/open-access/public-api">AIC API</a> provided by the <a href="https://www.artic.edu/">Art Institute of Chicago</a>
        </p>
      </div>
    );
  }
}