import Link from 'next/link'
import { Query } from 'react-apollo'

import Error from './Error'
import Loading from './Loading'
import Button from './Button'
import Input from './Input'
import PRODUCT_BY_ID from '../queries/productById.gql'
import Price from './Price'
import Close from './Close'

function isObject(val) {
  return (typeof val === 'object');
}

const Product = ({ name, image, price, slug, quantity }) => (
      <article>
        <Close size={30} color="rgba(0,0,0,.4)" style={{ width: '5%' }} />
        <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
          <a style={{ width: '20%' }}><img src={image} /></a>
        </Link>
        <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
          <a style={{ width: '50%' }}><h2>{name}</h2></a>
        </Link>
        <Input type="number" width='100px' value={quantity} onChange={(e) => console.log('changed', e)} />
        <Price value={price * quantity} style={{ width: '5%' }} />
        <style jsx>{`
          article {
            text-align: left;
            border-top: 1px solid rgba(0,0,0,.4);
            padding-top: 15px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
          }
          h2 {
            font-size: 1em;
          }
        `}</style>
      </article>
)

export default ({ product, quantity }) => {
  if (isObject(product)) {
    return <Product {...product} quantity={quantity} />
  } else {
    return (
      <Query query={PRODUCT_BY_ID} variables={{ id: product }}>
        {({ data, loading, error }) => {
          // const { } = data
          if (error) return <Error />
          if (loading) return <Loading />
          if (data) {
            return <Product {...data.product} quantity={quantity} />
          }
        }}
      </Query>
    )
  }
}