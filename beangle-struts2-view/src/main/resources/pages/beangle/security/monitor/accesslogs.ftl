[#ftl]
[@b.head/]
[#include "nav.ftl"/]
[#--[@b.toolbar title="系统资源访问记录"/]--]
[@b.grid items=accessLogs var="accessLog" refresh="10" emptyMsg="由于没有启用资源访问日志记录器,没有访问记录." target="main"]
	[@b.gridbar]
	bar.addPrint("${b.text("action.print")}");
	[/@]
	[@b.row]
		[@b.col width="5%" title="序号"]${accessLog_index+1}[/@]
		[@b.col width="25%" title="资源" align="left" property="resource"]<span title="${accessLog.params!}">${accessLog.resource!}</span>[/@]
		[@b.col width="10%" title="帐号" property="username"][#if accessLog.username??][@b.a target="_blank" href="/security/user!info?name=${accessLog.username}"]${(accessLog.username)}[/@][/#if][/@]
		[@b.col width="15%" title="开始~结束" property="beginAt" ]<span title="${accessLog.beginAt?string("yyyy-MM-dd")}">${accessLog.beginAt?string("HH:mm:ss")}~${(accessLog.endAt?string("HH:mm:ss"))!}</span>[/@]
		[@b.col width="10%" title="持续时间(ms)" property="duration" sort="endAt-beginAt"/]
	[/@]
[/@]
[@b.foot/]