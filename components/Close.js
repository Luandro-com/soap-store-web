export default ({ style, color, size }) => <a href="#" className="close-button" style={style}>
  <style jsx>{`
    .close-button {
      height: ${size ? size+'px' : '50px'};
      width: ${size ? size+'px' : '50px'};
      position: relative;
      box-sizing: border-box;
      line-height: ${size ? size+'px' : '50px'};
      display: inline-block;
    }
    .close-button:before, .close-button:after {
      transform: rotate(-45deg);
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -5px;
      margin-left: -25px;
      display: block;
      height: 1px;
      width: ${size ? size+'px' : '50px'};
      background-color: ${color ? color : 'black'};
      transition: all 0.25s ease-out;
    }
    .close-button:after {
      transform: rotate(-135deg);
    }
    .close-button:hover:before, .close-button:hover:after {
      transform: rotate(0deg);
    }
  `}</style>
</a>