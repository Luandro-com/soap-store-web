import App from '../components/App'
import AppData from '../components/AppData'

export default () => (
  <App>
    <AppData.Consumer>
      {({ user, content }) => (
         <article className="container">
          <div dangerouslySetInnerHTML={{__html: content.description }} />
        </article>
      )}
    </AppData.Consumer>
    <style jsx>{`
      .container {
        max-width: 768px;
        margin: 0 auto;
        padding: 0 0 120px;
      }
    `}</style>
  </App>
)
