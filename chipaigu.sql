/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : chipaigu

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-04-20 17:40:00
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `admin_info`
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `onlykey` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户唯一密匙',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `createtime` datetime NOT NULL,
  `checktoken` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '检测TOKEN 是否是有效数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_info
-- ----------------------------
INSERT INTO `admin_info` VALUES ('1', 'C159B05BDA52CD2D0C1604F3783F1632', 'imbacc', '81210B45691093A8963BF1BE268A9885', '2020-04-16 17:44:39', '5E2F5DA831537D8073903E7523D24F6C');

-- ----------------------------
-- Table structure for `movies_info`
-- ----------------------------
DROP TABLE IF EXISTS `movies_info`;
CREATE TABLE `movies_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '影视名称',
  `showimg` varchar(300) DEFAULT NULL COMMENT '影视图片',
  `listnew` int(5) DEFAULT '0',
  `listmax` int(5) DEFAULT '0',
  `types` int(1) DEFAULT '0' COMMENT '0无分类 1电影 2电视剧 3动漫 4综艺 5其他',
  `linkurl` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '指向链接',
  `hotnum` int(11) DEFAULT '0',
  `playnum` int(11) DEFAULT '0',
  `moviesid` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `userid` int(11) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movies_info
-- ----------------------------

-- ----------------------------
-- Table structure for `notice_info`
-- ----------------------------
DROP TABLE IF EXISTS `notice_info`;
CREATE TABLE `notice_info` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL COMMENT '用户ID',
  `isread` int(1) NOT NULL DEFAULT '0' COMMENT '0未读 1已读',
  `linkurl` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发送的链接',
  `content` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发送的内容',
  `createtime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice_info
-- ----------------------------
INSERT INTO `notice_info` VALUES ('1', '0', '0', null, null, '2020-04-10 14:34:29');

-- ----------------------------
-- Table structure for `task_info`
-- ----------------------------
DROP TABLE IF EXISTS `task_info`;
CREATE TABLE `task_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务名称',
  `sorts` int(5) NOT NULL DEFAULT '0' COMMENT '任务优先级',
  `linkurl` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '任务目标链接',
  `userid` int(11) NOT NULL COMMENT '用户ID',
  `movieid` int(11) DEFAULT NULL COMMENT '影视ID',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '默认 -1不通过 0等待 1执行中 2通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_info
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '逐渐ID',
  `userid` int(11) DEFAULT '0',
  `name` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户手机号',
  `headimg` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户头像',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '用户金额',
  `onlykey` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户唯一key',
  `openid` varchar(32) DEFAULT NULL COMMENT '用户openid',
  `unionid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户手机号+创建时间=md5加密',
  `createtime` datetime NOT NULL COMMENT '用户注册时间',
  `state` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
