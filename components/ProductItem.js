import Link from 'next/link'
import Button from './Button'

export default ({ id, image, name, slug }) => (
  <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
    <article>
      <div className="image" style={{ backgroundImage: `url(${image})`}} />
      <h2>{name}</h2>
      <Button to={`/p/${id}`}>Informações</Button>
      <style jsx>{`
        article {
          margin: 0 auto;
          padding: 20px 0;
          height: 440px;
          width: 300px;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          cursor: pointer;
        }
        .image {
          width: 300px;
          height: 300px;
          background-size: cover;
          background-blend-mode: hue;
          background: rgba(0,0,0,.1);
          background-position: 50% 50%;
          transition: .3s ease-in-out;
        }
        .image:hover {
          background-position: 55% 50%;
          background-blend-mode: initial;
        }
        h2 {
          font-weight: 900;
          color: rgba(0,0,0,0.6);
          font-family: 'proxima-nova', sans-serif;
          font-size: 1.2em;
        }
        @media screen and (min-width: 640px) {
          article {
          }
        }
        @media screen and (min-width: 940px) {
          article {
            padding: 40px 30px;
          }
        }
      `}</style>
    </article>
  </Link>
)