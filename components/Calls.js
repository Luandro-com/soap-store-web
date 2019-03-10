import Link from 'next/link'
import colors from '../lib/colors'

const Calls = ({ issues }) => (
  <article>
    <h1>Chamadas</h1>
    {issues.map(issue => (
      <Link href={`/issue?key=${issue.key}`} key={issue.id}>
        <div className="item">
          <div className="square" />
          <div className="due">
            <h4>prazo</h4>
            <h5>{new Date(issue.endCall).toLocaleDateString()}</h5>
          </div>
          <h3>{issue.title}</h3>
        </div>
      </Link>
    ))}
    <style jsx>{`
      .item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center
      }
      .square {
        cursor: pointer;
        height: 25px;
        width: 25px;
        background: ${colors.color3};
      }
      h3 {
        cursor: pointer;
      }
      .due {
        display: flex;
        flex-flow: column;
        align-items: center;
      }
      .due h4 {
        color: ${colors.color5};
        font-size: 1.2em;
        margin: 0 auto;
        text-transform: uppercase;
      }
      .due h5 {
        font-size: 0.7em;
        margin: 0 auto;
        letter-spacing: 0.1px;
      }
    `}</style>
  </article>
)

export default Calls
