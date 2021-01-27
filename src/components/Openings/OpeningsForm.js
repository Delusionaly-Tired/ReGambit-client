import React from 'react'

const OpeningForm = ({ opening, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      required
      placeholdder='Enter name of opening'
      // this name should line up with the state we want to change
      name='name'
      value={opening.name}
      onChange={handleChange}
    />
    <label>Type</label>
    <input
      required
      placeholdder='Enter opening type'
      // this name should line up with the state we want to change
      name='type'
      value={opening.type}
      onChange={handleChange}
    />
    <label>Skill</label>
    <input
      required
      placeholdder='Enter skill of opening'
      // this name should line up with the state we want to change
      name='skill'
      value={opening.skill}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default OpeningForm
