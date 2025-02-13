import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import View from '../components/View'
import Add from '../components/Add'


const Dashboard = () => {

  
  const [userName,setUserName] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setUserName(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }
  },[])


  return (
    <>
       <Header insideDashboard={true}/>
       <div style={{paddingTop: '100px'}} className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-lg-8'>
            <h1>Welcome <span className='text-warning'>{userName}</span></h1>
            {/* <Add /> */}
            <View />
          </div>
          <div className='col-lg-4'>
            <Profile />
          </div>
        </div>
       </div>
    </>
  )
}

export default Dashboard