import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Layout from '../components/Layout'
import HabitList from '../components/HabitList'

import { withApollo } from '../lib/apollo'
import HabitForm from '../components/HabitForm'

const Home = () => {
  return (
    <Layout>
      <div className="hero">
        <h1 className="title">Habitual</h1>
        <div className="list">
          <HabitForm />
          <HabitList />
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          padding: 2rem;
        }
        .title {
          margin-top: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 3rem;
          text-transform: uppercase;
          text-align: center;
          font-weight: 300;
        }
        .list {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  )
}

export default withApollo(Home)
