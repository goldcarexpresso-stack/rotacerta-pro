import React,{useState} from 'react';
export default function Dashboard({t,state,update,createRoute}){
  const [draft,setDraft]=useState({name:'Rota do dia',company:'',vehicle:'carro',packageLimit:50});
  const totalPackages=state.routes.reduce((n,r)=>n+r.packages.length,0);
  return <section className="grid">
    <div className="card"><h2>{t.dashboard}</h2><p>Olá, <b>{state.user.name}</b></p><span className="badge">{state.premium?t.premium:t.free} · {state.points||0} pts</span><div className="mind"><b>🚚 {state.routes.length}<br/><small>{t.routes}</small></b><b>📦 {totalPackages}<br/><small>{t.packages}</small></b></div><button className="ghost" onClick={()=>update({premium:!state.premium})}>⭐ {state.premium?'Usar Grátis':'Ativar Premium Demo'}</button></div>
    <div className="card"><h3>🚚 {t.newRoute}</h3><input placeholder={t.routeName} value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/><input placeholder={t.company} value={draft.company} onChange={e=>setDraft({...draft,company:e.target.value})}/><select value={draft.vehicle} onChange={e=>setDraft({...draft,vehicle:e.target.value})}><option value="moto">Moto com baú</option><option value="carro">Carro</option><option value="suv">SUV</option><option value="van">Van</option><option value="caminhao">Caminhão</option><option value="outro">Outro</option></select><input type="number" min="1" placeholder={t.limit} value={draft.packageLimit} onChange={e=>setDraft({...draft,packageLimit:e.target.value})}/><button onClick={()=>createRoute(draft)}>+ {t.create}</button></div>
    <div className="card"><h3>📋 {t.routes}</h3>{state.routes.length===0 && <p>Nenhuma rota criada ainda.</p>}{state.routes.map(r=><div className="row" key={r.id}><span><b>{r.name}</b><small>{r.vehicle} · {r.packages.length}/{r.packageLimit}</small></span><button onClick={()=>update({activeRouteId:r.id})}>Abrir</button></div>)}</div>
    <div className="card"><h3>💎 {t.premium}</h3><p>Grátis: até 50 pacotes por rota. Premium Brasil: R$ 19,99/mês. EUA/Europa: preço local.</p><button onClick={()=>update({premium:true})}>Teste Premium Demo</button></div>
  </section>;
}
