let square120=document.getElementById('gameScreen');
let audio=document.getElementById('Theme');
for(var i=0;i<20;i++){
    var rows=document.createElement('div')
    rows.className=`row ${i+1}`
    square120.appendChild(rows);
    for(var j=0;j<10;j++){
        var rows2=document.createElement('div')
        rows.appendChild(rows2);
        rows2.className=`column${j+1} empty`
        rows2.style.background='transparent'
    }
}
let reset=true;
let score=0;
let scoredisplay=document.getElementById('changer')
let buttondiscript=document.getElementById('nextword')
let shapearray=[0,1,2,3,4,5,6]
function selectshape(){
    let randomarray=[]
    for(var i=0;randomarray.length<7;i++){
        var random=Math.floor(Math.random()*shapearray.length)
        var transfer=shapearray[shapearray.length-1]
        shapearray[shapearray.length-1]=shapearray[random]
        shapearray[random]=transfer
        randomarray[i]=shapearray.pop();
    }
    return randomarray
}
shapearray=selectshape()
let increment=1;
let nextshape=shapearray[increment]
let currentshape=shapearray[0]
let level=0;
let line=0;
let totalline=0;
let linedisplay=document.getElementById('line');
let color=undefined;
function initialcolor(){
    switch(currentshape){
        case 0:color='url(./Images/aqua.png)';break
        case 1:color='url(./Images/yellow.png)';break
        case 2:color='url(./Images/purple.png)';break
        case 3:color='url(./Images/orange.png)';break
        case 4:color="url(./Images/blue.png)";break
        case 5:color="url(./Images/red.png)";break
        case 6:color='url(./Images/green.png)';break
    }
}
let nextcolor=undefined
let leveldisplay=document.getElementById('levelin')
let button=document.getElementById('buttonDisplay');
let buttonbg=document.getElementById('button')
button.style.display='none';
for(var i=0;i<4;i++){
    var rows=document.createElement('div')
    rows.className=`Nrow${i+1}`
    button.appendChild(rows)
    for(var j=0;j<4;j++){
        var rows2=document.createElement('div')
        rows.appendChild(rows2);
        rows2.className=`column${j+1} empty`
        rows2.style.background='transparent'
    }
}
let busy=false;
let row=document.getElementsByClassName("row");
let currentRow=1;
let ccolumn=5;
let pause=true
let WhereItWas=[]
let clean=true
let rotatee=0
let commit=false
let scoreboard=document.getElementById('scoreboard')
let userinput=document.getElementsByName('username')[0]

function clearscore(){
    while(scoreboard.childNodes.length>0){
        scoreboard.removeChild(scoreboard.firstChild)
    }
}

function sortusers(ref=3){
    let sortbuttons=Array.prototype.slice.call(document.getElementsByClassName('tbutton'))
    sortbuttons.forEach(e=>e.classList.remove('active'))
    sortbuttons[ref-1].classList.add('active')
    let newarray=Array.prototype.slice.call(scoreboard.children)
    newarray.sort(function(a,b){return b.children[0].children[ref].innerHTML-a.children[0].children[ref].innerHTML})
    scoreboard.children=newarray
    clearscore()
    for(var i=0;i<newarray.length;i++){
        scoreboard.appendChild(newarray[i])
    }
}

function listusers(){
    var newrec=document.getElementById('temporec')
    if(newrec!=undefined){
        newrec=newrec.children[0]
        var username=newrec.children[0].innerHTML
        if(username==null){
            username='j2w9bm7q'
        }
        var usernumb=localStorage.getItem('usernumb')
        usernumb++
        localStorage.setItem('usernumb',usernumb)
        localStorage.setItem(`user${usernumb}`,username)
        localStorage.setItem(`user${usernumb}level`,level)
        localStorage.setItem(`user${usernumb}line`,totalline)
        localStorage.setItem(`user${usernumb}score`,score)
        element=undefined
        level=0;
    }
    clearscore()
    usernumb=localStorage.getItem('usernumb')
    if(usernumb==undefined){
        localStorage.setItem('usernumb',0)
    }else{
        for(var i=1;i<=usernumb;i++){
            var lisitem=document.createElement('li')
            lisitem.id=`user${i}`
            lisitem.oncontextmenu=function(){deletee(this)}
            var username=localStorage.getItem(`user${i}`)
            if(username===null){
                username=`<i>null</i>`
            }
            lisitem.innerHTML=`<div><span>${username}</span><span>${localStorage.getItem(`user${i}line`)}</span><span>${localStorage.getItem(`user${i}level`)}</span><span class='score'>${localStorage.getItem(`user${i}score`)}</span></div>`
            scoreboard.appendChild(lisitem)
        }
        sortusers()
    }
}

var element=undefined
function recordscore(){
    if(element==undefined){
        var recitem=document.createElement('li')
        recitem.id='temporec'
        recitem.innerHTML=`<div><span>null</span><span>${line}</span><span>${level}</span><span class='score'>${score}</span></div>`
        scoreboard.appendChild(recitem)
        element=recitem
    }else{
        if(userinput.value==null||userinput.value==''){
            element.children[0].children[0].innerHTML='null'
        }else{
            element.children[0].children[0].innerHTML=userinput.value
        }
    }
}

cd=document.getElementById('cs')
function cs(state='0'){
    switch(state){
        case 0:cd.children[0].style.display='none';cd.children[1].style.display='none';break
        case 1:cd.children[0].style.display='block';var res=document.getElementById('spacing').children[0];if(score>0){res.style.display='inline-block'}else{res.style.display='none'};cd.children[1].style.display='none';break
        case 2:cd.children[0].style.display='none';cd.children[1].style.display='block';break
    }
}
cs(1)

function nextShape(shape){
    if(button.childNodes[1].childNodes!=undefined){
        for(let i=0;i<button.childNodes.length;i++){
            for(let j=0;j<button.childNodes[i].childNodes.length;j++){
                button.childNodes[i].childNodes[j].style.background='transparent'
            }
        }
        let shapecoords=[]
        switch(shape){
            case 0:shapecoords=[0,0,0,1,0,2,0,3];nextcolor='url(./Images/aqua.png)';break
            case 1:shapecoords=[0,0,0,1,1,0,1,1];nextcolor='url(./Images/yellow.png)';break
            case 2:shapecoords=[0,1,1,0,1,1,1,2];nextcolor='url(./Images/purple.png)';break
            case 3:shapecoords=[0,0,1,0,1,1,1,2];nextcolor='url(./Images/orange.png)';break
            case 4:shapecoords=[0,2,1,0,1,1,1,2];nextcolor="url(./Images/blue.png)";break
            case 5:shapecoords=[0,1,0,2,1,0,1,1];nextcolor="url(./Images/red.png)";break
            case 6:shapecoords=[0,0,0,1,1,1,1,2];nextcolor='url(./Images/green.png)';break
        }
        for(let i=1;i<shapecoords.length;i=i+2){
            button.childNodes[shapecoords[i]].childNodes[shapecoords[i-1]].style.background=nextcolor;
        }
    }
}

function deletee(element){
    addEventListener("contextmenu",(e)=>{e.preventDefault()})
    if(window.confirm('do you wish to delet this record?')){
        var usernumb=localStorage.getItem('usernumb')
        localStorage.setItem(element.id,localStorage.getItem(`user${usernumb}`))
        localStorage.setItem(`${element.id}line`,localStorage.getItem(`user${usernumb}line`))
        localStorage.setItem(`${element.id}level`,localStorage.getItem(`user${usernumb}level`))
        localStorage.setItem(`${element.id}score`,localStorage.getItem(`user${usernumb}score`))
        localStorage.removeItem(`user${usernumb}`);
        localStorage.removeItem(`user${usernumb}line`);
        localStorage.removeItem(`user${usernumb}level`);
        localStorage.removeItem(`user${usernumb}score`);
        usernumb--
        localStorage.setItem('usernumb',usernumb)
        listusers()
    }
}

function addlevel(){
    if(level<23){
        level+=3
        leveldisplay.innerHTML=level
    }
}

let playmusic=true
function music(){
    var md=Array.prototype.slice.call(document.getElementsByClassName('Mstate'))
    if(playmusic){
        md.forEach(x=>x.innerHTML='off')
        playmusic=false
        audio.pause
        
    }else{
        md.forEach(x=>x.innerHTML='on')
        playmusic=true
        audio.play
    }
}
let newbuttons=document.getElementsByClassName('play')

function Dabutton(){
    if(pause){
        if(reset){
            listusers()
            resetboard()
            newbuttons[0].innerHTML='Resume'
            newbuttons[1].innerHTML='Resume'
            reset=false
        }
        buttonbg.style.background='none'
        button.style.display='block';
        pause=false;
        nextShape(nextshape)
        buttondiscript.innerHTML='Next:';
        cs(0)
        if(playmusic){
            audio.play();
        }
    }else{
        buttonbg.style.background='url(./Images/pause-button.png)'
        buttonbg.style.backgroundSize='170%'
        buttonbg.style.backgroundPosition='center'
        button.style.display='none'
        buttondiscript.innerHTML='Paused'
        pause=true;
        audio.pause();
        cs(1)
    }
}

function confit(x){
    recordscore()
    if(x.innerHTML=='cancel'){
        element.remove()
    }else{
        listusers()
    }
    score=0
    leveldisplay.innerHTML=level
    cs(1)
    element=undefined
}

function resetboard(){
    for(var i=0;i<row.length;i++){
        for(var j=0;j<row[i].childNodes.length;j++){
            row[i].childNodes[j].style.background='transparent'
        }
    }
    score=0
    line=0
    linedisplay.innerHTML=line
    scoredisplay.innerHTML=score
    leveldisplay.innerHTML=level
    shapearray=selectshape()
    increment=1;
    currentshape=shapearray[0]
    initialcolor()
    nextshape=shapearray[1]
    currentRow=1;
    ccolumn=5;
}

function endgame(){
    buttonbg.style.background='url(./Images/playbutton.png)'
    buttonbg.style.backgroundSize='130%'
    buttonbg.style.backgroundPosition='center'
    button.style.display='none'
    buttondiscript.innerHTML='Play again'
    pause=true;
    reset=true;
    newbuttons[0].innerHTML='New game'
    newbuttons[1].innerHTML='New game'
    audio.pause();
    cs(2)
    recordscore()
}

function rowCheck(){
    let checkcount=0;
    for(var i=0;i<row[0].childNodes.length;i++){
        if(row[0].childNodes[i].style.background!='transparent'){
            endgame()
            break;
        }
    }
    for(var i=1;i<row.length;i++){
        var rooow=row[i].childNodes
        var execute=true
        for(var j=0;j<rooow.length;j++){
            if(rooow[j].style.background=='transparent'){
                execute=false
                break;
            }
        }
        if(execute){
            checkcount++
            line++
            totalline++
            linedisplay.innerHTML=totalline;
            linedisplay.parentElement.style.backgroundColor='yellow'
            setTimeout(function(){
                linedisplay.parentElement.style.backgroundColor='transparent'
            },500)
            for(var j=0;j<rooow.length;j++){
                for(var minus=0;i-minus>1;minus++){
                    row[i-minus].childNodes[j].style.background=row[i-1-minus].childNodes[j].style.background;
                }
            }
        }
    }
    switch(checkcount){
        case 1:score=score+100*(level+1);break;
        case 2:score=score+300*(level+1);break;
        case 3:score=score+500*(level+1);break;
        case 4:score=score+800*(level+1);break;
    }
    if(line>=10){
        line-=10;
        level++;
        leveldisplay.innerHTML=level;
        leveldisplay.parentElement.style.backgroundColor='yellow'
        setTimeout(function(){
            leveldisplay.parentElement.style.backgroundColor='transparent'
        },500)
    }
    scoredisplay.innerHTML=score;
}

function moveblock(x,y){
    if (clean == false) {
        WhereItWas=[]
        clean=true
    }
    if(row[currentRow+x]!=undefined){
        if(row[currentRow+x].childNodes[ccolumn+y]!=undefined){
            if(row[currentRow+x].childNodes[ccolumn+y].style.background=='transparent'||WhereItWas.findIndex(un=>un==row[currentRow+x].childNodes[ccolumn+y])!=-1){
                if(commit==true){
                    WhereItWas.push(row[currentRow+x].childNodes[ccolumn+y])
                    row[currentRow+x].childNodes[ccolumn+y].style.background=color;
                }
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
}

function shapedown(){
    var one=undefined
    var two=undefined
    var three=undefined
    var four=undefined
    var five=undefined
    var six=undefined
    var seven=undefined
    var eight=undefined
    if(currentshape==0){
        if(rotatee==1){
            one=-1;
            five=1;
            seven=2;
            two=three=four=six=eight=0;
        }else if(rotatee==3){
            three=0;
            five=1;
            seven=2;
            one=two=four=six=eight=-1;
        }else if(rotatee==0){
            four=1;
            six=-1;
            eight=-2;
            one=two=three=five=seven=0;
        }else if(rotatee==2){
            two=0;
            six=-1;
            eight=-2;
            one=three=four=five=seven=1;
        }
    }else if(currentshape==1){
        one=two=three=six=-1;
        four=five=seven=eight=0;
    }else if(currentshape==2){
        one=four=-1;
        two=three=five=six=seven=0;
        eight=1;
        if(rotatee==1){
            three=1;
            four=0;
        }else if(rotatee==2){
            one=1;
        }else if(rotatee==3){
            seven=1;
            eight=0;
        }
    }else if(currentshape==3){
        five=six=0;
        if(rotatee==0){
            one=two=three=-1;
            four=eight=0;
            seven=1;
        }else if(rotatee==1){
            one=four=-1;
            two=eight=1;
            three=seven=0;
        }else if(rotatee==2){
            one=-1;
            two=eight=0;
            three=four=seven=1;
        }else{
            one=seven=0;
            two=four=-1;
            three=eight=1;
        }
    }else if(currentshape==4){
        five=six=0;
        if(rotatee==0){
            one=three=-1;
            four=eight=0;
            seven=two=1;
        }else if(rotatee==1){
            four=-1;
            eight=one=two=1;
            three=seven=0;
        }else if(rotatee==2){
            one=four=-1;
            two=eight=0;
            seven=three=1;
        }else{
            one=seven=0;
            two=four=three=-1;
            eight=1;
        }
    }else if(currentshape==5){
        three=four=0;
        if(rotatee==0){
            one=two=five=-1;
            six=seven=0;
            eight=1;
        }else if(rotatee==1){
            one=-1;
            two=six=seven=1;
            five=eight=0;
        }else if(rotatee==2){
            one=six=0;
            two=-1;
            five=seven=eight=1;
        }else{
            one=six=eight=-1;
            two=five=0;
            seven=1;
        }
    }else if(currentshape==6){
        three=four=0;
        if(rotatee==0){
            one=five=eight=-1;
            two=1;
            six=seven=0;
        }else if(rotatee==1){
            one=-1;
            two=five=0;
            six=seven=eight=1;
        }else if(rotatee==2){
            one=eight=five=1;
            two=-1;
            six=seven=0;
        }else{
            one=two=six=-1;
            five=eight=0;
            seven=1;
        }
    }
    let moveAray=[];
    moveAray.push(moveblock(one,two))
    moveAray.push(moveblock(three,four))
    moveAray.push(moveblock(five,six))
    moveAray.push(moveblock(seven,eight))
    busy=false
    if(moveAray.findIndex(x=>x==false)!=-1){
        return false
    }
    return true
}

function removeblock(){
    for(var i=0;i<WhereItWas.length;i++){
        WhereItWas[i].style.background='transparent'
    }
}
function checkright(){
    ccolumn++
    if(shapedown()==false){
        ccolumn--
        return false
    }
    return true
}

function checkleft(){
    ccolumn--
    if(shapedown()==false){
        ccolumn++
        return false
    }
    return true
}

function shape(key='not important'){
    if(clean==true&pause==false&reset==false){
        removeblock()
        WhereItWas=[]
        if(key=='downkey'){
            busy=true;
            currentRow++;
            if(shapedown()==false){
                currentRow--
            }else{
                score++
                scoredisplay.innerHTML=score;
            }
        }
        if(key=='upkey'){
            if(rotatee==3){
                rotatee=-1
            }
            rotatee++
            if(shapedown()==false){
                if(checkright()==false){
                    if(checkleft()==false){
                        rotatee--
                    }
                }
            }
        }
        if(key=='Rightkey'){
            checkright()
        }
        if(key=='leftkey'){
            checkleft()
        }
        commit=true;
        if(shapedown()==false){
            currentRow--
            removeblock()
            shapedown()
            pause=true;
            clean=false;
            currentRow=1;
            ccolumn=5;
            rotatee=0;
            currentshape=nextshape;
            color=nextcolor;
            increment++
            if(increment==7){
                shapearray=selectshape()
                increment=0
            }
            nextshape=shapearray[increment]
            nextShape(nextshape)
            rowCheck();
            shapedown();
            setTimeout(function(){if(reset==false){pause=false}},down,(518-19*(level+1))*500/480);
        }else{
            shapedown()
        }
    commit=false
    }
}

function down(){
    if(pause==false&reset==false){
        shape()
        if(busy==false){
            currentRow++
        }
    }
    setTimeout(down,(518-19*(level+1))*1000/480)
}

document.addEventListener("keydown",function(event){
    console.log(event.key)
    if(pause==false){
        if(event.key=='ArrowLeft'){
            shape('leftkey')
        }
        if(event.key=='ArrowRight'){
            shape('Rightkey')
        }
        if(event.key=='ArrowDown'){
            shape('downkey')
        }
        if(event.key=='ArrowUp'){
            shape('upkey')
        }
    }
})
document.addEventListener('visibilitychange',function(){
    if(reset==false){
        if(pause){
            pause=false
        }
        Dabutton()
    }
})
document.body.onkeyup=function(e){
    if(reset==false){
        if(e.keyCode==32){
            Dabutton()
        }
    }
}
setTimeout(down,(518-19*(level+1))*1000/480)
listusers()
// localStorage.clear()