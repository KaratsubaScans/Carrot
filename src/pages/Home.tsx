import React from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Home | Carrot Reader</title>
        </Helmet>

        <div className="h-28"></div>
        <h1 className="heading">Home</h1>
        This is still in beta. Here are the current links that are usable:
        <div className="flex flex-col w-44">
          <Link className="header" to="/read/girls_last_tour/1/1">Girl&#39;s Last Tour</Link>
          <Link className="header" to="/read/mob_psycho/1/1">Mob Psycho</Link>
        </div>
      </div>
    )
  }
}