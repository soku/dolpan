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
		commandset:[],
		style:null,

		init:function()
		{
			$("#dolpan").width($("body").width()-6);
			$("#dolpan_toolbar").width($("#dolpan_toolbar").width()-2);
			$("#dolpan_editor").width($("#dolpan_editor").width()-2);

			var toolbar_height = $("#dolpan_toolbar").height();
			var tab_height = $("#dolpan_tab").height();
			var editor_height = $(window).height() - toolbar_height - tab_height - 20;

			$(this.editor).height(editor_height);

			var oIframe = $(this.editor)[0];
			var oDoc = oIframe.contentWindow || oIframe.contentDocument;
			this.body = $(this.editor).contents().find('body');
			rangy.init();

			this.style = rangy.createCssClassApplier("");

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
		
		execCommand : function(command) {
			this.execute = function() {
				dolpan_editor.fn.customCommand.hasOwnProperty(command) ? dolpan_editor.fn.customCommand[command](): dolpan_editor.fn.content_area.execCommand(command, false, null);
			};

			this.updateUI = function() {
				var active = dolpan_editor.fn.content_area.queryCommandState(command);
				active ? $('#dolpan_toolbar .'+command +' a').addClass("selected"):$('#dolpan_toolbar .'+command +' a').removeClass("selected");
			};
		},

		execValueCommand: function(command) {
			this.execute = function(value) {
				dolpan_editor.fn.customCommand.hasOwnProperty(command) ? dolpan_editor.fn.customCommand[command](value): dolpan_editor.fn.content_area.execCommand(command, false, value);
			};
			this.updateUI = function() {
				var active = dolpan_editor.fn.content_area.queryCommandValue(command);
				 $('#dolpan_toolbar .'+command).val(active);
			};
		},

		execFontSizeCommand: function() {
			this.execute = function(value) {
				dolpan_editor.fn.customCommand["FontSize"](value)
			};
			this.updateUI = function() {
				var sel = dolpan_editor.fn.getFirstRange();
				var active = sel.startContainer.parentNode.style["font-size"];
				 $('#dolpan_toolbar .FontSize').val(active);
			};

		},

		create_toolbar:function()
		{
			var _this = this;
			$("#dolpan_toolbar a").each(function(){
				var scmd = $(this).attr("href").replace("#", "");
				var value ="";
				var command;

				if($(this).hasClass("command"))
					command = new _this.execCommand(scmd);
				else
					command = new _this.execValueCommand(scmd,value);

				$(this).click(function(){
					command.execute();
					this.unselectable = "on"; // IE, prevent focus
					_this.body.focus();

					return false;
				});

				_this.commandset.push(command);
			});

			
			$("#sltFontSelect").change(function(){
				var command = new _this.execValueCommand("FontName");
				_this.commandset.push(command);
				command.execute($(this).val());
				this.unselectable = "on"; // IE, prevent focus
				_this.body.focus();
			});
			
			$("#sltFontSize").change(function(){
				var command = new _this.execFontSizeCommand();
				_this.commandset.push(command);
				command.execute($(this).val())
				this.unselectable = "on"; // IE, prevent focus
				_this.body.focus();
			});
		},

		//속성정보를 받아와서 적용된 스타일이 있을 경우 툴바에서 표시해준다.
		//적용스타일 
		//bold, italic, strike,underline
		update_toolbar:function()
		{
			if(!this.show_toolbar)
				return false;

			$.map(this.commandset, function(cmd){
				cmd.updateUI();
			})
		},

		attach_events:function()
		{
			this.body.bind('click',function(){
				dolpan_editor.fn.update_toolbar();
			});

			this.body.bind('focus',function(){
				dolpan_editor.fn.update_toolbar();
			});

			this.body.bind("keydown", function(e) {
				//keyCode map
				//enter : 13
				//arrow : 37-40

				if(e.keyCode == 13 || (e.keyCode > 36 && e.keyCode < 41))
					dolpan_editor.fn.update_toolbar();
				
				return;

			});
		},

		create_tab:function()
		{
			$("#dolpan_tab a").click(function(){
				var tab = $(this).attr("href");
				dolpan_editor.fn.show_tab(tab);
				$("#dolpan_tab a.selected").removeClass("selected");
				$(this).addClass("selected");
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
			var eWidth = $(this.editor).width();

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
				$(this.html).val(this.body.html());
				$(this.html).attr("readonly", "readonly");
				$(this.html).width(eWidth-4);
				$(this.html).height(eHeight-4);
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

		getFirstRange :function() {
			var sel = rangy.getIframeSelection($(dolpan_editor.fn.editor)[0]);
			return sel.rangeCount ? sel.getRangeAt(0) : null;
		},

		insertHtml:function(html)
		{
			;
		},

		"put_html" : function(html){
			this.body.html(html)
		},

		"get_html" : function(){
			return this.body.html();
		},

	
		customCommand: {
			
			"new" : function(){
				if(confirm ("작성된 내용을 삭제됩니다.\n 정말 새로 작성하시겠습니까?"))
					$(dolpan_editor.fn.editor).contents().find("body").html("<p><br/><p>");
			}, 

			"FontName" : function(val){
				this._setStyle("font-family", val);				
			},

			"FontSize" : function(val){
				this._setStyle("font-size", val);
			},

			"_setStyle" : function(style, val)
			{
				var sel  = dolpan_editor.fn.getFirstRange();
				var w = rangy.dom.getIframeWindow($(dolpan_editor.fn.editor)[0]);

				if(!sel.collapsed)
				{
					dolpan_editor.fn.style.applyToSelectionStyle(w, style, val);
				}
				//셀렉트된 글자가 있는 지 확인 없을 경우 새로운 span을 추가한다.	
				else
				{
					 var el = document.createElement("span");
					 el.style.cssText = style+":"+val;
					 el.innerHTML = unescape("%uFEFF");
					 sel.insertNode(el);
					 //rangy.getSelection(w).setSingleRange(sel);
				}
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

			