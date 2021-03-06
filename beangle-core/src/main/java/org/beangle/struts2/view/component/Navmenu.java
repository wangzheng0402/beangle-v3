/* Copyright c 2005-2012.
 * Licensed under GNU  LESSER General Public License, Version 3.
 * http://www.gnu.org/licenses
 */
package org.beangle.struts2.view.component;

import org.apache.commons.lang.StringUtils;

import com.opensymphony.xwork2.util.ValueStack;

/**
 * @author beangle
 * @version $Id: Navmenu.java Apr 20, 2011 8:47:00 AM beangle $
 */
public class Navmenu extends ClosingUIBean {

	private String title;

	private String uri;
	
	private String target;

	/** 是有已经有标签卡被选中了 */
	private boolean selected;

	public Navmenu(ValueStack stack) {
		super(stack);
		StringBuilder sb = new StringBuilder(StringUtils.substringBeforeLast(getRequestURI(), "."));
		if (-1 == sb.lastIndexOf("!")) {
			sb.append("!index");
		}
		this.uri=sb.toString();
	}
	
	@Override
	protected void evaluateParams() {
		super.evaluateParams();
		generateIdIfEmpty();
	}
	
	boolean isSelected(String givenUri) {
		if (selected) return false;
		else {
			selected = sameAction(givenUri);
			return selected;
		}
	}

	/**
	 * 去除后缀比较是否是同一个resource(action!method)
	 * 
	 * @param first
	 * @param second
	 * @return
	 */
	private boolean sameAction(String first) {
		StringBuilder firstSb = new StringBuilder(StringUtils.substringBefore(first, "."));
		if (-1 == firstSb.lastIndexOf("!")) {
			firstSb.append("!index");
		}
		return firstSb.toString().equals(uri);
	}

	public String getTitle() {
		//return title;
		if(StringUtils.isNotEmpty(title) && title.indexOf("+") >= 0){
			String subtitle = title.substring(0, title.indexOf("+"));
			return getText(subtitle) + getText(title.substring(title.indexOf("+")+1,title.length()));
		}
		return getText(title);
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setLabel(String label) {
		this.title = label;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

}
