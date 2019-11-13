import { ApolloServer, gql } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs, mergeType } from 'graphql-toolkit'
import connectDB from '../../lib/mongoose'

import { habitsResolvers } from '../../api/habits/resolvers'
import { habitsMutations } from '../../api/habits/mutations'
import Habits from '../../api/habits/Habits.graphql'

const resolvers = mergeResolvers([habitsResolvers, habitsMutations])

const typeDefs = mergeTypeDefs([Habits])

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = apolloServer.createHandler({ path: '/api/graphql' })
export default connectDB(server)
