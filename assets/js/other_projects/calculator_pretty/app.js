document.addEventListener('DOMContentLoaded', () => {
  const userarea = document.getElementById('userarea');
  const calcwindow = document.getElementById('calcwindow')
  const mode = document.getElementById('mode');
  const calcbuttons = [";)", "/", "*", "-", "7", "8", "9", "+", "4", "5", "6", "1", "2", "3", "Enter", "0", "."]
  let window1 = calcwindow.lastElementChild
  let window2 = window1.previousSibling.previousSibling
  let window3 = window2.previousSibling.previousSibling
  let window4 = window3.previousSibling.previousSibling
  let val1 = '';
  let operator = '';
  let val2 = '';
  let prevval2 = '';
  let ans1 = '';

//using dom manipulation to append buttons to the ul userarea.
  function createLI() {
    //producing said element.
      function createElement (elementName, property, value, attribute, value2) {
        const element = document.createElement(elementName);
        element[property] = value;
        element.setAttribute(attribute, value2);
        element.setAttribute('id', element.textContent);
        if (element.textContent === '+') {
          element.setAttribute('id', 'plus');
        } else if (element.textContent === '.') {
          element.setAttribute('id', 'Delete');
        };
        return element;
      };
      //appending said element to li.
      function appendToLI(elementName, property, value, attribute, value2) {
        const element = createElement(elementName, property, value, attribute, value2);
        li.appendChild(element);
        return element;
      };
      const li = document.createElement('li');
      li.className = 'buttonholder'
      //creating calculator button elements.
      for (i = 0; i < calcbuttons.length; i++) {
        if (isNaN(parseInt(calcbuttons[i])) === true) {
          let buttontype = "symbutton";
          appendToLI('button', 'textContent', calcbuttons[i], 'class', buttontype);
        } else {
          let buttontype ="numbutton";
          appendToLI('button', 'textContent', calcbuttons[i], 'class', buttontype);
        }
        if (calcbuttons[i] === '-' || calcbuttons[i] === '+' || calcbuttons[i] === '6' || calcbuttons[i] === 'Enter') {
          appendToLI('br');
        }
      }
      return li;
    }
    'use strict';

//detecting button presses.
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const keyName = event.key;
      //activating the calculator mode
      if (keyName == 'c' && mode.className != 'calc') {
        mode.textContent = `Use 10-Key or Mouse.`;
        mode.setAttribute('class', 'calc');
        val1 = '';
        operator = '';
        val2 = '';
        const li = createLI();
        userarea.appendChild(li);
        //deactivating the calculator, setting back to no mode.
      } else if (keyName == 'c' && mode.className == 'calc') {
        mode.textContent = `Press C-Key to start calculator!`;
        mode.setAttribute('class', '');
        userarea.innerHTML = '';
      }
      //converts all 10-key presses to mouse clicks.
      const buttons = document.querySelectorAll('button');
      for (i = 0; i < buttons.length; i++) {
        if((keyName === buttons[i].textContent)) {
          buttons[i].click();
        }
      }
    });

//actual calculator programming, button input and output display:
//uses mouse clicks which also receive 10-key input from above.
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const button = e.target.textContent;
        //checks if a value is defined, if so allows a single operator to be typed.
        if ((isNaN(button) === true) && (operator === '') && (val1 !='') && (button != 'Enter') && (button !='.'))
          operator = button;
          //checks if the text Content of the button is a number, if so determines if it is the first or second number based on if an operator is present.
        if (isNaN(button) === false) {
          if ((operator === '') && (val1.length < 6)) {
            val1 += button;
          } else if ((operator != '') && (val1.length + val2.length < 7)) {
            val2 += button;
          }
        }
        //enter button and scrolling effect for old solutions.
        if (button === "Enter" && (val1 !='') && (operator !='') && (val2 !='')) {
          window4.innerHTML = window3.innerHTML
          window3.innerHTML = window2.innerHTML
          window2.innerHTML =`&nbsp; ${val1} ${operator} ${val2}` + "&nbsp;=&nbsp;" + eval(val1 + operator + val2)
          ans1 = eval(val1 + operator + val2);
          prevval2 = val2
          val1 = '';
          val2 = '';
          operator = '';
        }
        if ((button === ".") && (val2 != '')) {
          val2 = val2.slice(0, -1);
        } else if ((button === ".") && (operator !='')) {
          operator = ''
        } else if ((button === ".") && (val1 != '')){
          val1 = val1.slice(0, -1);
        }
        window1.innerHTML = `&nbsp; ${val1} ${operator} ${val2}`;
      }
    });
    mode.textContent = 'Use 10-Key or Mouse.';
    mode.setAttribute('class', 'calc');
    const li = createLI();
    userarea.appendChild(li);
});
