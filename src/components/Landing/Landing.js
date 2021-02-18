import React from 'react'
import Board from '../Board/Board'
import Sidebar from '../Sidebar/Sidebar'
import Experience from '../Experience/Experience'
import './Landing.scss'

const Landing = ({ user }) => (
  <div className="contents">

    <Board
      position={{ e4: 'wK' }}
    />
    <Experience />
    <Sidebar />
  </div>
)

export default Landing
