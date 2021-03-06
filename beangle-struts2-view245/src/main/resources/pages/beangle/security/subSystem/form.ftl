[#ftl]
[@b.head/]
[@b.toolbar title="子系统"]bar.addBack();[/@]
[@b.tabs]
	[@b.tab label="子系统-添加/修改"]
		[@b.form action="!save" title="基本信息" theme="list"]
			[@b.textfield name="subSystem.name" label="名称" value="${subSystem.name!}" required="true" maxlength="100"/]
			[@b.textfield name="subSystem.domain" label="域名" value="${subSystem.domain!}" required="true" maxlength="200"/]
			[@b.textfield name="subSystem.contextPath" label="根路径" value="${subSystem.contextPath!}" required="true" maxlength="100"/]
			[@b.textfield name="subSystem.appid" label="APPID" value="${subSystem.appid!}" required="true" maxlength="100"/]
			[@b.textfield name="subSystem.pass" label="密钥" value="${subSystem.pass!}" required="true" maxlength="100"/]
			[@b.textfield name="subSystem.url" label="访问地址" value="${subSystem.url!}" maxlength="300"/]
			[@b.radios name="subSystem.enabled" label="common.status" value=subSystem.enabled!'1' items="1:action.activate,0:action.freeze"/]
			[@b.formfoot]
				<input type="hidden" name="subSystem.id" value="${subSystem.id!}" />
				[@b.redirectParams/]
				[@b.reset/]&nbsp;&nbsp;[@b.submit value="action.submit"/]
			[/@]
		[/@]
	[/@]
[/@]
[@b.foot/]