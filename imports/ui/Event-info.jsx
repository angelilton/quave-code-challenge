import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

const EventInfo = ({ checkedIn, notCheckedIn }) => (
  <Container className="event-info">
    <Row>
      <Col sm className="in-event">
        <h4>right now:</h4>
        <h2>{checkedIn}</h2>
      </Col>

      <Col sm className="company">
        <h4>Companies</h4>
        <ul>
          <li>
            <h6>Green Group: 10 </h6>
          </li>
          <li>
            <h6>Hoppe Group: 5</h6>
          </li>
        </ul>
      </Col>

      <Col sm className="not-CheckedIn">
        <h4>Not checked-in:</h4>
        <h2>{notCheckedIn}</h2>
      </Col>
    </Row>
  </Container>
)

export default EventInfo
