import React from 'react'
import moment from 'moment'
import { Button, Container, Row, Table } from 'react-bootstrap'

// format date using moment.js
const formatDate = (date) => {
  return moment(date).format('MM/DD/YYYY, HH:mm')
}

const PeopleList = ({ people, onCheckInClick, onCheckOutClick }) => (
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
)

export default PeopleList
