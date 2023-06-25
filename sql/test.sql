/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 25/06/2023 17:54:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for app_info
-- ----------------------------
DROP TABLE IF EXISTS `app_info`;
CREATE TABLE `app_info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `text` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `version` int(0) NULL DEFAULT NULL,
  `os` int(0) NULL DEFAULT NULL,
  `ostext` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `linkurl` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of app_info
-- ----------------------------
INSERT INTO `app_info` VALUES (1, '111111111', 101, 1, '安卓', 'http://xxxxx/download/capp-2019-2-12.apk');
INSERT INTO `app_info` VALUES (9, '666', 122, 0, '广告', 'string');
INSERT INTO `app_info` VALUES (2, '222222222222222', 105, 2, '苹果', NULL);
INSERT INTO `app_info` VALUES (8, '666', 122, 0, '广告', 'string');
INSERT INTO `app_info` VALUES (3, '33333333333333333333', 102, 3, '网页下载', NULL);
INSERT INTO `app_info` VALUES (6, '56', 111, 1, 'ff', 'fff');
INSERT INTO `app_info` VALUES (7, '666', 122, 0, '广告', 'string');
INSERT INTO `app_info` VALUES (4, '444444444444444', 100, 5, 'add接口', 'xx');
INSERT INTO `app_info` VALUES (10, 'string', 111, 0, '111', 'string');

-- ----------------------------
-- Table structure for test_dtype
-- ----------------------------
DROP TABLE IF EXISTS `test_dtype`;
CREATE TABLE `test_dtype`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `money` decimal(6, 2) NOT NULL COMMENT '钱',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名字',
  `date` datetime(0) NULL DEFAULT NULL COMMENT '格式化的时间',
  `json` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'json格式',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for test_info
-- ----------------------------
DROP TABLE IF EXISTS `test_info`;
CREATE TABLE `test_info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `text` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test_info
-- ----------------------------
INSERT INTO `test_info` VALUES (1, '111', NULL);
INSERT INTO `test_info` VALUES (2, '222', NULL);
INSERT INTO `test_info` VALUES (4, 'name is test', NULL);
INSERT INTO `test_info` VALUES (5, 'name is test', 'string');

SET FOREIGN_KEY_CHECKS = 1;
