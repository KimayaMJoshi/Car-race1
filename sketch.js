var ball;
var database,dbPosition;
function setup(){
    createCanvas(500,500);
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    var dbref = database.ref("car/position");
    dbref.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function readPosition(data){
    dbPosition = data.val();
    ball.x = dbPosition.x;
    ball.y = dbPosition.y;
}
function showError (){
    console.log("something went wrong")
}
function writePosition(x,y){
    database.ref("car/position").set({
        x:ball.x + x ,
        y:ball.y + y
    })
}