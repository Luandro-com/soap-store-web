// import Loading from 'react-loader-spinner'
import Loading from 'react-loading'
import colors from '../lib/colors'
// export default () => <Loader 
//   type="Triangle"
//   color="#00BFFF"
//   height="100"	
//   width="100"
// />

export default () => <div className="container">
  <Loading
    className="loading"
    type="cylon"
    style={{ margin: '0 auto', height: 30, width: 40, fill: colors.color3 }}
    color={colors.color3}
  />
  <style jsx>{`
    .container {
      width: 100%;
      height: 100%;
    }
  `}</style>
</div>
