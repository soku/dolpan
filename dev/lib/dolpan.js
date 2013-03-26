(function(window) {
	var width = 800;
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
		editor:null,
		cleanup_config:null,


		init:function(width, height, elmt)
		{
			if(elmt != null)
				this.content_target = elmt;

			if(!document.getElementById(this.content_target))
				return null;
			
			$("#"+this.content_target).height(height);
			$("#"+this.content_target).width(width);

			this.content_width = width;
			this.content_height = height;


			$.get("../lib/sl/config.json?id"+Math.random(), function(data){
				dolpan.fn.cleanup_config = data
			}, "html");
			

			return this;
		},

		create_editor:function()
		{
			var _this = this;
			var id = "dolpan_"+Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			var iframe = $('<iframe />', {id: id, class: 'dolpan_editor', frameborder:0, style:"width:100%; height:100%;", src:"../skin/dolpan.html"});//document.createElement("iframe");
			
			$("#"+this.content_target).append(iframe);

			$("#"+id).bind("load", function(){
				var e = $("#"+id)[0].contentWindow.createEditor ||  $("#"+id)[0].contentWindow[createEditor] ;
				_this.editor = e();
			});


		},

		put_html:function(sUrl)
		{
			var _this = this;
			$.get("../lib/sl/test.html", function(data){
				_this.editor.put_html(data);
			});
		},

		put_htmlText:function(html)
		{
			this.editor.put_html(html);
		},

		get_html:function()
		{
			return this.editor.get_html();
		},

		cleanup:function(html)
		{
			var htmldom = $("#htmldom")[0];

			if(!htmldom) return false;

			htmldom.content.stonyparkdom.setOption(this.cleanup_config);
			htmldom.content.stonyparkdom.loadHtml(html);
			htmldom.content.stonyparkdom.clear();

			return htmldom.content.stonyparkdom.getHtml(false);
		}
		
	}

	window.dolpan = dolpan;
})(window);

			