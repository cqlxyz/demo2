function musicPlay(ele){
 let musicArea = document.createElement('div');
 let music =document.createElement('audio');
 let musicUl =document.createElement('ul');
 let a = 400;//歌词容器到高，随便改,但最好和你自己写到那个div一样高；
 let b = 35;//li的高度，无特殊要求；
 let c ='demo.mp3'//歌曲目录，只能放一个哈！
 ele.appendChild(musicArea).appendChild(music);
                musicArea.appendChild(musicUl);
 musicStyle();
 //我让ajax打败了，所以歌词直接放变量了。(╯﹏╰)恶补中；
 //烦人的报错，让我把ajax先扔去喂鱼，等下再吃。
 let lrc = `[ti:世界这么大还是遇见你 (清新的小女孩（中文版）)]
[ar:程响]
[00:00.00]世界这么大还是遇见你 - 程响
[00:01.85]词：程响
[00:03.71]曲：Htet Aung Lwin
[00:05.57]制作人：李启文
[00:07.42]文案：冷小婧
[00:09.28]宣发：刘芳
[00:11.14]出品公司：北京金翼龙国际文化传媒有限公司
[00:12.99]（版权所有未经许可不得使用)
[00:17.92]背包塞满青涩的回忆
[00:21.40]就要踏上成长的旅程
[00:24.82]就到 这个路口
[00:27.45]你就不要送我 你快回去
[00:31.69]相逢又告别一句再见
[00:35.17]过去的一切不会重现
[00:38.58]失落的时候
[00:40.92]请像我一样相信你自己
[00:45.39]世界这么大还是遇见你
[00:48.95]多少次疯狂 多少天真
[00:52.66]一起做过梦
[00:54.62]有一天我们会重逢故里
[00:59.10]世界这么大还是遇见你
[01:02.60]一起走过许多个四季
[01:06.41]天南地北
[01:08.06]别忘记我们之间的情谊
[01:26.50]背包塞满青涩的回忆
[01:29.94]就要踏上成长的旅程
[01:33.39]就到 这个路口
[01:36.00]你就不要送我 你快回去
[01:40.28]相逢又告别一句再见
[01:43.71]过去的一切不会重现
[01:47.14]失落的时候
[01:49.53]请像我一样相信你自己
[01:53.97]世界这么大还是遇见你
[01:57.46]多少次疯狂 多少天真
[02:01.30]一起做过梦
[02:03.21]有一天我们会重逢故里
[02:07.68]世界这么大还是遇见你
[02:11.08]一起走过许多个四季
[02:15.04]天南地北
[02:16.62]别忘记我们之间的情谊
[02:35.15]世界这么大还是遇见你
[02:38.58]多少次疯狂 多少天真
[02:42.46]一起做过梦
[02:44.32]有一天我们会重逢故里
[02:48.80]世界这么大还是遇见你
[02:52.28]一起走过许多个四季
[02:56.12]天南地北
[02:57.69]别忘记我们之间的情谊
[03:02.64]世界这么大还是遇见你
[03:06.01]多少次疯狂 多少天真
[03:09.77]一起做过梦
[03:11.77]有一天我们会重逢故里
[03:16.27]世界这么大还是遇见你
[03:19.74]一起走过许多个四季
[03:23.57]天南地北
[03:25.10]别忘记我们之间的情谊

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