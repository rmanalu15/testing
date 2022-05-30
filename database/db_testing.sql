/*
 Navicat Premium Data Transfer

 Source Server         : DB_LOCAL
 Source Server Type    : MySQL
 Source Server Version : 100422
 Source Host           : localhost:3306
 Source Schema         : db_testing

 Target Server Type    : MySQL
 Target Server Version : 100422
 File Encoding         : 65001

 Date: 30/05/2022 19:17:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pricelist
-- ----------------------------
DROP TABLE IF EXISTS `pricelist`;
CREATE TABLE `pricelist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int(50) NOT NULL,
  `year_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pricelist
-- ----------------------------
INSERT INTO `pricelist` VALUES (3, 'PL00001', 800000000, 1, 1, '2022-05-30 19:10:46', '2022-05-30 18:54:22');
INSERT INTO `pricelist` VALUES (4, 'PL00002', 200000000, 1, 2, NULL, '2022-05-30 18:55:15');
INSERT INTO `pricelist` VALUES (5, 'PL00003', 300000000, 1, 3, NULL, '2022-05-30 18:55:24');
INSERT INTO `pricelist` VALUES (6, 'PL00004', 400000000, 1, 4, NULL, '2022-05-30 18:55:34');
INSERT INTO `pricelist` VALUES (7, 'PL00005', 500000000, 1, 10, NULL, '2022-05-30 19:00:27');
INSERT INTO `pricelist` VALUES (8, 'PL00006', 600000000, 1, 11, NULL, '2022-05-30 19:00:38');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_admin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_login` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (57, 'Rupinda Manalu', 'true', 'pinda@gmail.com', '$2a$10$73qQ8xlEHoJeIMCgYbmqJu4dvE9whTQ55DlsjM5A.GZL/r9aKF3rG', '2022-05-30 18:46:31', '2022-05-29 10:26:26');
INSERT INTO `users` VALUES (58, 'PT SERU', 'false', 'ptseru@gmail.com', '$2a$10$EsbYXRTUB.MJ6sEBYWJ7nejmT6.OskbJ3hUzp5B4OjaPlQs0wqcqu', '2022-05-30 14:17:59', '2022-05-29 10:27:57');

-- ----------------------------
-- Table structure for vehicle_brand
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_brand`;
CREATE TABLE `vehicle_brand`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicle_brand
-- ----------------------------
INSERT INTO `vehicle_brand` VALUES (1, 'Honda', '2022-05-30 09:26:27', '2022-05-29 11:55:06');
INSERT INTO `vehicle_brand` VALUES (2, 'Daihatsu', '2022-05-30 09:25:04', '2022-05-29 12:21:04');

-- ----------------------------
-- Table structure for vehicle_model
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_model`;
CREATE TABLE `vehicle_model`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_id` int(11) NOT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicle_model
-- ----------------------------
INSERT INTO `vehicle_model` VALUES (1, '1.2 X CVT ADS', 2, NULL, '2022-05-30 14:15:28');
INSERT INTO `vehicle_model` VALUES (2, '1.2 X CVT', 2, NULL, '2022-05-30 14:17:43');
INSERT INTO `vehicle_model` VALUES (3, '1.2 X MT ADS', 2, NULL, '2022-05-30 14:19:02');
INSERT INTO `vehicle_model` VALUES (4, '1.2 X MT', 2, '2022-05-30 14:34:22', '2022-05-30 14:19:12');
INSERT INTO `vehicle_model` VALUES (10, '1.2 X AT', 1, NULL, '2022-05-30 14:46:45');
INSERT INTO `vehicle_model` VALUES (11, '1.2 R AT', 1, NULL, '2022-05-30 14:46:56');
INSERT INTO `vehicle_model` VALUES (12, '1.2 R Deluxe AT', 1, NULL, '2022-05-30 14:47:11');

-- ----------------------------
-- Table structure for vehicle_type
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_type`;
CREATE TABLE `vehicle_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `brand_id` int(11) NOT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicle_type
-- ----------------------------
INSERT INTO `vehicle_type` VALUES (1, 'Ayla', 2, '2022-05-30 11:39:52', '2022-05-30 09:38:28');
INSERT INTO `vehicle_type` VALUES (2, 'Rocky', 2, NULL, '2022-05-30 10:12:32');
INSERT INTO `vehicle_type` VALUES (3, 'Sigra', 2, NULL, '2022-05-30 10:21:38');
INSERT INTO `vehicle_type` VALUES (4, 'Brio', 1, '2022-05-30 11:18:57', '2022-05-30 10:23:06');
INSERT INTO `vehicle_type` VALUES (5, 'Mobilio', 1, NULL, '2022-05-30 10:23:15');
INSERT INTO `vehicle_type` VALUES (6, 'BR-V', 1, NULL, '2022-05-30 10:24:21');
INSERT INTO `vehicle_type` VALUES (7, 'Jazz', 1, NULL, '2022-05-30 10:25:00');
INSERT INTO `vehicle_type` VALUES (8, 'HR-V', 1, NULL, '2022-05-30 10:25:46');

-- ----------------------------
-- Table structure for vehicle_year
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_year`;
CREATE TABLE `vehicle_year`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` year NOT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `created_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicle_year
-- ----------------------------
INSERT INTO `vehicle_year` VALUES (1, 2015, NULL, '2022-05-30 15:34:31');
INSERT INTO `vehicle_year` VALUES (2, 2016, NULL, '2022-05-30 15:34:36');
INSERT INTO `vehicle_year` VALUES (3, 2017, NULL, '2022-05-30 15:34:39');
INSERT INTO `vehicle_year` VALUES (4, 2018, NULL, '2022-05-30 15:34:42');
INSERT INTO `vehicle_year` VALUES (5, 2019, NULL, '2022-05-30 15:34:46');
INSERT INTO `vehicle_year` VALUES (6, 2020, NULL, '2022-05-30 15:34:50');
INSERT INTO `vehicle_year` VALUES (7, 2021, NULL, '2022-05-30 15:34:55');
INSERT INTO `vehicle_year` VALUES (8, 2022, NULL, '2022-05-30 15:34:59');
INSERT INTO `vehicle_year` VALUES (9, 2014, NULL, '2022-05-30 15:35:04');
INSERT INTO `vehicle_year` VALUES (10, 2013, NULL, '2022-05-30 15:35:08');
INSERT INTO `vehicle_year` VALUES (11, 2012, NULL, '2022-05-30 15:35:14');
INSERT INTO `vehicle_year` VALUES (12, 2011, NULL, '2022-05-30 15:35:18');
INSERT INTO `vehicle_year` VALUES (13, 2010, NULL, '2022-05-30 15:35:21');

SET FOREIGN_KEY_CHECKS = 1;
