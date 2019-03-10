import Router from 'next/router'
import colors from '../lib/colors'

const Button = ({ children, to, color }) => (
  <span>
     <button
      className=".btn"
      onClick={(e) => {
        e.preventDefault()
        if (to) {
          Router.push(to)
        }
      }}
    >
      {children}
    </button>
    <style jsx>{`
      button, .btn{
        color: white;
        text-decoration: none;
        background-color: ${color ? colors[color] : colors.color5};  /* change button color here */
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
        border: 0px;
        outline: none;
        display: inline-block;
        padding: 8px 22px;
        margin-bottom: 0;
        font-size: 15px;
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
      background-color: ${colors.color5};  /* change button color here */
      }

      input[type='submit']:active, button:active, .btn:active{
      background-color: ${colors.color5};  /* change button color here */
      border: 0px;
      -webkit-box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
      box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
      }
    `}</style>
  </span>
)

export default Button