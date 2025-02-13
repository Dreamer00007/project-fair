import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

//register api called by auth component 
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//loginAPI api called by auth component 
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//addProjectAPI
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//getHomeProjectAPI called by Home component when page loaded
export const getHomeProjectAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

//allProjectAPI called by projects component when page loaded,argument as authorization included
export const allProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
}

//userProjectAPI called by view component when page loaded,argument needed as authorization included
export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-project`,{},reqHeader)
}

export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

//delete projects called by view component
export const deleteProjectAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

//update profile called by view component
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}


