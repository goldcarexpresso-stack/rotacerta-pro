const KEY='rotacerta-pro-mobile-ready-v1';
export const uid=()=>crypto?.randomUUID?.() || String(Date.now()+Math.random());
export const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch{return null}};
export const save=(state)=>localStorage.setItem(KEY,JSON.stringify(state));
export const readImage=(file)=>new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});
