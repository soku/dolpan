(function(window) {
	var dolpan_editor = function(elmt)
	{
		var obj =  dolpan_editor.fn.init();
		return obj;
	}

	dolpan_editor.fn = dolpan_editor.prototype = {

		content_target:"dolpan",
		content_area:null,
		show_toolbar:true,
		show_tab:true,
		isEditableSrc:false,
		isBlank:true,
		editor:"#dolpan_frame",
		html:"#dolpan_htmlsrc",


		init:function()
		{

			$("body").width($("body").width()-4);
			var oIframe = document.getElementById("dolpan_frame");
			var oDoc = oIframe.contentWindow || oIframe.contentDocument;

			if (oDoc.document) {
			    this.content_area = oDoc.document;
			}

			if(this.show_toolbar)
				this.create_toolbar();

			if(this.show_tab)
				this.create_tab();

			if(this.isBlank)
				this.insertHtml("");

			$(oIframe).contents().find('body').focus();


			$(this.editor).contents()
					.find('body')
					.bind('click', function() {
						alert(oDoc.document.queryCommandState("bold"));
					});

			return this;
		},

		create_toolbar:function()
		{
			var _this = this;
			$("#dolpan_toolbar a").click(function(){
				var command = $(this).attr("href").replace("#", "");

				if($(this).hasClass("command"))
					_this.execCommand(command);


				return false;
			})
		},

		create_tab:function()
		{
			var _this = this;
			$("#dolpan_tab a").click(function(){
				var tab = $(this).attr("href");
				_this.show_tab(tab);

				return false;
			})
		},

		get_html:function()
		{
			//alert(this.content.html());
		},

		_create_content_layer:function(id)
		{
			var layer = $('<div id="'+id+'" class="dolpan_layer"></div>');

			return layer;
		},

		show_tab:function(tab)
		{
			var eHeight = $(this.editor).height();

			if(tab == "#EDIT")
			{
				if($(this.editor).is(":visible"))
				{
					return false;
				}
				
				$(this.html).hide();
				$(this.editor).show();
			}
			else if(tab == "#HTML")
			{
				if($(this.html).is(":visible"))
				{
					return false;
				}

				$(this.editor).hide();
				$(this.html).show();
				$(this.html).val($(this.editor).contents().find('body').html());
				$(this.html).attr("readonly", "readonly");
				$(this.html).height(eHeight);
			}
			return true;
		},

		execCommand:function(command)
		{

			this.content_area.execCommand(command, false, null);
		},

		insertHtml:function(html)
		{
			;
		}
	}

	window.dolpan_editor = dolpan_editor;

	

})(window);

			