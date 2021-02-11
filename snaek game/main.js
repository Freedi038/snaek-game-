
const cv=document.createElement('canvas');
cv.width=400;
cv.height=400;
cv.style.border='2px solid white';
bd=document.body;
bd.appendChild(cv);
bd.style.background='black';
const gt=cv.getContext('2d'), gr=16;
let ct=0,lv=1,t=0,p=0,
sk={x:160,y:160,dx:gr, dy:0,c:[], mc:4},
wr={x:320,y:320};
function rndI(min, max){
return Math.floor(Math.random()*(max-min))+min;
}
function lp(){
setTimeout(function(){requestAnimationFrame(lp)}, p||200/lv);
if(++ct<4)return;
ct=0;
gt.clearRect(0,0,400,400);
sk.x+=sk.dx;
sk.y+=sk.dy;
if(sk.x<0)sk.x=cv.width-gr;
else if(sk.x>=cv.width)sk.x=0;
if(sk.y<0)sk.y=cv.height-gr;
else if(sk.y>=cv.height)sk.y=0;
sk.c.unshift({x: sk.x, y: sk.y});
if(sk.c.length > sk.mc)sk.c.pop();
gt.fillStyle='red';
gt.fillRect(wr.x, wr.y, gr-1,gr-1);
gt.fillStyle='green';
gt.font = '30px';
gt.strokeStyle = "blue";
gt.strokeText(`Lev: ${lv} Tot: ${t}`, 325, 20);
sk.c.forEach(function(c, index){
gt.fillRect(c.x, c.y, gr-1,gr-1);
if(c.x===wr.x && c.y===wr.y){
sk.mc++;
wr.x=rndI(0,25)*gr;
wr.y=rndI(0,25)*gr;
lv=Math.ceil(++t/3);
}
for(var i=index+1;i<sk.c.length;i++){
if(c.x===sk.c[i].x && c.y===sk.c[i].y){
sk.x=160;
sk.y=160;
sk.c=[];
sk.mc=4;
sk.dx=gr;
sk.dy=t=0;
wr.x=rndI(0, 25)*gr;
wr.y=rndI(0, 25)*gr;
lv=1;
}
}
});
}
document.addEventListener('keydown', function(e){
if(e.which==37 && sk.dx===0){
sk.dx=-gr;
sk.dy=0;
}
else if(e.which==38 && sk.dy===0){
sk.dy=-gr;
sk.dx=0;
}
else if(e.which==39 && sk.dx===0){
sk.dx=gr;
sk.dy=0;
}
else if(e.which==40 && sk.dy===0){
sk.dy=gr;
sk.dx=0;
}else if(e.which==32){
if(p){
p=0;
requestAnimationFrame(lp);
}else{
p=10000;
}
}
});
requestAnimationFrame(lp);
