import Habits from './habits'
import { Habit as HabitType } from '../../generated/types'

export const habitsMutations = {
  Mutation: {
    async addHabit(
      _,
      {
        habit,
      }: {
        habit: HabitType
      }
    ) {
      try {
        const newHabit = await Habits.create({
          ...habit,
        })
        return newHabit
      } catch (e) {
        console.log(e)
      }
    },

    async removeHabit(_, { habitId }: { habitId: string }) {
      try {
        const habbit = await Habits.findOneAndDelete({
          _id: habitId,
        })
        return habbit
      } catch (e) {
        console.log(e)
      }
    },

    async addEvent(_, { habitId, date }: { habitId: string; date: Date }) {
      try {
        date.setHours(0, 0, 0, 0)
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            'events.date': {
              $ne: date,
            },
          },
          {
            $addToSet: {
              events: {
                date,
              },
            },
          }
        )
        return habit
      } catch (e) {
        console.log(e)
      }
    },

    async removeEvent(
      _,
      { habitId, eventId }: { habitId: string; eventId: string }
    ) {
      try {
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
          },
          {
            $pull: {
              events: {
                _id: eventId,
              },
            },
          }
        )
        return habit
      } catch (e) {
        console.log(e)
      }
    },
  },
}
