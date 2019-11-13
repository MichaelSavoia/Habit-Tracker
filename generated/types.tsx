import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Date custom scalar */
  Date: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Event = {
   __typename?: 'Event',
  _id?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['Date']>,
};

export type Habit = {
   __typename?: 'Habit',
  _id: Scalars['ID'],
  name: Scalars['String'],
  events?: Maybe<Array<Maybe<Event>>>,
};

export type HabitInput = {
  _id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addHabit?: Maybe<Habit>,
  removeHabit?: Maybe<Habit>,
  addEvent?: Maybe<Habit>,
  removeEvent?: Maybe<Habit>,
};


export type MutationAddHabitArgs = {
  habit?: Maybe<HabitInput>
};


export type MutationRemoveHabitArgs = {
  habitId?: Maybe<Scalars['ID']>
};


export type MutationAddEventArgs = {
  habitId?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['Date']>
};


export type MutationRemoveEventArgs = {
  habitId?: Maybe<Scalars['ID']>,
  eventId?: Maybe<Scalars['ID']>
};

export type Query = {
   __typename?: 'Query',
  habits: Array<Maybe<Habit>>,
};



