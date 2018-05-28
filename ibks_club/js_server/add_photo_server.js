var fs = require('fs-extra');

module.exports = {
	get_gallery : function() {
		var dir = './gallery'
		var results = [];
	    var list = fs.readdirSync(dir);
	    list.forEach(function(file) {
	        file = dir + '/' + file;
	        var stat = fs.statSync(file);
	        if (stat && stat.isDirectory()) { 
	            results = results.concat(walk(file));
	        } else { 
	            results.push(file);
	        }
	    });
	    return results;
	},
	get_registered_image : function() {
		var dir = './registered_image'
		var results = [];
		var list = fs.readdirSync(dir);
		list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
	        if (stat && stat.isDirectory()) { 
	            results = results.concat(walk(file));
	        } else { 
	            results.push(file);
	        }
		});
		return results;
	},
	register_image : function(image_list) {
		for (var i = 0; i < image_list.length; ++i) {
			var old_path = image_list[i];
			var new_path = image_list[i].replace('gallery', 'registered_image');
			fs.move(old_path, new_path, function (err) {				
				if (err) return console.error(err);				 
			});
		}
	}
}
