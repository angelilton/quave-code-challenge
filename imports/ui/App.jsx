import React, { useState, useCallback, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TEXTS } from '../infra/constants'
import { People } from '../api/people'
import { Communities } from '../api/communities'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import moment from 'moment'

export const App = () => {
  const [event, setEvent] = useState('')
  const [checkedIn, setCheckedIn] = useState(null)
  const [notCheckedIn, setNotCheckedIn] = useState(null)

  // fetch data from mongoDB collection Communities/People
  const communities = useTracker(() => Communities.find({}).fetch())
  const people = useTracker(() => People.find({ communityId: event }).fetch())

  //componentDidUpdate, so rendering ever the variable(event) is changed.
  useEffect(() => {
    handleCheckedIn()
    handleNotCheckedIn()
  }, [event])

  //handle with select onChange value
  const handleOnChangeSelect = (e) => {
    setEvent(e.target.value)
  }

  // set check-In with date
  const onCheckInClick = (_id) => {
    People.update(_id, {
      $set: {
        checkIn: Date.now()
      }
    })
    setCheckedIn(checkedIn + 1)
    setNotCheckedIn(notCheckedIn - 1)
  }

  // set check-out with date
  const onCheckOutClick = (_id) => {
    People.update(_id, {
      $set: {
        checkOut: Date.now()
      }
    })
    setCheckedIn(checkedIn - 1)
  }

  // filter how many people in the event right now
  const handleCheckedIn = () => {
    const filterCheckInTrue = people
      .map(({ checkIn }) => Boolean(checkIn))
      .filter(Boolean).length

    const filterCheckoutTrue = people
      .map(({ checkOut }) => Boolean(checkOut))
      .filter(Boolean).length

    setCheckedIn(filterCheckInTrue - filterCheckoutTrue)
  }

  // filter how many People not checked-in
  const handleNotCheckedIn = () => {
    const filterNotCheckedIn = people
      .map(({ checkIn }) => Boolean(checkIn))
      .filter((c) => c === false).length
    setNotCheckedIn(filterNotCheckedIn)
  }

  console.log('checked:', checkedIn)

  return (
    <Container>
      <Row className="header">
        <h1 className="display-4">{TEXTS.HOME_TITLE}</h1>
      </Row>

      <Container>
        <Row>
          <select
            onChange={handleOnChangeSelect}
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

      <Container className="event-info">
        <Row>
          <Col sm className="in-event">
            <h4>right now:</h4>
            <h2>{checkedIn}</h2>
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
            <h2>{notCheckedIn}</h2>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Position</th>
                <th>Check-in</th>
                <th>check-out</th>
              </tr>
            </thead>
            <tbody>
              {people.map(
                ({
                  _id,
                  firstName,
                  lastName,
                  title,
                  companyName,
                  checkIn,
                  checkOut
                }) => (
                  <tr key={_id}>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>{companyName}</td>
                    <td>{title}</td>
                    <td>
                      {!!checkIn ? (
                        <p>{`${formatDate(checkIn)}`}</p>
                      ) : (
                        <Button onClick={() => onCheckInClick(_id)}>
                          Check-in
                        </Button>
                      )}
                    </td>
                    <td>
                      {!!checkOut ? (
                        <p>{`${formatDate(checkOut)}`}</p>
                      ) : (
                        <Button
                          disabled={!checkIn}
                          onClick={() => onCheckOutClick(_id)}
                        >
                          Check-out
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Container>
  )
}

// format date using moment.js
const formatDate = (date) => {
  return moment(date).format('MM/DD/YYYY, HH:mm')
}
