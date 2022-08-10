import data from "./data.js";

let game = null;
let result = null;
let leftImage = null;
let rightImage = null;
let resultImage = null;
let subtitle = null;
let restartBtn = null;
let remaining = null;

//선택된자들
let selectedImages = null;
//아직 남은 이미지들
let remainingImages = null;

function showTwoImages() {
  //   console.log("reamining images", remainingImages.length);
  remaining.innerText = `${remainingImages.length} 남음`;

  if (remainingImages.length === 0) {
    if (selectedImages.length === 1) {
      //끝!
      end();
      return;
    }

    remainingImages = _.shuffle(selectedImages);
    selectedImages = [];
    start();
    return;
  }

  leftImage.src = remainingImages.pop();
  rightImage.src = remainingImages.pop();
}

function leftClicked() {
  selectedImages.push(leftImage.src);
  showTwoImages();
}

function rightClicked() {
  selectedImages.push(rightImage.src);
  showTwoImages();
}

function ready() {
  game = document.getElementById("game");
  result = document.getElementById("result");
  leftImage = document.getElementById("left");
  rightImage = document.getElementById("right");
  resultImage = document.getElementById("result-img");
  subtitle = document.getElementById("subtitle");
  restartBtn = document.getElementById("restart");
  remaining = document.getElementById("remaining");

  game.style.visibility = "visible";
  result.style.visibility = "hidden";
  leftImage.onclick = leftClicked;
  rightImage.onclick = rightClicked;
  restartBtn.onclick = ready;

  selectedImages = [];
  remainingImages = data;
  console.log("ready!", remainingImages.length);

  start();
}

function start() {
  if (remainingImages.length % 2 !== 0) {
    remainingImages.pop();
  }

  subtitle.innerText = `${remainingImages.length} 강`;

  //start
  remainingImages = _.shuffle(remainingImages);
  showTwoImages();
}

function end() {
  game.style.visibility = "hidden";
  result.style.visibility = "visible";
  resultImage.src = selectedImages[0];
}

window.addEventListener("load", ready);
