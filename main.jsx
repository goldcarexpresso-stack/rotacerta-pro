import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles/app.css';
import {dictionary, detectLang} from './i18n/dictionary.js';
import {load, save, uid} from './utils/storage.js';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RouteWorkspace from './pages/RouteWorkspace.jsx';

const initialState = load() || { user:null, lang: detectLang(), premium:false, routes:[], activeRouteId:null, points:0 };

function App(){
  const [state,setState] = useState(initialState);
  const t = useMemo(()=>dictionary[state.lang] || dictionary.pt,[state.lang]);
  const activeRoute = state.routes.find(r=>r.id===state.activeRouteId);
  const update = (patch)=>setState(old=>{const next={...old,...patch}; save(next); return next;});
  const updateRoute = (route)=>update({routes:state.routes.map(r=>r.id===route.id?route:r)});
  const createRoute = (routeDraft)=>{
    const freeLimit = Number(routeDraft.packageLimit || 50);
    const packageLimit = state.premium ? freeLimit : Math.min(freeLimit,50);
    const route = {id:uid(),name:routeDraft.name||'Rota',company:routeDraft.company||'',vehicle:routeDraft.vehicle||'carro',packageLimit,createdAt:new Date().toISOString(),cargoPhoto:null,packages:[],finishedAt:null};
    update({routes:[route,...state.routes],activeRouteId:route.id,points:state.points+20});
  };
  if(!state.user) return <Login t={t} state={state} update={update}/>;
  return <main className="app">
    <header className="top"><div className="brand"><b>RotaCerta Pro</b><small>{t.slogan}</small></div><select value={state.lang} onChange={e=>update({lang:e.target.value})}><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select></header>
    {activeRoute ? <RouteWorkspace t={t} route={activeRoute} state={state} updateRoute={updateRoute} close={()=>update({activeRouteId:null})}/> : <Dashboard t={t} state={state} update={update} createRoute={createRoute}/>} 
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);
