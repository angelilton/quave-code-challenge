import React, { useState, useCallback } from 'react'
import { Row } from 'react-bootstrap'

const Events = ({ communities }) => {
  const [event, setEvent] = useState('')

  const handleOnChangeSelect = useCallback(
    (e) => {
      setEvent(e.target.value)
    },
    [event]
  )

  console.log(event)

  return (
    <Row>
      <select
        onChange={handleOnChangeSelect}
        className="custom-select custom-select-lg mb-3"
      >
        <option defaultValue>Select an event</option>
        {communities.map((event) => (
          <option value={event._id}>{event.name}</option>
        ))}
      </select>
    </Row>
  )
}

export default Events
