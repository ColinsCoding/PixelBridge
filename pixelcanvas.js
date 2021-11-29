/*************
 * Variables *
 ************/

var pixelperside = 32; //not a physical screen pixel
var squarelength = 16; //pixels per square or "pixel"
var sizeOfPen = 0;
var gridx;
var gridy;
var canvasLengthX;
var canvasLengthY;
let myCanvas;
let imageCanvas;



/**********************
 * Class Declarations *
 *********************/

class Square {
    constructor(name,length) {
        this.name = name;
        this.length = length;
    };
};

/***********************
 * Function Prototypes *
 **********************/

//Setup function is called on once at the start of the script 
function setup() {

    //canvas setup 
    noLoop();
    myCanvas = createCanvas(pixelperside*squarelength,pixelperside*squarelength); //creates canvas
    background(255,255,0); //sets background to yellow for debugging
    let body = document.getElementsByTagName('body')[0];
    myCanvas.parent(body);
    drawgrid(255);
    moveCanvas(0,0);
    console.log(offsetX + ':' + offsetY);

    //brush setup
    sizeOfPen = squarelength;
    
    //image wall setup
    setUpImgWall();
    
}


//translates canvas to a x,y position. (0,0) is the top left of the screen
function moveCanvas(x,y){
    offsetX = x;
    offsetY = y;
    myCanvas.position(x,y); //actual move function
    calculateCanvasDimensions(pixelperside,squarelength);
}


//not a loop, draws the pixel grid one time 
function drawgrid() {
    for (var i = 0; i < pixelperside; i++){
        for (var j = 0; j < pixelperside; j++){
            gridx = i * squarelength;
            gridy = j * squarelength;
        
            stroke(0);
            fill(255);
            square(gridx,gridy,squarelength);
        } 
    }
}

function calculateCanvasDimensions (squareperside, pixlespersquare) {
    canvasLengthX = squareperside * pixlespersquare;
    canvasLengthY = squareperside * pixlespersquare;
}   

//draw() loops forever, until stopped
function draw() {
    
    if (mouseX > (canvasLengthX) || mouseX < 0 || mouseY > (canvasLengthY) || mouseY < 0)
    {
        console.log('drawing stopped')
        noLoop();
    };

    for(y = 0; y < pixelperside; y++) {
        for(x = 0; x < pixelperside; x++){
            if (mouseX < (x*squarelength+squarelength) && mouseX > x*squarelength && mouseY < (y*squarelength+squarelength) && mouseY > y*squarelength && mouseIsPressed){
                //fill(255,0,0)
                fill(0,0,0)
                noStroke();
                console.log('drawing');
                rect((x*squarelength),(y*squarelength),sizeOfPen,sizeOfPen);
                
                
            }
        }
    }

    //square(mouseX, mouseY, squarelength)

    
    
}

//when mouse is pressed over the canvas 
function mousePressed() {
    if (mouseX < (canvasLengthX) && mouseX > 0 && mouseY < (canvasLengthY) && mouseY > 0)  {
        console.log('mouse pressed');
        loop();
    }
}

function mouseReleased() {
    console.log('no loop:mouse released');
    noLoop();
}


function clearScreen() {
    drawgrid();
}

function resizePen(x,t) {
    //t=0 resizes the pen to size 15
    if (t == 0) {
        console.log('Pen Size set to 15')
        sizeOfPen = 15;
    //t=1 resizes the pen to spray paint size (50)
    } else if (t == 1) {
        console.log('Pen Size set to 50')
        sizeOfPen = 50;
    } else {
        console.log('Pen Size change by ' + x)
        sizeOfPen = sizeOfPen + x;
    }
}

function getPenSize(){
    return sizeOfPen
}

function displayPenSize(){

}

function getCanvasDimensions() {

}


function setUpImgWall() {
    let imgwall = createImage(40,40);
    imgwall.loadPixels();
    for (let i = 0; i < imgwall.width; i++) {
        for (let j = 0; j < imgwall.height; j++) {
            imgwall.set(i, j, color(0, 255, 0));
        }
      }
      imgwall.updatePixels();
      image(imgwall, 500, 17);
}



