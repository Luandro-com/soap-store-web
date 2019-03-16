import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import SUBSCRIBE from '../queries/subscribe.gql'
import Button from './Button'
import Input from './Input'
import colors from '../lib/colors'
import validateEmail from '../lib/validateEmail'

export default class Subscribe extends Component {
  state = {
    input: ''
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
      subscribed: false,
    })
  }
  subscribed = () => {
    this.setState({
      subscribed: true
    })
  }
  render() {
    const { input, subscribed } = this.state
    return (
      <Mutation
        mutation={SUBSCRIBE}
        update={(cache, { data }) => {
          if(data.subscribe) {
            this.subscribed()
          }
        }}
      >
        {((subscribe, { error }) => (
          <div className="container">
            <hr />
            <h2>Newsletter</h2>
            <form>
              <Input type="email" disabled={subscribed} width={'350px'} value={input} onChange={this.handleChange}/>
              {!subscribed && <Button onClick={(e) => {
                e.preventDefault()
                const valid = validateEmail(input)
                if (valid) subscribe({ variables: { email: input }})
              }}>Inscrever</Button>}
              {subscribed && <Button style={{ background: colors.color3 }}>Inscrito</Button>}
              {error && <span>{error}</span>}
            </form>
            <hr />
            <style jsx>{`
            .container {
              margin: 0 auto;
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
  }
}