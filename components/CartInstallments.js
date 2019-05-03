import Price from './Price'

export default ({ quantity, installmentAmount, installmentOption, handleChange }) => (
  <label>
    <input
      type="radio"
      name={quantity}
      value={quantity}
      checked={parseInt(installmentOption) === quantity}
      onChange={handleChange('installmentOption')}
      className="shipping-radio"
    />
    {quantity}x - <Price value={installmentAmount} />
    <div className="check"></div>
  </label>
)