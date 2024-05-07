
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import {updateProfileApi } from '../services.js/allApi'
import { baseUrl } from '../services.js/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Profile() {
    const [open, setopen] = useState(false)
    const [profileData, setProfileData] = useState({
        username:"",
        email:"", 
        password:"",
        github:"",
        profile:"",
        linkdin:""
        
    })   
    const [profileImage,setProfileImage]=useState("")
    const [preview, setPreview] = useState("")
    const[update,setUpdate]=useState(false)


    useEffect(()=>{

        const userData = JSON.parse( sessionStorage.getItem("existingUser"))
       
       setProfileData({...profileData,username:userData.username,email:userData.mailId,password:userData.password,github:userData.github,linkdin:userData.linkdin,profile:""})
       console.log(userData);
       setProfileImage(userData.profile)
       
        },[update])

        
         
    console.log(profileData);

    

    useEffect(() => {
        profileData.profile?setPreview(URL.createObjectURL(profileData.profile)):setPreview("") //if photo is selected converts into aurl if not present keeps the existing image
    },[ profileData.profile])

    //function to update profile
    const handleProfile=async(e)=>{
        e.preventDefault()
        const{github,linkdin,username,email,password,profile}=profileData

        const reqBody = new FormData()

        //to add data to the body use append() method--it can add only one item at a time
        reqBody.append("username",username);
        reqBody.append("mailId",email)
        reqBody.append("password",password)
        reqBody.append("github", github);
        reqBody.append("linkdin", linkdin);
        preview?reqBody.append("profile", profile):reqBody.append("profile", profileImage)

        const token = sessionStorage.getItem('token')

        if(preview){
            const reqHeader = {
                'content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` //Bearer - used to verify , when using Bearer no other credential/document is needed to verify the request
            }
            const result = await updateProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
                toast.success('update successfull')
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                setUpdate(true)
               
            }
        }
        else{
            const reqHeader ={
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
           
               }
               const result = await updateProfileApi(reqBody,reqHeader)
               console.log(result);
               if(result.status==200){
                toast.success('update successfull')
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                setUpdate(true)
            }

        }





    }
  


    return (
        <>
            <div className='border rounded shadow'>
                <div className='d-flex justify-content-between p-4' /* onMouseEnter={()=>setopen(true)} */  >
                    <h3>Profile</h3>
                    <button className='btn btn-outline-dark ' onClick={() => { setopen(!open) }}>{open ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />} </button>
                </div>
                <Collapse in={open}>
                    <div className=' row text-center p-3 mt-4'>
                        <label htmlFor="profile">
                            <input type="file" id='profile' style={{ display: "none" }} onChange={(e) => setProfileData({ ...profileData, profile:e.target.files[0] })} />
                           
                           { profileImage==""? <img src={preview ? preview :'https://www.translitescaffolding.com/wp-content/uploads/2013/06/user-avatar.png'} width={'200px'} height={'200px'} alt="profile" style={{ borderRadius: "50%" }} />:

                           <img src={preview ? preview : `${baseUrl}/uploads/${ profileImage}`} width={'200px'} height={'200px'} alt="profile" style={{ borderRadius: "50%" }} />                           
                           }

                        </label>

                        <div className='mt-4 mb-3'>
                            <input className='form-control rounded ' type="text" placeholder='Github profile link' value={profileData.github} onChange={(e) => setProfileData({ ...profileData, github: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='form-control rounded ' type="text" placeholder='LinkdIn profile link' value={profileData.linkdin} onChange={(e) => setProfileData({ ...profileData, linkdin: e.target.value })} />
                        </div>
                        <div className=' mb-3'>
                            <button className='btn btn-info rounded w-50' onClick={(e) => { handleProfile(e) }}>Update</button>

                        </div>


                    </div>
                </Collapse>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Profile