var prediction="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach('#camera');
function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

});
}
console.log('ml5 version-',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/__WnpP3LI/model.json',modelloaded);
function modelloaded(){
    console.log("model loaded");

}
function speak(){
    var synth=window.speechSynthesis;
    var speak_data="The prediction is "+prediction;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis)
    }
    function check_gesture(){
        var img=document.getElementById("captured_image");
        classifier.classify(img,gotResults);

    }
    function gotResults(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_gesture_name").innerHTML=results[0].label;
            prediction=results[0].label;
            speak();
            if(results[0].label=="amazing"){
                document.getElementById("updategesture").innerHTML="&#128076";
            }
            if(results[0].label=="victory"){
                document.getElementById("updategesture").innerHTML="&#9996";

            }
            if(results[0].label=="high five"){
                document.getElementById("updategesture").innerHTML="&#9995";

            }
           if(results[0].label==="good job"){
                document.getElementById("updategesture").innerHTML="&#128077";

            }
           if(results[0].label=="dislike"){
                document.getElementById("updategesture").innerHTML="&#128078";

            }


        }

    }