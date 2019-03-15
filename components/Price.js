export default ({ value, className, style }) => {
  if (value === 0) return <span className={className} style={style}>R$0</span>
  else if (value) {
    const string = value.toString()
    const len = string.split('').length
    const a = string.substring(0, len - 2)
    const b = string.slice(-2)
    return <span className={className} style={style}>R${a},{b}</span>
  }
}