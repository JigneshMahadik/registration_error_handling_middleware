const express = require("express");
const app = express();


app.use(express.json());


// Request checker
const reqHandlingMiddleware = (req,res,next)=>{
    
    const fname = req.body.fname;
    const lname = req.body.lname;

    const password = req.body.password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const len = password.length;

    const atIndex = req.body.email.indexOf("@");
    
    const mobile = /^[0-9]{10}$/.test(req.body.mobile);

    // Validate First Name and Last Name
    if(fname.charAt(0) !== fname.charAt(0).toUpperCase()){
        next("First character of first name should be capital !");
    }
    else if(lname.charAt(0) !== lname.charAt(0).toUpperCase()){
        next("First character of last name should be capital !");
    }
    // Validate Password
    else if(!(len >= 8)){
        next("Password must have at least 8 characters long !");
    }
    else if(!hasUppercase){
        next("Password must contain uppercase letter !");
    }
    else if(!hasSpecialCharacter){
        next("Password must contain special character !");
    }
    else if(!hasNumber){
        next("Password must contain number !");
    }
    // Validate Email Address
    else if(!(atIndex > 0 && atIndex < req.body.email.length-1)){
        next("Email should be like : example@xyz");
    }
    // Validate Phone Number
    else if(!mobile){
        next("Please enter 10 digits mobile number only !");
    }

    // In case all fields are valid
    else{
        next();
    }
}

// Error handling middleware
const errorHandlingMiddleware = (error,req,res,next)=>{
    // console.log(error);
    res.status(400).json({
        status : "error",
        message : error
    })
}

// called middlewares sequencially
app.use(reqHandlingMiddleware);
app.use(errorHandlingMiddleware);


// Handled registration API
app.post("/api/register",(req, res)=>{
    console.log("Registred successfully");
    res.json({
        status : true,
        message : "Registred successfully"
    })
});

app.listen(8085,()=>{
    console.log("Server is up and running on port : 8085");
});