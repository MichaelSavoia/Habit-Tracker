import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Habit as HabitType } from '../generated/types'

import Habit from './Habit'

const HabitListQuery = gql`
  query getHabits {
    habits {
      _id
      name
      events {
        _id
        date
      }
    }
  }
`

function HabitList() {
  const { data, loading, error } = useQuery(HabitListQuery)

  if (loading) {
    return <section />
  }

  if (error) {
    return <section>Something went wrong: {error}</section>
  }

  const { habits }: { habits: HabitType[] } = data

  return (
    <section>
      <h2>My Habits</h2>
      {habits && habits.length ? (
        habits.map((habit, index) => (
          <Habit key={habit._id} habit={habit} index={index} />
        ))
      ) : (
        <h4>Create a habit to start tracking!</h4>
      )}

      <style jsx>
        {`
          h2 {
            padding: 0 20px;
            color: #2d3748;
            font-weight: 400;
          }

          h4 {
            text-align: center;
            color: #4a5568;
            font-weight: 400;
          }
        `}
      </style>
    </section>
  )
}

export default HabitList
