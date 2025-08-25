import {Link ,Routes,Route, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Regiter from "./pages/Regiter"
import { useEffect } from "react"
import axios from "./axiosConfig"
import { useState,createContext,useRef } from "react"
import QuestionDetail from "./pages/QuestionDetail"
import AskQuestion from "./pages/AskQuestion"
import './app.css'


export const appState = createContext();
function App () {
const [user,setUser]= useState({})
const [toggle,setToggle]=useState(true)
const [token,setToken]=useState(localStorage.getItem('token'))
const navigate= useNavigate()
async function checkUser(){
  try {
   const {data}= await axios.get('/users/check',{
      headers:{
        Authorization:'Bearer '+ token,
      },
    })
    localStorage.setItem('userData',data)
    setUser(data)
  } catch (error) {
    console.log(error.response)
    navigate('/login')
  }
}
const navRef=useRef()
function handelmenu(){
  setToggle(!toggle);
  if(toggle){
    navRef.current.classList.add('togglebtn')
  }else{
    navRef.current.classList.remove('togglebtn')
  }
}


const logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('userData');
   setToken('')
   setUser(null)
   checkUser()
   navigate("/login")
}

useEffect(()=>{
  checkUser()
  
},[])

const userData=localStorage.getItem('userData')
useEffect(()=>{
  if(userData){
    setUser(userData)
  }
},[userData])
 return (
    <appState.Provider value={{user,setUser}}>
    <div className="main-container">
     <header>
      <div className="logo-container"><h2><span>Ai</span>Bina</h2></div>
      {user?.userid>=0?
        <div className="right-container">
          <div className="navmenu" ref={navRef}>
            <div className="menu">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/ask">Ask Question</Link>
                <button onClick={logout}>Logout</button>
            </div>
         
         <div className="user">{user?.username.slice(0,1).toUpperCase()}</div>
          </div>
         
         <div className="bars"><span onClick={handelmenu} className={toggle ?"fas fa-bars":"fas fa-times "}></span></div>
        </div>
        :<></>}
        
      
     </header>
     <div className="main-content">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login checkUser={checkUser} setUser={setUser}/>}/>
      <Route path="/register" element={<Regiter/>}/>
      <Route path="/questions/:id" element={<QuestionDetail/>}/>
      <Route path="/ask" element={<AskQuestion/>}/>
    </Routes>
     </div>
     
    
    <footer>
      <p>© 2017 AiBina</p>
    </footer>
    </div>
    </appState.Provider>
  )
}

 

export default App
