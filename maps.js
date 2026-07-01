export const googleMapsRoute=(packages=[])=>'https://www.google.com/maps/dir/'+packages.map(p=>encodeURIComponent(p.address||'')).filter(Boolean).join('/');
export const googleMapsAddress=(address)=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address||'');
