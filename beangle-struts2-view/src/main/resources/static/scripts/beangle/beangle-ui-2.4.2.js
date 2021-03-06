/*----------------------------------------------
 * Beangle UI
 * include ToolBar,Grid,EntityAction 
 */
(function( bg, undefined ) {
	bg.alert=function(msg){
		//alert(msg);
		bootbox.alert(msg);
	}
	bg.confirm=function(confirmMsg,fn){
		if(null!=confirmMsg && ''!=confirmMsg){
			bootbox.confirm(confirmMsg, function(result) {
				if(result){
					fn();
				}
			});
		}else{
			fn();
		}
	}
	bg.uitheme="default"
	
	function NamedFunction(name,func){
		this.name=name;
		this.func=func;
	}
	/**
	 * 生成一个工具栏
	 * @param divId 工具栏对应的div
	 * @param title  工具栏的标题
	 * @param imageName  工具栏顶头的图片名称
	 */
	function ToolBar(divId,title,imageName){
		this.itemCount=0;
		this.bar=document.getElementById(divId);
		if(null==this.bar){
			//bg.alert("cannot find div with id " + divId);
			//return;
			this.bar=$(".tools").get(0);
		}else{
			this.inited= $("#" + divId).html()!="";
		}
		this.id=divId;
		this.separator="|";
		//this.bar.className="toolbar notprint";
		var defaultToolBarImageName="info.png", defaultToolBarImageClass="fa-file-o",defaultItemImageName="action.png", helpImageName="help.png",defaultItemImageClass="fa-file-o",defaultItemColorClass="default",
//			imageRoot=self.location.pathname.substring(0,self.location.pathname.substring(1).indexOf('/')+1)+"/static/themes/"+ bg.uitheme +"/icons/",
			imageRoot=bg.getContextPath()+"/static/themes/"+ bg.uitheme +"/icons/";
			imagePath=imageRoot + "16x16/actions/";
		
		this.setTitle=function(newTitle,imageClass){
			if(!newTitle) return;
			if(imageClass==null)imageClass=defaultToolBarImageClass;
			if(imageClass.indexOf(".") < 0){
				this.titleSpan.className = imageClass;
			}else{
				$(this.titleSpan).css("background-image", "url("+imageClass+")");
			}
			this.titleSpan.innerHTML=newTitle;
		}
		this.setSeparator=function(separator){
			this.separator=separator;
		}
		/**
		 * 设置抬头
		 * 
		 */
		this.init = function (title,imageName){
			if(!this.inited) {
				var titleSpan = document.createElement('span'), msg_div, items_div;
				this.bar.appendChild(titleSpan);
				this.titleSpan=titleSpan;
				this.setTitle(title);
				msg_div = document.createElement('div');
				msg_div.className="toolbar-msg";
				msg_div.id=this.id+"_msg";
				//this.bar.appendChild(msg_div);
			}
			if(this.inited) {
				$("#" +this.id+"_items").remove();
			}
			//items_div = document.getElementById(this.id);//document.createElement('div');
//			items_div.className="toolbar-items";
//			items_div.id=this.id+"_items";
			this.items_div=this.bar;//items_div;
			//this.bar.appendChild(items_div);
		}
		this.init(title,imageName);
		
		this.addHr=function(){
			hrdiv=this.appendDiv(null,"toolbar-line");
			hrdiv.innerHTML='<img height="1" width="100%" align="top" src="' + imagePath + 'keyline.png" />';
		}
		this.addClearDiv=function(){
			this.appendDiv(null,"ClearDiv");
		}
		function getImagePath(path,imageName){
			if(imageName.charAt(0)=='/'){
				return imageName;
			}else{
				return path+imageName;
			}
		}
		
		function getDefaultImageClass(action){
			if(null==action) return defaultItemImageClass;
			if (typeof action == "object") {
				action=action.name;
			}
			if(typeof action=="string"){
				if(action.indexOf("add")!=-1||action.indexOf("new")!=-1) return "fa-plus";
				if(action.indexOf("update")!=-1||action.indexOf("edit")!=-1||action.indexOf("Edit")!=-1) return "fa-edit";
				if(action.indexOf("remove")!=-1||action.indexOf("delete")!=-1) return "fa-times";
				if(action.indexOf("export")!=-1) return "ico_export";
				if(action.indexOf("copy")!=-1) return "fa-copy";
				if(action.indexOf("print")!=-1) return "fa-print";
				if(action.indexOf("refresh")!=-1) return "fa-refresh";
				if(action.indexOf("close")!=-1) return "fa-times";
				if(action.indexOf("save")!=-1) return "fa-save";
				if(action.indexOf("download")!=-1) return "fa-download";
				else return defaultItemImageClass;
			}else return defaultItemImageClass;   
		}
		
		function getDefaultItemColor(action){
			if(null==action) return defaultItemColorClass;
			if (typeof action == "object") {
				action=action.name;
			}
			if(typeof action=="string"){
				if(action.indexOf("add")!=-1||action.indexOf("new")!=-1) return defaultItemColorClass;
				if(action.indexOf("update")!=-1||action.indexOf("edit")!=-1||action.indexOf("Edit")!=-1) return defaultItemColorClass;
				if(action.indexOf("remove")!=-1||action.indexOf("delete")!=-1) return "red";
				if(action.indexOf("export")!=-1) return defaultItemColorClass;
				if(action.indexOf("copy")!=-1) return defaultItemColorClass;
				if(action.indexOf("print")!=-1) return defaultItemColorClass;
				if(action.indexOf("refresh")!=-1) return defaultItemColorClass;
				if(action.indexOf("close")!=-1) return "red";
				if(action.indexOf("save")!=-1) return "green";
				//if(action.indexOf("activate")!=-1) return "green";
				//if(action.indexOf("freeze")!=-1) return "red";
				if(action.indexOf("download")!=-1) return defaultItemColorClass;
				else return defaultItemColorClass;
			}else return defaultItemColorClass;   
		}
		/**
		 * 设置按钮的动作
		 * 
		 */
		function setAction(item,action){
			if(null==action){
				bg.alert("action should not be null");
				return;
			}
			if(typeof action=='function'){
				item.onclick=action;
				return;
			}
			if(typeof action=='string'){
				if (action.indexOf('(')!=-1){
					item.onclick= function (){eval(action);}
				}
				else if(action.indexOf('.action')!=-1){
					item.onclick=function (){Go(action)}	 
				}else{
					bg.alert("unsuported action description:"+action);
				}
			}
			if(typeof action=='object'){
				item.onclick=action.func;
				return;
			}
		}
		
		this.addBack = function (title, opts){
			if(null==title){
				title = "返回";
			}
//			this.addItem(title,function (){
				var back = $('<i class="icon-action-undo" title="后退" style="font-size:16px;cursor:pointer;"></i>');
				$(".tools").append(back);
//				if(opts && opts.back || ($(".top_tool_bar_navmenu").length > 0 && !(opts && opts.search))){
//					back.click(function(title, opts){
//						History.back();
//					});
//					
//				}else{
					back.click(function(title, opts){
						var sinput = $(".searchButton").first();
						if(sinput.length > 0){
							sinput.click();
							return;
						}else{
							var div =  $(this).parents("._ajax_target").first();
							// 2015年01月27日 history remove
							if(div.length > 0){
								beangle.history.historyGo(div.attr("url"), div.attr("id"));
							}
							History.back();
							//history.go(-1);
						}
					});
//					var sinput = $(".search_box .search_input").first();
//					if(sinput.length > 0){
//						sinput.click();
//						return;
//					}else{
//						var div =  $(this).parents("._ajax_target").first();
//						if(div.length > 0){
//							beangle.history.historyGo(div.attr("url"), div.attr("id"));
//						}
//						History.back();
//					}
//				}
//			},'ico_backward');
		}
		this.addHelp = function (module){
			this.addItem("帮助",function (){
				if(null==module) bg.alert("建设中..");
				else window.open("help.action?helpId="+module);},'help-contents.png');
		}

		this.addPrint = function (msg){
			if(null==msg){
				this.addItem("打印","print()");
			}else{
				this.addItem(msg,"print()");
			}
		}

		this.addClose = function (msg){
			if(''==msg|| null==msg){
				msg="关闭";
			}
			this.addItem(msg,"window.close()",'close.png');
		}
		/**
		 * 添加菜单
		 * 
		 */
		this.addItem = function(title,action,imageClass,buttonStyle,alt){
			var itemDiv = document.createElement('div');
			
			if(null==imageClass){
				imageClass=getDefaultImageClass(action);
			}
			var jqd = $(itemDiv);
			jqd.addClass("btn-group");
			var itemButton = document.createElement('a');
//			itemButton.innerHTML = title;
			var iButton = $(itemButton);
			if(buttonStyle=="" || buttonStyle==null){
				//buttonStyle = "default";
				buttonStyle = getDefaultItemColor(action)
			}
			iButton.addClass("btn " + buttonStyle); //btn-lg 大按钮
			
			if($(this.items_div).css("float") == "right"){
				jqd.addClass("pull-right");
			}
			iButton.append(title);
			if(imageClass.indexOf(".") > 0){
				//jqd.css("background-image", "url("+imageClass+")");
				iButton.append('&nbsp;<i class="fa"><img style="margin-bottom:2px;height:14px;" src="'+imageClass+'"/></i>');
			}else{
				iButton.append('&nbsp;<i class="fa '+imageClass+'"></i>');
			}
			if(alt==""||alt==null){
				alt=title;
			}
			
			
			jqd.append(iButton);
			
			itemDiv.alt = alt;
			setAction(itemDiv, action);
			this.items_div.appendChild(itemDiv);
			this.itemCount++;
			return itemDiv;
		}
		this.addDiv=function(className){
			var newDiv = document.createElement('div');
			if(className)newDiv.className=className;
			this.items_div.appendChild(newDiv);
			return newDiv;
		}
		this.appendDiv=function(id,className){
			var newDiv = document.createElement('div');
			if(id)newDiv.setAttribute("id",id);
			if(className)newDiv.className=className;
			document.getElementById(this.id).appendChild(newDiv);
			return newDiv;
		}
		/**
		 * 添加分隔符
		 * 
		 */
		this.addSeparator = function (){
			if(this.separator){
				this.addDiv("toolbar-separator").innerHTML=this.separator;
			}
		}
		
		this.addSeparatorAsNeed = function (){
			if(this.itemCount!=0){
				this.addSeparator();
			}
		}
		this.addBackOrClose = function (backCaption, closeCaption) {
			if (parent.location == self.location && (window.history.length <= 1 || window.history.length == null)) {
				this.addClose((null == closeCaption) ? "关闭" : closeCaption);
			} else {
				this.addBack((null == backCaption) ? "后退" : backCaption);
			}
		}
		// 增加空白功能点
		this.addBlankItem = function () {
			this.addDiv("toolbar-group-separator").innerHTML="&nbsp;";
			this.itemCount++;
		}
		/**
		 * 设置工具栏的消息区
		 * 
		 */
		this.setMessage = function (msg){
			if (typeof msg == "undefined") return;
			document.getElementById(this.id+"_msg").innerHTML=msg;
		}
		
		/**
		 * 在工具栏中添加一个菜单
		 */
		this.addMenu = function(title,action,imageName,alt){
			this.addSeparatorAsNeed();
			var item_div = document.createElement('div');
			if(null==imageName){
				imageName=getDefaultImageName(action);
			}
			alt=alt||title;
			item_div.className="toolbar-item";
			var menuTableId=this.id+this.itemCount+"_menu";
			item_div.id=menuTableId;
			item_div.tabIndex = 0;
			item_div.onmouseout=MouseOutItem;
			item_div.onmouseover=MouseOverItem;
			this.items_div.appendChild(item_div);
			if(action == null){
				item_div.innerHTML='<img class="toolbar-icon" src="'+getImagePath(imagePath,imageName)+'" alt="' +alt+'" />'+title+ '&nbsp;<img src="'+imageRoot+'8x8/actions/downarrow.png" class="toolbar-icon" />';
				item_div.onclick=function (event){displayMenu(event);};
			}else{
				var span1 = document.createElement("span");
				span1.innerHTML = '<img class="toolbar-icon" src="'+getImagePath(imagePath,imageName)+'" alt="' +alt+'" />'+title;
				setAction(span1,action);
				var span2 = document.createElement("span");
				span2.innerHTML = '&nbsp;<img src="'+imageRoot+'8x8/actions/downarrow.png" class="toolbar-icon" />';
				span2.onclick = function (event){displayMenu(event);};
				item_div.appendChild(span1);
				item_div.appendChild(span2);
			}
			item_div.onblur = function (event){hiddenMenu(event);};
			var menu = new Menu(menuTableId,item_div);
			this.itemCount++;
			return menu;
		}
		
		function hiddenMenu(event){
			var div=bg.event.getTarget(event);
			while(div && div.tagName.toLowerCase()!='div'){
				div=div.parentNode;
			}
			var menu=div.lastElementChild || div.lastChild;
			if(null==menu || menu.tagName.toLowerCase()!='table'){bg.alert('menu is null then return and target is '+div);return;}
			if(menu.style.visibility!=""&&menu.style.visibility!="hidden"){
				for(var i = 0;i < menu.rows.length;i++){
					if(menu.rows[i].cells[0].className=='toolbar-menuitem-transfer'){
						return;
					}
				}
				menu.style.visibility="hidden";
			}
		}
		
		function displayMenu(event){
			var div=bg.event.getTarget(event);
			while(div && div.tagName.toLowerCase()!='div'){
				div=div.parentNode;
			}
			var menu=div.lastElementChild || div.lastChild;
			if(null==menu){bg.alert('menu is null then return and target is '+div);return;}
			if(menu.style.visibility!=""&&menu.style.visibility!="hidden"){
				menu.style.visibility="hidden";
				div.className="toolbar-item-transfer";
			}else{
				menu.style.visibility="visible";
				div.className="toolbar-item-selected";
			}
		}
		/**
		 * 生成一个菜单
		 */
		function Menu(id,item_div){
			var table=document.createElement("table");
			table.className="toolbar-menu";
			table.id=id+"Table";
			var mytablebody = document.createElement("tbody");
			table.appendChild(mytablebody);
			if (jQuery("#" + id).find("span").length>0) {
				table.onclick = function (event){displayMenu(event);};
			}
			item_div.appendChild(table);
			this.table=table; 
			/**
			 * 在菜单中添加一个条目
			 */
			this.addItem = function (title,action,imageName,alt){
				var itemTd = document.createElement('td');
				if(null==imageName){
					imageName=getDefaultImageName(action);
				}
				if(alt==""||alt==null){
					alt=title;
				}
				itemTd.innerHTML='<img class="toolbar-icon" src="'+getImagePath(imagePath,imageName)+'" alt="' +alt+'" />'+title;
				itemTd.onmouseout=MouseOutMenuItem;
				itemTd.onmouseover=MouseOverMenuItem;
				setAction(itemTd,action);
				itemTd.className="toolbar-menuitem";
				itemTd.width="100%";
				var tr = document.createElement('tr');
				tr.appendChild(itemTd);
				if(this.table.tBodies.length==0){
					this.table.appendChild(document.createElement("tbody"));
				}
				this.table.tBodies[0].appendChild(tr);
			}
		}
		
		// /菜单条目的鼠标进入和离开事件响应方法
		function MouseOutMenuItem(e){
			var o=bg.event.getTarget(e);
			while (o && o.tagName.toLowerCase()!="td"){o=o.parentNode;}
			if(o)o.className="toolbar-menuitem";
		}
		
		function MouseOverMenuItem(e){
			var o=bg.event.getTarget(e);
			while (o && o.tagName.toLowerCase()!="td"){o=o.parentNode;}
			if(o)o.className="toolbar-menuitem-transfer";
		}
		/**
		 * 当鼠标经过工具栏的按钮时
		 * 
		 */
		function MouseOverItem(e){
			var o=bg.event.getTarget(e);
			while (o&&o.tagName.toLowerCase()!="div"){o=o.parentNode;}
			if(o)o.className="toolbar-item-transfer";
		}
		/**
		 * 当鼠标离开工具栏的按钮时
		 */
		function MouseOutItem(e){
			var o=bg.event.getTarget(e);
			while (o&&o.tagName.toLowerCase()!="div"){o=o.parentNode;}
			if(o)o.className="toolbar-item";
		}
	}
	bg.extend({'ui.toolbar':function (divId,title,imageName){
		return new ToolBar(divId,title,imageName);
		}
	});
	
	bg.extend({'ui.gridbar':function(divIds,title){
		this.divIds=divIds;
		this.pageId=null;
		this.title=title;
		this.toolbars=[];
		for(var i=0;i<divIds.length;i++){
			this.toolbars[i]=bg.ui.toolbar(divIds[i],title);
			this.toolbars[i].setSeparator("");
			//document.getElementById(divIds[i]).className="control_bar";
			//document.getElementById(divIds[i]+"_items").className="btn_bar";
		}
		this.pageId=function(givenId){
			this.pageId=givenId;
			return this;
		}
		this.addItem=function(title,action,imageName,alt){
			for(var i=0;i<this.toolbars.length;i++){
				this.toolbars[i].addItem(title,action,imageName,alt);
			}
		}
		this.addBack=function(title,action){
			for(var i=0;i<this.toolbars.length;i++){
				this.toolbars[i].addBack(title);
			}
		}
		this.addBackOrClose=function(){
			for(var i=0;i<this.toolbars.length;i++){
				this.toolbars[i].addBackOrClose();
			}
		}
		this.addBlankItem=function(title,action,imageName,alt){
			for(var i=0;i<this.toolbars.length;i++){
				this.toolbars[i].addBlankItem(title,action,imageName,alt);
			}
		}
		this.addPage=function(onePage,ranks,titles){
			this.myPage=onePage;
			for(var i=0;i<this.toolbars.length;i++){
				pageDiv=this.toolbars[i].appendDiv(divIds[i]+'_page',"girdbar-pgbar");
				//this.toolbars[i].appendDiv(divIds[i]+'_ClearDiv',"ClearDiv");
				bg.ui.pagebar2(onePage,pageDiv,ranks,titles);
			}
			return this;
		}
		this.addEntityAction=function(entity,onePage){
			return new bg.entityaction(entity,onePage);
		}
		this.addPrint=function(msg){
			for(var i=0;i<this.toolbars.length;i++){
				this.toolbars[i].addPrint(msg);
			}
		}
		this.addMenu=function(title,action,imageName,alt){
			return new menus(title,action,imageName,alt,this.toolbars);
		}
		function menus(title,action,imageName,alt,bars){
			var menu = new Array();
			for(var i=0;i<bars.length;i++){
				menu[i] = bars[i].addMenu(title,action,imageName,alt);
			}
			this.addItem = function (title,action,imageName,alt){
				for(var i=0;i<menu.length;i++){
					menu[i].addItem(title,action,imageName,alt)
				}
			}
		}
	}});
	
	bg.extend({'ui.pagebar':function (onePage,pageDiv,ranks,titles){
		if(onePage.total==0) return;
		
		if(!ranks) ranks=[10,20,30,50,70,100,200,500,1000];
		else if(ranks.length==0) ranks=[onePage.pageSize];
		
		if(!titles) titles={first:'« First',previous:'‹ Previous',next:'Next ›',last:'Last »',no:'No:',size:'Size:',change:'Click me to change page size',pagesize:'Page Size'};
		var maxPageNo = onePage.maxPageNo;
		addAnchor=function(text,pageNumber){
			var pageHref=document.createElement('a');
			pageHref.setAttribute("href","#");
			pageHref.innerHTML=text;
			pageHref.style.padding="0px 2px 0px 2px";
			pageDiv.appendChild(pageHref);
			jQuery(pageHref).click(function(){onePage.goPage(pageNumber)});
		}
		if(onePage.pageNo>1){
			addAnchor(titles['first'],1);
			addAnchor(titles['previous'],onePage.pageNo-1);
		}
		var labelspan=document.createElement('span');
		labelspan.innerHTML="<strong>" + onePage.startNo +"</strong> - <strong>"+ onePage.endNo + "</strong> of <strong>" + onePage.total + "</strong>";
		labelspan.style.padding="0px 2px 0px 2px";
		pageDiv.appendChild(labelspan);
		var numSpan=jQuery(labelspan)
		numSpan.attr('title',titles['change'])
		numSpan.mouseover(function (){this.className='pgbar-label'});
		numSpan.mouseout(function(){this.className=''});
		numSpan.click(function(){this.parentNode.style.marginTop="0px";this.nextSibling.style.display='';this.style.display='none'});
		
		var pagespan=document.createElement('span');
		pagespan.style.display="none";
		var pageInput=document.createElement('input');
		pagespan.innerHTML=titles['no'];
		pageInput.className="pgbar-input";
		pagespan.appendChild(pageInput);

		var pageInputJ=jQuery(pageInput)
		pageInputJ.attr("value",onePage.pageNo+"/"+maxPageNo);
		pageInputJ.attr("id",pageDiv.id+"_input");
		pageInputJ.focus(function(){this.value=''});
		pageInputJ.blur(function(){if(!this.value) this.value= onePage.pageNo+"/"+maxPageNo});
		//pageInputJ.change(function(){onePage.goPage(this.value)});
		
		if(ranks && (ranks.length>0)){
			var pageNoSelect=document.createElement('select');
			pageNoSelect.id=pageDiv.id+"_select";
			pagespan.appendChild(pageNoSelect);
			pageNoSelect.className="pgbar-selbox";
			pageNoSelect.title=titles['pagesize']||'Page Size';
			var selectIndex=0;
			for(var i=0;i<ranks.length;i++){
				if(ranks[i]==onePage.pageSize) selectIndex=i;
				pageNoSelect.options.add(new Option(ranks[i], ranks[i]));
			}
			jQuery(pageNoSelect).change(function (){onePage.goPage(1,this.value)});
			pageNoSelect.selectedIndex = selectIndex;
		}
		//add go button
		var submitBtn = document.createElement('input');
		submitBtn.setAttribute("type",'button');
		submitBtn.setAttribute("name",'gogo');
		submitBtn.value="Go"
		submitBtn.className="pgbar-go";
		pagespan.appendChild(submitBtn);
		var changePage=function(){
			var pageNo=document.getElementById(pageDiv.id+'_input').value;var endIndex=pageNo.indexOf("/"+onePage.maxPageNo);
			if(-1!=endIndex){pageNo=pageNo.substring(0,endIndex)}
			onePage.goPage(pageNo,document.getElementById(pageDiv.id+'_select').value);
		}
		jQuery(submitBtn).click(function (){changePage()});
		
		pageDiv.appendChild(pagespan);
		jQuery(pagespan).keypress(function(event){
			if (!event) {event = window.event;}
			if (event && event.keyCode && event.keyCode == 13) {changePage();return false;}
		});
		
		if(onePage.pageNo<onePage.maxPageNo){
			addAnchor(titles['next'],onePage.pageNo+1);
			addAnchor(titles['last'],onePage.maxPageNo);
		}
	}
	});
	
	(function (ui){
		ui.pagebar2 = PageBar2;
		function PageBar2(onePage, pageDiv, ranks, titles) {
			var width = 5;
			$(pageDiv).addClass("turn-page");
			//var labelspan = $('<div style="float:left; margin:15px;">');
			var labelspan = $(".dataTables_info");
			labelspan.html("<strong>" + onePage.startNo + "</strong> - <strong>" + onePage.endNo + "</strong> OF <strong>" + onePage.total + "</strong>");
			//labelspan.css("padding","0px 2px 0px 2px");
			//$(pageDiv).append(labelspan);
			
			var ul = $("<ul>");
			$(pageDiv).append(ul);
			ul.addClass("pagination "); //pagination-sm 
			if(onePage.total==0 || onePage.maxPageNo ==1){
				$(pageDiv).append("<div>&nbsp;</div>");
				return;
			}
			var maxPageNo = onePage.maxPageNo;
	
			var prevli = addAnchor('<i class="fa fa-angle-left"></i>', "prev-btn",onePage.pageNo-1).addClass("prev");
			!(onePage.pageNo>1) && prevli.addClass("disabled");
			if(onePage.pageNo>3){
				addAnchor("1", "",1);
				(onePage.pageNo>4) && addAnchor("...", "ell", Math.max(1, onePage.pageNo - 5));
			}
			var startPage = onePage.pageNo - 2;
			startPage <= 0 && (startPage = 1);
			onePage.maxPageNo > 5 && startPage > onePage.maxPageNo - 5 && (startPage = onePage.maxPageNo - 4);
			for(var i = 0; i < 5; i++, startPage++){
				if(startPage <= 0 || startPage > onePage.maxPageNo){
					continue;
				}
				var li = addAnchor(startPage, startPage == onePage.pageNo ? "a-now-3" : "",startPage);
				if(onePage.pageNo == startPage){
					li.addClass("disabled");
				}
			}
	
			if(onePage.maxPageNo > 6 && onePage.pageNo < onePage.maxPageNo - 2){
				(onePage.pageNo < onePage.maxPageNo - 3) && addAnchor("...", "ell", Math.min(onePage.maxPageNo, onePage.pageNo + 5));
			}
			if(onePage.pageNo < (onePage.maxPageNo - width/2) && onePage.maxPageNo > 5){
				addAnchor(onePage.maxPageNo, "", onePage.maxPageNo);
			}
			var nextli = addAnchor('<i class="fa fa-angle-right"></i>', "next-btn", onePage.pageNo+1).addClass("next");
			!(onePage.pageNo<onePage.maxPageNo) && nextli.addClass("disabled");
			function addAnchor(text, css, pageNumber){
				var a=$('<li><a href="#"></a></li>');
				ul.append(a);
				a = a.find("a");
				a.html(text).addClass(css);
				if(pageNumber){
					a.click(function(){onePage.goPage(pageNumber)});
				}
				return a.parent();
			}
			
			if(!ranks) ranks=[10,20,30,50,70,100,200,500,1000];
			else if(ranks.length==0) ranks=[onePage.pageSize];
			
			if(ranks && (ranks.length>0)){
				var pageNoSelect=document.createElement('select');
				pageNoSelect.id=pageDiv.id+"_select";
				$(pageDiv).parent().prepend(pageNoSelect);
				pageNoSelect.className="pagination pagination-sm input-xsmall form-control";
				$(pageNoSelect).css({"float":"right"}); //"margin":"15px 3px 0 0",
				pageNoSelect.title=titles['pagesize']||'Page Size';
				var selectIndex=0;
				for(var i=0;i<ranks.length;i++){
					if(ranks[i]==onePage.pageSize) selectIndex=i;
					pageNoSelect.options.add(new Option(ranks[i], ranks[i]));
				}
				jQuery(pageNoSelect).change(function (){onePage.goPage(1,this.value)});
				pageNoSelect.selectedIndex = selectIndex;
			}
			
		}
	})(bg.ui);
	bg.extend({
		'ui.grid':{
			// 鼠标经过和移出排序表格的表头时
			overSortTableHeader : function  (){
				this.style.color='white';
				this.style.backgroundColor ='green'
			},
			outSortTableHeader : function (){
				this.style.borderColor='';
				this.style.color='';
				this.style.backgroundColor ='';
			},
			// 鼠标经过数据行的效果
			mouseOverGrid : function (){
				if((typeof this.className)=="undefined") return;
				var myclass=this.className;
				selectIndex=myclass.indexOf("griddata-selected");
				if(-1 != selectIndex) return;
				overIndex=myclass.indexOf("griddata-over");
				if(-1 == overIndex){
					this.className=myclass+" "+ "griddata-over"
				}else{
					this.className=myclass.substring(0,overIndex);
				}
			},
			/**
			 * 行选函数。单击行内的任一处，可以选定行头的checkbox或者radio 用法:onclick="onRowChange(event)"
			 */
			onRowChange : function (event){    
				var ele =  bg.event.getTarget(event);
				var changed=true;
				if(null!=ele && ele.tagName.toLowerCase()=="td"){
					var firstChild = ele.parentNode.firstChild;
					while(firstChild.tagName ==null || firstChild.tagName.toLowerCase()!="td"){
						firstChild=firstChild.nextSibling;
					}
					ele=firstChild.firstChild;
					while(((typeof ele.tagName)=="undefined")||ele.tagName.toLowerCase()!="input"){
						ele=ele.nextSibling;
						if(ele==null)return;
					}
					!ele.disabled && (ele.checked = !ele.checked);
				}else if((ele.type=="checkbox")||(ele.type=="radio")){
				}else if(ele.tagName.toLowerCase()=="label" || ele.tagName.toLowerCase()=="div"){
					ele = $(ele).parent().parent().find("input").get(0);
					ele.checked = !ele.checked;
				}else{
					changed=false;
				}
				// 改变选定行的颜色
				if(null!=ele&&changed){
					if(typeof ele.onchange =="function"){
						ele.onchange();
					}
					if(ele.type=="radio") return;
					var row=ele.parentNode.parentNode;
					if((typeof row.className)=="undefined") return;
					var selectIndex=row.className.indexOf("griddata-selected");
					if(ele.checked){
						if(-1 == selectIndex) row.className=row.className +" "+ "griddata-selected";
					}else{
						if(-1 != selectIndex) row.className=row.className.substring(0,selectIndex);
					}
				}
			},
			//列排序对应的onePage和选中的列
			sort : function (onePage,ele){
				if(null==onePage){
					bg.alert("无法找到元素对应的排序表格！");return;
				}
				var orderByStr=null;
				if(ele.className=="sorting"){
					if(typeof ele.asc!="undefined"){
						orderByStr=ele.asc;
					}
					else{
						orderByStr=ele.id+" asc";
					}
				}else if(ele.className=="sorting_asc"){
					if(typeof ele.desc!="undefined"){
						orderByStr=ele.desc;
					}
					else{
						orderByStr=ele.id.replace(/\,/g," desc,")+" desc";
					}
				}else{
					orderByStr="";
				}
				onePage.goPage(1,null,orderByStr);
			},

			/**
			 * 初始化排序表格<br/>
			 * 此函数主要是向已经待排序表格的列头1)添加鼠标事件响应和显示效果. 2)负责将事件传递到用户定义的函数中.
			 * 
			 * 凡是要排序的列,请注名排序单元格的id 和class. 其中id是排序要传递的字段,class为定值gridhead-kable.
			 * 除此之外,用户(使用该方法的人)需要自定义一个钩子函数"sortBy(what)",以备调用.
			 * 
			 * @param tableId 待排序表格的id
			 * @param onePage 与表格对应的page对象
			 */
			init : function (tableId,onePage){
				var table= document.getElementById(tableId), thead = table.tHead, tbody, orderBy, columnSort ,i ,j, head, row, cell, desc, asc, orignRowCls;
				if(!thead || thead.rows.length==0){
					//bg.alert("sortTable ["+tableId+"] without thead"); 
					return;
				}
				orderBy=onePage.orderby;
				columnSort = function(event){
					// this is a td/th
					bg.ui.grid.sort(onePage,this);
				}
				for(j=0;j<thead.rows.length;j++){
					head=thead.rows[j];
					for(i=0;i<head.cells.length;i++){
						cell=head.cells[i];
						if(cell.className=="sorting" && null!=cell.id){
							cell.onclick = columnSort;
							cell.onmouseover=bg.ui.grid.overSortTableHeader;
							cell.onmouseout=bg.ui.grid.outSortTableHeader;
							cell.title="点击按 ["+cell.innerHTML+"] 排序";
							desc=cell.id.replace(/\,/g," desc,")+" desc";
							if(typeof cell.desc !="undefined"){
								desc=cell.desc;
							}
							if(orderBy.indexOf(desc)!=-1){
								cell.className="sorting_desc";
									//cell.innerHTML=cell.innerHTML+'<img src="'+bg.getContextPath()+'/static/themes/' + bg.uitheme + '/icons/16x16/actions/sort-desc.png"  style="border:0"  alt="Arrow" />'
								continue;
							}
							asc = cell.id+" asc";
							if(typeof cell.asc !="undefined"){
								asc = cell.asc;
							}
							if(orderBy==asc){
								cell.className="sorting_asc";
									//cell.innerHTML=cell.innerHTML+'<img src="'+bg.getContextPath()+'/static/themes/' + bg.uitheme + '/icons/16x16/actions/sort-asc.png"  style="border:0"  alt="Arrow" />'
								continue;
							}
						}
					}
				}
				tbody=document.getElementById(tableId+"_data");
				if(!tbody)	return;
				for(j=0;j<tbody.rows.length;j++){
					row=tbody.rows[j];
					orignRowCls=row.className;
					if(orignRowCls){
						orignRowCls=" "+orignRowCls;
					}else{
						orignRowCls="";
					}
//					if(j%2==1){
//						row.className="griddata-odd" + orignRowCls;
//					}else{
//						row.className="griddata-even" + orignRowCls;
//					}
					row.onclick = bg.ui.grid.onRowChange;
					row.onmouseover=bg.ui.grid.mouseOverGrid;
					row.onmouseout=bg.ui.grid.mouseOverGrid;
				}
			},
			fillEmpty : function (divId,pageSize,size,msg){
				var emptydiv=document.getElementById(divId), emptyCnt=pageSize-size, heightpx, emptyLabel;
				//if(emptyCnt>7) emptyCnt=7;
				heightpx=emptyCnt*16;
				if(size==0){
					emptyLabel=document.createElement("div");
					emptyLabel.innerHTML=(msg||'No result matched your search.');
					//emptyLabel.style.paddingTop=heightpx/2-16 +"px";
					emptydiv.appendChild(emptyLabel);
				}
				emptydiv.style.height=heightpx+"px";
			}
		}
	});
	
	// Action---------------------------------------------------------------------
	//this.action,this.paramstring,this.target
	function EntityAction(entity,onePage){
		this.entity=entity;
		this.page=onePage;
		this.formid="form_" + bg.randomInt();

		//record self for closure method
		var selfaction = this;
		
		function applyMethod(action,method){
			if(method.indexOf(".action") > 0){
				return action;
			}
			var last1=action.lastIndexOf("!"), lastDot=action.lastIndexOf("."), shortAction=action, sufix="";
			if(-1 == last1) last1 = lastDot;
			if(-1!=last1){
				shortAction=action.substring(0,last1);
			}
			if(-1!=lastDot){
				sufix=action.substring(lastDot);
			}
			return shortAction+"!"+method+sufix;
		}
		this.getForm=function (){
			return this.page.getForm();
		};
		this.addParam = function(name,value){
			bg.form.addInput(this.getForm(),name,value);
		};
		if(null!=this.page.target&&''!=this.page.target){
			var fm = this.getForm();
			if(null!=fm) fm.target=this.page.target;
		}
		
		this.beforeSubmmitId = function(method, isMulti) {
			var ids = bg.input.getCheckBoxValues(entity+".id");
			if (ids == null || ids == "") {
				bg.alert(isMulti ? "请选择一个或多个进行操作" : "请选择一个进行操作");
				return false;
			}
			if (!isMulti && (ids.indexOf(",") > 0)) {
				bg.alert("请仅选择一条数据");
				return;
			}
			var form=this.getForm();
			form.action = applyMethod(this.page.actionurl, method);
			if(this.page.paramstr){
				bg.form.addHiddens(form,this.page.paramstr);
				bg.form.addParamsInput(form,this.page.paramstr);
			}
			return true;
		};
		this.submitIdAction=function (method,multiId,confirmMsg,ajax){
			var v = this;
			if (this.beforeSubmmitId(method, multiId)) {
				//if(null!=confirmMsg && ''!=confirmMsg){
					//if(!confirm(confirmMsg))return;
					bg.confirm(confirmMsg,function(){
						bg.form.submitId(v.getForm(),v.entity + ".id",multiId,null,null,ajax);
					});
				//}
				//bg.form.submitId(this.getForm(),this.entity + ".id",multiId,null,null,ajax);
			}
		};
		this.remove=function(confirmMsg){
			confirmMsg=confirmMsg||'您是否确认要删除选中的数据?';
			return new NamedFunction('remove',function(){
				selfaction.submitIdAction('remove',true,confirmMsg);
			});
		};
		this.add = function(methodName){
			return new NamedFunction('add',function(){
				if(undefined == methodName || null == methodName){
					methodName = "edit";
				}
				var form=selfaction.getForm();
				if(""!=selfaction.page.paramstr) bg.form.addHiddens(form,selfaction.page.paramstr);
				bg.form.addInput(form,selfaction.entity + '.id',"");
				if(""!=selfaction.page.paramstr) bg.form.addParamsInput(form,selfaction.page.paramstr);
				bg.form.submit(form,applyMethod(selfaction.page.actionurl,methodName));
			});
		};
		
		this.info = function(){
			return new NamedFunction('info',function(){
				selfaction.submitIdAction('info',false);
			});
		};
		
		this.edit = function (){
			return new NamedFunction('edit',function(){
				selfaction.submitIdAction('edit',false);
			});
		};
		
		this.openCurrent = function(methodName,paramName,paramValue,multiId,showUI,confirmMsg, noselect){
			window.$.unblockUI();
			return new NamedFunction(methodName,function(){
				try {
					if(undefined == confirmMsg || null == confirmMsg){
						confirmMsg = null;
					}
					//if(null!=confirmMsg && ''!=confirmMsg){
						//if(!confirm(confirmMsg))return;
						bg.confirm(confirmMsg,function(){
							var form = action.getForm();
							if(""!=action.page.paramstr){
								bg.form.addHiddens(form,action.page.paramstr);
								bg.form.addParamsInput(form,action.page.paramstr);
							}
							if(paramName != undefined && paramName != null && paramName != ""){
								bg.form.addInput(form,paramName,paramValue,"hidden");
							}
							if(undefined == showUI || null == showUI){
								showUI = true;
							}
							if(noselect){
							}else{
								if (!action.beforeSubmmitId(methodName, multiId)) {
									return;
								}
							}
							if(showUI){
								window.$.blockUI({ message: '数据处理中，请稍后', css: { width: '275px' } });
							}
							
							var id = action.entity + ".id";
							bg.form.addInput(form, id + "s", bg.input.getCheckBoxValues(id), "hidden");
							bg.form.submit(form,applyMethod(action.page.actionurl ,methodName));
						});
					//}
					
				}catch(e){
					bg.alert(e);
				}
			});	
	    };

	    this.goTo2 = function(url, param){
	    	return this.goTo(url, url, param);
	    }
	    this.goTo = function(methodName,url,param){
	    	url = url || methodName;
			return new NamedFunction(methodName,function(){
				try {
					var form=action.getForm();
					form.target= action.getTarget(form, this);
					if(param){
						bg.form.addHiddens(form,param);
					}
					bg.form.submit(form,applyMethod(url,methodName));
					form.target="";
				}catch(e){
					bg.alert(e);
				}
			});	
	    };
	    
	    this.getTarget = function (a, bar){
	    	var target = "main";
			var itabContent = $(a).parents(".itabContent");
			if(itabContent.length == 0 && bar){
				itabContent = $(bar).parents(".itabContent");
			}
			if(itabContent.length > 0){
				target = itabContent.get(0).id;
			}
			return target;
	    }
	    
	    this.openNew = function(methodName,formAction,param,target){
			return new NamedFunction(methodName,function(){
				try {
					var form = action.getForm();
					
					if(target == undefined || target == null || target == ""){
						form.target= action.getTarget(this);
					}else{
						form.target=target;
					}
					form.action=formAction;
					if(null!=param){
						bg.form.addHiddens(form,param);
					}
					bg.form.submitId(action.getForm(),action.entity + ".id",null,null,null,true);
					form.target="";
				}catch(e){
					bg.alert(e);
				}
			});	
	    };
	    
	    this.openNewLayer = function(href,width,height,checkboxId,isMulti,entityName,params,onClosed){
			return new NamedFunction(null,function(){
				var opts = {};
				if(href.href){
					opts = href;
					href = opts.href;
				}
				opts.iframe = true;
				opts.href = opts.href || href;
				opts.width = opts.width || width || "100%";
				opts.height = opts.height || height || "100%";
				opts.onClosed = opts.onClosed || onClosed || function (){};
		    	if(checkboxId){
		    		var selectId = bg.input.getCheckBoxValues(checkboxId);
		    		if(isMulti==null || isMulti==""){
		    			isMulti=false;
		    		}
		    		if(""==selectId){
		    			bg.alert(isMulti?"请选择一个或多个进行操作":"请选择一个进行操作");
		    			return;
		    		}
		    		if(!isMulti && (selectId.indexOf(",")>0)){
		    			bg.alert("请仅选择一条数据");
		    			return;
		    		}
		    		if(entityName != null && entityName != ""){
		    			if(href.lastIndexOf("?") == -1){
		    				href += "?" + entityName + "=" + selectId;
		    			}else{
		    				href += "&" + entityName + "=" + selectId;
		    			}
		    		}
		    	}
				
				
				if(params != null && params != ""){
					if(href.charAt(href.length-1) != "&"){
						href += "&";
					}
					opts.href = href += params;
				}
				jQuery().colorbox(opts);
			});	
    	};
    	
    	this.targetMethod = function(methodNameOrUrl,target,param,isMulti,noselect){
	    	return new NamedFunction(methodNameOrUrl,function(){
		    	if (!target){
		    		target = "_self";
		    	}
		    	if(!noselect){
		    		if(isMulti==null || isMulti==""){
				    	isMulti=false;
				    }
					if (!action.beforeSubmmitId(methodNameOrUrl, isMulti)) {
						return;
					}
		    	}
				var form = action.getForm();
				var entity = action.entity + "id";
				if(param){
					bg.form.addHiddens(form,param);
				}
				bg.form.addInput(form, (isMulti ? (entity + 's') : entity), bg.input.getCheckBoxValues(action.entity+".id"), "hidden");
				var url = methodNameOrUrl;
				if(methodNameOrUrl.indexOf(".action") < 0){
					url = applyMethod(action.page.actionurl ,methodNameOrUrl);
				}
				bg.form.submit(form, url, target, null, true);
	    	});
	    };
		
		this.single = function(methodName,confirmMsg,extparams){
			return new NamedFunction(methodName,function(){
				var form=selfaction.getForm();
				if(null!=extparams) bg.form.addHiddens(form,extparams);
				selfaction.submitIdAction(methodName,false,confirmMsg);
			});
		};
		
		this.multi = function(methodName,confirmMsg,extparams,ajax){
			return new NamedFunction(methodName,function(){
				try {
					var form = selfaction.getForm();
					if(null!=extparams) bg.form.addHiddens(form, extparams);
					selfaction.submitIdAction(methodName, true, confirmMsg,ajax);
				}catch(e){
					bg.alert(e);
				}
			});
		};
		this.method=function(methodName,confirmMsg,extparams,ajax,noHistory){
			return  new NamedFunction(methodName,function(){
				var form=selfaction.getForm();
//				if(null!=confirmMsg && ''!=confirmMsg){
//					if(!confirm(confirmMsg))return;
//				}
				bg.confirm(confirmMsg,function(){
					if(null!=extparams){
						bg.form.addHiddens(form,extparams);
					}
					if(""!=selfaction.page.paramstr){
						bg.form.addHiddens(form,selfaction.page.paramstr);
						bg.form.addParamsInput(form,selfaction.page.paramstr);
					}
					var id = selfaction.entity + ".id";
					bg.form.addInput(form, id + "s", bg.input.getCheckBoxValues(id), "hidden");
					bg.form.submit(form,applyMethod(selfaction.page.actionurl ,methodName),null,null,ajax,noHistory);
				});
				
			});
		};
		
		this.exportDataSelect=function(properties,format,extparams){
			format = format || "xls";
			properties = properties||"";
			extparams = extparams||"";
			if(extparams.indexOf("&") != 0) extparams = "&" + extparams;
			extparams = "&format=" + format +"&propertiesExport=" + properties + extparams;
			return selfaction.method('exportDataSelect',null,extparams,true);
		};
		
		this.exportData=function(properties,format,extparams){
			format = format || "xls";
			properties = properties||"";
			extparams = extparams||"";
			if(extparams.indexOf("&") != 0) extparams = "&" + extparams;
			extparams = "&format=" + format +"&propertiesExport=" + properties + extparams;
			return selfaction.method('export',null,extparams,false);
		}
	}
	
	bg.extend({entityaction:EntityAction});
	
	bg.extend({'ui.module':{
		moduleClick:function (moudleId){
			var id= document.getElementById(moudleId);
			if(id.className=="module collapsed"){
				id.className="module expanded";
			}else{
				id.className="module collapsed";
			}
		}
	}});
	bg.extend({'ui.load':
		function (uimodule,callback){
			var base=bg.getContextPath();
			base += "/static";
			if(uimodule=="validity"){
				jQuery.struts2_jquery.requireCss("/themes/" + bg.uitheme + "/jquery.validity.css",base);
				jQuery.struts2_jquery.require("/scripts/jquery.validity-1.1.1.js",null,base);
				if(jQuery.struts2_jquery.scriptCache["/scripts/i18n/zh_CN/jquery.validity.js"] && callback){
					callback();
				}else{
					jQuery.struts2_jquery.require("/scripts/i18n/zh_CN/jquery.validity.js",callback,base);
				}
			}else if(uimodule=="validate"){
				jQuery.struts2_jquery.require("/scripts/jquery-validation/jquery.validate.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/jquery-validation/additional-methods.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/jquery-validation/messages_zh.js",callback,base);
			}else if(uimodule=="validator2"){
				jQuery.struts2_jquery.require("/scripts/validator2/validator2.js",callback,base);
				jQuery.struts2_jquery.requireCss("/scripts/validator2/css/validator2.css",base);
			}else if(uimodule=="tabletree"){
				jQuery.struts2_jquery.requireCss("/themes/" + bg.uitheme + "/beangle-ui-tabletree.css",base);
				jQuery.struts2_jquery.require("/scripts/beangle/beangle-ui-tabletree.js",callback,base);
			}else if(uimodule=="colorbox"){
				jQuery.struts2_jquery.requireCss("/themes/" + bg.uitheme + "/colorbox.css",base);
				jQuery.struts2_jquery.require("/scripts/colorbox/jquery-colorbox-1.3.17.1.min.js",callback,base);
			}else if(uimodule=="ckeditor"){
				jQuery.struts2_jquery.requireCss("/scripts/ckeditor/skins/kama/editor.css",base);
				jQuery.struts2_jquery.requireCss("/scripts/ckeditor/skins/kama/editor.css",base);
				jQuery.struts2_jquery.require("/scripts/ckeditor/config.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/ckeditor/ckeditor.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/ckeditor/lang/zh-cn.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/ckeditor/plugins/docprops/plugin.js",callback,base);
				jQuery.struts2_jquery.require("/scripts/ckeditor/plugins/styles/styles/default.js",callback,base);
			}
		}
	});
	beangle.extend({
		"ui.comm" : {
			addPlaceholder : function (input, msg){
				if(!msg){
					msg = input.attr("alt");
				}
				if(msg != undefined && msg != ""){
					input.focusin(function (){
						if(this.value == msg){
							this.value = "";
						}
						input.removeClass("placeholder");
					});
					input.focusout(function (){
						if(this.value == "" || this.value == msg){
							this.value = msg;
							input.addClass("placeholder");
						}
					});
					input.focusout();
				}
			}
		}
	});
	beangle.extend({
		"ui.search" : {
			initForm : function (formId){
				this.initPlaceholder(formId);
				this.initExpandBtn(formId);
				this.reverseItem(formId);
				$("#" + formId + " [name='noAutoSubmit']").length == 0 && $("#" + formId + " select").change(function (){
					 bg.form.submit(formId);
				});
			},
			initPlaceholder : function (formId){
				$("#"+ formId +" :input").each(function (){
					var input = $(this);
					bg.ui.comm.addPlaceholder(input);
				});
			},
			removePlaceholder : function (formId){
				$("#"+ formId +" :input").each(function (){
					var input = $(this);
					var alt = input.attr("alt");
					if(this.value == alt){
						this.value = "";
					}
				});
			},
			addPlaceholder : function (formId){
				this.initPlaceholder(formId);
			},
			initExpandBtn : function (formId){
				//return;
				//var box = $(".input-group", $("#" + formId));
				var box = $("#" + formId);
				//var box = $("#" + formId).parent();
				var height = box.height();
				//alert(height);
				if (height < 50) {
				} else {
					var sbtn = $(".searchButton", $("#" + formId));
					var btn = $('<a href="#" class="expand_search_btn"></a>');
					btn.insertAfter(sbtn);
					btn.click(function() {
//						if ($(this).attr('class') == 'expand_search_btn') {
//							box.attr("height", box.css("height"));
//							var height = parseInt(box.height()) - 10;
//							box.animate({
//								height : height + "px"
//							});
//							$(this).attr('class', 'closed_search_btn');
//						} else {
//							box.animate({
//								height : box.attr("height")
//							});
//							$(this).attr('class', 'expand_search_btn');
//						}
						if ($(this).attr('class') == 'expand_search_btn') {
							box.animate({
								height : height + "px"
							});
							$(this).attr('class', 'closed_search_btn');
						} else {
							box.animate({
								height : "50px"
							});
							$(this).attr('class', 'expand_search_btn');
						}

						return false;
					});
					box.css("height", "50px");
				}
			},reverseItem : function (formId){
				var i = 0, last, lineNum = 5;
				$("#" + formId + " .search_items .search_item").each(function (){
					(i%lineNum > 0) && $(this).insertBefore(last);
					last = this, i++;
					$(this).find("input, select").attr("tabindex", i);
				});
			}
		}
	});
	bg.extend({
		'ui.list':{
			init : function (id){
				$("#" + id + " td").each(function (){var td = $(this);!td.attr("title") && td.attr("title", td.text().replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " "));});
				$("#" + id + " td").filter(".nohidden").each(function (){$(this).css({"white-space":"normal", "overflow":"auto"})});
			},
			getMainId : function (listId, parentClass){
				if(!parentClass){
					parentClass = "._ajax_target";
				}
				return $("#"+listId).parents(parentClass).get(0).id;
			}
		}
	});
	bg.extend({
		'ui.form':{
			init : function (formId){
				var form = $("#"+formId);
				try{
//					if(form.find(".noTooltip").length == 0){
//						form.find("[title]").tooltip();
//					}
					var h2s = form.find("h2").filter(".h2_title_1");
					if(h2s.size() > 1){
						h2s.click(function (){
							var h2 = $(this);
							if(h2.hasClass("h2_expand")){
								h2.removeClass("h2_expand");
								h2.addClass("h2_closed");
								h2.next(".view_div").slideUp();
							}else{
								h2.addClass("h2_expand");
								h2.removeClass("h2_closed");
								h2.next(".view_div").slideDown();
							}
						});
					}else{
						h2s.css({"background-image": "none", "cursor":"auto"});
					}
				}catch(e){
					bg.alert(e)
				}
			},
			empty : function (itmes){
				var empty = false;
				itmes.each(function (){
					if(!empty && this.value == ""){
						empty = true;
						this.focus();
					}
				});
				return empty;
			},
			keepOnline : function (){
				$(".keepOnLineDiv").remove();
				var id = "keepOnLineDiv" + bg.randomInt();
				var div = $("<div id='" + id + "' style='display:none' class='keepOnLineDiv'></di>");
				div.appendTo($("body"));
				this.doKeepOnline(id);
			},
			doKeepOnline : function (id){
				if($("#" + id).length > 0){
					$.ajax(base + "/static/empty.html");
					var v = this;
					setTimeout(function (){v.doKeepOnline(id)}, 60*1000);
				}
			}
		}});
	bg.extend({
		'ui.chosen':{
			selectAll : function (id){
				$("#" + id + " option").each(function (){
					$(this).attr("selected","selected");
				});
				jQuery("#" + id).trigger("liszt:updated");
			}
		}
	});
})(beangle);