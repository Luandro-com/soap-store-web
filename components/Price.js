export default ({ value, className, style }) => {
  const string = value.toString()
  const len = string.split('').length
  const a = string.substring(0, len - 2)
  const b = string.slice(-2)
  return <span className={className} style={style}>R${a},{b}</span>
}