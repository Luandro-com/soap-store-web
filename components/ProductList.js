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
          }
        `}</style>
      </section>
    )}
  </Query>
)