import data from './data.json' assert {type: 'json'};

let DB = data[1];
let displayLvl = data[0];

const quizlevel = document.getElementById("quizlevel");
for(let i=0;i<displayLvl.length;i++){
    quizlevel.innerHTML+= `<div class="quizCard" data-sno=${displayLvl[i].sno} id=${displayLvl[i].id}>
    <img src=${displayLvl[i].img} alt=${displayLvl[i].name} class="quizImg">
    <div class="quizText">
        <div class="quizTop">
            <h1>${displayLvl[i].name}</h1>
            <p>${displayLvl[i].desc}</p>
            <h6>Total Questions: <span class="totalQue" id="totalQue">10</span></h6>
        </div>
        <div class="quizBtm">
            <p>Free</p>
            <p>Take Test</p>
        </div>
    </div>
</div>`;
}
const nxtBtn = document.querySelector("#nextBtn");
const prvsBtn = document.querySelector("#prvsBtn");
const restartBtn = document.querySelector("#resetBtn");
const ShowBtn = document.querySelector("#ShowBtn");
const exitBtn = document.querySelector("#exit");

const level = document.querySelectorAll(".quizCard");
const quesSec = document.querySelector("#queSec");
const scoreSec = document.querySelector("#scoreSec");
const answerSec = document.querySelector("#answerSec");
const ansSec = document.querySelector(".ansSec");
const FirstLaunchh = document.getElementById("FirstLaunchh");
const totalQue = document.querySelectorAll(".totalQue");


const scorerSec = document.querySelector("#score");
const question = document.querySelector("#ques");
const qNo = document.querySelector("#quesNo");
const queNo = document.querySelector("#queNo");

const op1 = document.querySelector("#op1");
const op2 = document.querySelector("#op2");
const op3 = document.querySelector("#op3");
const op4 = document.querySelector("#op4");
const options = document.querySelectorAll(".option");

let q, quesNo, levelNo, levelName;

let questionList = 0;
let score = 0;
let ansArray = [];
let QueArray = [];
let arCount=0;


window.onload = function (){
    const loadQuestion = () =>{
        q= quesNo[QueArray[questionList]];
        qNo.innerHTML= "Que. "+ (questionList+1)+": ";
        queNo.innerHTML=  (questionList+1)+"/"+QueArray.length;
        question.innerHTML= q.que;
        op1.innerHTML=q.a;
        op2.innerHTML= q.b;
        op3.innerHTML= q.c;
        op4.innerHTML= q.d;
        if((questionList+1)>1){
            prvsBtn.style.display="block";
        }
        else{
            prvsBtn.style.display="none";
        }
    }
    const showScore=()=>{
        quesSec.style.display="none";
        scoreSec.style.display="flex";
    }

    const lvlSelect = ()=> {
        FirstLaunchh.style.display='none';
        quesSec.style.display="flex";
        while(arCount<10){
            let num = Math.floor(Math.random()*quesNo.length);
            let ch = true;
            for(let j=0;j<QueArray.length;j++){
                if(num === QueArray[j]){
                    ch= false;
                    break;
                }
            }
            if(ch){
                QueArray[arCount]=num;
                arCount++;
            }
        }
        // console.log(QueArray);
        loadQuestion();
    }


    nxtBtn.addEventListener("click",()=>{
        let ans,user,correct,color;
        let checkFornxt= true;
        options.forEach(element => {
            if(element.checked){
                ans=element.id;
                checkFornxt=false;
            }
        });
        if(checkFornxt){
            alert("Please Select an Option First.")
        }
        else{
            if(ans === q.ans){
                score=1;
                color="#dcffe6"
            }else{
                score = 0;
                color="#ffd0d0"
            }
            switch(ans){
                case 'opt1':
                    user=q.a;
                    break;
                case 'opt2':
                    user=q.b;
                    break;
                case 'opt3':
                    user=q.c;
                    break;
                case 'opt4':
                    user=q.d;
                    break;
                default:
                    user="No Option Selected"
            }  
            switch(q.ans){
                case 'opt1':
                    correct=q.a;
                    break;
                case 'opt2':
                    correct=q.b;
                    break;
                case 'opt3':
                    correct=q.c;
                    break;
                case 'opt4':
                    correct=q.d;
                    break;
            }  
            ansArray[questionList]={
                que: `${q.que}`,
                you:`${user}`,
                correct:`${correct}`,
                color:`${color}`,
                score:`${score}`
            }
            questionList++;
            options.forEach(element => {
                element.checked=false;
            });
            if(questionList< QueArray.length){
                loadQuestion();
            }
            else{
                let fixScore=0;
                showScore();
                for(let i=0;i<ansArray.length;i++){
                    fixScore+= parseInt(ansArray[i].score);
                }
                scorerSec.innerHTML=` ${fixScore} out of ${questionList}`;
            }
        }
    });
    prvsBtn.addEventListener("click",()=>{
        ansArray.slice(0,-1);
        questionList--;
        loadQuestion();
    });
    
    restartBtn.addEventListener("click",()=>{
        location.reload();
    });
    ShowBtn.addEventListener('click', ()=>{
        window.scrollTo(0,0);
        scoreSec.style.display="none";
        ansSec.style.display="flex";
        for(let i=0; i<ansArray.length; i++){
            answerSec.innerHTML+=`
            <div class="queCard" style="background:${ansArray[i].color.toString()}">
            <h1>Que ${i+1}: ${ansArray[i].que.toString()}</h1>
            <h3> <span class="bold">Your Ans: </span> ${ansArray[i].you.toString()} </h3>
            <h3><span class="bold">Correct Ans:</span> ${ansArray[i].correct.toString()}</h3>
            </div>
            `;
        }
        answerSec.innerHTML+=`<button class="btn-nxt" onclick="location.reload()">Restart</button>`;
    });
    exitBtn.addEventListener('click',()=>{
        let askexit = confirm("Are You Sure Want to Exit. All Progress will be Lost.");
        if(askexit){
            location.reload();
        }
    })

    level.forEach(element => {
        element.addEventListener('click', ()=>{
            levelName = element.dataset.sno;
            quesNo = DB[levelName];
            lvlSelect();
        })
    });
}