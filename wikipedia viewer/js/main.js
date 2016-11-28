var getData = function (i){
	var input = $("#text-input").val();

	//invoke wiki's api
	/*
		1、action=query为常用，forma=json为调用结果为json格式
		2、list=search为Which lists to get
		3、srsearch 
		搜索与此值匹配的页面标题或内容。您可以使用搜索字符串来调用特殊搜索功能，具体取决于wiki的搜索后端实现。
		4、sroffset = 5，当有更多的结果时以每次+5个数据获取,与continue并用

	*/
	var front = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=5&continue=-%7C%7C&sroffset='+i;
	
	//&continue=-%7C%7C&sroffset=5 &srprop=snippet
	var back = '&callback=?';

	//通过getJSON调取输入关键词的wiki
	$.getJSON(front + "&srsearch="+input + back ,function(data){
		var info = data.query.search;
		//将获取到的数据进行遍历
		$.each(info,function(index,value){

			var title = value.title;
			var snippet = value.snippet;
			var li = document.createElement("li");
			//change the data into html and append them to the page
			var a = '<a href="https://en.wikipedia.org/wiki/'+ title +'"'+' '+'target='+'_blank';
			var h2 = '<h2>'+title+'</h2>';
			var p = '<p>' + snippet + '</p>';
			li.innerHTML += a + h2 + '</a>' + p;

			document.getElementById("result").appendChild(li);

		})//end each
	});//end getjson
	
		
}//end getdata

$(function(){
	//global variable
	var pageN =0;//control the more button clicking times

	//click and enter key behaviour,doing the same thing
	$("#s-btn").on('click',function(){
		var pageN = 0;
		var val = $("#text-input").val();
		if(val){
			$("#result").empty();
			getData(pageN);
			$("#container").css({
				'opacity':1
			});
		};		
	});
	$("#text-input").on('keydown',function(ev){
		var ev = window.event || ev;
		var pageN = 0;
		var val = $("#text-input").val();
		if(ev.keyCode == 13 && val){
			$("#result").empty();
			getData(pageN);
			$("#container").css({
			'opacity':1
			});
		};
	});

	//load more
	$("#more").on('click',function(){
		var input = $("#text-input").val();
		var content = $("#result").html();
		//do nothing when there're no content in input box and result box
		if(input&&content){
			pageN+=5;
			getData(pageN);
		};
		return;
	})
})

