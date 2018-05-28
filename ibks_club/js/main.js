function get_images() {
	$.post('/get_registered_image_list', {
	}).done(function(reply) {
		$('.body-inner').empty();
		var file_list = eval(reply['file_list']);
		for (var i = 0; i < file_list.length; ++i) {
			$('<div id="each' + i + '" class="each-div"><img class="each-image" src="' + file_list[file_list.length - i - 1] + '" /></div>').appendTo($('.body-inner'));			
		}
		for (var i = 0; i < file_list.length; ++i) {
			$('<p><div><img class="clap-image" src="res/clap.png" /></div>').appendTo($('#each' + i));
			var msg = "칭찬해 " + i + "개";
			$('<a class="each-msg">' + msg + '</a>').appendTo($('#each' + i));
			$('<div class="border-div" />').appendTo($('#each' + i));
			var write_reply = "&nbsp;&nbsp;답글달기";
			$('<p><a class="write-reply">' + write_reply + '</a>').appendTo($('#each' + i));
			var reply_list = "굿 좋아요! ^^;";
			$('<p><div class="reply"><a class="reply-writer">SSB</a>&nbsp;:&nbsp;<a class="reply-content">' + reply_list + '</a></div>').appendTo($('#each' + i));
		}
	}).fail(function() {});
}

$(document).ready(function() {
	get_images();
	
	var user_arr = ['이시현', '김민정', '류석호', '김진욱', '손승범'];
	for (var i = 0; i < 5; ++i) {
		$('<div class="user-info"><img class="user-image" src="res/user' + (i + 1) + '.jpg" /><a class="user-name">' + user_arr[i] + '</a></div>').appendTo($('.left-second-div-content'));
	}
	$('<div class="more"><a>. . .</a></div>').appendTo($('.left-second-div-content'));
	$('<a class="my-post-text">내가 작성한 게시물</a>').appendTo($('.my-post'));
	
	$(".add-image").click(function() {
		var w = 1000;
		var h = 700;
		var x = (screen.width - w) / 2;
		var y = (screen.height - h) / 3 - 50;
		window.open('/add_photo', '_blank', 'scrollbars=yes, width=' + w + ', height=' + h + ', left=' + x + ', top=' + y);
	});
});
