import React from 'react'

const OpeningsForm = ({ opening, handleSubmit, handleChange }) => (
  <form className="createForm" onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      required
      placeholder='Enter name of opening'
      // this name should line up with the state we want to change
      name='name'
      defaultValue={opening.name}
      onChange={handleChange}
    />
    <label>Type</label>
    <input
      required
      placeholder='Enter opening type'
      // this name should line up with the state we want to change
      name='type'
      defaultValue={opening.type}
      onChange={handleChange}
    />
    <label>Skill</label>
    <input
      required
      placeholder='Enter skill of opening'
      // this name should line up with the state we want to change
      name='skill'
      defaultValue={opening.skill}
      onChange={handleChange}
    />
    <button type='submit' className='submitBtn'>Submit</button>
  </form>
)

export default OpeningsForm
