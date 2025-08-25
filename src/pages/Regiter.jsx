import {useRef, useState} from 'react'
import axios from '../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'
import './register.css'
function Regiter() {
  const [showpassword,setshowpassword]=useState(true)
const navigate = useNavigate()
const usernamedom=useRef(null)
const firstnamedom=useRef(null)
const lastnamedom=useRef(null)
const emaildom=useRef(null)
const passworddom=useRef(null)
const [msg,setMsg]=useState("")
function togglePassword(){
  setshowpassword(!showpassword);
}
async function handelSubmit(e){
e.preventDefault()
const userValue=usernamedom.current.value;
const firstValue=firstnamedom.current.value;
const lastValue=lastnamedom.current.value;
const emailValue=emaildom.current.value;
const passwordValue=passworddom.current.value;
if(
  !userValue||
  !firstValue||
  !lastValue||
  !emailValue||
  !passwordValue
){
  setMsg('Please provide all required information')
  return;
}
try {
  const res=await axios.post('/users/register',{
    username:userValue,
    firstname:firstValue,
    lastname:lastValue,
    email:emailValue,
    password:passwordValue
  })
  setMsg(res.data.msg)
  navigate('/login')
} catch (error) {
  setMsg(error.response.data.msg)
}
}

  return (
    <section className='register-section'>
       <div className="left-register">
        <h1>Create a new account</h1>
        <p className='checkuser'>Already have an account? <Link to={"/login"} className='authbtn'>Signin</Link> </p>
        <span className='errormsg'>{msg}</span>
        <form onSubmit={handelSubmit}>
            <input ref={usernamedom} type="text" placeholder='Username' />
            <div className="name-container">
             <input ref={firstnamedom} type="text" placeholder='First name' />
             <input ref={lastnamedom} type="text" placeholder='Last name' />
            </div>
            <input ref={emaildom} type="email" placeholder='Your Email'/>
            <div className="password-container">
             <input ref={passworddom} type={showpassword?'password':'text'} placeholder='Create Password' />
            <span onClick={togglePassword} className={showpassword? 'fas fa-eye-slash' : 'fas fa-eye'}></span>
            </div>
            
        <button type='submit'>Register</button>
     </form>
     
      </div>
     <div className="right-register">
      <h2>Welcome to AiBina Community</h2>
      <p>AiBina is a developer-focused community where programmers of all
         levels can ask questions,share knowledge, and collaborate. 
         Whether you're a beginner learning your first lines of code or an 
         experienced engineer tackling complex projects, AiBina is here to support you.
         </p>
         <p>We believe learning to code should never be a lonely journey. AiBina brings together 
         developers in one supportive space, making problem-solving faster,easier, and more fun.</p>
     </div>
    </section>
  )
}

export default Regiter
