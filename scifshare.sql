-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 30, 2023 at 05:33 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scifshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `branding`
--

DROP TABLE IF EXISTS `branding`;
CREATE TABLE IF NOT EXISTS `branding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bgColor` varchar(255) DEFAULT NULL,
  `scColor` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  `ogImage` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `branding`
--

INSERT INTO `branding` (`id`, `bgColor`, `scColor`, `logo`, `logoUrl`, `ogImage`, `userId`) VALUES
(3, '#fff', '#fff', '502023-5bec55-internet.png', 'url url', '502023-b52078-indus12.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(191) DEFAULT NULL,
  `path` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `path`) VALUES
(1, '402023-223d52-indus7.jpg', '402023-223d52-indus7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
CREATE TABLE IF NOT EXISTS `folders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`id`, `label`, `color`, `icon`, `userId`, `teamId`) VALUES
(1, 'Folder A', '#FFF', 'icon', 1, 1),
(2, 'Folder B', '#FFF', 'icon', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invites`
--

DROP TABLE IF EXISTS `invites`;
CREATE TABLE IF NOT EXISTS `invites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `teamId` (`teamId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `invites`
--

INSERT INTO `invites` (`id`, `email`, `roleId`, `teamId`) VALUES
(4, 'referer1st@gmail.com', 2, 1),
(3, 'hassan748_7@hotmail.com', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `secrets`
--

DROP TABLE IF EXISTS `secrets`;
CREATE TABLE IF NOT EXISTS `secrets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `openLimit` int DEFAULT NULL,
  `expirationDate` varchar(255) DEFAULT NULL,
  `recieveNotification` int DEFAULT NULL,
  `secretInformation` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `documents` varchar(255) DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  `folderId` int DEFAULT NULL,
  `encKey` varchar(191) DEFAULT NULL,
  `ivKey` varchar(191) DEFAULT NULL,
  `url` varchar(191) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `statusId` (`statusId`),
  KEY `folderId` (`folderId`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `secrets`
--

INSERT INTO `secrets` (`id`, `label`, `openLimit`, `expirationDate`, `recieveNotification`, `secretInformation`, `password`, `documents`, `statusId`, `folderId`, `encKey`, `ivKey`, `url`, `userId`) VALUES
(2, 'Test Label 1', 0, '', 0, 'kcSUMlfo44IaqIycak4zCw==', '$2a$08$ksIFqU.UeLkvGWSqDF41T.D17/DAV/Q1VPdqf7yaMv8EfzqCi6bke', '', 1, 1, '52c4c4c0acb04d4e5074fa3c1dab1ef4', 'cda354ab3759799b', '639102831fe83502', 1),
(3, 'Test label 2', 4, '', 1, 'W3SrLlrkt0pX8F5WfkPj5WW6cwe5c6LBzJVtweLDgeo=', '$2a$08$AqKpt/0Qo4O/r5/RxKWdreHLY2T3HnUlJ1/EhflOG262OcJwP9ieO', '502023-56c1d4-indus2.png', 1, 1, '01727226b8fe272d2307aa3e31e0825e', 'c0b0437d6d6109be', '974c7b4827b52254', 1),
(6, 'Test label 4', 2, '', 1, 'aiM9jruUCcT5+IAPinWhOi3/wC1OYQWK2iPq4Cg6Rhg=', '$2a$08$HdDhKzTnBr2sbfw.O.V9jeHyPcqz9ao6Oy70Nu0.HLn3sL5QJz/KK', '102023-56c948-ent.png', 1, 5, '874d9abf5291c8d66b6c10769b8ca8b5', '61784eb5b0b79ad5', 'eeca96eab6229b0e', 1),
(5, 'Test label 3', 2, '', 1, 'WwVx7mOBAOaJnrsNHp2WloOGhQcvAcZ7qMlDU/hSae0=', '$2a$08$ZeakNG71gK1RgTQoZ.Trp.UFPDZ/lZOIR8aJDILhJ54WFW2mGGfd6', '502023-e0be3c-indus2.png', 1, 1, '76687bf8786adc77478a32a3bc979f49', '26a802cff65440b9', '25e5d9d87a5f2f71', 1),
(7, 'Test label 4', 2, '', 1, 'FcvSdmwU/BP1f0jwi6VfhT2OCIQZxk86SaVVpi0XBCA=', '$2a$08$F.BILOnANfUmzEhF/UPnAuhf.5cshkS5vrV4IaLPJjNH9CRdv49Nq', '102023-a4b38e-ent.png', 1, 5, 'cd1814738c44a753a62ad5691fbc2603', '4387b5fdcba6a641', 'e9ed4e44b871422e', 1);

-- --------------------------------------------------------

--
-- Table structure for table `secret_open`
--

DROP TABLE IF EXISTS `secret_open`;
CREATE TABLE IF NOT EXISTS `secret_open` (
  `id` int NOT NULL AUTO_INCREMENT,
  `secretId` int DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `secret_open`
--

INSERT INTO `secret_open` (`id`, `secretId`, `ipAddress`) VALUES
(1, 4, '::1'),
(2, 4, '::1'),
(3, 4, '::1'),
(4, 4, '::1');

-- --------------------------------------------------------

--
-- Table structure for table `secret_status`
--

DROP TABLE IF EXISTS `secret_status`;
CREATE TABLE IF NOT EXISTS `secret_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `secret_status`
--

INSERT INTO `secret_status` (`id`, `name`) VALUES
(1, 'Draft'),
(2, 'Active'),
(3, 'Expired');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `userId`) VALUES
(1, 'Team H', 1);

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `teamId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `teamId` (`teamId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_roles`
--

DROP TABLE IF EXISTS `team_roles`;
CREATE TABLE IF NOT EXISTS `team_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `team_roles`
--

INSERT INTO `team_roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Maintainer'),
(3, 'Editor');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `alternateEmail` varchar(255) DEFAULT NULL,
  `dateFormat` varchar(255) DEFAULT NULL,
  `webhook` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `alternateEmail`, `dateFormat`, `webhook`) VALUES
(1, 'Hassan Ali', 'pagan1581998@gmail.com', '$2a$08$/P1YmXnJbjUVUVWLk.SFBu8YRpx7AKe3TDY1kXO.ivz5NEsgpmh2.', 'hassan@gmail.com', 'DD/MM/YYYY', 'http://localhost:8000/webhook'),
(2, 'Referer', 'referer1st@gmail.com', '$2a$08$XbhlZOiXdl1YLDZ2SVxliuIb52FnFYjbkiAyx7TaA3sb3x6VxhnvG', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
