import Link from 'next/link'
import { withRouter } from 'next/router'
import { logout } from '../lib/auth'
import { ApolloConsumer } from 'react-apollo'
import Loading from './Loading'
import colors from '../lib/colors'

const Header = ({ router: { pathname }, user, content }) => (
  <ApolloConsumer>
    { client => (
      <header>
        <Link prefetch href='/'>
          <div className="logo">
            {(content && content.title) && <h1 className={content.logo ? 'hidden' : ''}>{content.title}</h1>}
            {(content && content.logo) && <img src={content.logo} />}
          </div>
        </Link>
        <div className="user">
          {(user === 'loading') && <Loading />}
          {(!user || user === 'error') &&
            <Link prefetch href='/login'>
              <a className={pathname === '/login' ? 'is-active' : ''}>Login</a>
            </Link>
          }
          {(user && user !== 'loading' && user !== 'error') && <a onClick={() => logout(client)} href=''>Logout</a>}
        </div>
        <hr />
        <nav>
          <Link prefetch href='/'>
            <a className={pathname === '/' ? 'is-active' : ''}>Início</a>
          </Link>
          {/* <Link prefetch href='/about'>
            <a className={pathname === '/about' ? 'is-active' : ''}>Sobre</a>
          </Link>
          <Link prefetch href='/archive'>
            <a className={pathname === '/archive' ? 'is-active' : ''}>Edições</a>
          </Link>
          <Link prefetch href='/submit'>
            <a className={pathname === '/submit' ? 'is-active' : ''}>Submissões</a>
          </Link> */}
        </nav>
        
        <style jsx>{`
          header {
            width: 100%;
            text-align: center;
            margin: 0 auto;
            margin-bottom: 55px;
          }
          header h1 {
            cursor: pointer;
          }
          .hidden {
            visibility: hidden;
            margin-top: -100px;
          }
          .logo {
            text-align: center;
            margin: 0 auto;
            padding: 10px 0;
            max-width: 60%;
            height: 150px;
          }
          .logo img {
            max-width: 70%;
            max-height: 100%;
          }
          hr {
            max-width: 948px;
            color: ${colors.color3};
          }
          .user {
            position: absolute;
            top: 30px;
            right: 30px;

          }
          nav {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-flow: row no-wrap;
            align-items: center;
            justify-content: space-around;
          }
          a {
            font-size: 14px;
            margin-right: 15px;
            text-decoration: none;
          }
          .is-active {
            text-decoration: underline;
          }
        `}</style>
      </header>
    )}
  </ApolloConsumer>
)

export default withRouter(Header)
