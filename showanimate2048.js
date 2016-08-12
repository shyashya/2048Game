/**
 * Created by shya on 2016/8/11.
 */
function showNumberWithAnimation(i,j,r) {
    var numberCell=$('#number-cell-'+i+"-"+j);
    numberCell.css('background-color',getNumberBackgroungColor(r));
    numberCell.css('color',getNumberColor(r));
    if(r==2048||r==4096){
        numberCell.css('font-size',0.3*cellWidth+'px');
    }
    numberCell.text(r);
    numberCell.animate({
        width:cellWidth,
        height:cellWidth,
        top:getPosTop(i,j),
    left:getPosLeft(i,j)
    },50)
}

function showMoveAnimation(fx,fy,tx,ty) {
    var numberCell=$('#number-cell-'+fx+'-'+fy);
    numberCell.animate({
        top:getPosTop(tx,ty),
    left:getPosLeft(tx,ty)
    },200);
}

function showUpadateScore(score) {
    $("#score").text(score);
}
/*function showGameOver() {
    var gameOver=$('#endgameButton');
    gameOver.animate({display:'inline',position:'float'},50)
}*/
