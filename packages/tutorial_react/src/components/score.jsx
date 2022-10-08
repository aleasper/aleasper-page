import React from 'react';
import './style.css';

class Score extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div 
            className="score"
        >
            {this.props.text}
        </div>
      );
    }
}

export default Score