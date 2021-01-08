import React from 'react'
import { Container, Row } from 'react-bootstrap'

const SelectEvents = ({ communities, onChange }) => (
  <Container>
    <Row>
      <select
        onChange={onChange}
        className="custom-select custom-select-lg mb-3"
      >
        <option defaultValue>Select an event</option>
        {communities.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>
    </Row>
  </Container>
)

export default SelectEvents
