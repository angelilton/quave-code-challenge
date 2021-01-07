import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TEXTS } from '../infra/constants'
import { People } from '../api/people'
import { Communities } from '../api/communities'
import Events from './Events'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'

export const App = () => {
  const communities = useTracker(() => Communities.find({}).fetch())
  const people = useTracker(() => People.find({}).fetch())

  // show first and last name
  const fullName = people.map(
    ({ firstName, lastName }) => `${firstName} ${lastName}`
  )

  return (
    <Container>
      <Row className="header">
        <h1 className="display-4">{TEXTS.HOME_TITLE}</h1>
      </Row>

      <Events communities={communities} />

      <Container className="event-info">
        <Row>
          <Col sm className="in-event">
            <h4>right now:</h4>
            <h2>10</h2>
          </Col>

          <Col sm className="company">
            <h4>Company</h4>
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
            <h2>200</h2>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Table>
            <thead>
              <th>Name</th>
              <th>Company</th>
              <th>Position</th>
              <th>Check-in</th>
              <th>check-out</th>
            </thead>
            <tbody>
              <tr>
                <td>Ted Gonzalez</td>
                <td>Engineer</td>
                <td>Propeller Heads</td>
                <td>
                  <Button>Check-in</Button>
                </td>
                <td>
                  <Button disabled>Check-out</Button>
                </td>
              </tr>
              <tr>
                <td>angelilton epifanio</td>
                <td>Developer</td>
                <td>quave</td>
                <td>
                  <Button>Check-in</Button>
                </td>
                <td>
                  <Button disabled>Check-out</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </Container>
  )
}
