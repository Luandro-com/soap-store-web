const Input = ({ label, type, width, value, onChange, margin }) => (
  <span className="wrapper">
    <span className="label">{label}</span>
    {(type === 'textarea') && <textarea
      onChange={onChange}
      value={value}
    />}
    {(type !== 'textarea') && <input
      onChange={onChange}
      type={type || "text"}
      value={value}
    />}
    <style jsx>{`
      .wrapper {
        width: ${width || '100%'};
        position: relative;
        margin: 0 15px;
      }
      .label {
        position: absolute;
        top: ${(type === 'textarea') ? '-80px' : '-30px'};
      }
      input [type=file] {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        display: inline-block;
        min-height: 36px;
        width: 100%;
        padding: 8px 12px;
        margin-top: ${5 - (type === 'textarea') ? 80 : 30 }px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -moz-border-radius: 1px;
        -webkit-border-radius: 1px;
        border-radius: 1px;
        font-size: 15px;
        color: #404040;
        outline: none;
      }
      input[type=email], input[type=number], input[type=password], input[type=tel], input[type=text], input[type=url], textarea{
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        display: inline-block;
        min-height: 36px;
        width: 100%;
        padding: 8px 12px;
        margin-top: ${5 - (type === 'textarea') ? 80 : 30 }px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -moz-border-radius: 1px;
        -webkit-border-radius: 1px;
        border-radius: 1px;
        font-size: 15px;
        color: #404040;
        outline: none;
      }

      input[type='submit'], button, .btn{
        color: white;
        text-decoration: none;
        background-color: rgba(0,0,0, .2);  /* change button color here */
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
      background-color: rgba(0,0,0, .3);  /* change button color here */
      }

      input[type='submit']:active, button:active, .btn:active{
        background-color: rgba(0,0,0, .3);  /* change button color here */
        border: 0px;
        -webkit-box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
        box-shadow: inset 0px 2px 2px 2px rgba(0, 0, 0, .15);
      }



    `}</style>
  </span>
)

export default Input