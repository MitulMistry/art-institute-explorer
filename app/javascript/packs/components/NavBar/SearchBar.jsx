import React from 'react';
import { Navigate } from 'react-router-dom';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();    
    const search = Object.assign({}, this.state);
    this.props.processForm(search.query);
    this.setState({submitted: true});
  }

  render() {
    // const { fetchArtworksSearch } = this.props;

    let navigate = null;
    if(this.state.submitted) {
      this.setState({submitted: false});
      navigate = (
        <Navigate to={"/artworks/search"} />
      );
    }

    return (
      <form onSubmit={this.handleSubmit} className="search-bar">
        <input type="search" placeholder="Search Artworks" 
          value={this.state.query}
          onChange={this.update('query')}
          className="form-input"
          id="form-search" />
        <button className="btn-primary-small-submit" type="submit">Search</button>
        {navigate}
      </form>
    );
  }
}