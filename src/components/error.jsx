import React from 'react'

const error = ({message}) => {
  return (
    <span className='text-sm text-red-500'>{message}</span>
  )
}

export default error