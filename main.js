song1="";
song2="";

song1status="";
song2status="";

scorerightwrist=0;
scoreleftwrist=0;

rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;

function preload(){
    //song1=loadSound("song1.mp3");
    //song2=loadSound("song2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotPoses);
}
function modelloaded(){
    console.log("Posenet is intitiliesd");
}
function gotPoses(results){
    if(results.length>0)
        {
          console.log(results);
            scorerightwrist=results[0].pose.keypoints[10].score;
            scoreleftwrist=results[0].pose.keypoints[9].score;
            
            rightwristx=results[0].pose.rightWrist.x;
            rightwristy=results[0].pose.rightWrist.y;
            
             leftwristx=results[0].pose.leftWrist.x;
            leftwristy=results[0].pose.leftWrist.y;
        }
}
function draw(){
    image(video,0,0,600,500);
    
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    
    fill("red");
    stroke("red");
    
    if(scorerightwrist>0.2){
       circle(rightwristx,rightwristy,20);
        song2.stop();
        if(song1status==false)
            {
              song1.play();
                document.getElementById("song").innerHTML="playing song1";
            }
    }
    if(scoreleftwrist>0.2){
       circle(leftwristx,leftwristy,20);
        song1.stop();
        if(song2status==false)
            {
              song2.play();
                document.getElementById("song").innerHTML="playing song2";
            }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}







