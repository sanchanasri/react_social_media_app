import React, { useContext } from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import DataContext from './context/DataContext'

function Header({title}) {
  const widht = useContext(DataContext)
  return (
    <header className="Header"><h1>{title}</h1> 
    {widht < 768 ? <FaMobileAlt/> :
      widht < 992 ? <FaTabletAlt />:
       <FaLaptop />}
    
    </header>
  )
}

export default Header
