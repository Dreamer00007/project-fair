import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import SERVER_URL from '../services/serverURL';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextApi';


const Edit = ({ project }) => {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [preView, setPreView] = useState("")

  const [projectDetails, setProjectDetails] = useState({
    id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
  })
  console.log(projectDetails);

  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == 'image/jpeg') {
      //valid image
      setImageFileStatus(true)
      setPreView(URL.createObjectURL(projectDetails.projectImg))
    } else {
      //invalid image
      setImageFileStatus(false)
      setPreView("")
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }
  }, [projectDetails.projectImg])

  const handleClose = () => {
    setShow(false)
    setProjectDetails({id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
    })
  };
  const handleShow = () => {
    setShow(true)
    setProjectDetails({id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
    })
  }

  const handleUpdateProject = async () => {
    const {id,title, languages,overview,github,website,projectImg} = projectDetails
    if(title && languages && overview && github && website){
      //api call - put -(id,updatedetails)
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preView ? reqBody.append("projectImg",projectImg) :   reqBody.append("projectImg",project.projectImg)
      const token = sessionStorage.getItem('token')
      if(token){
        //apicall
        const reqHeaders = {
          "Content-Type" : "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateProjectAPI(id,reqBody,reqHeaders)
          if(result.status == 200){
            alert('Project update successfully!!!')
            handleClose()
            setEditProjectResponse(result)
          }
        } catch (error) {
          
        }
      }
    }else{
      alert('Please fill the form completely...')
    }
  }


  return (
    <>
      <button className='btn' style={{ color: 'white' }} onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center'>
            <div className='col-lg-4'>
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img width={'100%'} className='img-fluid p-2' src={preView ? preView : `${SERVER_URL}/uploads/${project.projectImg}`} alt="camera" />
              </label>
              {
                !imageFileStatus && <div className='text-warning fw-bolder my-2'>*Upload only the following file types (png, jpeg, jpg)</div>
              }
            </div>
            <div className='col-lg-8'>
              <div className='mb-2'>
                <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" className='form-control' placeholder='Project Title' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} type="text" className='form-control' placeholder='Languages used in Project' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" className='form-control' placeholder='Project Overview' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" className='form-control' placeholder='Project github link' />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" className='form-control' placeholder='Project Demo link' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit