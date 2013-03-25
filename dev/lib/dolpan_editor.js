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
			$("body").width($("body").width()-4);
			var oIframe = document.getElementById("dolpan_frame");
			var oDoc = oIframe.contentWindow || oIframe.contentDocument;
			this.body = $(this.editor).contents().find('body');
			rangy.init();

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
			
			this.style = rangy.createCssClassApplier(""); 


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
				//active ? $('#dolpan_toolbar .'+command +' a').addClass("selected"):$('#dolpan_toolbar .'+command +' a').removeClass("selected");
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
			})

			
			$("#sltFontSelect").change(function(){
				var command = new _this.execValueCommand("FontName");
				_this.commandset.push(command);
				command.execute($(this).val());
				this.unselectable = "on"; // IE, prevent focus
				_this.body.focus();
			})
			
			$("#sltFontSize").change(function(){
				var command = new _this.execValueCommand("FontSize");
				_this.commandset.push(command);
				command.execute($(this).val())
				this.unselectable = "on"; // IE, prevent focus
				_this.body.focus();
			})
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
				$(this.html).val(this.body.html());
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

		getFirstRange :function() {
			var sel = rangy.getSelection();
			return sel.rangeCount ? sel.getRangeAt(0) : null;
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

			"FontName" : function(val){
				var sel  = dolpan_editor.fn.getFirstRange();

				//셀렉트된 글자가 있는 지 확인 없을 경우 새로운 span을 추가한다.
				console.log(this.new)
;				if(sel.rangeCount > 0)
				{
					var w = rangy.dom.getIframeWindow($(dolpan_editor.fn.editor)[0]);
					dolpan_editor.fn.style.applyToSelectionStyle(w, "font-family", val);
				}	
				else
				{
					 var el = document.createElement("span");
					 el.style.cssText = "font-family:"+val;
					 sel.getRangeAt(0).insertNode(el);
					 rangy.getSelection().setSingleRange(sel.getRangeAt(0));
				}
			},

			"FontSize" : function(val){
				var w = rangy.dom.getIframeWindow($(dolpan_editor.fn.editor)[0]);
				dolpan_editor.fn.style.applyToSelectionStyle(w, "font-size", val);
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

			