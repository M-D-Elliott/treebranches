//const stylesheet = 'calculator.css';

// Set your div ID here! No need for pound symbol.
const target = "calc-target"

// Calculator button face
const PadButtons = [
  ";)","/","*",
  "7","8","9",
  "4","5","6",
  "1","2","3",
  "0","."
]

// Specially sized buttons on right side of 10-key
const TallButtons = [
"-",
"+",
"Enter"
]

// Additional buttons not found on 10-key
const CustomButtons = [
"(",
")",
"CE",
"C"
]

let calcTarget = document.getElementById(target);

//if(stylesheet.slice(-4)==='.css') {
//  calcTarget.innerHTML = `<br><link href=${stylesheet} rel="stylesheet">`;
//} else {
//  calcTarget.innerHTML = `<br><link href=${stylesheet}.css rel="stylesheet">`
//}

//Gets defined ID of target and sets some handy abbreviations.
const pb = PadButtons;
const tb = TallButtons;
const cb = CustomButtons;

// Calls constructors
let calculator = new Calculator();
calculator.addWindow(new Window('4','20'));
for(i=0;i<pb.length;i++){calculator.addButton(new PadButton(pb[i]))}
for(i=0;i<tb.length;i++){calculator.addButton(new TallButton(tb[i]))}
for(i=0;i<cb.length;i++){calculator.addButton(new CustomButton(cb[i]))}
