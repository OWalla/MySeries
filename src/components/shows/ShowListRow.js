import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ShowListRow = ({show}) => {
  return (
    <div className="column is-3">
      <div className="panel">
        <p className="is-marginless"><img src={show.img}/></p>
        <div className="panel-block">
          {show.title}
        </div>
      </div>
    </div>
  );
};

ShowListRow.propTypes = {
  show: PropTypes.object.isRequired
};

export default ShowListRow;
