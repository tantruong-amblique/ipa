Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

Array.prototype.shuffle = function () {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {

    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

var classWord = 'vowels';
let delay = getDelay();
let timer = {};

document.getElementById('ipa-v').checked = true;

function startIpa() {
  let ipaArray;

  for (var t in timer) {
    clearTimeout(timer[t]);
  }

  if (getIpa() == 'ipa-vowels') {
    ipaArray = [...Array.range(1, 12), '11 phụ', '12', '13', '13 phụ', '14', '15', '15 phụ'];
  } else {
    ipaArray = Array.range(1, 25);
    classWord = 'consonants';
  }

  if (getShuffle()) {
    ipaArray = ipaArray.shuffle();
  }

  //console.log(ipaArray);
  ipaArray.forEach((v, index) => {
    runIpa(v, index);
  });
}

function runIpa(v, index) {
  timer[index] = setTimeout(() => {
    document.getElementById("content").innerHTML = `
<span class="ipa-content ${classWord}-${v.toString()}">${v.toString()}</span>
`;
  }, delay * index);
}

function getDelay() {
  //console.log(parseInt(document.getElementById('delay').value) * 1000);
  return parseInt(document.getElementById('delay').value) * 1000;
}

function getShuffle() {
  //console.log(document.getElementById('shuffle').checked);
  return document.getElementById('shuffle').checked;
}

function getIpa() {
  // console.log(document.querySelector('input[name="ipa"]:checked').value);
  return document.querySelector('input[name="ipa"]:checked').value;
}


document.getElementById('vowels-btn').addEventListener('click', startIpa);
document.getElementById('delay').addEventListener('change', getDelay);
document.getElementById('shuffle').addEventListener('change', getShuffle);

var ipaClass = document.getElementsByClassName("ipa");
Array.from(ipaClass).forEach(function (element) {
  element.addEventListener('click', getIpa);
});