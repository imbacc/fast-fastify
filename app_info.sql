/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : capp

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-01-13 10:13:25
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `app_info`
-- ----------------------------
DROP TABLE IF EXISTS `app_info`;
CREATE TABLE `app_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `os` int(1) DEFAULT NULL,
  `ostext` varchar(5) DEFAULT NULL,
  `linkurl` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_info
-- ----------------------------
INSERT INTO `app_info` VALUES ('1', '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题', '101', '1', '安卓', 'http://xxxxx/download/capp-2019-2-12.apk');
INSERT INTO `app_info` VALUES ('2', '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题', '100', '2', '苹果', null);
INSERT INTO `app_info` VALUES ('3', '1.修复爱奇艺和腾讯搜索抓取错误\\n 2.播放白屏问题', '0', '3', '网页下载', null);
INSERT INTO `app_info` VALUES ('4', '我看到你访问我了哦！', '0', '4', 'token', null);
