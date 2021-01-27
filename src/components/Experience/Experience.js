import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Sidebar from '../Sidebar/Sidebar'
import './Experience.scss'

const Experience = () => {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const onClick = () => setShowSidebar(true)
  return (
    <Fragment>
      <h3>How knowledgable are you at chess?</h3>
      <input type="submit" value="I've heard of Chess" onClick={onClick} className="beginner"/>
      { showSidebar ? <Sidebar /> : null }
      <Nav.Link href="" onClick={this.handleClick}></Nav.Link>
    </Fragment>
  )
}

export default Experience
