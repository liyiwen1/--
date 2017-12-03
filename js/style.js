var box={width:20,height:20};  //每一个方块的高度
var snake=[];   //保存每一节蛇身体对应的span
var DIR={
	DIR_RIGHT:1,
	DIR_LEFT:2,
	DIR_TOP:3,
	DIR_BOTTOM:4
};
var dir=DIR.DIR_RIGHT;
var food=null;  //始终记录当前食物
var speed;
var timer;

window.onload=function()
{
	//初始化地图
	initMap();
	//创建蛇
	//随机显示食物
	showFood();
	createSnake();
	//控制蛇移动
	var obj=document.getElementById("myselect");
	speed=obj.options[obj.selectedIndex].value;
	clearInterval(timer);
 	//让蛇动起来
	timer=setInterval(snakeMove,speed);
	document.onkeyup=function(event)
	{
		
		switch(event.keyCode)
		{
			case 37:dir=DIR.DIR_LEFT;break;
			case 38:dir=DIR.DIR_TOP;break;
			case 39:dir=DIR.DIR_RIGHT;break;
			case 40:dir=DIR.DIR_BOTTOM;break;
		}
	}
}

function init(tempspeed)
 {
 	//speed=tempspeed;

	
 }

//判断某个块是否在蛇身体里面
function isInSnakeBody(left, top)
{
	for(var i=0;i<snake.length;i++)
	{
		if(snake[i].offsetLeft==left&&snake[i].offsetTop==top)
			return true;
	}		
}
//随机生成食物
function showFood()
{
	var con=document.getElementById("container");
	food=document.createElement("span");
	food.className="food";
	food.style.width=box.width+"px";
	food.style.height=box.height+"px";
	var left,top;
	do{
		left=Math.floor((con.offsetWidth-2)/box.width*Math.random())*box.width;
 		top=Math.floor((con.offsetHeight-2)/box.height*Math.random())*box.height;
	}while(isInSnakeBody(left,top))
	food.style.left=left+"px";
	food.style.top=top+"px";
	con.appendChild(food);
	
}
 function initMap()
 {  
 	var con=document.getElementById("container");
 	var row=Math.floor(con.offsetWidth/box.width);
 	var col=Math.floor(con.offsetHeight/box.height);
 	//块的数目
 	var num=row*col;
 	for(var i=0;i<num;i++)
 	{
 		newSpan=document.createElement("span");
 		newSpan.style.width=box.width+"px";
 		newSpan.style.height=box.height+"px";
 		con.appendChild(newSpan);
 	}
 }

function createSnake()
{
	var newBody=null;
	var con=document.getElementById("container");
	for(var i=0;i<5;i++)
	{
		newBody=document.createElement("span");
		newBody.style.width=box.width+"px";
		newBody.style.height=box.height+"px";
		newBody.style.top="0px";
		newBody.style.left=i*box.width+"px";
		newBody.className="snake";
		con.appendChild(newBody);
		snake.push(newBody);
	}
}

function snakeMove()
{
	var con=document.getElementById("container");
	var head=snake[snake.length-1];
	var newTop=head.offsetTop, newLeft=head.offsetLeft;
	switch(dir)
	{
		case DIR.DIR_LEFT:newLeft-=box.width;break;
		case DIR.DIR_RIGHT:newLeft+=box.width;break;
		case DIR.DIR_TOP:newTop-=box.height;break;
		case DIR.DIR_BOTTOM:newTop+=box.height;break;
		default:break;
	}
	 
	//如果超出边界，计算蛇头下一个位置的坐标
	 if(newLeft>con.offsetWidth-2-1){newLeft=0;}
	 if(newLeft<0){newLeft=con.offsetWidth-2-box.width;}
	 if(newTop<0){newTop=con.offsetHeight-2-box.height;}
	 if(newTop>con.offsetHeight-2-1){newTop=0;}
	//判断是否碰到自己的尾巴
	for(var i=0;i<snake.length-1;i++)
	 {
	 	if(newLeft==snake[i].offsetLeft&&newTop==snake[i].offsetTop)
	 	{
	 		alert("Game over");
	 		window.location.href=window.location.href;
	 	}	
	 }
	 //如果吃到食物
	 if(newLeft==food.offsetLeft&&newTop==food.offsetTop)
	 {
	 	food.className="snake";
	 	snake.push(food);
	 	showFood();
	 	return;
	 }
	 
	 //如果没有吃到食物
	for(var i=0;i<snake.length-1;i++)	
	{
		snake[i].style.top=snake[i+1].offsetTop+"px";
		snake[i].style.left=snake[i+1].offsetLeft+"px";
	}
	head.style.top=newTop+"px";
	head.style.left=newLeft+"PX";
}
