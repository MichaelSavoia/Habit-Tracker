import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Event as EventType } from '../generated/types'

const addEventMutation = gql`
  mutation addEvent($date: Date, $habitId: ID) {
    addEvent(date: $date, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`

const removeEventMutation = gql`
  mutation removeEvent($eventId: ID, $habitId: ID) {
    removeEvent(eventId: $eventId, habitId: $habitId) {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`

interface HabitButtonProps {
  date: Date
  habitId: string
  events: EventType[]
}

function HabitButton({ date, habitId, events }: HabitButtonProps) {
  const [addEvent] = useMutation(addEventMutation, {
    refetchQueries: ['getHabits'],
  })
  const [removeEvent] = useMutation(removeEventMutation, {
    refetchQueries: ['getHabits'],
  })

  const foundEvent = events.find(event => {
    const eventDate = new Date(event.date)
    return eventDate.getDate() === date.getDate()
  })

  const handleRemoveEvent = () => {
    removeEvent({
      variables: {
        habitId,
        eventId: foundEvent._id,
      },
    })
  }

  const handleAddEvent = () => {
    addEvent({
      variables: {
        habitId,
        date,
      },
    })
  }

  return (
    <span>
      {date.getMonth() + 1}/{date.getDate()}
      {!!foundEvent ? (
        <button onClick={() => handleRemoveEvent()}>✅</button>
      ) : (
        <button onClick={() => handleAddEvent()}>❌</button>
      )}
      <style jsx>
        {`
          span {
            display: flex;
            flex-direction: column;
          }

          span + span {
            margin-left: 10px;
          }

          button {
            margin-top: 1rem;
            padding: 0.25rem;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}
      </style>
    </span>
  )
}

export default HabitButton
