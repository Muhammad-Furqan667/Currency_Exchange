"use strict";

const select = document.querySelectorAll("select");
const aswerClick = document.querySelector('.exch');
const input = document.querySelector('.input');
const output = document.querySelector('.msg');
const FrImg = document.querySelector('#FrImg');
const ToImg = document.querySelector('#toImg');
let tos = 0;
let froms = 0;
let FromCode, ToCode;

// Accessing currencyRates on the basis of USD
const curr_rates = async function () {
    const countries = await  fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const json = await countries.json();
    return json;
    
}

// Checking selection
const checking = async function(element, Imgsrc, currCode){
      if(element.classList.contains('from')){
            FrImg.src = Imgsrc;
            FromCode = currCode;
            await curr_rates().then(usd => froms = usd.rates[currCode]);
      }
      if(element.classList.contains('to')){
            ToImg.src = Imgsrc; 
            ToCode = currCode;
            await curr_rates().then(usd => tos = usd.rates[currCode]);
      }         
}

// updating flag
const updateFlag = function(element) {
      const currCode = element.value;
      const value = countryList[currCode].toLowerCase();
      let currSrc =`https://flagcdn.com/16x12/${value}.png`;
      checking(element, currSrc, currCode);    
}

// Converting 
aswerClick.addEventListener('click', function(){
      const convert = (input.value/froms)* tos;
      display(convert);
      input.value = '';
})

//Selecting Country
select.forEach(sel => sel.addEventListener("change", (evt) =>  updateFlag(evt.target)));

//Display output
const display = answers => {
      const inputFormattedNum = new Intl.NumberFormat('en-US').format(input.value);
      const ans = answers.toFixed(2);
      const answerFormattedNum = new Intl.NumberFormat('en-us').format(ans);
      output.textContent = `${inputFormattedNum}${FromCode} = ${answerFormattedNum}${ToCode}`;
}