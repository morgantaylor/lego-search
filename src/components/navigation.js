import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='nav'>
      <ul>
        <li className='nav__item'><Link className='nav__link' to='/'>Home</Link></li>
        <li className='nav__item'><Link className='nav__link' to='/sets'>Sets</Link></li>
        <li className='nav__item'><Link className='nav__link' to='/minifigs'>Minifigs</Link></li>
        <li className='nav__item'><Link className='nav__link' to='/colors'>Colors</Link></li>
        <li className='nav__item'><Link className='nav__link' to='/parts'>Parts</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation
