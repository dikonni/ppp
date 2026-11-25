(function(){
var S=[].slice.call(document.querySelectorAll('.s')),n=S.length,i=0,D=document.getElementById('dots');
S.forEach(function(_,k){var b=document.createElement('b');b.onclick=function(){go(k)};D.appendChild(b)});
document.querySelectorAll('[data-split]').forEach(function(e){var t=e.textContent,off=!!e.dataset.off;e.textContent='';var k=0;
 t.split(' ').forEach(function(w,wi){if(wi)e.appendChild(document.createTextNode(' '));var ws=document.createElement('span');ws.style.cssText='display:inline-block;white-space:nowrap';
  w.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.textContent=c;s.style.setProperty('--i',k);if(off)s.style.animationDelay=(1.6+k*.06)+'s';k++;ws.appendChild(s)});e.appendChild(ws)})});
function go(k){if(k<0||k>=n||k===i)return;S[i].classList.remove('on');S[k].classList.add('on');i=k;ui()}
function ui(){document.getElementById('cnt').textContent=(i+1)+' / '+n;document.getElementById('bar').style.width=((i+1)/n*100)+'%';[].forEach.call(D.children,function(b,k){b.classList.toggle('on',k===i)});
 document.getElementById('pv').style.opacity=i?1:.4;document.getElementById('nx').style.opacity=i<n-1?1:.4;T=P[i]}
document.getElementById('pv').onclick=function(){go(i-1)};document.getElementById('nx').onclick=function(){go(i+1)};document.getElementById('start').onclick=function(){go(1)};
document.getElementById('fs').onclick=function(){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}};
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();go(i+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(i-1)}else if(e.key==='f'||e.key==='F')document.getElementById('fs').click()});
document.getElementById('fc').onclick=function(){this.classList.toggle('open')};
document.querySelectorAll('.gm').forEach(function(g){g.onclick=function(){g.classList.toggle('open')}});
/* tilt + parallax */
var mx=0,my=0;
document.addEventListener('mousemove',function(e){mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;tp.push({x:e.clientX,y:e.clientY,a:1});
 var t=e.target.closest&&e.target.closest('.tilt');if(t){var r=t.getBoundingClientRect();t.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');t.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*14+'deg')}});
document.querySelectorAll('.tilt').forEach(function(t){t.addEventListener('mouseleave',function(){t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')})});
/* cursor trail */
var tc=document.getElementById('tr'),tx=tc.getContext('2d'),tp=[];
function rs(){tc.width=innerWidth;tc.height=innerHeight}rs();addEventListener('resize',rs);
/* three.js */
var P=[{x:5.2,y:.2,z:0,s:1.2,o:.9},{x:6.2,y:3,z:-4,s:.5,o:.35},{x:-6.5,y:3,z:-5,s:.5,o:.35},{x:-7,y:-3,z:-4,s:.55,o:.4},{x:0,y:3.8,z:-6,s:.6,o:.35},{x:0,y:0,z:-8,s:.9,o:.25},{x:0,y:0,z:0,s:1.9,o:1}],T=P[0];
var cv=document.getElementById('gl'),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);cam.position.z=10;
function rz(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}rz();addEventListener('resize',rz);
var G=new THREE.Group();sc.add(G);
var core=new THREE.Mesh(new THREE.SphereGeometry(1.1,32,32),new THREE.MeshBasicMaterial({color:0x7548FF,transparent:true,opacity:.35}));
var wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,2),new THREE.MeshBasicMaterial({color:0x36D9FF,wireframe:true,transparent:true,opacity:.5}));
var wire2=new THREE.Mesh(new THREE.IcosahedronGeometry(2.3,1),new THREE.MeshBasicMaterial({color:0xFF72C6,wireframe:true,transparent:true,opacity:.25}));
var ring=new THREE.Mesh(new THREE.TorusGeometry(3,.02,8,100),new THREE.MeshBasicMaterial({color:0x36D9FF}));ring.rotation.x=1.2;
var ring2=new THREE.Mesh(new THREE.TorusGeometry(3.5,.02,8,100),new THREE.MeshBasicMaterial({color:0xFF72C6}));ring2.rotation.x=1.9;ring2.rotation.y=.5;
G.add(core,wire,wire2,ring,ring2);
var pn=700,pg=new THREE.BufferGeometry(),pa=new Float32Array(pn*3);
for(var k=0;k<pn;k++){var r=3+Math.random()*5,a=Math.random()*6.28,b=Math.acos(2*Math.random()-1);pa[k*3]=r*Math.sin(b)*Math.cos(a);pa[k*3+1]=r*Math.sin(b)*Math.sin(a);pa[k*3+2]=r*Math.cos(b)}
pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
var pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x9fe9ff,size:.05,transparent:true,opacity:.8}));G.add(pts);
var bk=[],cols=[0x36D9FF,0xFF72C6,0x7548FF,0xffffff,0x36D9FF,0xFF72C6];
for(var k=0;k<6;k++){var g=new THREE.BoxGeometry(.9,.12,1.2),m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:cols[k],transparent:true,opacity:.18}));
 m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:cols[k]})));
 m.userData={a:k*1.05,r:6+(k%3)*1.2,y:(k-2.5)*1.3,sp:.15+k*.03};sc.add(m);bk.push(m)}
var cur={x:5.2,y:.2,z:0,s:1.2,o:.9},clk=new THREE.Clock();
var bf=0;function L(a,b,t){return a+(b-a)*t}
function loop(){requestAnimationFrame(loop);var t=clk.getElapsedTime(),d=.05;bf=L(bf,i===0?1:0,.04);
 cur.x=L(cur.x,T.x,d);cur.y=L(cur.y,T.y,d);cur.z=L(cur.z,T.z,d);cur.s=L(cur.s,T.s,d);cur.o=L(cur.o,T.o,d);
 G.position.set(cur.x,cur.y+Math.sin(t)*.2,cur.z);G.scale.setScalar(cur.s*(i===n-1?1+Math.sin(t*1.5)*.06:1));
 core.material.opacity=.35*cur.o+.1;wire.material.opacity=.55*cur.o;wire2.material.opacity=.3*cur.o;pts.material.opacity=.8*cur.o;
 core.scale.setScalar(1+Math.sin(t*2)*.05);wire.rotation.y=t*.3;wire.rotation.x=t*.15;wire2.rotation.y=-t*.2;ring.rotation.z=t*.4;ring2.rotation.z=-t*.3;
 pts.rotation.y=t*.06;var ps=i===n-1?.55+.1*Math.sin(t):1;pts.scale.setScalar(L(pts.scale.x,ps,.02));
 bk.forEach(function(m){var u=m.userData,a=u.a+t*u.sp;m.position.set(Math.cos(a)*u.r*(.9-.35*bf)+4.2*bf,u.y+Math.sin(t+u.a)*.3,Math.sin(a)*u.r*.4-3);m.rotation.x=t*.4+u.a;m.rotation.y=t*.5;m.material.opacity=.12+.1*cur.o});
 cam.position.x=L(cam.position.x,mx*.8,.04);cam.position.y=L(cam.position.y,-my*.5,.04);cam.lookAt(0,0,0);R.render(sc,cam);
 tx.clearRect(0,0,tc.width,tc.height);tp=tp.filter(function(p){return p.a>.02});tp.forEach(function(p){p.a*=.92;tx.beginPath();tx.arc(p.x,p.y,6*p.a+1,0,6.28);tx.fillStyle='rgba('+(i%2?'255,114,198':'54,217,255')+','+p.a*.7+')';tx.shadowColor='#36D9FF';tx.shadowBlur=12;tx.fill()})}
ui();loop();
})();
