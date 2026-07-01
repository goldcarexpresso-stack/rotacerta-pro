import React,{useState} from 'react';
import {uid} from '../utils/storage.js';
export default function Login({t,state,update}){
  const [name,setName]=useState('');
  const login=()=>update({user:{id:uid(),name:name||'Entregador',email:'demo@rotacerta.app',plan:'free',createdAt:new Date().toISOString()}});
  return <section className="login"><div className="card hero"><div className="logo">📦</div><h1>RotaCerta Pro</h1><p>{t.slogan}</p><input value={name} onChange={e=>setName(e.target.value)} placeholder={t.name}/><button onClick={login}>🚀 {t.enter}</button><button className="ghost" onClick={()=>update({user:{id:uid(),name:'Demo',email:'demo@rotacerta.app',plan:'free'}})}>G Google Demo</button><select value={state.lang} onChange={e=>update({lang:e.target.value})}><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option></select><small>Firebase já está preparado. Coloque suas chaves no .env quando criar o projeto.</small></div></section>;
}
