/**
 * Created by shya on 2016/8/11.
 */
windoweLenght=0.92*window.screen.availWidth;
cellWidth=0.2*windoweLenght;
cellSpace=0.04*windoweLenght;

//获取距离container的top的数据
function getPosTop(i,j) {
    return cellSpace+i*(cellSpace+cellWidth);
}

//获取距离container的left的数据
function getPosLeft(i,j) {
    return cellSpace+j*(cellSpace+cellWidth);
}
//为有数字的board设置背景色
function getNumberBackgroungColor(n){
    switch (n){
        case 2:return "#FFDFC6";break;
        case 4:return "#FFD6A8";break;
        case 8:return "#FFC78F";break;
        case 16:return "#FFB670";break;
        case 32:return "#FF9D56";break;
        case 64:return "#FFA13C";break;
        case 128:return "#FF8D27";break;
        case 256:return "#FF7316";break;
        case 512:return "#FF4C11";break;
        case 1024:return "#FF861F";break;
        case 2048:return "#FF7A0C";break;
        case 4096:return "#FF981A";break;
    }
    return "black";
}

function getNumberColor(n) {
    // if(n<=4){
    //     return "#green";
    // }
    return "white";
}

function nospace(board) {
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        if(board[i][j]==0)
            return false;
    return true;
}

function canMoveLeft(board) {
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
        if(board[i][j]!=0)
            if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                return true;
    return false;
}

function canMoveUp(board) {
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++)
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
    return false;
}

function canMoveRight(board) {
    for(var i=0;i<4;i++)
        for(var j=0;j<3;j++)
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for(var i=0;i<3;i++)
        for(var j=0;j<4;j++)
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
    return false;
}

function noBlockHorizontal(row,col1,col2,board) {
    for(var i=col1+1;i<col2;i++)
        if(board[row][i]!=0)
            return false;
    return true;

}

function noBlockVertical(col,row1,row2,board) {
    for(var j=row1+1;j<row2;j++)
        if(board[j][col]!=0)
            return false;
    return true;
}