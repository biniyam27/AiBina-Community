import {useContext, useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig'
import './questiondetail.css'
import {appState} from '../App'

function QuestionDetail() {
const { id } = useParams();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState('');
  const token=localStorage.getItem('token')
async function load() {
    const res = await axios.get(`/questions/${id}`);
    setData(res.data.question);
    setAnswers(res.data.answers);
    console.log(res.data)
  }
  async function deleteA(aid){
    await axios.delete(`/answers/${aid}`,{ 
    headers:{
        Authorization:'Bearer '+ token,
      },})

      load()
  }
    const {user}=useContext(appState)
  const titleRef=useRef();
  useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY>=20){
        titleRef.current.classList.add("qtitle");
      }else{
        titleRef.current.classList.remove("qtitle");
      }
    })
  },[])
  useEffect(() => { 
    load(); 
  }, [id]);
  
  async function postAnswer() {
    if (!text.trim()) return;
    await axios.post('/answers/', { questionid: id, answer: text },{ 
    headers:{
        Authorization:'Bearer '+ token,
      },});
    setText('');
    load();
  }

  if (!data) return <div className='loading'>Loading...</div>;
  return (
    <div className='detail-container'>
      <h2 ref={titleRef} className='title-heading'><span className='fas fa-question title-span'></span>{data.title}</h2>
      <div className="detail-wrapper">
      <p>{data.description} <small>asked by {data.username}</small></p>
     
      </div>
     
     <div className="detail-answer">
      <div className="answer-title">
       {answers.length>0 && 
       <div>
        <hr />
       <h3>Answers from Aibinia Community</h3>
       <hr />
       </div>}
       
      </div>
     
      <ul>
        {answers.map(a => (
          <li key={a.answerid} className='answer'>
            <div className="answer-user">
              <span className='fas fa-user usericon'></span>
              <span className="username">{a.username}</span>
            </div>
            <div className='ans-text'><p>{a.answer}</p>{user.userid==a.userid&&<button className='delbtn' onClick={()=>{deleteA(a.answerid)}}>Del</button>}</div>

          </li>
        ))}
      </ul>
     </div>
      
       <div className='post-answer'>
        <hr />
        <textarea rows={5} maxLength={1000} value={text} onChange={e=>setText(e.target.value)} placeholder="Type your answer..." />
          <small className='lengthController'>{text.length}/1000</small>
        <button onClick={postAnswer}>Post Answer</button>
      </div>
      
    </div>
  )
}

export default QuestionDetail
