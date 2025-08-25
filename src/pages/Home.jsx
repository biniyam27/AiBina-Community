import {useContext, useEffect, useState,useRef} from 'react'
import {appState} from '../App'
import axios from '../axiosConfig'
import './home.css'
import '../fontawesome-free-6.6.0-web/css/all.min.css'
import '../fontawesome-free-6.6.0-web/css/fontawesome.min.css'
import {Link,useNavigate} from 'react-router-dom'
function Home() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const [items,setItem]=useState([]);
  const token=localStorage.getItem('token')
  async function load(){
    const res=await axios.get('/questions',{params:{q,tag}});
    setItem(res.data)
  }
  const {user}=useContext(appState)
  const navRef=useRef();
  useEffect(()=>{
    load();
    window.addEventListener("scroll",()=>{
      if( window.scrollY>=80){
        navRef.current.classList.add("nav_black");
      }else{
        navRef.current.classList.remove("nav_black");
      }
     
    })
  },[])
  async function deleteQ(qid){
    await axios.delete(`/questions/${qid}`,{ 
    headers:{
        Authorization:'Bearer '+ token,
      },})

      load()
  }

  return (
    <div className='home-container'>
      <div className='home-input'>
        <input placeholder="Search title/body..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={load}>Search</button>
        <button onClick={() => { setQ(''); setTag(''); load(); }}>Reset</button>
      </div>
      <h1 className='home-title' ref={navRef}>Latest Questions</h1>
     <ul>
      {items.map((item)=>(
        <li className='home-question-wrraper'>
          <div className="question-wrraper">
            <span className='fas fa-user usericon'></span>
            <div className='question-container'>
            <div className='question'>
             <Link className='questionlink' to={`/questions/${item.questionid}`}>
               <h3>{item.title}</h3>
             </Link>
             <div className="buttons">
               {item.tag && <button onClick={()=>{setTag(item.tag);load()}} className='tagbtn'>{item.tag}</button>}
              {user.userid==item.userid&&<button className='delbtn' onClick={()=>{deleteQ(item.questionid)}}>Del</button>}
             </div>
              
            </div>
            <span >{item.answer_count} answers</span>
            </div>
          </div>
          <span className='fas fa-angle-right arrowicon'></span>
        </li>
      ))}
      
     </ul>
    </div>
  )
}

export default Home
