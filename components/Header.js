import Link from 'next/link'
import { withRouter } from 'next/router'
import { logout } from '../lib/auth'
import { Query } from 'react-apollo'
import Loading from './Loading'
import colors from '../lib/colors'
import PRODUCT_CATEGORIES from '../queries/productCategories.gql'

const Header = ({ router: { pathname }, user, content }) => (
  <Query query={PRODUCT_CATEGORIES}>
      {({ data, loading, error }) => (
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
        <nav>
          {/* <Link prefetch href='/'>
            <a className={pathname === '/' ? 'is-active' : ''}>Início</a>
          </Link> */}
          {(data && data.productCategories) && data.productCategories.map(i => <div key={i.id}>
            <div className="category">
              <a>{i.name}</a>
              <div className="menu">
                <a href={`/${i.name}`}>Todos</a>
                {i.subCategories.map(sub => <a key={sub} href={`/${sub}`}>{sub}</a>)}
              </div>
            </div>
            
          </div>)}
          {/* <Link prefetch href='/about'>
            <a className={pathname === '/about' ? 'is-active' : ''}>Sobre</a>
          </Link> */}
          {/* <Link prefetch href='/archive'>
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
            padding: 30px 0;
            max-width: 70%;
          }
          .logo img {
            width: 37%;
            // height: 100%;
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
            font-size: 16px;
            text-decoration: none;
          }
          .is-active {
            font-weigth: 900;
          }
          .menu {
            position: absolute;
            display: flex;
            top: -300px;
            flex-flow: column;
            text-align: left;
            width: 100%;
            background: white;
            padding: 0 15px 5px 0;
          }
          .menu a {
            color: ${colors.color3};
            margin: 5px 0;
          }
          .category:hover .menu {
            top: inherit;
          }
          .menu *:hover {
            top: inherit;
          }
        `}</style>
      </header>
    )}
  </Query>
)

export default withRouter(Header)
