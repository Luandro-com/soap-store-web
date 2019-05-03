function isInt(n) {
  return n % 1 === 0;
}

export default ({ value, className, style }) => {
  if (value === 0) return <span className={className} style={style}>R$0</span>
  else if (value) {
    let parsed = value
    if (!isInt(value)) {
      const splitValue = value.toString().split('.')
      if (splitValue[1].length < 2) {
        parsed = parseInt(splitValue.join('')+'0')
      } else {
        parsed = parseInt(splitValue.join(''))
      }
    }
    const string = parsed.toString()
    const len = string.split('').length
    const a = string.substring(0, len - 2)
    const b = string.slice(-2)
    return <span className={className} style={style}>R${a},{b}</span>
  }
}