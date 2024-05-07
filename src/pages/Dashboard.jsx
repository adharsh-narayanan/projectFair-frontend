import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../Components/Myprojects'
import Profile from '../Components/Profile'

function Dashboard() {

  //state to store username
  const [username,setUsername]=useState("")

 
  useEffect(()=>{

  setUsername  (JSON.parse( sessionStorage.getItem("existingUser")).username)
    
  },[])
  
  return (
   <>
   <Header/>
   <h3 className='m-5  '>Welcome <span className='text-warning'>{username}</span> </h3> 
   <Row className='p-5  my-4'>
    <Col md={8} className=''>
      <Myprojects/>
    </Col>
    <Col className='mt-5 mt-md-0  '  style={{height:'auto'}} md={4}>
      <Profile/>
    </Col>
   </Row>
   </>
  )
}

export default Dashboard