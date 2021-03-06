import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ShowListItem = ({show, actionText, action}) => {
  return (
    <div className="column is-2">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {show.name}
          </p>
        </header>
        <div className="card-content is-paddingless">
          <div className="content">
            <figure>
              <Link to={'/show/' + show.id}><img src={show.image}/></Link>
            </figure>
          </div>
        </div>
        <footer className="card-footer has-text-centered">
          {actionText && <a className="card-footer-item" onClick={() => action(show.id)}>{actionText}</a>}
        </footer>
      </div>
    </div>
  );
};

ShowListItem.propTypes = {
  show: PropTypes.object.isRequired,
  actionText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default ShowListItem;
