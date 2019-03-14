import Link from 'next/link'
import { Query } from 'react-apollo'

import Error from './Error'
import Loading from './Loading'
import Button from './Button'
import PRODUCT_BY_ID from '../queries/productById.gql'
import Price from './Price'

export default ({ product, quantity }) => (
  <Query query={PRODUCT_BY_ID} variables={{ id: product }}>
    {({ data, loading, error }) => {
      // const { } = data
      if (error) return <Error />
      if (loading) return <Loading />
      console.log('DATA', data)
      if (data) {
        const { name, image, price, slug } = data.product
        return (
          <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
            <article>
              <img src={image} />
              <h2>{name}</h2>
              <h3>{quantity}</h3>
              <Price value={price * quantity} />
              <style jsx>{`
                article {
                  border-top: 1px solid rgba(0,0,0,.4);
                  padding-top: 15px;
                  display: flex;
                  flex-flow: row nowrap;
                  justify-content: space-around;
                  align-items: center;
                }
                img {
                  width: 80px;
                  height: auto;
                }
              `}</style>
            </article>
          </Link>
        )
      }
    }}
  </Query>
)