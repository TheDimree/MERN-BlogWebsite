import React from 'react'
import './Title.css'

export default function Title(props) {
  return (
    <div className='title'>
      <p>{props.subTitle}</p>
      <h2>{props.title}</h2>
    </div>
  )
}
