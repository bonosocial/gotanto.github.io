CELL_SIZE=504/8;
BOARD_SIZE=504;
var board=[];
var teban=1;
var dx=[0,1,1,1,0,-1,-1,-1];
var dy=[1,1,0,-1,-1,-1,0,1];
var gameset=false;
var COM_TEBAN=-1;
var EVAL_X=8;
var EVAL_C=2;

for(var i=0;i<10;++i){
  board[i]=[]
  for(var j=0;j<10;++j){
    board[i][j]=0;
  }
}
function boardInit(){
  for(var i=0;i<10;++i){
      board[0][i]=2;
      board[9][i]=2;
      board[i][0]=2;
      board[i][9]=2;
  }
  board[4][4]=-1;
  board[4][5]=1;
  board[5][5]=-1;
  board[5][4]=1;
}
function display(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'rgb(0,230,0)';
  ctx.fillRect(0,0,BOARD_SIZE,BOARD_SIZE);
  for(var i=0;i<10;++i){
      ctx.beginPath();
      ctx.moveTo(CELL_SIZE*i,0);
      ctx.lineTo(CELL_SIZE*i,BOARD_SIZE);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,CELL_SIZE*i);
      ctx.lineTo(BOARD_SIZE,CELL_SIZE*i);
      ctx.closePath();
      ctx.stroke();
  }
  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(board[i][j]===1){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.arc(CELL_SIZE*(i-1)+CELL_SIZE/2,CELL_SIZE*(j-1)+CELL_SIZE/2,CELL_SIZE/2-2,0, Math.PI*2,false);
        ctx.fill();
      }
      if(board[i][j]===-1){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.arc(CELL_SIZE*(i-1)+CELL_SIZE/2,CELL_SIZE*(j-1)+CELL_SIZE/2,CELL_SIZE/2-2,0, Math.PI*2,false);
        ctx.fill();
      }
    }
  }
  if(teban==COM_TEBAN&&gameset==0){comment.textContent='COM考え中';}
  if(teban==-COM_TEBAN&&gameset==0){comment.textContent='あなたの番です';}
  if(gameset==1){
    var b=0,w=0;
    for(var i=1;i<=8;++i){
      for(var j=1;j<=8;++j){
        if(board[i][j]===1){b++;}
        if(board[i][j]===-1){w++;}
      }
    }
    if(b>w){comment.textContent="黒"+b+" 白"+w+"で黒の勝ちです";}
    if(b<w){comment.textContent="黒"+b+" 白"+w+"で白の勝ちです";}
    if(b==w){comment.textContent="黒"+b+" 白"+w+"で引き分けです";}
  }
}
function eval(ban,te){
  var e=0;
  var score=0;
  if(gameover(ban)){
    for(var i=1;i<=8;++i){
      for(var j=1;j<=8;++j){
        if(ban[i][j]==te){score+=200;}
        if(ban[i][j]==-te){score-=200;}

      }
    }
    return score;
  }

  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(ban[i][j]==0){e++;}
      if(put(ban,i,j,te)){score++;}
      if(put(ban,i,j,-te)){score--;}
    }
  }
  for(var i=1;i<=4;++i){
    if(ban[1][i]==te){score+=10;}else{break;}
  }
  if(ban[2][2]==te){score-=EVAL_X;}
  if(ban[2][7]==te){score-=EVAL_X;}
  if(ban[7][2]==te){score-=EVAL_X;}
  if(ban[7][7]==te){score-=EVAL_X;}
  if(ban[2][2]==-te){score+=EVAL_X;}
  if(ban[2][7]==-te){score+=EVAL_X;}
  if(ban[7][2]==-te){score+=EVAL_X;}
  if(ban[7][7]==-te){score+=EVAL_X;}

  if(e<45&&e>25){
  if(ban[1][2]==te){score-=EVAL_C;}
  if(ban[1][7]==te){score-=EVAL_C;}
  if(ban[2][2]==te){score-=EVAL_C;}
  if(ban[2][7]==te){score-=EVAL_C;}
  if(ban[7][1]==te){score-=EVAL_C;}
  if(ban[7][8]==te){score-=EVAL_C;}
  if(ban[8][2]==te){score-=EVAL_C;}
  if(ban[8][7]==te){score-=EVAL_C;}
  if(ban[1][2]==-te){score+=EVAL_C;}
  if(ban[1][7]==-te){score+=EVAL_C;}
  if(ban[2][2]==-te){score+=EVAL_C;}
  if(ban[2][7]==-te){score+=EVAL_C;}
  if(ban[7][1]==-te){score+=EVAL_C;}
  if(ban[7][8]==-te){score+=EVAL_C;}
  if(ban[8][2]==-te){score+=EVAL_C;}
  if(ban[8][7]==-te){score+=EVAL_C;}
}
  for(var i=1;i<=4;++i){
    if(ban[1][9-i]==te){score+=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[8][i]==te){score+=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[8][9-i]==te){score+=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[i][1]==te){score+=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[9-i][8]==te){score+=10;}else{break;}
  }

  for(var i=1;i<=4;++i){
    if(ban[1][i]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[1][9-i]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[8][i]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[8][9-i]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[i][1]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[9-i][1]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[i][8]==-te){score-=10;}else{break;}
  }
  for(var i=1;i<=4;++i){
    if(ban[9-i][8]==-te){score-=10;}else{break;}
  }

  return score;
}
function koho(hoge,kx,ky,te){
  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(put(hoge,i,j,te)){kx.push(i);ky.push(j);}
    }
  }
}
function gameover(hoge){
  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(put(hoge,i,j,1)){return false;}
      if(put(hoge,i,j,-1)){return false;}
    }
  }
  return true;
}
function alphabeta(hoge,limit,alpha,beta,te){
    if(gameover(hoge)||limit==0){return eval(hoge,te);}
    var score=0;
    var kohox=[];
    var kohoy=[];
    koho(hoge,kohox,kohoy,te);
    var ban=[];
    for(var i=0;i<10;++i){
      ban[i]=[];
      for(var j=0;j<10;++j){
        ban[i][j]=hoge[i][j];
      }
    }
    if(kohox.length==0){score=-alphabeta(hoge,limit,-beta,-alpha,-te);return score;}
    for(var k=0;k<kohox.length;k++){
      ban[kohox[k]][kohoy[k]]=te;
      flip(ban,kohox[k],kohoy[k],te);
      score=-alphabeta(ban,limit-1,-beta,-alpha,-te);
      for(var i=0;i<10;++i){
        for(var j=0;j<10;++j){
          ban[i][j]=hoge[i][j];
        }
      }
      if(score>=beta){return score;}
      if(alpha<score){alpha=score;}
    }
    return alpha;
}
function com(){
    var kohox=[];
    var kohoy=[];
    var mhyoka=-1000;
    var score;

    koho(board,kohox,kohoy,teban);
    var mx=kohox[0];
    var my=kohoy[0];
    var ban=[];

    for(var i=0;i<10;++i){
      ban[i]=[];
      for(var j=0;j<10;++j){
        ban[i][j]=board[i][j];
      }
    }

    for(var k=0;k<kohox.length;k++){
      ban[kohox[k]][kohoy[k]]=teban;
      flip(ban,kohox[k],kohoy[k],teban);

      score=-alphabeta(ban,4,-50000,50000,-teban);

      if(mhyoka<score){mx=kohox[k];my=kohoy[k];mhyoka=score;}
      for(var i=0;i<10;++i){
        for(var j=0;j<10;++j){
          ban[i][j]=board[i][j];
        }
      }
    }
    //n=Math.floor( Math.random()*kohox.lengh)
    board[mx][my]=teban;
    flip(board,mx,my,teban);
    teban=-teban;
    display();
}
function flip(hoge,x,y,te){
  var tx=x,ty=y,n=0;
  for(var i=0;i<8;++i){
    n=0;tx=x;ty=y;
    while(hoge[tx+dx[i]][ty+dy[i]]===-te){
      n++;
      tx+=dx[i];
      ty+=dy[i];
    }
    if(n>0&&hoge[tx+dx[i]][ty+dy[i]]===te){
      for(var j=1;j<=n;++j){hoge[x+dx[i]*j][y+dy[i]*j]=te;}
    }
  }
}
function put(ban,x,y,te){
  /*alert(ban);
  alert(x);
  alert(y);
  alert(te);*/
  var tx=x,ty=y,n=0;
  if(ban[x][y]!=0){return false;}
  for(var i=0;i<8;++i){
    n=0;tx=x;ty=y;
    while(ban[tx+dx[i]][ty+dy[i]]===-te){
      n++;
      tx+=dx[i];
      ty+=dy[i];}
    if(n>0&&ban[tx+dx[i]][ty+dy[i]]===te){return true;}
  }
return false;
}
function pass(ban,te){
  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(put(ban,i,j,te)){return false;}
    }
  }
  return true;
}
function result(){
  var b=0,w=0;
  for(var i=1;i<=8;++i){
    for(var j=1;j<=8;++j){
      if(board[i][j]===1){b++;}
      if(board[i][j]===-1){w++;}
    }
  }
  if(b>w){alert("黒の勝ち");}
  if(b<w){alert("白の勝ち");}
  if(b==w){alert("引き分け");}
}
function onClick(e){
  if(teban===COM_TEBAN){return;}
  var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    x=parseInt(x/CELL_SIZE);
    y=parseInt(y/CELL_SIZE);
    //alert(x+" "+y);
  if(0<=x&&x<8&&0<=y&&y<8&&put(board,x+1,y+1,teban)&&gameset==false){
        board[x+1][y+1]=teban;
        flip(board,x+1,y+1,teban);
        display();
        teban=-teban;
        setTimeout(function(){
        if(gameover(board)){gameset=1;}else{
          if(pass(board,teban)){
            teban=-teban
              if(teban==1){alert("パスで黒の番です");}
            if(teban==-1){alert("パスで白の番です");}
          }
        }
        if(teban==COM_TEBAN){com();}

        if(gameover(board)){gameset=1;}else{
          if(pass(board,teban)){
            teban=-teban;
              if(teban==1){alert("パスで黒の番です");}
            if(teban==-1){alert("パスで白の番です");}
          }
        }
        while(gameset===false && teban===COM_TEBAN){
          com();
          if(gameover(board)){gameset=1;}else{
            if(pass(board,teban)){
              teban=-teban;
                if(teban==1){alert("パスで黒の番です");}
              if(teban==-1){alert("パスで白の番です");}
            }
          }
        }
      },15);
    }
}
var comment = document.getElementById('msg');
//comment.textContent='HELLO';
boardInit();
display();
setInterval("display()",5);
canvas.addEventListener('click', onClick, false);
