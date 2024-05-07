import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectApi } from '../services.js/allApi'
import { addProjectResponseContext } from '../context/ContextAPi';




function AddProject() {
    //destructuring context state function  to update data in myprojects when new data get added

    const { setProjectResponse } = useContext(addProjectResponseContext)

    const [token, setToken] = useState("")

    //modal
    const [show, setShow] = useState(false);

    //state to add store project data

    const [projectDetails, setprojectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })

    //state to store imageurl
    const [preview, setPreview] = useState("")

    //state to change the input key

    const [key, setKey] = useState(false)

    useEffect(() => {
        projectDetails.projectImage ? setPreview(URL.createObjectURL(projectDetails.projectImage))//to convert file into url because src requires a url
            : setPreview("")


    }, [projectDetails.projectImage])

    //function to clear content

    const handleCancel = () => {
        setprojectDetails({
            title: "",
            language: "",
            github: "",
            website: "",
            overview: "",
            projectImage: ""
        })
        setPreview("")
        setKey(!key)

    }

    //getting token from session storage

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }

    }, [])



    //console.log(token);

    //function to add data

    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, language, github, website, overview, projectImage } = projectDetails

        if (!title || !language || !github || !website || !overview || !projectImage) {
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
            reqBody.append("projectImage", projectImage)

            //creating request header , because for uploaded content header is needed to pass down in api call

            if (token) {
                const reqHeader = {
                    'content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` //Bearer - used to verify , when using Bearer no other credential/document is needed to verify the request
                }

                //call api
                const result = await addprojectApi(reqBody, reqHeader)
                console.log(result);

                if (result.status===200) {
                    
                    setProjectResponse(result.data) //data is stored in context api state to send data to myprojects so that when new projects get added my projects get automatically updated
                   // toast.success('Success')
                    handleClose()                   
                    handleCancel()
                }
                else {
                    toast.error(result.response.data)
                    handleClose()
                }

            }


        }
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log(projectDetails);
    return (
        <>
            <div>
                <button className='btn btn-info' onClick={handleShow}>Add Project</button>
            </div>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6 p-3">
                            <label htmlFor="image">
                                <input type="file" key={key} id='image' style={{ display: 'none' }}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })} /> {/* hence it is a file not a text .files[] is given instead of .value */}
                                <img src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/010/224/236/non_2x/image-file-adding-symbol-glyph-illustration-vector.jpg"} alt="" width={'100%'} />
                            </label>
                        </div>
                        <div className="col-md-6 p-3">
                            <div className=' mb-3'>
                                <input placeholder='Project name' type="text" className='form-control' value={projectDetails.title}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Language' type="text" className='form-control' value={projectDetails.language}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Github Link' type="text" className='form-control' value={projectDetails.github}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <input placeholder='Website Link' type="text" className='form-control' value={projectDetails.website}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })} />
                            </div>
                            <div className=' mb-3'>
                                <textarea cols={'30'} rows={'3'} placeholder='overview' type="text" className='form-control' value={projectDetails.overview}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={(e) => { handleAdd(e) }}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default AddProject