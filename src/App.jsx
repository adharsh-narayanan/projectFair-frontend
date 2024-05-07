
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from'./pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'

import Footer from './Components/Footer'
import Login from './Components/Login'
import { logoutResponsecontext } from './context/ContextAPi'
import { useContext } from 'react'

function App() {

  const {AuthoriseToken,setauthoriseToken}=useContext(logoutResponsecontext)
 

  return (
    
    <>
  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/dashboard' element={AuthoriseToken?<Dashboard/>:<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Login register/>}/> {/* if key and value are same one value  is needed */}
      </Routes>
      <Footer/>
    
    </>
  )
}

export default App
