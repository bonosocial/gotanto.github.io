CELL_SIZE=50;
BOARD_SIZE=400;
var board=[];
var teban=1;
var dx=[0,1,1,1,0,-1,-1,-1];
var dy=[1,1,0,-1,-1,-1,0,1];
var gameset=false;
var COM_TEBAN=-1;
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
        ctx.arc(CELL_SIZE*(i-1)+25,CELL_SIZE*(j-1)+25,22,0, Math.PI*2,false);
        ctx.fill();
      }
      if(board[i][j]===-1){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.arc(CELL_SIZE*(i-1)+25,CELL_SIZE*(j-1)+25,22,0, Math.PI*2,false);
        ctx.fill();
      }
    }
  }
}
function eval(ban,te){
  return 0;
}
function com(){
    //var cboard=board;
    var kohox=[];
    var kohoy=[];
    for(var i=1;i<=8;++i){
      for(var j=1;j<=8;++j){
        if(put(i,j)){kohox.push(i);kohoy.push(j);}
      }
    }
    //n=Math.floor( Math.random()*kohox.lengh)
    board[kohox[0]][kohoy[0]]=teban;
    flip(kohox[0],kohoy[0]);
    teban=-teban;
    display();
}
function flip(x,y){
  var tx=x,ty=y,n=0;
  for(var i=0;i<8;++i){
    n=0;tx=x;ty=y;
    while(board[tx+dx[i]][ty+dy[i]]===-teban){
      n++;
      tx+=dx[i];
      ty+=dy[i];
    }
    if(n>0&&board[tx+dx[i]][ty+dy[i]]===teban){
      for(var j=1;j<=n;++j){board[x+dx[i]*j][y+dy[i]*j]=teban;}
    }
  }
}
function put(hoge,x,y,te){
  var ban=[];
  for(var i=0;i<10;++i){
    ban[i]=[];
    for(var j=0;j<10;++j){
      ban[i][j]=hoge[i][j];
    }
  }
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
function pass(hoge,te){
  var ban=[];
  for(var i=0;i<10;++i){
    ban[i]=[];
    for(var j=0;j<10;++j){
      ban[i][j]=hoge[i][j];
    }
  }
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
  //if(teban===COM_TEBAN){return;}
  var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    x=parseInt(x/CELL_SIZE);
    y=parseInt(y/CELL_SIZE);
    //alert(x+" "+y);
  if(0<=x&&x<8&&0<=y&&y<8&&put(board,x+1,y+1,teban)&&gameset==false){
        board[x+1][y+1]=teban;
        flip(x+1,y+1);
        display();
        teban=-teban;
        if(pass(board,teban)===true){
            teban=-teban;
            if(pass(board,teban)===true){gameset=1;alert("終わりです");result();}else{
            if(teban==1){alert("パスで黒の番です")}
            if(teban==-1){alert("パスで白の番です")}
          }
        }
        //if(teban==-1){com();}
    }
}
boardInit();
display();

canvas.addEventListener('click', onClick, false);
