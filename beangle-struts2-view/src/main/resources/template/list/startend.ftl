[#ftl/]
[#include "../form/startend.ftl"/]
[#--
<script type="text/javascript">beangle.ui.load("My97DatePicker");</script>
--]
[#--
<li>
<label for="${tag.dates?first.id}" class="title" style="padding:8px 0 0 0">${tag.dates?first.label}：</label>
[#list tag.dates as date]
[#if date_index=1]~[/#if]
<input type="text" id="${date.id}" [#if date.title??]title="${date.title}"[/#if] 
class="Wdate" onFocus="WdatePicker({dateFmt:'${tag.format}'[#if date.maxDate??],maxDate:'${date.maxDate}'[/#if][#if date.minDate??],minDate:'${date.minDate}'[/#if]})" name="${date.name}" value="${(date.value)?if_exists}" ${tag.parameterString}/>
[#if (date.required!"")=="true"]<em class="required"><sup>*</sup></em>[/#if]
[#if date.comment??]<label class="comment">${date.comment}</label>[/#if]
[/#list]
</li>
--]
[#--
[#import "comm.ftl" as c/]
[@c.tr tag=tag]
	[#list tag.dates as date]
	[#if date_index=1]~[/#if]
	<input type="text" id="${date.id}" [#if date.title??]title="${date.title}"[/#if] 
	class="Wdate" onFocus="WdatePicker({dateFmt:'${tag.format}'[#if date.maxDate??],maxDate:'${date.maxDate}'[/#if][#if date.minDate??],minDate:'${date.minDate}'[/#if]})" name="${date.name}" value="${(date.value)?if_exists}" ${tag.parameterString}/>
	[#if (date.required!"")=="true"]<em class="required"><sup>*</sup></em>[/#if]
	[#if date.comment??]<label class="comment">${date.comment}</label>[/#if]
	[/#list]
[/@]
--]
