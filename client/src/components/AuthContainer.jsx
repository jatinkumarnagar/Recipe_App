import React from 'react'

const AuthContainer = ({children}) => {
  return (
    <div className='border border-black rounded w-25 mx-auto py-3 px-3 my-5 text-center'>
      {children}
    </div>
  )
}

export default AuthContainer
