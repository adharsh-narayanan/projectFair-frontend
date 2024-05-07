import React, { createContext, useState } from 'react'

//context to add data

export const addProjectResponseContext = createContext()

//to update edited data

export const editProjectResponseContext = createContext()

//context for logout
export const logoutResponsecontext=createContext()

function ContextAPi({children}) { //children is a predefined props used to share data betwn components
    //state to store data to be shared
    const [projectResponse,setProjectResponse]=useState({})

    const[editResponse,setEditResponse]=useState({})

    const[AuthoriseToken,setauthoriseToken]=useState(true)
  return (
    <addProjectResponseContext.Provider value={{projectResponse,setProjectResponse}}> {/* as key value pairs  */}
       <editProjectResponseContext.Provider value={{editResponse,setEditResponse}}>
        <logoutResponsecontext.Provider value={{AuthoriseToken,setauthoriseToken}}> {children}</logoutResponsecontext.Provider>
         </editProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>
    
  )
}

export default ContextAPi