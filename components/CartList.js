import CartItem from '../components/CartItem'
import Error from '../components/Error'

export default ({ cart, content, user }) => {
  return (
    <div>
      <h1>Cesta</h1>
      {!cart && <Error />}
      {/* {console.log('CART', cart)} */}
      {!cart && <h3>Sem cesta...</h3>}
      {(!user && cart && cart !== 'loading') && cart.map(i => <CartItem key={i.product} product={i.product} quantity={i.quantity} />)}
      {(user && cart && cart !== 'loading') && cart.products.map(i => <CartItem key={i.product.id} product={i.product} quantity={i.quantity} />)}
      {(cart && cart !== 'loading' && cart.length < 1) && <h2>Seu carrinho está vazio</h2>}
      <style jsx>{`
          h1 {
            font-family: 'proxima-nova', sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            padding-bottom: 50px;
          }
          .info {
            display: flex;
            flex-flow: column;
            justify-content: space-between;
          }
          .info > * {
            padding: 15px 0;
          }
          .price {
            color: rgba(0,0,0,.1);
          }
          .quantity {
            font-family: 'proxima-nova', sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            color: rgba(0,0,0,.4);
            font-size: 0.8em;
          }
          @media screen and (min-width: 640px) {
          }
        `}</style>
    </div>
  )
}