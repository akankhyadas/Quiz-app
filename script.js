const questions = [
    {
        question:"To scale Mount Everest, mountaineers need to go to _____ ?",
        answers:[
            {text:"Afghanistan",correct:false},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:true},
            {text:"Myanmar",correct:false},
        ]
    },
    {
        question:"New Delhi's Lotus Temple was designed by an architect from _____ ?",
        answers:[
            {text:"Germany",correct:false},
            {text:"Iran",correct:true},
            {text:"UAE",correct:false},
            {text:"Japan",correct:false},
        ] 
    },
    {
        question:"In Vienna, there's a statue of Indian hockey player _____ holding four hockey sticks in four Hands ?",
        answers:[
            {text:"Dhyan Chand ",correct:true},
            {text:"Dhanraj Pillay ",correct:false},
            {text:"Udham Singh Kular",correct:false},
            {text:"Bharat Kumar Chettri",correct:false},
        ] 
    },
    {
        question:"Which of the following is the second largest artificial lake in Asia ?",
        answers:[
            {text:"Chilika Lake in Odisha ",correct:false},
            {text:"Chandubi Lake in Assam ",correct:false},
            {text:"Kolleru Lake in Andhra Pradesh ",correct:false},
            {text:"Dhebar Lake in Rajasthan",correct:true},
        ] 
    },
    {
        question:"The National Game of Bhutan is ?",
        answers:[
            {text:"archery ",correct:true},
            {text:"shooting ",correct:false},
            {text:"taekwondo ",correct:false},
            {text:"wrestling",correct:false},
        ] 
    },
    {
        question:"What was the magnitude of the Indian Ocean Tsunami 2004 ?",
        answers:[
            {text:"7.4",correct:false},
            {text:"8.9",correct:false},
            {text:"9.1",correct:true},
            {text:"8.6",correct:false},
        ] 
    },
    {
        question:"World's largest field hockey stadium based on the seating capacity is located in which Country ?",
        answers:[
            {text:"Australia",correct:false},
            {text:"Pakistan",correct:true},
            {text:"Netherlands ",correct:false},
            {text:"India",correct:false},
        ] 
    },
    {
        question:"	Which of the following statements about Sambhar lake is true ?",
        answers:[
            {text:"It is the highest lake in India. ",correct:false},
            {text:"It was formed due to the hypervelocity impact of a comet",correct:false},
            {text:"It drains into the Arabian sea. ",correct:false},
            {text:"It is the largest inland salt lake in India.",correct:true},
        ] 
    },
    {
        question:"Which is the largest uranium producing country in the world ?",
        answers:[
            {text:"Uzbekistana",correct:false},
            {text:"Kazakhstan",correct:true},
            {text:"USA",correct:false},
            {text:"India",correct:false},
        ] 
    },
    {
        question:"The book ' Delhi is not far' is written by which of the following authors",
        answers:[
            {text:"Khushwant Singh ",correct:false},
            {text:"Anita Desai ",correct:false},
            {text:"Arundhati Roy",correct:false},
            {text:"Ruskin Bond",correct:true},
        ] 
    },
    
];

// Get HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

// Function to display a question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

// Function to reset the state
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";

    // Add correct or incorrect classes to the selected button
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all answer buttons
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    // Show the next button
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Start the quiz when the page loads
startQuiz();
