const V='daftari-2.4.1-web';
const FILES=['./','index.html','manifest.json','pdf.min.js','pdf.worker.min.js','pdf-lib.min.js','mammoth.min.js','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','icons/logo.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
