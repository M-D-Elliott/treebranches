// Constructor function to create Calculator
function Calculator() {
  this.screen = [];
  this.buttons = [];
  this.windowBox = document.createElement('div');
  this.windowBox.setAttribute('id', 'windowBox');
  calcTarget.appendChild(this.windowBox);
  this.buttonBox = document.createElement('div');
  this.buttonBox.setAttribute('id', 'buttonBox');
  calcTarget.appendChild(this.buttonBox);
  this.padButtonFlex = document.createElement('div')
  this.padButtonFlex.setAttribute('id', 'padFlex');
  this.buttonBox.appendChild(this.padButtonFlex)
  this.tallButtonFlex = document.createElement('div')
  this.tallButtonFlex.setAttribute('id', 'tallFlex');
  this.buttonBox.appendChild(this.tallButtonFlex)
  this.customButtonFlex = document.createElement('div')
  this.customButtonFlex.setAttribute('id', 'customFlex');
  this.buttonBox.appendChild(this.customButtonFlex)

}

// Prototypes to the calculator object to attach buttons and window
Calculator.prototype.addWindow = function(window) {
  this.screen = window.screen
  for(i=0;i<window.h;i++){
    this.windowBox.appendChild(this.screen[i]);
  }
}
Calculator.prototype.addButton = function(button) {
  this.buttons.push(button);
}
