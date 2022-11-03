var num_2="";
var num_2_2 = "";
var num_10 = -1 ;
var input;
var result;
var flag = 0;

makeBinaryNum();
changeBinaryToDecimal();

function makeBinaryNum(){

    // 4bit 2진수 랜덤으로 숫자 생성
    var i = 8;
    while (i > 0){
        const num = Math.round(Math.random());
        num_2 = num_2 + num.toString();
        i--;
    }

    //html에 표시할 변수에 저장
    num_2_2 = num_2;
}

function changeBinaryToDecimal(){
    // 10진수로 바꾸기
    if(num_2 == "00000000") {
        num_10= parseInt(0);
    }
    else {
        num_10 = (parseInt(num_2,2));
    }
}

function checkAnswer(answer){
    // 값 맞는지 확인
   if (num_10 == answer){
       document.write("\n정답입니다");
   }else{
       document.write("\n오답입니다.");
   }
}


window.onload = function(){
    var btn = document.getElementsByClassName("btn")[0];

    //html에서 버튼 클릭시 값 갖고와서 확인
    btn.addEventListener("click", function(){
        var answer = document.getElementById("answer").value;
        answer = parseInt(answer);
        checkAnswer(answer);
    });
}