const express=require("express")
const jwt=require('jsonwebtoken')
//const bcrypt= require('bcryptjs')
const mysql=require("mysql")
const router = express.Router()

const db=mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
})

router.post("/register",(req,res)=>{
    console.log(req.body)

    const {name,email,password,passwordConfirm}=req.body

    if(!name||!email || !password|| !passwordConfirm){
        return res.status(400).render('register',{
            message:'please provide all details'
        })
    }

     db.query('SELECT email FROM allow WHERE email=?',[email], async (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results.length>0){
            return res.render('register',{
                message:'This email is already in use'
            })
        }
        if(password !== passwordConfirm){
            return res.render('register',{
                message:'Password do not Match'
            })

        }

    //let hashedpassword= await bcrypt.hash(password,8)
    //console.log(hashedpassword)
    
    db.query('INSERT INTO allow SET ?',{name:name,email:email,password:password},(error,results)=>{
          if(error){
              console.log(error)
          }
          else{
              console.log(results)
              return res.render('register',{
                message:'User Registered'
            })

          }
    })
})
})
router.post("/userlogin",(req,res)=>{
      try{
          const {email,password}=req.body
          
          if(!email || !password){
              return res.status(400).render('login',{
                  message:'please provide an email and password'
              })
          }
          db.query('SELECT * FROM allow WHERE email=?',[email],(error,results)=>{
           console.log(results)
           console.log(results[0].password)
           console.log(password)
          /* 
           const pass = await bcrypt.compare(password,results[0].password)
           console.log(pass)*/
           pass=(password==results[0].password)
           if(!results || !(pass) ){
               console.log("missing")
            return res.status(400).render('userlogin',{
                message:'Email or password is incorrect'
            })
           }else{
            return res.status(200).render('complaint')


          }
         })
     }catch(error){
          console.log(error)
      }

})
router.post("/adminlogin",(req,res)=>{
    try{
        const {email,password}=req.body
        
        if(!email || !password){
            return res.status(400).render('login',{
                message:'please provide an email and password'
            })
        }
        if(email=="vasanth7085@gmail.com" && password=="Vasanth@25#$"){
            db.query('SELECT name,phoneno,place,complaint FROM complaint',(error,results)=>{
                res.send(results)  
            })
        }else{
            return res.status(400).render('adminlogin',{
                message:'incorrect email and password'
            })

        }
        
          
         
    }catch(error){
        console.log(error)
    }

})
router.post("/complaint",(req,res)=>{
    console.log(req.body)

    const {name,number,place,complaint}=req.body

    if(!name||!number || !place|| !complaint){
        return res.status(400).render('complaint',{
            message:'please provide all details'
        })
    }

    
    
    db.query('INSERT INTO complaint SET ?',{name:name,phoneno:number,place:place,complaint:complaint},(error,results)=>{
          if(error){
              console.log(error)
          }
          else{
              //console.log(results)
              return res.render('end',{
                message:'Your camplaint cleared with in few days'
            })

          }
    })
})


module.exports = router