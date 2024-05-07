import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteUserProjectApi, getUserProjectApi } from '../services.js/allApi'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextAPi'

function Myprojects() {

  //destructuring context state to update data
const{projectResponse}=useContext(addProjectResponseContext)
const{editResponse}=useContext(editProjectResponseContext)


  const[userproject,setUserProject]=useState([])
  //function to get user projects

  const userProjects = async()=>{
    const token = sessionStorage.getItem('token')
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}` 
     }

     const result =await getUserProjectApi(reqHeader)
     //console.log(result.data);
     if(result.status===200){
      setUserProject(result.data)
     }
     else{
      console.log(result.response.data);
     }

     console.log(userproject);
  }

  //function to delete document

  const handleDelete=async(id)=>{
    const token = sessionStorage.getItem('token')
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}` 
     }
   
     const result = await deleteUserProjectApi(id,reqHeader)
     console.log(result);
     if(result.status==200){
      userProjects()
     }
     else{
      console.log(result.response.data);
     }
  }


  useEffect(()=>{
    userProjects()
  },[projectResponse,editResponse])  //state from context to update data when new project added
  return (
    <>
      <div className='w-100 rounded shadow border p-3'>

        <div className='d-flex justify-content-between p-3'>
          <h3>My Project</h3>
          <div className='ms-auto'>
            <AddProject />
          </div>
        </div>
        <div>

        { userproject?.length>0? userproject?.map((item)=>(<div className='mt-4 p-2 rounded bg-secondary shadow d-flex  border'>
            <h4>{item.title}</h4>
            <div className='d-flex  align-items-center ms-auto '>
              <EditProject  project={item}/>

              <Link target='-blank' className='m-2' to={item.github}><FontAwesomeIcon className=' text-warning ' size='xl' icon={faGithub} /></Link>
              <button className='btn' onClick={()=>handleDelete(item._id)} ><FontAwesomeIcon className='text-danger ' size='xl'  icon={faTrash} /></button>
            </div>
          </div> ))
        :
          <h4 className='text-center text-warning mt-4 border p-3'>No Projects added</h4>}

        </div>

      </div>
    </>
  )
}

export default Myprojects