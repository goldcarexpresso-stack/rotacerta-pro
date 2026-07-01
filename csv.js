export function parseCSV(text){
  return text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean).map(line=>{
    const [code,address,district] = line.split(',').map(x=>x?.trim()||'');
    return {code,address,district};
  }).filter(p=>p.code);
}
export function downloadCSV(packages){
  const rows=['identificador,endereco,bairro,status',...packages.map(p=>[p.code,p.address,p.district,p.status].map(v=>`"${String(v||'').replaceAll('"','""')}"`).join(','))];
  const blob=new Blob([rows.join('\n')],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='rotacerta-pacotes.csv';a.click();URL.revokeObjectURL(a.href);
}
