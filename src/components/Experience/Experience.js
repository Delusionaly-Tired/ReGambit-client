import React from 'react'
import Nav from 'react-bootstrap/Nav'
// import Sidebar from '../Sidebar/Sidebar'
import './Experience.scss'

// const Experience = () => {
//   const [showSidebar, setShowSidebar] = React.useState(false)
//   const onClick = () => setShowSidebar(true)
//   return (
//     <Fragment>
//       <h3>How knowledgable are you at chess?</h3>
//       <input type="submit" value="I've heard of Chess" onClick={onClick} className="beginner"/>
//       { showSidebar ? <Sidebar /> : null }
//       <Nav.Link href="" onClick={this.handleClick}></Nav.Link>
//     </Fragment>
//   )
// }

const Experience = () => {
  return (
    <div className="questions">
      <h3>How knowledgable are you about chess?</h3>
      <Nav.Link href="#beginner" className="beginner" onClick={this.handleClick}>I&apos;ve heard of Chess</Nav.Link>
      <Nav.Link href="#experienced" className="experienced" onClick={this.handleClick}>I watched all of the Queen&apos;s gambit and understood everything perfectly.</Nav.Link>
      <Nav.Link href="#advanced" className="advanced" onClick={this.handleClick}>Just call me Bobby Fischer</Nav.Link>
    </div>
  )
}

export default Experience
