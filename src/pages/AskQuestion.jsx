import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'
import './askquestion.css'

function AskQuestion() {
const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const token=localStorage.getItem('token')

    async function submit() {
    if(!title) return;
    const res = await axios.post('/questions', { title,description: body,tag:tags },{ 
    headers:{
        Authorization:'Bearer '+ token,
      },});
    navigate('/');
    console.log(res)
  }
  return (
    <div className='ask-container'>
      <h1>Ask a Question</h1>
      <div className="ask-input-wrraper">
       <input value={title} maxLength={100} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
        <small className='titleCounter'>{title.length}/100</small>
      <textarea rows={8} maxLength={1000} value={body} onChange={e=>setBody(e.target.value)} placeholder="Describe your problem(optional)"/>
        <small className='bodyCounter'>{body.length}/1000</small>
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags(optional)"/>
      <button onClick={submit}>Post</button>
      </div>
     
    </div>
  )
}

export default AskQuestion
