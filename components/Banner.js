import Link from 'next/link'
import { withRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import colors from '../lib/colors'

const Banner = ({ router: { pathname }, items }) => (
  <article>
    {/* <h1>Em destaque</h1> */}
    <Carousel
      autoplay={true}
      renderBottomRightControls={({ currentSlide, goToSlide }) => {
        return (
          <div className="slideControls">
            {items && items.map((e, key) => (
              <div
                onClick={() => goToSlide(key)}
                key={e.id}
                className={(key === currentSlide) ? 'slideControl selected' : 'slideControl'}
              />
            ))}
          </div>
        )
      }}
      renderCenterLeftControls={({ previousSlide }) => null}
      renderCenterRightControls={({ nextSlide }) => null}
      renderBottomCenterControls={({ currentSlide }) => null}
    >
      {(items && items.length === 0) && <div className="slide">
        <h1>Edições</h1>
      </div>}
      {items && items.map(e => <div key={e.id}><Link href={`/issue?key=${e.key}`}>
        <div className="slide">
          <h1>{e.name}</h1>
        </div>
      </Link></div>)}
    </Carousel>
    <style jsx>{`
      articles {
        margin-botom: 80px;
      }
      .slideControls {
        display: flex;
        flex-flow: row no-wrap;
      }
      .slideControl {
        position: relative;
        bottom: -20px;
        width: 15px;
        height: 15px;
        border: 1px solid ${colors.color4};
        margin: 0 2.5px;
        cursor: pointer;
      }
      .selected {
        background: ${colors.color4};
      }
      .slide {
        width: 100%;
        height: 350px;
        background: rgba(0,0,0,0.1);
      }
      .slide h1 {
        padding: 25px 35px;
      }
    `}</style>
  </article>
)

export default withRouter(Banner)
