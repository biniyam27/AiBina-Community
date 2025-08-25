import {useRef,useState} from 'react'
import axios from '../axiosConfig'
import {Link,useNavigate} from 'react-router-dom'
import './login.css'

function Login({checkUser,setUser}) {
const navigate = useNavigate()
const emaildom=useRef(null)
const passworddom=useRef(null)
const [msg,setMsg]=useState("")
const [showpassword,setshowpassword]=useState(true)

function togglePassword(){
  setshowpassword(!showpassword);
}

async function handelSubmit(e){
e.preventDefault()
const emailValue=emaildom.current.value;
const passwordValue=passworddom.current.value;
if(
  !emailValue||
  !passwordValue
){
  setMsg('Please provide all required information')
  return;
}
try {
  const {data}=await axios.post('/users/login',{
    email:emailValue,
    password:passwordValue
  })
  setUser(data.user)
  setMsg(data.msg)
  localStorage.setItem('token',data.token)
  await checkUser();
  navigate('/')

} catch (error) {
  // console.log(error.response.data.msg)
  setMsg(error.response.data.msg)
}
}

  return (
    <section className='login-section'>
      <div className="left-login">
        <h1>Login to your account</h1>
        <p>Don't have an account? <Link to={"/register"} className='authbtn'>Create a new account</Link> </p>
         <span className='errormsg'>{msg}</span>
        <form onSubmit={handelSubmit}>
            <input ref={emaildom} type="email" placeholder='Your Email'/>
             <div className="login-pass">
             <input ref={passworddom} type={showpassword?'password':'text'} placeholder='Your Password' />
            <span onClick={togglePassword} className={showpassword? 'fas fa-eye-slash' : 'fas fa-eye'}></span>
            </div>
        <button type='submit'>Login</button>
     </form>
     
      </div>
     <div className="right-login">
      <h2>Welcome to AiBina Community</h2>
      <p>AiBina is a developer-focused community where programmers of all
         levels can ask questions,share knowledge, and collaborate. 
         Whether you're a beginner learning your first lines of code or an 
         experienced engineer tackling complex projects, AiBina is here to support you.</p>
         <p>We believe learning to code should never be a lonely journey. AiBina brings together 
         developers in one supportive space, making problem-solving faster,easier, and more fun.</p>
     </div>
    </section>
  )
}

export default Login
