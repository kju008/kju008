$(document).ready(function() {
	var selected_list = [];
	$.post('/get_gallery_list', {}).done(function(reply) {
		var file_list = eval(reply['file_list']);
		for (var i = 0; i < file_list.length; ++i) {
			var div = '<div class="gallery"><div class="col-xs-4 col-sm-3 col-md-2 nopad text-center">';			
			var html = div + '<label class="image-checkbox"><img class="img-responsive" src="' + file_list[i] + '"/><input type="checkbox" name="image[]" value="" /></label>' + '</div></div>'
			$(html).appendTo($('.container'));
		}		
		$(".image-checkbox").on("click", function (e) {
			$(this).toggleClass('image-checkbox-checked');
			var $checkbox = $(this).find('input[type="checkbox"]');
			$checkbox.prop("checked", !$checkbox.prop("checked"));
			var img = $(this).find('img').attr('src');
			if ($checkbox.prop("checked")) {
				selected_list.push(img);
			} else {
				for (var i = 0; i < selected_list.length; ++i) {
					if (selected_list[i] == img) {
						selected_list.splice(i, 1);
					}
				}
			}
			e.preventDefault();
		});
		$(".send-btn").on("click", function (e) {
			var image_list = JSON.stringify(selected_list);
			$.post('/register_image', {"image_list" : image_list}).done(function(reply) {
				alert("사진이 등록 되었습니다.");
				opener.get_images();
				self.close();				
			}).fail(function() {});
		});
	}).fail(function() {});

	function ajax(url, input_data, gubun, method) {
		$.ajax(url, {
			type: method, 
	        data: JSON.stringify(input_data),
	        async: false,
	        contentType: 'application/json',
	        dataType: 'json',
	        processData: false,
	        success: function (data, status, xhr) {
	        	alert("사진이 등록 되었습니다.");
				self.close();
	        },
	        error: function (jqXhr, textStatus, errorMessage) {
	        	if(jqXhr.status==404) {
	        		alert(textStatus);
	            }
	        }
	    });
	}
});
