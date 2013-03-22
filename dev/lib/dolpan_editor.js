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
		body : null,
		commandset:null,


		init:function()
		{


			$("body").width($("body").width()-4);
			var oIframe = document.getElementById("dolpan_frame");
			var oDoc = oIframe.contentWindow || oIframe.contentDocument;
			this.body = $(this.editor).contents().find('body');

			if (oDoc.document) {
			    this.content_area = oDoc.document;
			}

			if(this.show_toolbar)
				this.create_toolbar();

			if(this.show_tab)
				this.create_tab();

			if(this.isBlank)
				this.insertHtml("");

			this.attach_events();

			this.body.focus();


			

			return this;
		},

		create_toolbar:function()
		{
			var _this = this;
			$("#dolpan_toolbar a.command").each(function(){
				var command = $(this).attr("href").replace("#", "");

				$(this).click(function(){
					_this.execCommand(command);	
				});
				

			})

			$("#sltFontSelect").change(function(){
				_this.execCommand(command, arg)
			})
		},

		//속성정보를 받아와서 적용된 스타일이 있을 경우 툴바에서 표시해준다.
		//적용스타일 
		//bold, italic, strike,underline
		update_toolbar:function()
		{
			if(!this.show_toolbar)
				return false;

			var commands = this.update_commandset.split(",");
			for(var i=0; i<commands.length; i++)
			{
				var command = commands[i];
				var active = this.content_area.queryCommandState(command);

				active ? $('#dolpan_toolbar .'+command +' a').addClass("selected"):$('#dolpan_toolbar .'+command +' a').removeClass("selected");
			}

		},

		attach_events:function()
		{
			this.body.bind('click',function(){
				dolpan_editor.fn.update_toolbar();
			});
		},

		create_tab:function()
		{
			$("#dolpan_tab a").click(function(){
				var tab = $(this).attr("href");
				dolpan_editor.fn.show_tab(tab);

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

		/*
		execCommand:function(command, arg)
		{
			this.customCommand.hasOwnProperty(command) ? this.customCommand[command](): this.content_area.execCommand(command, false, arg);
			this.update_toolbar();
			this.body.focus();
		},
		*/
		execCommand : function(command) {
			this.execute = function() {
				editDoc.execCommand(command, false, null); 
			};
			this.queryState = function() {
				return editDoc.queryCommandState(command);
			};
		},

		execValueCommand: function(command) {
			this.execute = function(value) {
				editDoc.execCommand(command, false, value); 
			};
			this.queryValue = function() {
				return editDoc.queryCommandValue(command);
			};
		},

		insertHtml:function(html)
		{
			;
		},
	
		customCommand: {

			"new" : function(){
				if(confirm ("작성된 내용을 삭제됩니다.\n 정말 새로 작성하시겠습니까?"))
					$(dolpan_editor.fn.editor).contents().find("body").html("<p><br/><p>");
			}, 

			"table" : function(){
				;
			},

			"print" : function(){
				;
			}
		}
	}

	window.dolpan_editor = dolpan_editor;

})(window);

			