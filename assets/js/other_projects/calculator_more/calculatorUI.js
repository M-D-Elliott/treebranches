// Button Value comparator
Calculator.prototype.inputParser = function(e, buttonPressed){
  e.preventDefault();
  if (buttonPressed === 'Enter'){
    this.pressEnter();
  } else if(buttonPressed === '.'){
    this.pressDelete();
  } else if ((buttonPressed === 'CE') || (buttonPressed === 'Backspace')){
    this.pressCE();
  } else if (buttonPressed === 'C'){
    this.pressC();
  } else if (isNaN(buttonPressed)){
    this.typeSymbol(buttonPressed);
  } else {
    this.typeNumeral(buttonPressed);
  }
};

// *****Calculator's button functions*****

//Handles all typeable symbols.
Calculator.prototype.typeSymbol = function(buttonPressed) {
  let lastValue = this.screen[0].innerHTML.slice(-1);
  if (lastValue ===';') {
    this.screen[0].innerHTML += `${buttonPressed}&nbsp;`
  } else {
    this.screen[0].innerHTML += `&nbsp;${buttonPressed}&nbsp;`
  }
  };

//Handles number typing.
Calculator.prototype.typeNumeral = function(buttonPressed) {
  this.screen[0].innerHTML += `${buttonPressed}`
};

//Mathematically evaluates the innerText of the first and/or second line(s). Returns Operation error when Order of Operations is bad.
Calculator.prototype.pressEnter = function() {
  let firstValue = this.screen[0].innerText.slice(1,2);
  try {
    if(isNaN(firstValue) && (firstValue !='(')){
      if (this.screen[1].innerHTML ===`&nbsp;undefined`){
        this.screen[0].innerHTML = `&nbsp;undefined`;
      } else {
        this.screen[0].innerHTML = '&nbsp;' + eval(this.screen[1].innerText + this.screen[0].innerText);
      }
      this.screenShift();
    } else if (this.screen[0].innerHTML != '&nbsp;') {
        this.screen[0].innerHTML = '&nbsp;' + eval(this.screen[0].innerText);
        this.screenShift();
    };
  } catch (e) {
      this.screen[0].innerHTML = `&nbsp;undefined`;
      this.screenShift();
  }
};

//Deletes typed characters one value at a time.
Calculator.prototype.pressDelete = function() {
  let lastValue = this.screen[0].innerHTML.slice(-1)
  if (this.screen[0].innerText.length > 0){
    if (isNaN(lastValue)){
      this.screen[0].innerText = this.screen[0].innerText.slice(0,-3);
    } else {
      this.screen[0].innerText = this.screen[0].innerText.slice(0,-1);
    };
  };
};

//Clears the screen or the first line, respectively.
Calculator.prototype.pressC = function(){
  for(i=this.screen.length;i>0;i--) {
    this.screen[i-1].innerHTML = '&nbsp;'
  };
}
Calculator.prototype.pressCE = function(){
  this.screen[0].innerHTML = '&nbsp;'
}

//Scrolls the screen up on Enter
Calculator.prototype.screenShift = function(){
  for(i=(this.screen.length-1);i>0;i--) {
    this.screen[i].innerHTML = this.screen[i-1].innerHTML;
  };
  this.screen[0].innerHTML = '&nbsp;'
};

//First listens for clicks, second listens for keys
document.addEventListener('click', function(e){
  if (e.target.tagName ==='BUTTON'){
    buttonPressed = e.target.getAttribute('id');
    calculator.inputParser(e, buttonPressed);
  };
});
document.addEventListener('keydown', function(e){
  buttonPressed = e.key;
  for (i=0;i<calculator.buttons.length;i++){
    if (buttonPressed === calculator.buttons[i].element.id){
      calculator.inputParser(e, buttonPressed);
    }
  }
});
