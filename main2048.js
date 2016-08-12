/**
 * Created by shya on 2016/8/11.
 */
var board=new Array();
var score=0;
var isConflicted=new Array();//此数组用于移动优化

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function () {
    forMobile();//格式为手机时
    newgame();
});

function newgame(){
    init();//初始化棋盘格
    generateOneNumber();//随机两个格子生成数字，调用两次
    generateOneNumber();
}

function forMobile() {
    if(windoweLenght>500){
        windoweLenght=500;
        cellSpace=20;
        cellWidth=100;
    }

    $("#container").css("width",0.92*windoweLenght+'px');
    $("#container").css("height",0.92*windoweLenght+'px');
    $("#container").css("padding",cellSpace+'px');
    $("#container").css("border-radius",0.02*windoweLenght+'px');

    $(".cell").css("width",cellWidth+'px');
    $(".cell").css("height",cellWidth+'px');
    $(".cell").css("border-radius",0.02*windoweLenght+'px')
}

function init() {
    for(var i=0;i<4;i++) {
        board[i]=new Array();//将board转换成二维数组
        isConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
            isConflicted[i][j]=false;
            var grid_cell = $("#cell-" + i + "-" + j);
            grid_cell.css('top', getPosTop(i, j));
            grid_cell.css('left', getPosLeft(i, j));
        }
    }
/*    $('#endgameButton').css('display','none');*/
    updateBoardView();//控制前端页面
    score=0;//将score初始化为0
}

function updateBoardView() {
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
          $("#container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('height','0px');
                theNumberCell.css('width','0px');
                theNumberCell.css('top',getPosTop(i,j)+0.5*cellWidth+'px');
                theNumberCell.css('left',getPosLeft(i,j)+0.5*cellWidth+'px');
            }else{
                theNumberCell.css('height',cellWidth+'px');
                theNumberCell.css('width',cellWidth+'px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroungColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            isConflicted[i][j]=false;
        }
    $('.number-cell').css('line-height',cellWidth+'px');
    $('.number-cell').css('font-size',0.6*cellWidth+'px');
    $('.number-cell').css("border-radius",0.02*windoweLenght+'px');
}

function generateOneNumber() {
    if(nospace(board))
        return false;
    //随机一个数字
    var randomNumber=Math.random()<0.5?2:4;
    //随机一个位置坐标
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    //判断随机的位置坐标是否可用,可用，则赋值【此处还可更优化】
    var times=0;
    while(times<50){
         randx=parseInt(Math.floor(Math.random()*4));
         randy=parseInt(Math.floor(Math.random()*4));
       if( board[randx][randy]==0){
           board[randx][randy]=randomNumber;
           break;
       }
        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
              if(board[i][j]==0)
                  board[i][j]=randomNumber;
            }
    }
    //在随机位置显示随机数
    showNumberWithAnimation(randx,randy,randomNumber);
}

//设置移动事件
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:if(moveLeft()){
            event.preventDefault();//防止键盘控制滚动条的时候触发
            setTimeout("generateOneNumber()",250);
            setTimeout("isGameover()",300);
        }
        break;//左移事件··
        case 38:if(moveUp()){
            event.preventDefault();
            setTimeout("generateOneNumber()",250);
            setTimeout("isGameover()",300);
        }
        break;//上移事件··
        case 39:if(moveRight()){
            event.preventDefault();
            setTimeout("generateOneNumber()",250);
            setTimeout("isGameover()",300);
        }
        break;//右移事件··
        case 40:if(moveDown()){
            event.preventDefault();
            setTimeout("generateOneNumber()",250);
            setTimeout("isGameover()",300);
        }
        break;//下移事件··
    }
});
//触屏事件
document.addEventListener('touchstart',function (event) {
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});

document.addEventListener('touchend',function (event) {
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;
    //对坐标的判断来决定方向
     var subx=startx-endx;
    var suby=starty-endy;

    if (Math.abs(subx) < 0.3 * cellWidth && Math.abs(suby) < 0.3 * cellWidth)
    return;

    if(Math.abs(subx)>=Math.abs(suby)){
        if(subx>0){
            //向左
            if(moveLeft()) {
                setTimeout("generateOneNumber()", 250);
                setTimeout("isGameover()", 300);
            }
        }else{
            //向右
            if(moveRight()){
                event.preventDefault();
                setTimeout("generateOneNumber()",250);
                setTimeout("isGameover()",300);
            }
        }
    }else{
        //向上
        if(suby>0){
            if(moveUp()){
                setTimeout("generateOneNumber()",250);
                setTimeout("isGameover()",300);
            }
        }else{
            //向下
            if(moveDown()){
                setTimeout("generateOneNumber()",250);
                setTimeout("isGameover()",300);
            }
        }
    }
});

function isGameover() {
    if(!canMoveLeft(board)&&!canMoveDown(board)&&!canMoveRight(board)&&!canMoveUp(board))
    {
        alert("GameOver!")
        // $('#endgameButton').css('display','block');
        // $('#endgameButton').css('position','float');
    }
}

function moveLeft() {
    if(!canMoveLeft(board))
        return false;
    //落脚位置是否为空，落脚位置是否和待判定元素相等，移动路径中是否有障碍物
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
          if(board[i][j]!=0) {
              for (var k = 0; k < j; k++) {
                  if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                      showMoveAnimation(i, j, i, k);
                      board[i][k] = board[i][j];
                      board[i][j] = 0;
                      isConflicted[i][k]=true;
                      continue;
                  } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)&&!isConflicted[i][k]) {
                      showMoveAnimation(i, j, i, k);
                      board[i][k] += board[i][j];
                      board[i][j] = 0;
                      isConflicted[i][k]=true;
                      score+=board[i][k];
                      continue;
                  }
              }
          }
        }
        showUpadateScore(score);
        setTimeout("updateBoardView()",200);
        return true;
}

function moveRight() {
    if(!canMoveRight(board))
        return false;
    //落脚位置是否为空，落脚位置是否和待判定元素相等，移动路径中是否有障碍物
    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0) {
                for (var k =3; k>j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        isConflicted[i][k]=true;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k, board)&&!isConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        isConflicted[i][k]=true;
                        score+=board[i][k];
                        continue;
                    }
                }
            }
        }
    showUpadateScore(score);
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp() {
    if(!canMoveUp(board))
        return false;
    //落脚位置是否为空，落脚位置是否和待判定元素相等，移动路径中是否有障碍物
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++){
            if(board[i][j]!=0) {
                for (var k =0; k<i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        isConflicted[k][j]=true;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)&&!isConflicted[k][j]) {
                        showMoveAnimation(i, j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        isConflicted[k][j]=true;
                        score+=board[i][k];
                        continue;
                    }
                }
            }
        }
    showUpadateScore(score);
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if(!canMoveDown(board))
        return false;
    //落脚位置是否为空，落脚位置是否和待判定元素相等，移动路径中是否有障碍物
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--)
        {
            if(board[i][j]!=0) {
                for (var k =3; k>i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i,k, board)) {
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        isConflicted[k][j]=true;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i,k, board)&&!isConflicted[k][j]) {
                        showMoveAnimation(i, j, k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        isConflicted[k][j]=true;
                        score+=board[i][k];
                        continue;
                    }
                }
            }
        }
    showUpadateScore(score);
    setTimeout("updateBoardView()",200);
    return true;
}

