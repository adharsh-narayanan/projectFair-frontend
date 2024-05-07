import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../services.js/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserProjectApi } from '../services.js/allApi';
import { editProjectResponseContext } from '../context/ContextAPi';





function EditProject({ project }) {

    const {setEditResponse}=useContext(editProjectResponseContext)
    //console.log(project);
    const [show, setShow] = useState(false);

    const [projectDetails, setprojectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })


    //state to store imageurl
    const [preview, setPreview] = useState("")
    //state to change the input key

    useEffect(() => {
        projectDetails.projectImage ? setPreview(URL.createObjectURL(projectDetails.projectImage))//to convert file into url because src requires a url
            : setPreview("")


    }, [projectDetails.projectImage])

    //cancel function

    const handleCancel = () => {
        setprojectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
    }

    //to update edit 

    const handleEdit = async (e) => {
        e.preventDefault()
        const {id, title, language, github, website, overview, projectImage } = projectDetails

        if (!title || !language || !github || !website || !overview) {
            toast.warning('please fill the from completely')
        }
        else {
             //requestBody - formData class object
            //------------------------------------
            //if your request contain uploaded content then the body have to sent in the format of formData
            //1) create an object for FormData class

            const reqBody = new FormData()

            //to add data to the body use append() method--it can add only one item at a time

            reqBody.append("title", title);
            reqBody.append("language", language);
            reqBody.append("github", github);
            reqBody.append("website", website);
            reqBody.append("overview", overview);
            preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage", project.projectImage)

            //creating request header , because for uploaded content header is needed to pass down in api call
            const token = sessionStorage.getItem('token')
            if(preview){//upload
                const reqHeader = {
                    'content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` //Bearer - used to verify , when using Bearer no other credential/document is needed to verify the request
                }
                const result = await editUserProjectApi(id,reqBody,reqHeader)
                console.log(result);
                if(result.status==200){
                    toast.success('update successfull')
                    setEditResponse(result.data)
                    handleClose()
                }

                


            }else{//no upload
                const reqHeader ={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
               
                   }
                   const result = await editUserProjectApi(id,reqBody,reqHeader)
                   if(result.status==200){
                       toast.success('update successfull')
                       setEditResponse(result.data)
                       handleClose()
                   }                   


            }

        }

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div>
                <button className='btn outline-none' onClick={handleShow}><FontAwesomeIcon className='' icon={faPenToSquare} size='xl' /></button>
            </div>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6 p-3">
                            <label htmlFor="image">
                                <input type="file" id='image' style={{ display: 'none' }} onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img src={preview ? preview : `${baseUrl}/uploads/${project.projectImage}`} alt="" width={'100%'}/>
                            </label>
                        </div>
                        <div className="col-md-6 p-3">
                            <div className=' mb-3'>
                                <input placeholder='Project name' type="text" className='form-control' value={projectDetails.title} onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Language' type="text" className='form-control' value={projectDetails.language} onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Github Link' type="text" className='form-control' value={projectDetails.github} onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Website Link' type="text" className='form-control' value={projectDetails.website} onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <textarea cols={'30'} rows={'3'} placeholder='overview' type="text" className='form-control' value={projectDetails.overview} onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={(e) => { handleEdit(e) }} variant="success">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default EditProject