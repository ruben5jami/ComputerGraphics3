var points = [];

jQuery( document ).ready(function($) {
    arrayIterator(polygonArray);
    $("input[name=action]:radio").change(function (){    //if action is changed
        action = $("input[name=action]:checked").val();
        points = [];
        checkAction();
    });

    /*
    // Instance the tour
    var tour = new Tour({
        debug: true,
        storage: false,
        steps: [
            {
                element: "#rotatex",
                title: "Rotate X",
                content: "Choose an angle, to choose rotate x again click on the canvas",
                placement: "left"
            },
            {
                element: "#rotateY",
                title: "Rotate Y",
                content: "Choose an angle, to choose rotate y again click on the canvas",
                placement: "bottom"
            },
            {
                element: "#rotatez",
                title: "Rotate Z",
                content: "Choose an angle, to choose rotate z again click on the canvas",
                placement: "bottom"
            },
            {
                element: "#scale",
                title: "Scale",
                content: "Choose what how much you want to scale the shapes, to rescale click on the canvas",
                placement: "bottom"

            },
            {
                element: "#cavalier",
                title: "Cavalier",
                content: "Choose an angle, to choose cavalier again click on the canvas",
                placement: "bottom"
            },
            {
                element: "#cabinet",
                title: "Cabinet",
                content: "Choose an angle, to choose cavalier again click on the canvas",
                placement: "bottom"
            },
            {
                element: "#orthographic",
                title: "Orthographic",
                content: "",
                placement: "bottom"
            },
             {
             element: "#perspective",
             title: "Perspective",
             content: "",
             placement: "bottom"
             },
             {
             element: "#translate",
             title: "Translate",
             content: "move the shapes by clicking on 2 dots in the canvas",
             placement: "bottom"
             },
             {
             element: "#load_file2",
             title: "Re-Load",
             content: "Click To reload the page",
             placement: "left"
             },
        ]});


    if (tour.ended()) {
        tour.restart();
    } else {
        tour.init();
        tour.start();
    }
     */
});




//get the position in the canvas
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
    var x;
    var y;
    var canvas = document.getElementById("canvas");
    x = event.x;    //get x position from user
    y = event.y;    //get y position from user
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    points.push({x:x,y:y}); //push to the points array
    //drawCircle(x, y, x+2, y+2); //feedback points

    if(points.length == 1){
        checkAction();
    }
    if(points.length == 2) {
        if (action == "translate") {
            disX = points[1].x - points[0].x;
            disY = points[1].y - points[0].y;
            clearCanvas();
            userTranslateShapes(polygonArray, pointsOfDrawing, disX, disY, 0);
            points = [];
        }
    }
}

//reload the page to reload the php code
function reload(){
    location.reload();
}

function checkAction(){
    if(action == "rotatex"){
        //var imageAngleX = prompt("Please enter the angle of rotation on X axis", 90);
        //if(!isNaN(imageAngleX) && imageAngleX!=null) {
            clearCanvas();
            drawRotateX(polygonArray, pointsOfDrawing,  20);
       // }
       // else{
       //     alert("invalid input");
       // }
    }
    else if(action == "rotatey"){
        //var imageAngleY = prompt("Please enter the angle of rotation on Y axis", 90);
        //if(!isNaN(imageAngleY) && imageAngleY!=null) {
            clearCanvas();
            drawRotateY(polygonArray, pointsOfDrawing,  20);
        //}
        //else{
        //    alert("invalid input");
        //}
    }
    else if(action == "orthographic"){
        clearCanvas();
        drawOrthographic(polygonArray, pointsOfDrawing);
    }
    else if(action == "rotatez"){
        //var imageAngleZ = prompt("Please enter the angle of rotation on Z axis", 90);
       // if((!isNaN(imageAngleZ)) && imageAngleZ!=null) {
            clearCanvas();
            drawRotateZ(polygonArray, pointsOfDrawing,  20);
       // }
        //else{
        //    alert("invalid input");
       // }
    }
    else if(action == "scale"){
        var imageSize = prompt("Please enter the size of scale", 0.5);
            if ((!isNaN(imageSize)) && imageSize!=null) {
                clearCanvas();
                scaleShapes(polygonArray, pointsOfDrawing, imageSize);
            }
            else {
                alert("invalid input");

            }
    }
    else if(action == "cabinet"){
        var cabinetAngle = prompt("Please enter the angle ", 90);
        if(!isNaN(cabinetAngle) && cabinetAngle!=null) {
            clearCanvas();
            drawCabinet(polygonArray, pointsOfDrawing,  cabinetAngle);
        }
        else{
            alert("invalid input");
        }
    }
    else if(action == "cavalier"){
        var cavalierAngle = prompt("Please enter the angle ", 90);
        if(!isNaN(cavalierAngle) && cavalierAngle!=null) {
            clearCanvas();
            drawCavalier(polygonArray, pointsOfDrawing,  cavalierAngle);
        }
        else{
            alert("invalid input");
        }
    }
    else if(action == "perspective"){
        var perspectiveD = prompt("Please enter the D ", 1000);
        if(!isNaN(perspectiveD) && perspectiveD!=null) {
            clearCanvas();
            drawPerspective(polygonArray, pointsOfDrawing,  perspectiveD);

        }
        else{
            alert("invalid input");
        }
    }
}

function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function clearCanvas(){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height); //clear the canvas
    points = []; //intialize the array of points
}


function arrayIterator(polygonArray){
    getPolygonZMax(polygonArray);
    polygonArray.sort(compare);
    calculateVisibility(polygonArray);
    for(var i=0; i<polygonArray.length; i++){
    //    if(polygonArray[i].visibility == 1) {
            drawPolygon(polygonArray[i].pointArr[0], polygonArray[i].pointArr[1], polygonArray[i].pointArr[2],
                polygonArray[i].pointArr[3], polygonArray[i].color);
    //    }
        //console.log(polygonArray[i]);
    }
}

function arrayIterator2(newPolygonArray){
    //getPolygonZMax(newPolygonArray);
    //newPolygonArray.sort(compare);
    //calculateVisibility(newPolygonArray);
    for(var i=0; i<newPolygonArray.length; i++){
        //    if(polygonArray[i].visibility == 1) {
        drawPolygon(newPolygonArray[i].pointArr[0], newPolygonArray[i].pointArr[1], newPolygonArray[i].pointArr[2],
            newPolygonArray[i].pointArr[3], newPolygonArray[i].color);
        //    }
        console.log(polygonArray[i]);
    }
    console.log("___________________");

}



function calculateVisibility(polygonArray){
    for(var i=0; i<polygonArray.length; i++){
        var vec1 = vectorSubtraction( polygonArray[i].pointArr[2] , polygonArray[i].pointArr[1]);
        var vec2 = vectorSubtraction( polygonArray[i].pointArr[1] , polygonArray[i].pointArr[0]);
        var newPoint = vecMul(vec1, vec2);
        var pointData = {
            p : {
                x : newPoint.x,
                y : newPoint.y,
                z : newPoint.z
            }
        };
        polygonArray[i].normal = pointData;
        if(pointData.p.z >= 0){
            polygonArray[i].visibility = -1;
        }
        else{
            polygonArray[i].visibility = 1;
        }
    }
}

function vectorSubtraction( a , b ){
    return {
        x : ( a.x - b.x ),
        y : ( a.y - b.y ),
        z : ( a.z - b.z )
    }
}

function vecMul( a , b ) {
    return {
        x : ( a.y * b.z - a.z * b.y ),
        y : ( a.z * b.x - a.x * b.z ),
        z : ( a.x * b.y - a.y * b.x )
    }
}


function drawOrthographic(polygonArray, pointsOfDrawing){
    var pointArray = pointsOfDrawing;
    var newPolygonArray = polygonArray;
    var M = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointArray.length; i++){
        var result = numeric.dot([pointArray[i].x, pointArray[i].y, pointArray[i].z, 1], M);
        pointArray[i].x = result[0];
        pointArray[i].y = result[1];
        pointArray[i].z = result[2];

    }
    arrayIterator(newPolygonArray);
}

function drawCabinet(polygonArray, pointsOfDrawing,  cabinetAngle){
    var pointArray = pointsOfDrawing;
    cabinetAngle = cabinetAngle * Math.PI / 180;
    var M = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [Math.cos(cabinetAngle)/2, Math.sin(cabinetAngle)/2, 0, 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointArray.length; i++){
        var result = numeric.dot([pointArray[i].x, pointArray[i].y, pointArray[i].z, 1], M);
        pointArray[i].x = result[0];
        pointArray[i].y = result[1];
        pointArray[i].z = result[2];

    }
    arrayIterator2(polygonArray, pointArray, pointsOfDrawing);
}

function drawCavalier(polygonArray, pointsOfDrawing,  cavalierAngle){
    var pointArray = pointsOfDrawing;
    var newPolygonArray = polygonArray;
    cavalierAngle = cavalierAngle * Math.PI / 180;
    var M = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [Math.cos(cavalierAngle), Math.sin(cavalierAngle), 0, 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointArray.length; i++){
        var result = numeric.dot([pointArray[i].x, pointArray[i].y, pointArray[i].z, 1], M);
        pointArray[i].x = result[0];
        pointArray[i].y = result[1];
        pointArray[i].z = result[2];

    }
    arrayIterator2(polygonArray, newPolygonArray);
}


function drawPerspective(polygonArray, pointsOfDrawing,  perspectiveD){
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var S = 1/(1+(pointsOfDrawing[i].z/perspectiveD));
        var M = [
                [S,0,0,0],
                [0,S,0,0],
                [0,0,0,0],
                [0,0,0,1]];
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], M);
        newPoints[i].x = result[0];
        newPoints[i].y = result[1];
        newPoints[i].z = result[2];
    }
    arrayIterator(polygonArray);
}

function scaleShapes(polygonArray, pointsOfDrawing,  scaleSize){
    for(var i = 0; i<pointsOfDrawing.length; i++){
        pointsOfDrawing[i].x *= scaleSize;
        pointsOfDrawing[i].y *= scaleSize;
        pointsOfDrawing[i].z *= scaleSize;

    }
    arrayIterator(polygonArray);
}

function drawRotateX(polygonArray, pointsOfDrawing,  imageAngleX){
    var canvas = document.getElementById('canvas');
    userTranslateShapes(polygonArray, pointsOfDrawing, 0, -canvas.height/2, 0);
    rotateY(polygonArray, pointsOfDrawing, 90);
    rotateZ(polygonArray, pointsOfDrawing, imageAngleX);
    rotateY(polygonArray, pointsOfDrawing, -90);
    userTranslateShapes(polygonArray, pointsOfDrawing, 0, canvas.height/2, 0);
    arrayIterator(polygonArray);
}


function rotateX(polygonArray, pointsOfDrawing,  imageAngleX){
    imageAngleX = parseInt(imageAngleX) * Math.PI / 180;
    var M = [
        [1, 0, 0, 0],
        [0, Math.cos(imageAngleX), -Math.sin(imageAngleX), 0],
        [0, Math.sin(imageAngleX), Math.cos(imageAngleX), 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], M);
        pointsOfDrawing[i].x = result[0];
        pointsOfDrawing[i].y = result[1];
        pointsOfDrawing[i].z = result[2];
    }
}

function drawRotateY(polygonArray, pointsOfDrawing,  imageAngleY){
    var canvas = document.getElementById('canvas');
    userTranslateShapes(polygonArray, pointsOfDrawing, -canvas.height/2, 0,  0);
    rotateX(polygonArray, pointsOfDrawing, Math.PI / 2);
    rotateY(polygonArray, pointsOfDrawing, Math.PI);
    rotateZ(polygonArray, pointsOfDrawing, imageAngleY);
    rotateY(polygonArray, pointsOfDrawing, -Math.PI);
    rotateX(polygonArray, pointsOfDrawing, -Math.PI / 2);
    userTranslateShapes(polygonArray, pointsOfDrawing, canvas.height/2, 0,  0);
    arrayIterator(polygonArray);
}

function rotateY(polygonArray, pointsOfDrawing,  imageAngleY){
    imageAngleY = parseInt(imageAngleY) * Math.PI / 180;
    var M = [
        [Math.cos(imageAngleY), 0, Math.sin(imageAngleY), 0],
        [0, 1, 0, 0],
        [-Math.sin(imageAngleY), 0, Math.cos(imageAngleY), 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], M);
        pointsOfDrawing[i].x = result[0];
        pointsOfDrawing[i].y = result[1];
        pointsOfDrawing[i].z = result[2];
    }
}

function drawRotateZ(polygonArray, pointsOfDrawing,  imageAngleZ){
    var canvas = document.getElementById('canvas');
    userTranslateShapes(polygonArray, pointsOfDrawing, -canvas.height/2, -canvas.height/2,  0);
    rotateZ(polygonArray, pointsOfDrawing, imageAngleZ);
    userTranslateShapes(polygonArray, pointsOfDrawing, canvas.height/2, canvas.height/2,  0);
    arrayIterator(polygonArray);
}

function rotateZ(polygonArray, pointsOfDrawing,  imageAngleZ){
    imageAngleZ = parseInt(imageAngleZ) * Math.PI / 180;
    var M = [
        [Math.cos(imageAngleZ), -Math.sin(imageAngleZ), 0, 0],
        [Math.sin(imageAngleZ), Math.cos(imageAngleZ), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], M);
        pointsOfDrawing[i].x = result[0];
        pointsOfDrawing[i].y = result[1];
        pointsOfDrawing[i].z = result[2];
    }
}

//not in use
function translateShapes(polygonArray, pointsOfDrawing){
    var canvas = document.getElementById('canvas');
    var dx = (canvas.width/2) - (getXMax(pointsOfDrawing) + getXMin(pointsOfDrawing))/2;
    var dy = (canvas.height/2) - (getYMax(pointsOfDrawing) + getYMin(pointsOfDrawing))/2;
    var dz = 0;
    var T = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [dx, dy, dz, 1]];
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], T);
        pointsOfDrawing[i].x = result[0];
        pointsOfDrawing[i].y = result[1];
        pointsOfDrawing[i].z = result[2];
    }

    arrayIterator(polygonArray);
}

function userTranslateShapes(polygonArray, pointsOfDrawing, dx, dy, dz){
    var T = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [dx, dy, dz, 1]];
    for(var i = 0; i<pointsOfDrawing.length; i++){
        var result = numeric.dot([pointsOfDrawing[i].x, pointsOfDrawing[i].y, pointsOfDrawing[i].z, 1], T);
        pointsOfDrawing[i].x = result[0];
        pointsOfDrawing[i].y = result[1];
        pointsOfDrawing[i].z = result[2];
    }
    if (action == "translate") {
        arrayIterator(polygonArray);
    }
}

function getXMin(pointsOfDrawing){
    var xMin = pointsOfDrawing[0].x;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var x = pointsOfDrawing[i].x;
        if (x <= xMin) {
            xMin = x;
        }
    }
    return xMin;
}

function getYMin(pointsOfDrawing){
    var yMin = pointsOfDrawing[0].y;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var y = pointsOfDrawing[i].y;
        if (y <= yMin) {
            yMin= y;
        }
    }
    return yMin;
}

function getZMin(pointsOfDrawing){
    var zMin = pointsOfDrawing[0].z;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var z = pointsOfDrawing[i].z;
        if (z <= zMin) {
            zMin = z;
        }
    }
    return zMin;
}

function getXMax(pointsOfDrawing){
    var xMax = pointsOfDrawing[0].x;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var x = pointsOfDrawing[i].x;
        if (x >= xMax) {
            xMax = x;
        }
    }
    return xMax;
}

function getYMax(pointsOfDrawing){
    var yMax = pointsOfDrawing[0].y;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var y = pointsOfDrawing[i].y;
        if (y >= yMax) {
            yMax = y;
        }
    }
    return yMax;
}

function getZMax(pointsOfDrawing){
    var zMax = pointsOfDrawing[0].z;
    for (var i=1;i<pointsOfDrawing.length;i++) {
        var z = pointsOfDrawing[i].z;
        if (z >= zMax) {
            zMax = z;
        }
    }
    return zMax;
}

function getPolygonZMax(polygonArray){
    for(var i=0; i<polygonArray.length; i++){
        var zMax = polygonArray[i].pointArr[0].z;
        for(var j=1; j<polygonArray[i].pointArr.length; j++){
            if(zMax < polygonArray[i].pointArr[j].z){
                zMax = polygonArray[i].pointArr[j].z;
            }
        }
        polygonArray[i].zmax = zMax;
    }
}

function compare(polygonA, polygonB){
    if (polygonA.zmax < polygonB.zmax)
        return -1;
    else if (polygonA.zmax > polygonB.zmax)
        return 1;
    else
        return 0;
}


function drawPolygon(p1, p2, p3 ,p4, color){
    var canvas = document.getElementById('canvas');
    var objctx = canvas.getContext('2d');
    objctx.beginPath();
    objctx.moveTo(parseInt(p1.x), parseInt(p1.y));
    objctx.lineTo(parseInt(p2.x), parseInt(p2.y));
    objctx.lineTo(parseInt(p3.x), parseInt(p3.y));
    if(p4 != null){
        objctx.lineTo(parseInt(p4.x), parseInt(p4.y));
    }
    objctx.closePath();
    objctx.fillStyle  = color;
    objctx.fill();
    objctx.stroke();
}






