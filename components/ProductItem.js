import Button from './Button'

export default ({ id, image, name}) => (
  <article>
    <img src={image} />
    <h2>{name}</h2>
    <Button to={`/p/${id}`}>Mais informações</Button>
    <style jsx>{`
      article {
        width: 30%;
        padding: 20px 0;
      }
      img {
        max-width: 100%;
      }
      h2 {
        font-weight: 100;
        font-family: 'proxima-nova', sans-serif;
        font-size: 1.2em;
      }
    `}</style>
  </article>
)