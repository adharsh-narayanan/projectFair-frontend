import axios from "axios"

export const commonApi = async (httprequest,url,reqBody,reqHeader)=>{
    const reqconfig ={
        method:httprequest,
        url,
        data:reqBody,
        headers: reqHeader?reqHeader:{"Content-Type":"application/json"}   //this project uses 2 types of data 
        
      /*   headers have  2 types of data,  uplaoded content and non-uploaded content. 
      
      for uploaded content => headers:{"content-Type":"multipart/form-data"} 
      
      and for non-uplaoded content =>  headers :{ "Content-Type": "application/json"} */
            
        
    }


    return await axios(reqconfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}