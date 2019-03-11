import { Mutation } from 'react-apollo'
import SUBSCRIBE from '../queries/subscribe.gql'
import Button from './Button'
import Input from './Input'

export default () => (
  <Mutation mutation={SUBSCRIBE}>
    {(subscribe => (
      <div className="container">
        <hr />
        <h2>Newsletter</h2>
        <form>
          <Input width={'350px'} />
          <Button>Inscrever</Button>
        </form>
        <hr />
        <style jsx>{`
        .container {
          padding: 50px 0;
          text-align: center;
        }
        h2 {
          font-family: 'proxima-nova', sans-serif;
          font-weight: 500;
          text-transform: uppercase;
        }
        hr {
          margin: 50px auto;
          max-width: 80%;
        }
        `}</style>
      </div>
    ))}
  </Mutation>
)