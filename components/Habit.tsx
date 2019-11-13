import { MdDelete } from 'react-icons/md'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import HabitButton from './HabitButton'

import { Habit as HabitType } from '../generated/types'

const removeHabitMutation = gql`
  mutation removeHabit($habitId: ID) {
    removeHabit(habitId: $habitId) {
      _id
    }
  }
`

interface HabitProps {
  habit: HabitType
  index: number
}

const colors = ['#718096', '#f56565', '#f6e05e', '#68d391', '#63b3ed']

function Habit({ habit, index }: HabitProps) {
  const [removeHabit] = useMutation(removeHabitMutation, {
    refetchQueries: ['getHabits'],
  })

  const handleRemoveHabit = () => {
    removeHabit({ variables: { habitId: habit._id } })
  }

  const dates = getLast5Days()
  return (
    <article>
      <h3 style={{ borderColor: colors[index % colors.length] }}>
        <button
          className="delete-button"
          onClick={() => {
            handleRemoveHabit()
          }}
        >
          <MdDelete className="delete-icon" />
        </button>{' '}
        {habit.name}
      </h3>
      <div className="buttons">
        {dates.map(date => (
          <HabitButton
            key={date.getTime()}
            date={date}
            events={habit.events}
            habitId={habit._id}
          />
        ))}
      </div>
      <style jsx>
        {`
          article {
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            background: #fff;
            margin-bottom: 1.5rem;
            position: relative;
          }

          .delete-button {
            font-size: 1.25rem;
            border: none;
            background: none;
            position: relative;
            top: 3px;
          }

          .delete-button:hover {
            color: #e53e3e;
          }

          svg {
            position: relative;
            top: 3px;
          }

          h3 {
            margin-top: 0;
            border-bottom: solid 4px;
          }

          .buttons {
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </article>
  )
}

function getLast5Days() {
  const dates = '01234'.split('').map(day => {
    const tempDate = new Date()
    tempDate.setDate(tempDate.getDate() - parseInt(day))
    return tempDate
  })
  return dates
}

export default Habit
