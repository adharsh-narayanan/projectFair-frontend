import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logoutResponsecontext } from '../context/ContextAPi'



function Header() {
  const {AuthoriseToken,setauthoriseToken}=useContext(logoutResponsecontext)
  const navigate = useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setauthoriseToken(false)
    navigate('/')
  }
  return (
  
   <>
    <Navbar className="bg-body-secondary">
        <Container>
          <Link to={'/'} style={{textDecoration:"none"}}>
            <Navbar.Brand className='fw-bold fs-3' >
             
             <FontAwesomeIcon icon={faStackOverflow} size='2xl' className='me-2' /> Project Fair
            </Navbar.Brand>
           
           
          
          </Link>
          <button className='btn btn-danger ms-auto' onClick={handleLogout}>  <FontAwesomeIcon icon={faPowerOff} size='md' className='me-2' /> Logout</button>
        </Container>
      </Navbar>
   </>
  )
}

export default Header