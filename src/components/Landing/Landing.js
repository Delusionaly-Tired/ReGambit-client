import React from 'react'
// import Navbar from 'react-bootstrap/Navbar'
import Board from '../Board/Board'
import Sidebar from '../Sidebar/Sidebar'
import Experience from '../Experience/Experience'
// import OpeningsCreate from './components/Openings/OpeningsCreate'
import './Landing.scss'

const Landing = ({ user }) => (
  <div className="contents">

    <Board />
    <Experience />
    <Sidebar />
  </div>
)

export default Landing
