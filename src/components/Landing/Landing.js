import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import Board from '../Board/Board'
import Sidebar from '../Sidebar/Sidebar'
import Experience from '../Experience/Experience'
// import OpeningsCreate from './components/Openings/OpeningsCreate'
import './Landing.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <div className='rightDiv mr-2'>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </div>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#openings">Beginner</Nav.Link>
    <Nav.Link href="#create-opening">Experienced</Nav.Link>
    <Nav.Link href="#advanced">Advanced</Nav.Link>
  </Fragment>
)

const Landing = ({ user }) => (
  <div className="contents">
    <Board />
    <Experience />
    <Sidebar />
    <alwaysOptions/>
    <authenticatedOptions/>
    <unauthenticatedOptions/>
  </div>
)

export default Landing
