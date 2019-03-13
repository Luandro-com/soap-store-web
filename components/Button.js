import Router from 'next/router'
import colors from '../lib/colors'

const route = (to, e) => {
  e.preventDefault()
  if (to) {
    Router.push(to)
  }
}

const Button = ({ children, to, color, padding, margin, onClick }) => (
  <span>
     <button
      className=".btn"
      onClick={(e) => {
        to ? route(to, e)
        : onClick(e)
      }}
    >
      {children}
    </button>
    <style jsx>{`
      button, .btn{
        color: ${color || 'black'};
        text-decoration: none;
        background-color: white;  /* change button color here */
        border: 1.5px solid black;
        outline: none;
        display: inline-block;
        padding: ${padding || '12px 22px'};
        margin: ${margin || '0'};
        font-size: 0.7em;
        font-weight: normal;
        letter-spacing: .12rem;
        line-height: 1.428571429;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
      }

      input[type='submit']:hover, button:hover, .btn:hover{
        background-color: black;  /* change button color here */
        color: white;
      }

      input[type='submit']:active, button:active, .btn:active{
        background-color: black;  /* change button color here */
        color: white;
        border: 0px;
        -webkit-box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
        box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
      }
    `}</style>
  </span>
)

export default Button