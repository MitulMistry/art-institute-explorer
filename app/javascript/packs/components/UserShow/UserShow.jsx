import React from 'react';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class UserShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch User via API call
    const { fetchUser, userId } = this.props;
    fetchUser(userId);
  }

  render() {
    const { userShow, userId } = this.props;

    if (userShow && userShow.id == userId) {
      return (
        <div className="user-show">
          <h1>{userShow.username}</h1>
          <p>{userShow.bio}</p>
        </div>
      );
    } else {
      return (
        <div className="user-show">
          <LoadingSpinner />
        </div>
      );
    }
  }
}