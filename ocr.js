export async function readLabel(file){
  if(!file) return '';
  try{
    const Tesseract = await import('tesseract.js');
    const {data:{text}} = await Tesseract.recognize(file,'por+eng+spa');
    return text || '';
  }catch(err){
    console.warn('OCR indisponível',err);
    return '';
  }
}
