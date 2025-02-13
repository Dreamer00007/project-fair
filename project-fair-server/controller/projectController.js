const projects = require('../models/projectModel')

exports.addProjectController =async (req,res)=>{
    console.log("Inside add projectController");
    const userId = req.userId
    console.log(userId);
    const {title,languages,overview,github,website} = req.body
    const projectImg = req.file.filename
    console.log(title,languages,overview,github,website,projectImg);
    
    //res.status(200).json("addproject request received !!!")
    
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exisits on our collection....please upload another one!!!")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//get Home projects -no need authorization
exports.homePageProjectController = async (req,res)=>{
    console.log("Inside homePageProjectsController");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.allProjectController = async (req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);
    
    console.log("Inside homePageProjectsController");
    const query = {
        languages:{
            $regex:searchkey,$options:'i'
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//userprojects - authorization required
exports.userProjectController = async (req,res)=>{
    
    console.log("Inside userProjectsController");
    const userId = req.userId
    try {
        const alluserProjects = await projects.find({userId})
        res.status(200).json(alluserProjects)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//editprojectconttoller need authorization
exports.editProjectController = async (req,res)=>{
    
    console.log("Inside editProjectsController");
    const id = req.params.id//ptoject id
    const userId = req.userId
    const {title,languages,overview,github,website,projectImg} = req.body
    const reUploadProjectImg = req.fle?req.file.filename : projectImg
    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectImg:reUploadProjectImg,userId},{new:true}) 
        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// removeProject - need authorization
exports.removeProjectController = async (req,res)=>{
    console.log('Inside remove Project controller');
    const {id} = req.params
    try {
        const deleteProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

