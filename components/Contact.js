import React from 'react'
import dynamic from 'next/dynamic'
import Loading from '../components/Loading'

const Map = dynamic(import('./Map'), {
  ssr: false,
  loading: () => (
    <div style={{textAlign: 'center', paddingTop: 20}}>
      <Loading />
    </div>
  )
})

const Contact = () => <main>
  <Map />
  <div className="footer">Com <span color="red">❤</span> por <a href="https://luandro.com">Luandro</a></div>
  <style jsx>{`
    main {
      padding: 80px 0 0;
    }
    .footer {
      padding-top: 80px;
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
    .footer a:hover {
      
    }
  `}</style>
</main>

export default Contact
