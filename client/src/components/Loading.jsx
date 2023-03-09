import React from 'react'

function Loading() {
  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
        <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Loading