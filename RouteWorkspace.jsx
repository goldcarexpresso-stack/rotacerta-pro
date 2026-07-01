import React,{useMemo,useState} from 'react';
import PackageForm from '../components/PackageForm.jsx';
import PackageCard from '../components/PackageCard.jsx';
import CargoMap from '../components/CargoMap.jsx';
import Report from '../components/Report.jsx';
import {uid,readImage} from '../utils/storage.js';
import {parseCSV} from '../utils/csv.js';

export default function RouteWorkspace({t,route,state,updateRoute,close}){
  const [tab,setTab]=useState('packages');
  const [query,setQuery]=useState('');
  const [csv,setCsv]=useState('');
  const packages=useMemo(()=>query?route.packages.filter(p=>JSON.stringify(p).toLowerCase().includes(query.toLowerCase())):route.packages,[route.packages,query]);
  const updatePkg=(id,patch)=>updateRoute({...route,packages:route.packages.map(p=>p.id===id?{...p,...patch}:p)});
  const addPkg=(draft)=>{if(!state.premium && route.packages.length>=50){alert(t.freeLimit);return;} updateRoute({...route,packages:[...route.packages,{id:uid(),status:'pending',x:null,y:null,createdAt:new Date().toISOString(),...draft}]});};
  const importCsv=()=>{parseCSV(csv).forEach(addPkg);setCsv('');};
  const setCargo=async(file)=>file&&updateRoute({...route,cargoPhoto:await readImage(file)});
  const checklist=()=>{const issues=[]; const codes=route.packages.map(p=>p.code); const dup=codes.filter((c,i)=>codes.indexOf(c)!==i); if(route.packages.some(p=>!p.address))issues.push('Pacotes sem endereço'); if(route.packages.some(p=>p.x==null))issues.push('Pacotes sem posição na carga'); if(dup.length)issues.push('Identificadores duplicados'); alert(issues.length?'Atenção: '+issues.join(', '):'Carga conferida. Boa rota!');};
  return <section><button className="ghost" onClick={close}>← Voltar</button><div className="card"><h2>{route.name}</h2><p>{route.vehicle} · {route.company||'Sem empresa'} · {route.packages.length}/{route.packageLimit}</p><nav className="tabs"><button onClick={()=>setTab('packages')}>📦 {t.packages}</button><button onClick={()=>setTab('cargo')}>📷 {t.cargo}</button><button onClick={()=>setTab('report')}>📊 {t.report}</button></nav></div>
  {tab==='packages'&&<div className="card"><PackageForm t={t} onAdd={addPkg}/><input placeholder={t.search} value={query} onChange={e=>setQuery(e.target.value)}/><textarea placeholder="CSV: identificador,endereço,bairro" value={csv} onChange={e=>setCsv(e.target.value)}/><button className="ghost" onClick={importCsv}>📥 {t.importCsv}</button>{packages.map(p=><PackageCard key={p.id} t={t} p={p} update={patch=>updatePkg(p.id,patch)}/>)}</div>}
  {tab==='cargo'&&<div className="card"><label className="upload">📷 {t.cargoPhoto}<input hidden type="file" accept="image/*" onChange={e=>setCargo(e.target.files?.[0])}/></label><button className="ghost" onClick={checklist}>✅ Checklist de saída</button><CargoMap t={t} route={route} updatePkg={updatePkg}/></div>}
  {tab==='report'&&<Report t={t} route={route}/>}<div className="footer-actions"><button onClick={checklist}>Conferir carga</button><button className="ghost" onClick={()=>updateRoute({...route,finishedAt:new Date().toISOString()})}>Finalizar rota</button></div></section>;
}
