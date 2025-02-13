import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

const Projects = () => {

  const [searchkey,setSearchkey] = useState('')

  const [allprojects, setAllprojects] = useState([])
  console.log(allprojects);

  useEffect(() => {
    getAllProjects()
  }, [searchkey])


  const getAllProjects = async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allProjectAPI(searchkey,reqHeader)
        if (result.status == 200) {
          setAllprojects(result.data)
        }
      } catch (error) {
        console.log(error);

      }
    }
  }

  return (
    <>
      <Header />
      <div className='container-fluid' style={{ paddingTop: '100px' }}>
        <div className='d-flex justify-content-between'>
          <h1>All Projects</h1>
          <input type="text" className='form-control w-25' placeholder='Search Projects by their Lnguages' onChange={e=>setSearchkey(e.target.value)}/>
        </div>
        <Row className='mt-3'>
          {
            allprojects?.length > 0 ?
              allprojects?.map(project => (
                <Col className='mb-3' sm={12} md={6} lg={4}>
                  <ProjectCard displayData={project}/>
                </Col>
              )) :
               
              <div className='text-danger'>*Projects are not yet uploaded</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects