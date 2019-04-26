import React, { Component } from 'react';

import './ThreeColumnSkeleton.css'

class ThreeColumnSkeleton extends Component {
  render() {
    return (
    <div className='Container'>
      {this.props.children.map((child => (<div className="Column" >{child}</div>)))}
    </div>
    )

  }
}

export default ThreeColumnSkeleton;