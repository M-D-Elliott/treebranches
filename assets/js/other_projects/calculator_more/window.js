// Creates the window length and size based on developer set variables. (See dev options)
function Window(h,l){
  if(h<2){this.h = 2;}else{this.h=h}
  if(l<10){this.l = 10;}else{this.l=l}
  this.screen = []
  for(i=0;i<this.h;i++){
    this.screen[i] = document.createElement('div')
    this.screen[i].setAttribute('id','screen' + i);
    this.screen[i].style.width = (this.l*5);
    this.screen[i].innerHTML='&nbsp;'
  }
}
