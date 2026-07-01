import React,{useState} from 'react';
export default function CargoMap({t,route,updatePkg}){
  const [selected,setSelected]=useState(route.packages[0]?.id||'');
  const mark=(e)=>{if(!selected)return; const rect=e.currentTarget.getBoundingClientRect(); updatePkg(selected,{x:((e.clientX-rect.left)/rect.width)*100,y:((e.clientY-rect.top)/rect.height)*100});};
  return <><select value={selected} onChange={e=>setSelected(e.target.value)}>{route.packages.map(p=><option key={p.id} value={p.id}>{p.code}</option>)}</select><div className="cargo" onClick={mark}>{route.cargoPhoto?<img src={route.cargoPhoto}/>:<span>{t.noCargo}</span>}{route.packages.map(p=>p.x!=null&&<i key={p.id} className={p.id===selected?'pin active':'pin'} style={{left:p.x+'%',top:p.y+'%'}}>{p.code}</i>)}</div><small>Escolha um pacote e toque na foto para salvar a posição dele na carga.</small></>;
}
