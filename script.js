const questions = [
    {
        question: "내가 제일 좋아하는 음식은?" ,
        answers: [
            { text: "햄버거", correct: true},
            { text: "피자", correct: false},
            { text: "국밥", correct: false},
            { text: "제육", correct: false}
        ]
    },
    {
        question: "내가 제일 좋아하는 술은?" ,
        answers: [
            { text: "칵테일", correct: false},
            { text: "소맥", correct: false},
            { text: "위스키", correct: true},
            { text: "막걸리", correct: false}
        ]
    },
    {
        question: "내가 지금 듣고있는 학점은?" ,
        answers: [
            { text: "21", correct: false},
            { text: "18", correct: false},
            { text: "15", correct: true},
            { text: "13", correct: false}
        ]
    },
    {
        question: "내 본가의 위치는?" ,
        answers: [
            { text: "창원", correct: false},
            { text: "기장", correct: false},
            { text: "용호동", correct: false},
            { text: "다대포", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
       const button  = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButton.appendChild(button);
       if(answer.correct){
            button.dataset.correct = answer.correct;
       }
       button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
     nextButton.style.display = "none";
     while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();