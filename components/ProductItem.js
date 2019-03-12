import Button from './Button'

export default ({ id, image, name}) => (
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
      }
      .image {
        width: 300px;
        height: 300px;
        // background-size: 300px auto;
        background: rgba(0,0,0,.1);
        background-position: center;
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
        }
      }
    `}</style>
  </article>
)