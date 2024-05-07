import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/login.png'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  loginApi, registerApi } from '../services.js/allApi'
import { logoutResponsecontext } from '../context/ContextAPi'



function Login({ register }) {

    const {setauthoriseToken}=useContext(logoutResponsecontext)

    //state to store input data
    const [userdata, setUserdata] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

  //  console.log(userdata);

    //function to register a user

    const handleregister = async (e) => {
        e.preventDefault() //to prevent data loss

        const { username, email, password } = userdata

        if (!username || !email || !password) {
            toast.warning('please fill the form completely')
        }
        else {
            //api call

            const result = await registerApi(userdata)

            console.log(result);
            if (result.status == 200) {
                toast.success('registration successfull')
                setUserdata({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')

            } else {
                
                toast.warning(result.response.data)
            }

          



        }

    }

    //function to login

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = userdata

        if (!email || !password) {
            toast.info("please fill the form completely")
        }
        else {
            const result = await loginApi(userdata)
            console.log(result);
            if (result.status == 200) {
                toast.success("success")
                setauthoriseToken(true)

                //to store data into session storage

                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)

                setUserdata({
                    username: "",
                    email: "",
                    password: ""
                })

                setTimeout(() => {

                    navigate("/")

                }, 2000);


            }else{
                toast.error(result.response.data)
            }
            
        }

    }



    const RegisterForm = register ? true : false
    return (
        <>
            <div>
                <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                    <div className="container w-75">
                        <Link to={'/'} className='p-2 mb-2' style={{ textDecoration: "none" }}> <FontAwesomeIcon icon={faArrowLeft} className='me-2' /> Back to home</Link>
                        <div className='bg-secondary p-5 shadow rounded w-100' >
                            <Row>
                                <Col md={6} sm={12} className=''>
                                    <img src={login} width={'100%'} alt="" />
                                </Col>
                                <Col md={6} sm={12} className=' d-flex justify-content-center align-items-center flex-column'> <FontAwesomeIcon icon={faStackOverflow} size='xl' className='me-2' />
                                    <h3 className='p-3 text-center fs-3 fw-bolf'>   Project Fair</h3>
                                    <p className=' text-center text-dark'>
                                        {RegisterForm ? 'Sign-up to your account' : 'Sign-in to your account'}
                                    </p>

                                    <form className='w-100 '>
                                        {RegisterForm &&
                                            <input className='form-control  mb-3' value={userdata.username} onChange={(e) => setUserdata({ ...userdata, username: e.target.value })} placeholder='username' type="text" />}

                                        <input className='form-control mb-3 ' value={userdata.email} onChange={(e) => setUserdata({ ...userdata, email: e.target.value })} placeholder='e-mail' type="text" />

                                        <input className='form-control  mb-3' value={userdata.password} onChange={(e) => setUserdata({ ...userdata, password: e.target.value })} placeholder='password' type="text" />

                                        {RegisterForm ? <div>
                                            <Button className=' w-50 rounded btn  btn-warning' onClick={(e) => { handleregister(e) }}>Register</Button>
                                            <p className='mt-3'>Already a user?  click here to <Link to={'/login'}>Login</Link> </p>
                                        </div>
                                            :
                                            <div>
                                                <Button className=' w-50 rounded btn   btn-warning' onClick={(e) => { handleLogin(e) }}>Login</Button>
                                                <p className='mt-3'>New user? click here to<Link to={'/register'}> Register</Link></p>
                                            </div>}
                                    </form>
                                </Col>
                            </Row>
                        </div>

                    </div>

                </div>
                <ToastContainer theme='colored' position='top-center' autoClose={2000} />
            </div>

        </>
    )
}

export default Login