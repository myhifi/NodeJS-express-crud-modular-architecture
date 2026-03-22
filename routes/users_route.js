const express = require("express");
const router = express.Router();
const Joi = require("joi");



const users = [
    {id : 1 , name : "Mahmoud" , salary:200},
    {id : 2 , name : "Ahmed" , salary:300},
    {id : 3 , name : "Hossam" , salary:400},
]


// ===== Start Validation ===== 
const UserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim(),
    salary:Joi.number().min(0).required(),
})
// ===== End Validation ===== 



// ===== Start HTTP Verbs ===== 

// ----- GET -----
router.get("/" , (req , res)=>{
    res.send("<h1>Mahmoud</h1>");
});

// ----- GET All Users -----
// router.get("/users" , (req , res)=>{
//     res.json(users);
// })

router.get("/:id" , (req , res)=>{
    const userId = Number(req.params.id);
    const user = users.find((u)=>u.id === userId);
    res.json(user);
})


// ----- POST -----
router.post("/" , (req , res)=>{
    const {error} = UserSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
    }

    // Destructing
    const{name , salary} = req.body;
    const newUser = {
        id:users.length + 1,
        name,
        salary
    }
    users.push(newUser);
    res.status(201).json({
        message:"User Created Successfully",
        data:newUser,
    })
})

// ----- PUT -----
router.put("/:id" , (req , res)=>{

    const {error} = UserSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
    }

    const userId = Number(req.params.id);
    const{name , salary} = req.body;

    const user = users.find((u)=> u.id === userId);

    if(!user){
        return res.status(404).json({message:"User Not Found"});
    }else{
        // Nullish
        user.name = name ?? user.name;
        user.salary = salary ?? user.salary;
        res.json({
            message:"User Updated",
            data:user
        })
    }
})

// ----- DELETE -----
router.delete("/:id" , (req , res)=>{
    const userId = Number(req.params.id);
    const userIndex = users.findIndex((u)=>u.id === userId);

    if(userIndex === -1){
        return res.status(404).json({message:"User Not Found"});
    }else{
        const deletedUser = users.splice(userIndex , 1);
        return res.json({
            message:"User Deleted",
            data:deletedUser,
        })
    }
})


// ===== End HTTP Verbs ===== 

module.exports = router;