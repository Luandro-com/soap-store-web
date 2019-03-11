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

const Contact = () => <Map />

export default Contact
