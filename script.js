const credentials=[
{title:'Endpoint Administrator Associate',code:'MD-102',image:'assets/certificates/md102.png',pdf:'assets/certificates/md102.pdf',issuer:'Microsoft',url:'https://learn.microsoft.com/api/credentials/share/en-gb/AsadAsad-3030/A9370CF8C2244E33?sharingId=AECCB2C3F95ED541'},
{title:'Azure Fundamentals',code:'AZ-900',image:'assets/certificates/az900.png',pdf:'assets/certificates/az900.pdf',issuer:'Microsoft',url:'https://learn.microsoft.com/api/credentials/share/en-gb/AsadAsad-3030/7671A8E3DDBE244B?sharingId=AECCB2C3F95ED541'},
{title:'Security, Compliance & Identity Fundamentals',code:'SC-900',image:'assets/certificates/sc900.png',pdf:'assets/certificates/sc900.pdf',issuer:'Microsoft',url:'https://learn.microsoft.com/api/credentials/share/en-gb/AsadAsad-3030/9B50AA4EECFC3D85?sharingId=AECCB2C3F95ED541'},
{title:'Microsoft 365 Fundamentals',code:'MS-900',image:'assets/certificates/ms900.png',pdf:'assets/certificates/ms900.pdf',issuer:'Microsoft',url:'https://learn.microsoft.com/api/credentials/share/en-gb/AsadAsad-3030/4099FB8331D72836?sharingId=AECCB2C3F95ED541'},
{title:'Network Security Expert 1',code:'NSE 1',image:'assets/certificates/nse1.png',pdf:'assets/certificates/nse1.pdf',issuer:'Fortinet',url:'https://training.fortinet.com/pluginfile.php/1/tool_certificate/issues/1792682205/3121523882AA.pdf'},
{title:'Network Security Expert 2',code:'NSE 2',image:'assets/certificates/nse2.png',pdf:'assets/certificates/nse2.pdf',issuer:'Fortinet',url:'https://training.fortinet.com/pluginfile.php/1/tool_certificate/issues/1792682226/0409938135AA.pdf'},
{title:'Network Security Expert 3',code:'NSE 3',image:'assets/certificates/nse3.png',pdf:'assets/certificates/nse3.pdf',issuer:'Fortinet',url:'https://training.fortinet.com/pluginfile.php/1/tool_certificate/issues/1792682155/5929906083AA.pdf'},
{title:'Network Security Expert 4 — Course Certificate',code:'NSE 4',image:'https://networkat.net/netacad/Certificates/NetKat659269e21b3025cb6.png',issuer:'Networkat',url:'https://networkat.net/netacad/Certificates/NetKat659269e21b3025cb6.png'},
{title:'CCNA — Course Certificate',code:'CCNA',image:'https://networkat.net/netacad/Certificates/NetKat659269e21b361799c.png',issuer:'Networkat',url:'https://networkat.net/netacad/Certificates/NetKat659269e21b361799c.png'}
];
const extraCredentials=[
{title:'Advanced JavaScript Training · 35 hours',code:'JavaScript',issuer:'Training',image:'assets/certificates/advanced-javascript.png',url:'assets/certificates/advanced-javascript.pdf'},
{title:'Electrical Layouts for Housing · 60 hours',code:'Electrical',issuer:'Training',image:'assets/certificates/electrical-layouts.png',url:'assets/certificates/electrical-layouts.pdf'},
{title:'Fursa Community Civil Service · 120 hours',code:'Fursa',issuer:'Volunteering',image:'assets/certificates/fursa.png',url:'assets/certificates/fursa.pdf'},
{title:'Training & Small Business Workshops',code:'Leadership',issuer:'Volunteering',image:'assets/certificates/training-leadership.png',url:'assets/certificates/training-leadership.pdf'}
];
const allCredentials=[...credentials,...extraCredentials];
const grid=document.getElementById('cert-grid');function render(filter='all'){
 grid.innerHTML=allCredentials.filter(c=>filter==='all'||(filter==='Additional'?extraCredentials.includes(c):c.issuer===filter)).map(c=>`<article class="cert ${c.featured?'featured':''}"><div class="cert-top"><span class="issuer">${c.issuer}</span><span class="arrow">↗</span></div><button class="cert-open" type="button" aria-label="Preview ${c.code} certificate"><div class="cert-preview">${c.image?`<img src="${c.image}" alt="${c.code} certificate preview" loading="lazy" onerror="this.remove()">`:''}<span class="preview-placeholder">${c.code}</span></div><strong class="cert-code">${c.code}</strong><h3>${c.title}</h3><span class="verify">Preview certificate ↗</span></button></article>`).join('');
 grid.querySelectorAll('.cert-open').forEach((button,i)=>button.addEventListener('click',()=>openCertificate(allCredentials.filter(c=>filter==='all'||(filter==='Additional'?extraCredentials.includes(c):c.issuer===filter))[i])));
}
function openCertificate(c) {
  const dialog = document.getElementById('certificate-dialog');
  document.getElementById('dialog-title').textContent = c.code + ' — ' + c.title;
  const frame = document.getElementById('certificate-frame');
  const fallback = document.getElementById('certificate-fallback');
  const originalLink = document.getElementById('certificate-original');
  const fullLink = document.getElementById('certificate-pdf');

  // Clear the previous certificate completely before showing another one.
  frame.replaceChildren();
  fallback.textContent = '';
  fullLink.hidden = true;
  fullLink.removeAttribute('href');

  if (c.image) {
    const img = document.createElement('img');
    img.src = c.image;
    img.alt = c.code + ' certificate';
    frame.append(img);
  } else if (c.pdf || (c.url && /\.pdf(?:[?#]|$)/i.test(c.url))) {
    const embed = document.createElement('iframe');
    embed.src = c.pdf || c.url;
    embed.title = c.code + ' certificate PDF';
    embed.loading = 'lazy';
    frame.append(embed);
    fallback.textContent = 'If the PDF does not load, use Open original.';
  } else {
    fallback.textContent = 'A preview is not available. Use Open original to view the certificate.';
  }

  // PDFs use their local PDF; image-only certificates open the full image.
  const fullFile = c.pdf || (!c.pdf && c.image ? c.image : null);
  if (fullFile) {
    fullLink.href = fullFile;
    fullLink.textContent = /\.pdf(?:[?#]|$)/i.test(fullFile)
      ? 'Open full PDF ↗'
      : 'Open full image ↗';
    fullLink.hidden = false;
  }

  originalLink.href = c.url;
  originalLink.textContent = c.url.startsWith('assets/')
    ? 'Open original PDF ↗'
    : 'Verify credential ↗';
  dialog.showModal();
}document.getElementById('dialog-close').addEventListener('click',()=>document.getElementById('certificate-dialog').close());document.getElementById('certificate-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
render();document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)}));document.getElementById('year').textContent=new Date().getFullYear();const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

// Keep a subtle selection only after a certificate is opened.
let lastSelectedCode=null;
const previousOpenCertificate=openCertificate;
openCertificate=function(c){lastSelectedCode=c.code;document.querySelectorAll('.cert').forEach(card=>card.classList.toggle('selected',card.dataset.code===c.code));previousOpenCertificate(c)};
const previousRender=render;
render=function(filter='all'){previousRender(filter);document.querySelectorAll('.cert').forEach((card,i)=>{const filtered=allCredentials.filter(c=>filter==='all'||(filter==='Additional'?extraCredentials.includes(c):c.issuer===filter));card.dataset.code=filtered[i].code;card.classList.toggle('selected',filtered[i].code===lastSelectedCode)})};
render();
const pd=document.getElementById('project-dialog');
document.querySelectorAll('[data-shot]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('project-dialog-image').src=b.dataset.shot;document.getElementById('project-dialog-title').textContent=b.dataset.caption;pd.showModal()}));
document.getElementById('project-dialog-close').addEventListener('click',()=>pd.close());
pd.addEventListener('click',e=>{if(e.target===pd)pd.close()});
