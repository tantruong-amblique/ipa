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

var classWord, delay;
let timer = {};
let ipaVowelsWord = ['/ɑ:/','/aɪ/','/aʊ/','/ɔ:/','/ɔɪ/', '/oʊ/', '/e/', '/eɪ/', '/æ/', '/ɪ/', '/i:/', '/i/', '/ʊ/', '/u:/','/u/', '/ʌ/', '/ɜ:/', '/ə/'];

let ipaConsonantsWord = ['/p/', '/b/', '/f/', '/v/', '/k/', '/g/', '/θ/', '/ð/', '/s/', '/z/', '/ʃ/', '/ʒ/', '/t/', '/d/', '/tʃ/', '/dʒ/', '/j/', '/m/', '/n/', '/ŋ/', '/w/', '/r/', '/h/', '/l/'];

let numbersOrdinal = ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '30', '40', '50', '60', '70', '80', '90', '100'];
let numbersCardinal = ['101', '140', '200', '1000', '1,050', '1,200', '10,000', '100,000', '2,000,000', '2,500,000'];

document.getElementById('ipa-v').checked = true;

function startIpa() {
  document.getElementById("content").classList.remove('end');

  let ipaArray;
  delay = getDelay()

  for (var t in timer) {
    clearTimeout(timer[t]);
  }

  // Mixed
  if(swapIpa() === 'mixed') {
    ipaArray = [...ipaVowelsWord, ...ipaConsonantsWord];
    classWord = 'mixed';
  } else if(swapIpa() === 'mixNumbers') {
    ipaArray = [...numbersOrdinal, ...numbersCardinal];
    classWord = 'numbers';
  } else if(swapIpa() === 'ordinalNumbers') {
    ipaArray = numbersOrdinal;
    classWord = 'numbers';
  } else if(swapIpa() === 'cardinalNumbers') {
    ipaArray = numbersCardinal;
    classWord = 'numbers';
  } else {
    if (getIpa() == 'ipa-vowels') {
      ipaArray = [...Array.range(1, 12), '11sub', '12', '13', '13sub', '14', '15', '15sub'];
      classWord = 'vowels';
  
      if(swapIpa() === 'word') {
        [...ipaArray] = ipaVowelsWord;
      }
    } else {
      ipaArray = Array.range(1, 25);
      classWord = 'consonants';
  
      if(swapIpa() === 'word') {
        [...ipaArray] = ipaConsonantsWord;
      }
    }
  }

  if (getShuffle()) {
    ipaArray = ipaArray.shuffle();
  }

  let ipaLength = ipaArray.length;

  ipaArray.forEach((v, index) => {
    runIpa(v, index, ipaLength);
  });
}

function runIpa(v, index, ipaLength) {
  timer[index] = setTimeout(() => {
    if(ipaLength === index + 1) {
      document.getElementById("content").classList.add('end');
    }

    var numberPrefix = parseInt(v.replace(',',''));
    var textPrefix = '';

    if(numberPrefix <= 100) {
      switch(numberPrefix) {
        case 1:
        case 21:
          textPrefix = 'st';
          break;
        case 2: 
          textPrefix = 'nd';
          break;
        case 3:
          textPrefix = 'rd';
          break;
        default:
          textPrefix = 'th';
      }
    }
  
    document.getElementById("content").innerHTML = `
<span class="ipa-content ipa-char-${v.toString()} ${classWord}-${v.toString().replace(/\/|\/|:/g,'')}">${v.toString().replace(/sub/i, ' phụ')}<sup>${textPrefix}</sup></span>
`;
  }, delay * index);
}

function getDelay() {
  return parseInt(document.getElementById('delay').value) * 1000;

  // let swapDelay = swapIpa();

  // switch(swapDelay) {
  //   case 'ordinalNumbers':
  //   case 'cardinalNumbers':
  //   case 'mixNumbers':
  //     return parseInt(document.getElementById('delayNumber').value) * 1000;
  //     break;
  //   default:
  //       return parseInt(document.getElementById('delay').value) * 1000;
  // }
}

function getShuffle() {
  return document.getElementById('shuffle').checked;
}

function getIpa() {
  return document.querySelector('input[name="ipa-input"]:checked').value;
}

function swapIpa() {
  let swapType = document.getElementById('swap').value;

  switch(swapType) {
    case 'mixed':
      // document.getElementsByClassName('custom-radio')[0].style.display = 'none';
      // break;
    case 'ordinalNumbers':
    case 'cardinalNumbers':
    case 'mixNumbers':
      // document.getElementById('delay').style.display = 'none';
      document.getElementsByClassName('custom-radio')[0].style.display = 'none';
      // document.getElementById('delayNumber').style.display = 'block';
      break;
    default:
      document.getElementsByClassName('custom-radio')[0].style.display = 'flex';
  }

  // let swapType = document.getElementById('swap').value;
  // if(swapType === 'mixed') {
  //   document.getElementsByClassName('custom-radio')[0].style.display = 'none';
  // } else {
  //   document.getElementsByClassName('custom-radio')[0].style.display = 'flex';
  // }

  return swapType
}

// document.getElementById('delayNumber').style.display = 'none';
document.getElementById('vowels-btn').addEventListener('click', startIpa);
document.getElementById('delay').addEventListener('change', getDelay);
document.getElementById('shuffle').addEventListener('change', getShuffle);
document.getElementById('swap').addEventListener('change', swapIpa);

var ipaClass = document.getElementsByClassName("ipa-input");
Array.from(ipaClass).forEach(function (element) {
  element.addEventListener('click', getIpa);
});

(function() {
  'use strict';
  document.querySelector('.material-design-hamburger__icon').addEventListener(
    'click',
    function() {            
      document.body.classList.toggle('menu--active');
      this.parentNode.nextElementSibling.classList.toggle('menu--on');
    });
})();

// Listen for click on the document
document.addEventListener('click', function (event) {
  
  //Bail if our clicked element doesn't have the class
  if (!event.target.classList.contains('accordion-toggle')) return;
  
  // Get the target content
  var content = document.querySelector(event.target.hash);
  if (!content) return;
  
  // Prevent default link behavior
  event.preventDefault();
  
  // If the content is already expanded, collapse it and quit
  if (content.classList.contains('active')) {
    content.classList.remove('active');
    return;
  }
  
  // Get all open accordion content, loop through it, and close it
  var accordions = document.querySelectorAll('.accordion-content.active');
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].classList.remove('active');
  }
  
  // Toggle our content
  content.classList.toggle('active');
})

/* Tab */
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();
