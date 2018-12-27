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
            let x = i*res;
            let y = j*res;
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

var mapSizeX=400;
var mapSizeY=400;
var mapa = empties(mapSizeX,mapSizeY);
var populationSize = 10000;
var res = 3;
var framesCount = 0;
var humans = [];
for(let i=0; i<populationSize; i++)
{
    humans.push(new Human(100, 100, 90));
}

function mainloop(){

    humans.forEach(function(h){
        leftBreach = h.x<=0+2;
        rightBreach = h.x>=mapSizeX-1-2;
        downBreach = h.y<=0+2;
        upBreach = h.y>=mapSizeY-1-2;
        //TODO: catch TypeErrors on that?
        mapa[h.x][h.y] = "";
        if(leftBreach || rightBreach || downBreach || upBreach){
            //out of map
            if(leftBreach){
                h.bounceRight();
            }
            if(rightBreach){
                h.bounceLeft();
            }
            if(downBreach){
                h.bounceUp();
            }
            if(upBreach){
                h.bounceDown();
            }
            h.updatePos();

        }else{
            //in map-> update position
            h.updatePos();

            //cell occupied?
            if(mapa[h.x][h.y] == ""){
                
                //no humans met. occupy this field
                mapa[h.x][h.y] = h.id;
                debugger;
                console.log('occupy dis');
            }
            else{
                //humans met
                console.log('cell occupied')
            }
            debugger;
        }
            
    })
}

function setup() {
    createCanvas(mapSizeY*res,mapSizeX*res);
};

function draw(){
    background(0);
    drawArray(mapa);
    document.getElementById('framesCnt').innerHTML=framesCount
    mainloop();
    framesCount++;
}
