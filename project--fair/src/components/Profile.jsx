import React, { useEffect, useState } from 'react'
import imgperson from '../assets/imgperson.png'
import { Collapse } from 'react-bootstrap';
import SERVER_URL from '../services/serverURL';
import { updateUserAPI } from '../services/allAPI';


const Profile = () => {

  const [preview, setPreview] = useState("")
  const [existingProfileImg, setExistingProfileImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })

  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin
      })
      setExistingProfileImg(user.profilePic)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    } else {
      setPreview("")
    }
  }, [userDetails.profilePic])

  const handleUpdateProfile = async () => {
    const { username, email, password, github, linkedin, profilePic } = userDetails
    if (github && linkedin) {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profilePic", profilePic) : reqBody.append("profilePic", existingProfileImg)
      const token = sessionStorage.getItem('token')


      if (token) {
        //apicall
        const reqHeaders = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateUserAPI(reqBody, reqHeaders)
          console.log(result);
          if (result.status === 200) {
            alert("User Profile updated successfully!!!")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }

        } catch (error) {
          console.log(error);

        }
      }
    } else {
      alert('Please fill the form completely!!!')
    }
  }


  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button className='btn text-warning' onClick={() => setOpen(!open)}><i className="fa-solid fa-chevron-down"></i></button>
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text" className='row container-fluid align-items-center justify-content-center shadow p-2 rounded '>
          <label className='text-center p-1'>
            <input onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} type="file" style={{ display: 'none' }} />
            {
              existingProfileImg == "" ?
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview ? preview : imgperson} alt="" />
                :
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />

            }
          </label>
          <div className='mb-2 w-100'>
            <input value={userDetails.github} onChange={e => setUserDetails({ ...userDetails, github: e.target.value })} type="text" className='form-control' placeholder='Github profile link' />
          </div>
          <div className='mb-2 w-100'>
            <input value={userDetails.linkedin} onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })} type="text" className='form-control' placeholder='User linkedIn profile' />
          </div>
          <div className='d-grid w-100'>
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>

    </>
  )
}

export default Profile