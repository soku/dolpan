(function(window) {
	var width = 600;
	var height = 400;

	var dolpan = function(elmt)
	{
		var obj =  dolpan.fn.init(width, height, elmt);

		obj.create_editor();

		return obj;
	}

	dolpan.fn = dolpan.prototype = {

		width:width,
		height:height,
		content_target:"dolpan",
		content: "",
		content_width:0,
		content_height:0,


		init:function(width, height, elmt)
		{
			if(elmt != null)
				this.content_target = elmt;

			if(!document.getElementById(this.content_target))
				return null;
			
			$("#"+this.content_target).height(height);
			$("#"+this.content_target).width(width);
			//this.content = $("#"+this.content_target + " #dolpan_editor");

			this.content_width = width;
			this.content_height = height;
			
			return this;
		},

		create_editor:function()
		{
			var id = "dolpan_"+Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			var iframe = $('<iframe />', {id: id, class: 'dolpan_editor', frameborder:0, style:"width:100%; height:100%;", src:"../skin/dolpan.html"});//document.createElement("iframe");
			
			$("#"+this.content_target).append(iframe);
		},

		create_toolbar:function()
		{
			alert("toolbar");
		},

		get_html:function()
		{
			alert(this.content_width);
			//alert(this.content.html());
		},

		_create_content_layer:function(id)
		{
			var layer = $('<div id="'+id+'" class="dolpan_layer"></div>');

			return layer;
		},

		show_html:function()
		{
			var l = this._create_content_layer("dolpan_htmlsrc");

		},

		execCommand:function()
		{
			document.execCommand("italic", false, null);
		}
	}

	window.dolpan = dolpan;
})(window);

			