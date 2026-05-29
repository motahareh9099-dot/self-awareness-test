const questions = [
  "به کارهای هنری علاقه دارم.",
  "در فعالیت های ورزشی استعداد دارم.",
  "انفاق و بخشش را دوست دارم.",
  "احساس میکنم فرد موفقی هستم.",
  "از کم رویی بیزارم.",
  "حسود بودن را دوست ندارم.",
  "در کارهای منزل با دیگران مشورت میکنم.",
  "از کمک به دیگران لذت میبرم.",
  "خانواده ام متوجه شده اند که فرد بااستعدادی هستم.",
  "پرحرفی را دوست ندارم.",
  "با همسایگان ارتباط خوبی دارم.",
  "دوستانم مرا قبول دارند.",
  "به سلیقه های مختلف دیگران احترام میگذارم.",
  "انسان با دل و جرئتی هستم.",
  "آرامش من در این است که با خداوند راز و نیاز کنم.",
  "اول فکر میکنم بعد تصمیم می‌گیرم.",
  "از ضعف های خود آگاهی دارم.",
  "پرخوری را دوست ندارم.",
  "خودم را نیازمند کمک دیگران می‌دانم.",
  "از تشویق دیگران خوشحال می‌شوم."
];

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

const questionText = document.getElementById("questionText");
const progressText = document.getElementById("progressText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");
const questionBox = document.getElementById("questionBox");

const radioButtons = document.getElementsByName("answer");

function renderQuestion() {
  questionText.textContent = ${currentQuestion + 1}. ${questions[currentQuestion]};
  progressText.textContent = سوال ${currentQuestion + 1} از ${questions.length};

  radioButtons.forEach(radio => {
    radio.checked = answers[currentQuestion] === radio.value;
  });

  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "پایان آزمون";
  } else {
    nextBtn.textContent = "بعدی";
  }
}

function getSelectedAnswer() {
  let selected = null;
  radioButtons.forEach(radio => {
    if (radio.checked) {
      selected = radio.value;
    }
  });
  return selected;
}

nextBtn.addEventListener("click", () => {
  const selected = getSelectedAnswer();

  if (!selected) {
    alert("لطفاً یکی از گزینه‌های بلی یا خیر را انتخاب کنید.");
    return;
  }

  answers[currentQuestion] = selected;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  const selected = getSelectedAnswer();
  if (selected) {
    answers[currentQuestion] = selected;
  }

  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

function showResult() {
  const score = answers.filter(answer => answer === "yes").length;

  let message = "";
  if (score >= 14) {
    message = "آگاهی بالایی از خود داری.";
  } else {
    message = "باید بر روی خودآگاهی‌ات بیشتر کار کنی.";
  }

  questionBox.classList.add("hidden");
  prevBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = 
    امتیاز شما: ${score} از ${questions.length}
    <br><br>
    ${message}
  ;

  progressText.textContent = "نتیجه آزمون";
}

renderQuestion();
