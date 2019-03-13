import React from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(import('./Map'), {
  ssr: false,
  loading: () => (
    <div style={{textAlign: 'center', paddingTop: 20}}>
      Loading....
    </div>
  )
})

const Contact = () => <div>
  <Map />
  <div className="footer">Com <span color="red">❤</span> por <a href="https://luandro.com">Luandro</a></div>
  <style jsx>{`
    .footer {
      padding-top: 80px;
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
    .footer a:hover {
      
    }
  `}</style>
</div>

export default Contact
