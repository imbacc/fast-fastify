/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2021-11-08 11:41:34
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
  `ostext` varchar(6) DEFAULT NULL,
  `linkurl` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_info
-- ----------------------------
INSERT INTO `app_info` VALUES ('1', '111111111', '101', '1', '安卓', 'http://xxxxx/download/capp-2019-2-12.apk');
INSERT INTO `app_info` VALUES ('9', '666', '122', '0', '广告', 'string');
INSERT INTO `app_info` VALUES ('2', '222222222222222', '105', '2', '苹果', null);
INSERT INTO `app_info` VALUES ('8', '666', '122', '0', '广告', 'string');
INSERT INTO `app_info` VALUES ('3', '33333333333333333333', '102', '3', '网页下载', null);
INSERT INTO `app_info` VALUES ('6', '56', '111', '1', 'ff', 'fff');
INSERT INTO `app_info` VALUES ('7', '666', '122', '0', '广告', 'string');
INSERT INTO `app_info` VALUES ('4', '444444444444444', '100', '5', 'add接口', '通过add接口添加,我是linkurl字段');
INSERT INTO `app_info` VALUES ('10', 'string', '111', '0', '111', 'string');
