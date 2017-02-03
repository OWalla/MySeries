import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ShowListRow = ({show}) => {
  return (
    <div className="column is-2">
      <div className="panel">
        <p className="is-marginless"><img src={show.image}/></p>
        <div className="panel-block">
          {show.name}
        </div>
      </div>
    </div>
  );
};

ShowListRow.propTypes = {
  show: PropTypes.object.isRequired
};

export default ShowListRow;
