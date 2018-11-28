// Primary button constructor function
function Button(button) {
  this.element = document.createElement('button')
  // this.element.setAttribute('class', 'button')
  this.element.setAttribute('id', button)
  this.element.innerText = button
  if (this.element.id==='.'){
    this.element.innerText = "Del"
  }
}

// Secondary button constructor functions, reference primary
function PadButton(button) {
  Button.call(this, button);
  this.element.classList.add('padButton');
  calculator.padButtonFlex.appendChild(this.element)
}
function TallButton(button){
  Button.call(this, button);
  this.element.classList.add('tallButton');
  calculator.tallButtonFlex.appendChild(this.element)
}
function CustomButton(button){
  Button.call(this, button);
  this.element.classList.add('customButton');
  calculator.customButtonFlex.appendChild(this.element)
}

// Prototype Calls
PadButton.prototype = Object.create(Button.prototype);
TallButton.prototype = Object.create(Button.prototype);
CustomButton.prototype = Object.create(Button.prototype);
