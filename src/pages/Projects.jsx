import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import lock from '../assets/lock.gif'
import { getAllprojectAPi } from '../services.js/allApi'


function Projects() {
  //state to store status of  whether token is present or not..jwt verification
  const[isToken,setIsToken]=useState(false)

  //state to store projects

  const[allProject,setAllProject]=useState([])

  //state to store search input

  const[searchKey,setSearchKey]=useState("")

  //function to get all projects with 
  const allProjects= async()=>{
    if( sessionStorage.getItem('token')){
    const token = sessionStorage.getItem('token')

    const reqHeader ={
     "Content-Type":"application/json",
     "Authorization":`Bearer ${token}`
    }
    const result = await getAllprojectAPi(searchKey,reqHeader)
   // console.log(result);

   if(result.status==200){
    setAllProject(result.data)
   }
   else{
    console.log(result.response.data);
   }
   //console.log(allProject);

  }

    
    
  }


  useEffect(()=>{
    allProjects()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setIsToken(true)
    }
  },[])

  //console.log(searchKey);

  
  return (
  <>
  <Header/>
  <h2 className='text-center mt-4 mb-4'>All Projects</h2>

 {isToken?<div className='d-flex justify-content-center flex-column container-fluid'>
 
    <div className='row w-100'>
      <div className="col-md-4"></div>
      <div className="col-md-4  d-flex   align-items-center justify-content-center p-4">
     
      <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control mt-4 mb-5 p-2 rounded'  placeholder='Search using technology' />
      <FontAwesomeIcon icon={faMagnifyingGlass} className='me-2' size='sm' style={{marginTop:"-20px",marginLeft:"-30px",color:'grey'}} />
      </div>

      <div className="col-md-4"></div>
    </div>
   
      <Row className='container-fluid mb-5'>
       {allProject?.length>0? 
       allProject?.map(items=>(<Col className='' lg={4} md={6} sm={12}>
       <ProjectCard projectData={items}/>
       
     </Col>))
       :<p>No data</p>}
      </Row>
 
  </div>
    :

  <div className='mt-4 d-flex justify-content-center align-items-center flex-column'>
    <img className='mb-3' src={lock} alt="" />
    <h3 style={{color:'red'}}>Please <Link  style={{textDecoration:"none"}} >Login</Link > to view projects</h3>
  </div>}
 

  </>
  )
}

export default Projects