import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const HabitFormMutation = gql`
  mutation addHabit($habit: HabitInput) {
    addHabit(habit: $habit) {
      _id
      name
    }
  }
`

const HabitForm = () => {
  const [habit, setHabit] = useState('')
  const handleSignup = e => {
    e.preventDefault()
    if (!!habit) {
      addHabit({
        variables: {
          habit: {
            name: habit,
          },
        },
      })
      setHabit('')
    }
  }

  const [addHabit] = useMutation(HabitFormMutation, {
    refetchQueries: ['getHabits'],
  })

  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="habit-input">Habit</label>
      <input
        type="text"
        id="habit-input"
        value={habit}
        onChange={e => {
          setHabit(e.target.value)
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="submit-button">Submit</button>
      </div>
      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            padding: 0 20px;
          }

          label {
            font-size: .875rem;
            color #718096;
            margin-bottom: .5rem;
          }

          input {
            border-radius: .5rem;
            border: 1px solid #e2e8f0;
            padding: .5rem 1rem;
            font-size: 1rem;
            color: #4a5568;
            margin-bottom: .5rem;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
          }

          .submit-button {
            border: none;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            border-radius: .25rem;
            background: #48BB78;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(72, 187, 120, 0.2), 0 2px 4px -1px rgba(72, 187, 120, 0.1);
            transition: all 0.2s ease;
          }

          .submit-button:focus, .submit-button:hover {
            background: #38A169;
          }

          .submit-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(56, 161, 105, 0.2), 0 4px 6px -2px rgba(56, 161, 105, 0.09);
          }

          .submit-button:focus {
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
          }

        `}
      </style>
    </form>
  )
}

export default HabitForm
