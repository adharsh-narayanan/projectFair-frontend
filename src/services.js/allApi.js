import { commonApi } from "./axios"
import { baseUrl } from "./baseUrl"

//request to register user

export const registerApi = async(reqBody)=>{

   return await commonApi('post',`${baseUrl}/user/register`,reqBody,"")  //method,url,reqBody,reqHeader

}

//request to login

export const loginApi = async (reqBody)=>{
   return await commonApi('post',`${baseUrl}/user/login`,reqBody,"")
}

//requests to add projects

export const addprojectApi = async (reqBody,reqHeader)=>{
   return await commonApi('post',`${baseUrl}/addproject`,reqBody,reqHeader)
}

//request to get home projects

export const HomeprojectApi = async()=>{
   return await commonApi('get',`${baseUrl}/home-project`,"","")
}

//request to get all projects

      ////query parameter => path?key=value eg:https://www.google.com/search?q=anime

export const getAllprojectAPi = async(searchKey,reqHeader)=>{
   return await commonApi('get',`${baseUrl}/all-projects?search=${searchKey}`,"",reqHeader)
}


//request to get projects with respect to user

export const getUserProjectApi = async (reqHeader)=>{
   return await commonApi('get',`${baseUrl}/user/projects`,"",reqHeader)
}

//request to delete a project
export const deleteUserProjectApi = async(id,reqHeader)=>{
   return await commonApi('delete',`${baseUrl}/user-project/delete/${id}`,{},reqHeader)
}

//request to edit user project
export const editUserProjectApi=async(projectId,reqBody,reqHeader)=>{
   return await commonApi('put',`${baseUrl}/user-project/edit/${projectId}`,reqBody,reqHeader)
}

//request to add profile data

export const updateProfileApi=async(reqBody,reqHeader)=>{
   return await commonApi('put',`${baseUrl}/user/edit-profile`,reqBody,reqHeader)
}
