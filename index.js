function musicPlay(ele){
 let musicArea = document.createElement('div');
 let music =document.createElement('audio');
 let musicUl =document.createElement('ul');
 let a = 400;//歌词容器到高，随便改,但最好和你自己写到那个div一样高；
 let b = 35;//li的高度，无特殊要求；
 let c ='road.mp3'//歌曲目录，只能放一个哈！
 ele.appendChild(musicArea).appendChild(music);
                musicArea.appendChild(musicUl);
 musicStyle();
 //我让ajax打败了，所以歌词直接放变量了。(╯﹏╰)恶补中；
 //烦人的报错，让我把ajax先扔去喂鱼，等下再吃。
	let lrc = `[ti:多想在平庸的生活拥抱你]
[ar:隔壁老樊]
[al:单曲]
[by:孟德良]
[00:00.00]《多想在平庸的生活拥抱你》
[00:04.00]词/曲/唱：隔壁老樊(樊凯杰)
[00:07.00]
[00:17.40]世界上 有很多的东西
[00:21.12]生不带来 死不带去
[00:25.96]你能带走的
[00:27.59]只有自己 和自己的脾气
[00:34.19]你曾拥有 最美的爱情
[00:37.61]你听过 最美的旋律
[00:42.32]触摸过 一个人孤独 的恐惧
[00:45.88]也看到过 最美的风景
[00:53.04]我跌跌撞撞 奔向你
[01:00.04]你也不能 一个人离去
[01:08.30]我们在一起说过
[01:12.48]无论如何 一起经历了风雨
[01:17.90]平平淡淡 安安静静的老去
[01:22.38](Music)
[01:58.86]世界上 有很多的东西
[02:02.38]你生不带来 死不带去
[02:07.31]你能带走的
[02:08.87]只有自己 和自己的脾气
[02:15.48]你曾拥有 最美的爱情
[02:18.94]你听过 最美的旋律
[02:23.70]触摸过 一个人孤独 的恐惧
[02:27.24]也看到过 最美的风景
[02:30.91]
[02:34.46]我跌跌撞撞 奔向你
[02:41.47]你也不能 一个人离去
[02:49.73]我们在一起说过
[02:53.83]无论如何 一起经历了风雨
[02:58.95]平平淡淡 安安静静的老去
[03:04.30](Music)
[03:39.37]我们拼命的相拥
[03:43.56]不给孤独留余地
[03:48.16]无力
[03:49.41]是我们最后 难免的结局
[03:54.89]
[03:56.39]无力
[03:57.60]是我们最后 难免的结局
[04:02.79](The end)
[04:05.00]☆谢谢欣赏☆
`
 function musicStyle(){//控件css样式；	
 	music.autoplay =true;
 	music.src =c;	
 	music.controls =true;
 	music.loop =true;
 	music.style.outline ='none'; 
 	music.style.width ='100%';
 	musicArea.style.width ='100%';
 	musicArea.style.height ='100%';
 	musicArea.style.overflow = 'hidden'
 	// musicArea.style.outline ='3px solid'
 	musicUl.style.listStyle ='none'; 
 	musicUl.style.width ='100%'
 	musicUl.style.padding  ='0';
 }
 //把歌词变成[{time,lrc},{time,lrc}...]的样子，不然没法用的
 function split(){//把lrc歌词分割成数组，
    let split_1 =lrc.split('\n');
	let length = split_1.length;
	for (let i = 0; i < length; i++) {
		let lrcArr = split_1[i];
		split_1[i] = change(lrcArr);
	function change(str){
		let lrc = str.split(']');
		let timer =lrc[0].replace('[','');
		let str_music =lrc[1];
		let time_split =timer.split(':');
		let s = +time_split[1];
		let min = +time_split[0];
		return{
			time:min*60 + s ,
			lrc :str_music//分割好到歌词和时间
		}
        
	}
}
return split_1
}
let lrcArr = split();//至此歌词处理完了。
createLi();
function createLi(){//根据歌词数组创建li
	let len = lrcArr.length;
	for (let i = 0; i < len; i++) {
		  let lrc_li  = lrcArr[i];
		  let li  = document.createElement('li');
		  li.innerText =lrc_li.lrc;
		  li.style.height = b + 'px'
		  li.style.textAlign ='center'
		  li.style.width='100%'
		  li.style.padding = '0';
		  li.style.color = '#999'
		  li.style.transition = '0.3s'
		  musicUl.appendChild(li);
	}
}
function setCurrentLi(){
	let time = music.currentTime;
	// console.log(time)
	for ( i = 0; i < lrcArr.length; i++) {
		let play = lrcArr[i];
		if (time -play.time <= 0) {
			 return i;
		}
	}return -1;
}
function current(){//设置top，让其滚动
	let li = setCurrentLi();
	let divHeight = a;
	let liHeight =b;
	let top  = liHeight*li - divHeight / 2 +liHeight / 2;
	if (top < 0) {
		top = 0;
	}
	musicUl.style.marginTop = -top + 'px';
	// console.log('top'+top);
	let playLi =musicUl.querySelector('.play')
	if (playLi) {
		playLi.className = '';		
	}
	if(li>=0){
		musicUl.children[li-1].className ='play'
    
}}
music.ontimeupdate = current;
}
//Razbit出品，转载请注明出处；