import React from 'react'
import './Sidebar.css'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pgn: 'Welcome to ReGambit',
      openingInfo: 'Try making a move to begin your journey.'
    }
  }

  componentDidMount () {

  }

  render () {
    const { pgn } = this.state
    console.log(pgn)
    return (
      <div className="sidebar">
        <h1>{this.state.pgn}</h1>
        <p>{this.state.openingInfo}</p>
      </div>
    )
  }
}

export default Sidebar
