import React from 'react';
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/read/mob/1/23">Reader</Link>
      </div>
    )
  }
}