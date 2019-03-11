import { withRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import colors from '../lib/colors'

const Banner = ({ router: { pathname }, items }) => (
  <div>
    <Carousel
      autoplay={true}
      renderBottomRightControls={({ currentSlide, goToSlide }) => {
        return (
          <div className="slideControls">
            {items && items.map((e, key) => (
              <div
                onClick={() => goToSlide(key)}
                key={key}
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
      </div>}
      {items && items.map((e, key) => <div key={key}>
        <div className="slide" style={{ backgroundImage: `url(${e})` }} />
      </div>)}
    </Carousel>
    <style jsx>{`
      .slideControls {
        display: flex;
        flex-flow: row no-wrap;
      }
      .slideControl {
        position: relative;
        bottom: 20px;
        right: 20px;
        width: 15px;
        height: 3px;
        border: 1px solid white;
        margin: 0 2.5px;
        cursor: pointer;
      }
      .selected {
        background: white;
      }
      .slide {
        width: 100%;
        height: 400px;
        background-size: cover;
        background: rgba(0,0,0,.1);
        background-position: center;
      }
      .slide h1 {
        padding: 25px 35px;
      }
    `}</style>
  </div>
)

export default withRouter(Banner)
