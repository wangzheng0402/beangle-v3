package org.beangle.website.system.model;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Size;

import org.beangle.commons.collection.CollectUtils;
import org.beangle.ems.security.User;
import org.beangle.model.pojo.LongIdObject;

/**
 * 站内消息
 * @author GOKU
 *
 */
@Entity(name="org.beangle.website.system.model.Znxx")
public class Znxx extends LongIdObject {

	/**
	 * 标题
	 */
	@Size(max=300)
	@Column(length=300)
	private String title;

	/**
	 * 内容
	 */
	@Size(max=3000)
	@Column(length=3000)
	private String content;

	/**
	 * 附件路径
	 */
	@Size(max=300)
	@Column(length=300)
	private String filePath;

	/**
	 * 收件人
	 */
	@ManyToMany
	private Set<User> receives = CollectUtils.newHashSet();

	/**
	 * 是否回复
	 */
	private boolean reply = false;

	/**
	 * 发送人
	 */
	private User sender;

	/**
	 * 发送时间
	 */
	private Date time;
	
	/**
	 * 文件名
	 */
	@Size(max=300)
	@Column(length=300)
	private String fileName;
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Set<User> getReceives() {
		return receives;
	}

	public void setReceives(Set<User> receives) {
		this.receives = receives;
	}

	public boolean isReply() {
		return reply;
	}

	public void setReply(boolean reply) {
		this.reply = reply;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
	
	/**
	 * 计算发布时间
	 * @return
	 * @author 高照伟
	 * @createDate 2015年2月6日 下午2:07:38
	 */
	public String getPublishTime(){
		String publishTime = "";
		Calendar current = Calendar.getInstance();
		current.setTime(new Date());
		Calendar sendTime = Calendar.getInstance();
		sendTime.setTime(time);
		
		//时间差 1000毫秒=1秒
		long interval = current.getTimeInMillis() - sendTime.getTimeInMillis();
		
		if(interval >= (1 * 24 * 60 * 60 * 1000 )){  //时间差大于一天
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			publishTime = format.format(time);
		}else if(interval >= (1 * 60 * 60 * 1000)){  //时间差大于一小时
			publishTime = interval/(60 * 60 * 1000)  + "小时";
		}else if(interval >= (5 * 60 * 1000)){       //时间差大于五分钟
			publishTime = interval/(60 * 1000)  + "分钟";
		}else{
			publishTime = "刚刚";
		}
		return publishTime;
	}
}
