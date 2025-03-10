let radio;
let submitButton;
let resultText = "";
let resultColor = "black"; // 用來記錄結果文字的顏色
let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

// 使用 p5.js 的 preload 函數來讀取 CSV 檔案
function preload() {
  questions = loadTable('questions.csv', 'csv', 'header');
}

// setup 函數在程式開始時執行一次，用來設定畫布大小和背景顏色
function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗大小
  background("#bde0fe"); // 設定背景顏色為淺藍色

  // 建立選擇題的選項
  radio = createRadio();
  radio.position(width / 2 - 50, height / 2 - 20); // 設定選項的位置
  radio.style('font-size', '25px'); // 設定選項文字大小

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 20, height / 2 + 20); // 設定按鈕的位置
  submitButton.style('font-size', '25px'); // 設定按鈕文字大小
  submitButton.mousePressed(checkAnswer); // 設定按鈕按下時執行的函數

  loadQuestion();
}

// draw 函數會在每一幀畫面更新時執行，用來繪製內容
function draw() {
  background(220); // 每次更新畫面時重設背景顏色為灰色

  if (currentQuestionIndex < questions.getRowCount()) {
    // 顯示題目
    textAlign(CENTER);
    textSize(24);
    fill(0);
    text(questions.getString(currentQuestionIndex, 'question'), width / 2, height / 2 - 50);
  } else {
    // 顯示測驗結果
    textAlign(CENTER);
    textSize(24);
    fill(0);
    text(`測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`, width / 2, height / 2 - 50);
  }

  // 顯示結果
  textSize(18);
  fill(resultColor); // 設定結果文字的顏色
  text(resultText, width / 2, height / 2 + 80); // 顯示在按鈕下方

  // 顯示答對和答錯題數在左上角
  textAlign(LEFT);
  textSize(18);
  fill(0);
  text(`答對題數：${correctCount}`, 10, 30);
  text(`答錯題數：${incorrectCount}`, 10, 50);
  text(`410730906張峻瑋`, 10, 70);
}

// 載入當前題目
function loadQuestion() {
  radio.remove(); // 移除舊的選項
  radio = createRadio(); // 建立新的選項
  radio.position(width / 2 - 50, height / 2 - 20); // 設定選項的位置
  radio.style('font-size', '25px'); // 設定選項文字大小
  radio.style("background-color", "#94bdfa"); // 設定選項文字顏色

  let question = questions.getString(currentQuestionIndex, 'question');
  let option1 = questions.getString(currentQuestionIndex, 'option1');
  let option2 = questions.getString(currentQuestionIndex, 'option2');
  let option3 = questions.getString(currentQuestionIndex, 'option3');
  let option4 = questions.getString(currentQuestionIndex, 'option4');

  radio.option(option1);
  radio.option(option2);
  radio.option(option3);
  radio.option(option4);
}

// 檢查答案的函數
function checkAnswer() {
  let answer = radio.value();
  let correctAnswer = questions.getString(currentQuestionIndex, 'correct');

  if (answer === correctAnswer) {
    resultText = "正確!";
    resultColor = "#70e000"; // 答對時文字顯示為綠色
    correctCount++;
  } else {
    resultText = "錯誤!";
    resultColor = "#d00000"; // 答錯時文字顯示為紅色
    incorrectCount++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.getRowCount()) {
    loadQuestion();
  } else {
    showResults();
  }
}

// 顯示測驗結果
function showResults() {
  resultText = `測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`;
  resultColor = "black";
}
