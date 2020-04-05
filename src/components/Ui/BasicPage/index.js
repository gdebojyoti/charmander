import React from 'react'

import './style'

const BasicPage = ({ className = '', heading, subheading, children }) => {
  return (
    <div className={`basic-page ${className}`}>
      {(heading || subheading) && (
        <div className='basic-page__headings'>
          {heading && <h1 className='basic-page__heading'>{heading}</h1>}
          {subheading && <h2 className='basic-page__subheading'>{subheading}</h2>}
        </div>
      )}

      {children}
    </div>
  )
}

export default BasicPage
