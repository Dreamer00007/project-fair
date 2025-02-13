import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../assets/img-1-project-fair.jpg'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import img2 from '../assets/imgperson.png'
import { getHomeProjectAPI } from '../services/allAPI'


const Home = () => {

  const [allHomeProjects, setAllHomeProjects] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getAllHomeProjects()
  }, [])


  const getAllHomeProjects = async () => {
    try {
      const result = await getHomeProjectAPI()
      if (result.status == 200) {
        console.log(result);
        setAllHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }



  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      alert("Please login to get full access!!!...")
    }
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: '80px' }}><i className="fa-brands fa-docker me-3"></i>Poject Fair</h1>
              <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias odit aut exercitationem? Quisquam, beatae? Magni voluptate ipsam illum odio? Vel repudiandae architecto reiciendis quidem sed! Neque dolorum quas illo numquam!</p>
              {
                sessionStorage.getItem("token") ?
                  <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>
                  :
                  <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className='col-lg-6 p-2'>
              <img className='img-fluid' src={img1} alt="landing" />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className='d-flex'>
            {
              allHomeProjects?.length>0 && 
               allHomeProjects.map(projects => (
                <div className='me-5'>
                  <ProjectCard displayData={projects}/>
                </div>
               ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5'><Link to={'/projects'}>CLICK HERE TO VIEW MORE PROJECTS</Link></button>
      </div>
      <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
        <h1>Our Testimonals</h1>
        <div className='d-flex justify-content-evenly align-items-center w-100 mt-3'>
          {/* card */}
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img className='img-fluid' src={img2} alt="" />Max Miller
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center mb-1'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: 'justify' }}>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home