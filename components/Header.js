import Link from 'next/link'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import * as Scroll from 'react-scroll'
import { logout } from '../lib/auth'
import colors from '../lib/colors'
import PRODUCT_CATEGORIES from '../queries/productCategories.gql'

const Header = ({ router: { pathname }, user, content }) => (
  <Query query={PRODUCT_CATEGORIES}>
      {({ data, loading, error, client }) => (
      <header>
        <Link prefetch href='/'>
          <div className="logo">
            {(content && content.title) && <h1 className={content.logo ? 'hidden' : ''}>{content.title}</h1>}
            {(content && content.logo) && <img src={content.logo} />}
            {!content && <h1>{process.env.TITLE}</h1>}
          </div>
        </Link>
        <nav className="top-menu">
          <div className="user">
            {(!user || user === 'error' || loading) &&
              <Link prefetch href='/login'>
                <a><img src="/static/profile.svg" /></a>
              </Link>
            }
            {(user && user !== 'loading' && user !== 'error') && <div className="profile-container">
                <a className={pathname === '/profile' ? 'is-active' : ''} className="profile-pic"></a>
                <div className="profile-menu">
                  <a onClick={() => logout(client)} href=''>sair</a>
                  <Link prefetch href='/perfil'><a>{user.email}</a></Link>
                </div>
            </div>}
            <Link prefetch href='/cesta'>
              <a className={pathname === '/cesta' ? 'is-active' : ''}><img src="/static/cesta.svg" /></a>
            </Link>
          </div>
          <div className="left-menu">
            <Link prefetch href='/about'>
              <a>Sobre</a>
            </Link>
            <Scroll.Link to="contact" smooth={true} duration={500}>
              <a style={{ position: 'relative', top: -4}}>Contato</a>
            </Scroll.Link>
          </div>
        </nav>
        <nav className="products-menu">
          {/* <Link prefetch href='/'>
            <a className={pathname === '/' ? 'is-active' : ''}>Início</a>
          </Link> */}
          {(data && data.productCategories) && data.productCategories.map(i => <div key={i.id}>
            <div className="category">
              <a>{i.name}</a>
              <div className="products-menu-menu">
                <Link as={`/c/${i.slug}`} href={`/products?category=${i.slug}`}>
                  <a>Todos</a>
                </Link>
                {i.subCategories.map(sub => <Link key={sub.id} as={`/c/${i.slug}/${sub.slug}`} href={`/products?category=${i.slug}&subCategory=${sub.slug}`}>
                  <a>{sub.name}</a>
                </Link>)}
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
            height: 200px;
            text-align: center;
            margin: 30px auto 0;
            padding: 30px 0 0;
            max-width: 70%;
            cursor: pointer;
          }
          .logo img {
            max-height: 100%;
          }
          hr {
            max-width: 948px;
            color: ${colors.color3};
          }
          .top-menu {
            position: fixed;
            top: 0;
            z-index: 999;
            height: 60px;
            width: 100%;
            background: white;
            display: flex;
            flex-direction: row-reverse;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
          }
          .user, .left-menu {
            display: flex;
            flex-flow: row nowrap;
            width: 50%;
          }
          .user {
            justify-content: flex-end;
            margin-right: 30px;
          }
          .left-menu {
            justify-content: flex-start;
          }
          .left-menu a {
            margin: 0 5px;
          }
          .user img {
            height: 22px;
            padding: 15px 10px;
          }
          .products-menu {
            margin: 60px auto;
            width: 100%;
            max-width: 95%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-around;
          }
          a {
            font-size: 10px;
            font-weight: 700;
            text-decoration: none;
            letter-spacing: .11em;
            font-style: normal;
          }
          .is-active {
            font-weight: 900;
          }
          .products-menu-menu {
            position: absolute;
            display: flex;
            top: -300px;
            flex-flow: column;
            text-align: left;
            width: 100px;
            background: black;
            padding: 5px 15px 5px 5px;
          }
          .products-menu-menu a {
            color: ${colors.color3};
            margin: 5px 0;
          }
          .products-menu-menu a:hover {
            color: white;
          }
          .products-menu-menu a:hover:before {
            width: 0%;
          }
          .category:hover .products-menu-menu {
            top: inherit;
          }
          .products-menu-menu *:hover {
            top: inherit;
          }
          .profile-pic {
            height: 22px;
            width: 22px;
            background: ${(user && user.image) ? `url(${user.image})` : 'black'};
            border-radius: 50%;
          }
          .profile-container {
            display: flex;
            flex-flow: column;
            justify-content: center;
          }
          .profile-menu {
            position: absolute;
            top: -500px;
            text-align: right;
            right: 60px;
            display: flex;
            flex-flow: column;
          }
          .profile-container:hover .profile-menu {
            top: 45px;
          }
        `}</style>
      </header>
    )}
  </Query>
)

export default withRouter(Header)
