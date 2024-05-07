import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import homeimage from '../assets/homeImage.png'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { HomeprojectApi } from '../services.js/allApi'


function Home() {

  const [isLogin,setLogin]=useState(false)

  //state to store home project data

  const [project,setProject]=useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLogin(true)
    }

  },[])


  //function to get home projects

  const getHomeProject =async()=>{
  const response = await HomeprojectApi()
  setProject(response.data)
 // console.log(response.data);
}
//console.log(project);

  useEffect(()=>{
    getHomeProject()
  },[])
  return (
 <>
   
     <div className='bg-secondary' style={{width:'100%',height:'100vh'}}>  
      <div className="container-fluid rounded" >
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6} className=''>
            <h1> <FontAwesomeIcon icon={faStackOverflow} className='me-2' /> Project Fair</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos odio iusto ad dolor accusamus, optio porro nulla. Debitis sapiente ab reiciendis neque doloribus assumenda, incidunt eos dolore vero? Eius, ex.</p>
            
          {isLogin?  <Link to={'/dashboard'}> <Button className=' mt-3 mb-5 btn bg-dark'>Manage Projects  <FontAwesomeIcon  icon={faArrowRight} className='ms-2 ' /></Button></Link>:

           <Link to={'/login'}> <Button className=' mt-3 mb-5 btn bg-dark'>Get Started  <FontAwesomeIcon  icon={faArrowRight} className='ms-2 ' /></Button></Link>}


          </Col>
          <Col sm={12} md={6}>
            <img src={homeimage} width={'80%'} height={''} alt="" />
          </Col>
        </Row>
      </div>
  
     </div>

     <div className='mt-5 text-center d-flex justify-content-center align-items-center flex-column'>
      <h1>Explore our projects</h1>

     <marquee scrollAmount={20} >
      {project?.length>0? <div className='d-flex mt-3'>
       { project?.map((items)=>(<ProjectCard projectData={items}/>)) } {/* sending data to project card using props hence its parent and child */}
       
         </div>:null}
     </marquee>
     <div  className='mt-4'> <Link style={{textDecoration:"none"}} to={'/projects'}><h5>View Projects</h5></Link></div>
     </div>
 </>
   
  )
}

export default Home