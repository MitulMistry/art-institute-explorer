import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


export class PaginationButtons extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleNext(e) {
    this.props.processClick(this.props.currentPage + 1);
  }

  handlePrevious(e) {
    this.props.processClick(this.props.currentPage - 1);
  }

  render() {
    const { currentPage, totalPages } = this.props;

    let nextButton = null;
    if (currentPage < totalPages) {
      nextButton = (
        <button className="btn-primary-small-square" onClick={this.handleNext}>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="1x"
            className="btn-interactive"
          />
        </button>
      );
    }
    
    let previousButton = null;
    if (currentPage > 1) {
      previousButton = (
        <button className="btn-primary-small-square" onClick={this.handlePrevious}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="1x"
            className="btn-interactive"
          />
        </button>
      );
    }

    return (
      <span>        
        {previousButton}
        {nextButton}
      </span>
    );
  }
}