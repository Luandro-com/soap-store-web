import { Query } from 'react-apollo'
import PRODUCTS from '../queries/products.gql'
import ProductItem from './ProductItem'

export default () => (
  <Query query={PRODUCTS}>
    {({ error, loading, data, client }) => (
      <section>
        {(data && data.products) && data.products.map(product => <ProductItem key={product.id} {...product} />)}
        <style jsx>{`
          section {
            display: flex;
            flex-flow: row wrap;
            align-items: flex-start;
            justify-content: flex-start;
            align-content: flex-start;
          }
        `}</style>
      </section>
    )}
  </Query>
)