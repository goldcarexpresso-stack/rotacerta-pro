import React from 'react';
import {googleMapsAddress} from '../services/maps.js';
export default function PackageCard({t,p,update}){
  return <div className="pkg"><b>{p.code}</b><small className={'status-'+p.status}> · {p.district||'Sem bairro'} · {p.status}</small><p>{p.address||'Sem endereço'}</p>{p.photo&&<img src={p.photo} style={{width:72,height:72,objectFit:'cover',borderRadius:12,marginRight:8}}/>}{p.labelPhoto&&<img src={p.labelPhoto} style={{width:72,height:72,objectFit:'cover',borderRadius:12}}/>}<br/><button onClick={()=>update({status:p.status==='delivered'?'pending':'delivered'})}>✅ {t.delivered}</button><button className="ghost" onClick={()=>update({status:'problem'})}>⚠️ {t.problem}</button>{p.address&&<a className="button ghost" href={googleMapsAddress(p.address)} target="_blank">🗺️</a>}</div>;
}
