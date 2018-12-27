function empties(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
        for (let j=0; j<rows; j++)
        {
            arr[i][j] = "";
        }
    }
    return arr;
}

//https://gist.github.com/jed/982883
function uuidv4() {
return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
)
}

function randomArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
        for (let j=0; j<rows; j++)
        {
            arr[i][j] = Math.random();
        }
    }
    return arr;
}

function randIntBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToRad (deg) {
    return deg * (Math.PI / 180);
}

function drawArray(arr){

    for(let i=0; i<arr.length; i++)
    {
        for(let j=0; j<arr[i].length; j++){
            x = i*res;
            y = j*res;
            if(arr[i][j] != "")
            {
                fill(255);
                rect(x,y,res,res);
            }
        }
    }
}

class Human{
    constructor(initialX,initialY, initialDir){
        this.id = uuidv4(); //initialize human id with this poorman's uuid
        this.x = initialX;
        this.y = initialY;
        this.xfloat = this.x;
        this.yfloat = this.y;
        this.dir = initialDir; //angle at which human is headed (0-360)
        this.speed = 1;
    }

    updatePos(){
        this.xfloat += Math.sin(degToRad(this.dir)) * this.speed;
        this.yfloat += Math.cos(degToRad(this.dir)) * this.speed;
        this.x = Math.floor(this.xfloat);
        this.y = Math.floor(this.yfloat);
    }

    bounceRight(){
        this.dir = randIntBetween(0,180)
    }
    
    bounceDown(){
        this.dir = randIntBetween(90,270);
    }

    bounceLeft(){
        this.dir = randIntBetween(180,360);
    }

    bounceUp(){//a little bit of a hack, because the range of angles 270->90 is not continous
        if(Math.random()>0.5){
            this.dir = randIntBetween(270,360);
        }
        else{
            this.dir = randIntBetween(0,90);
        }
         
    }
}

var mapSizeX=100;
var mapSizeY=100;
var mapa = empties(mapSizeX,mapSizeY);
var humans = [new Human(50, 50, 90)];
let x,y;
function mainloop(){

    for(let i=0; i<1000; i++){
        x = humans[0].x;
        y = humans[0].y;
        
        leftBreach = x<=0;
        rightBreach = x>=mapSizeX-1;
        downBreach = y<=0;
        upBreach = y>=mapSizeY-1;

        if(leftBreach || rightBreach || downBreach || upBreach){
            //out of map
            if(leftBreach){
                humans[0].bounceRight();
            }
            if(rightBreach){
                humans[0].bounceLeft();
            }
            if(downBreach){
                humans[0].bounceUp();
            }
            if(upBreach){
                humans[0].bounceDown();
            }
            humans[0].updatePos();
        }else{
            //in map-> update position
            humans[0].updatePos();

            //cell occupied?
            if(mapa[humans[0].x][humans[0].y] != ""){
                //humans met
            }
            else{
                //no humans met. occupy this field
                mapa[x][y] = humans[0].id
            }
        }
    }
}

var r = 100;
var c = 100;
var res = 5;
var framesCount = 0;

function setup() {
    createCanvas(r*res,c*res);
};

function draw(){
    background(0);
    drawArray(mapa);
    document.getElementById('framesCnt').innerHTML=framesCount
    mainloop();
    framesCount++;
}
