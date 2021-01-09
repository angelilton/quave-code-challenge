import React, { useState, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TEXTS } from '../infra/constants'
import { People } from '../api/people'
import { Communities } from '../api/communities'
import { Container, Row } from 'react-bootstrap'
import SelectEvents from './Select-events.jsx'
import PeopleList from './People-list'
import EventInfo from './Event-info'

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
    filterCompanyName()
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

  //filter how many company
  const filterCompanyName = () => {
    const filterCompany = people
      .map(({ companyName }) => companyName)
      .filter((c) => {
        if (c) {
          return c
        }
        return
      })
      .filter((c) => c === c)

    console.log(
      'company:',
      filterCompany.reduce(
        (contador, elem) =>
          Object.assign(contador, { [elem]: (contador[elem] || 0) + 1 }),
        {}
      )
    )
  }

  return (
    <Container>
      <Row className="header">
        <h1 className="display-4">{TEXTS.HOME_TITLE}</h1>
      </Row>

      <SelectEvents communities={communities} onChange={handleOnChangeSelect} />

      <EventInfo checkedIn={checkedIn} notCheckedIn={notCheckedIn} />

      <PeopleList
        people={people}
        onCheckInClick={onCheckInClick}
        onCheckOutClick={onCheckOutClick}
      />
    </Container>
  )
}
