-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: host.docker.internal:3306
-- Generation Time: Oct 29, 2023 at 10:37 AM
-- Server version: 8.0.35
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tele_db`
--
CREATE DATABASE IF NOT EXISTS `tele_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `tele_db`;

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `createdAt`, `updatedAt`) VALUES
(3, '2023-10-28 14:41:46.270620', '2023-10-28 14:41:46.270620'),
(4, '2023-10-28 15:23:40.613151', '2023-10-28 15:23:40.613151');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `content` varchar(255) NOT NULL,
  `conversationId` int DEFAULT NULL,
  `senderId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `createdAt`, `updatedAt`, `content`, `conversationId`, `senderId`) VALUES
(1, '2023-10-28 14:43:27.714640', '2023-10-28 14:43:27.714640', 'Hello you', 3, 2),
(2, '2023-10-28 14:44:52.589710', '2023-10-28 14:44:52.589710', 'Hello you', 3, 2),
(3, '2023-10-28 14:45:08.884579', '2023-10-28 14:45:08.884579', 'It\'s me', 3, 2),
(4, '2023-10-28 14:45:28.322078', '2023-10-28 14:45:28.322078', 'Are you oke?', 3, 2),
(5, '2023-10-28 15:23:52.304924', '2023-10-28 15:23:52.304924', 'Hello dat?', 4, 2),
(6, '2023-10-28 15:44:48.250843', '2023-10-28 15:44:48.250843', 'Hello bro', 4, 4),
(7, '2023-10-29 09:13:21.982424', '2023-10-29 09:13:21.982424', 'this is me', 4, 4),
(8, '2023-10-29 09:19:50.894036', '2023-10-29 09:19:50.894036', 'just a test message', 4, 4),
(9, '2023-10-29 09:19:52.546519', '2023-10-29 09:19:52.546519', 'just a test message', 4, 4),
(10, '2023-10-29 09:19:53.651691', '2023-10-29 09:19:53.651691', 'just a test message', 4, 4),
(11, '2023-10-29 09:19:59.688498', '2023-10-29 09:19:59.688498', 'just a test message', 4, 4),
(12, '2023-10-29 09:20:03.114091', '2023-10-29 09:20:03.114091', 'just a test message', 4, 4),
(13, '2023-10-29 09:20:05.651873', '2023-10-29 09:20:05.651873', 'just a test message', 4, 4),
(14, '2023-10-29 09:20:08.157059', '2023-10-29 09:20:08.157059', 'just a test message', 4, 4),
(15, '2023-10-29 09:20:10.409003', '2023-10-29 09:20:10.409003', 'just a test message', 4, 4),
(16, '2023-10-29 09:20:12.917563', '2023-10-29 09:20:12.917563', 'just a test message', 4, 4),
(17, '2023-10-29 09:20:15.128928', '2023-10-29 09:20:15.128928', 'just a test message', 4, 4),
(18, '2023-10-29 09:21:12.287978', '2023-10-29 09:21:12.287978', 'reply from hoang', 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `conversationId` int NOT NULL,
  `userModelId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`conversationId`, `userModelId`) VALUES
(3, 1),
(3, 2),
(4, 2),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `read_message`
--

CREATE TABLE `read_message` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `messageId` int DEFAULT NULL,
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_model`
--

CREATE TABLE `user_model` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `phone_number` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_model`
--

INSERT INTO `user_model` (`id`, `createdAt`, `updatedAt`, `phone_number`, `full_name`, `password`, `avatar`) VALUES
(1, '2023-10-28 12:28:54.564691', '2023-10-28 12:28:54.564691', '0772272536', 'Chavis Nguyen', '$2a$10$WN5aeC/ccwySkB.k07Q2B.kVEuZrKyE4EWMUelFVoRe0QsLcHxMua', 'https://images.unsplash.com/photo-1602779717364-d044d7492ed7?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyNzk5OTkzM3x8ZW58MHx8fHx8'),
(2, '2023-10-28 12:29:07.469874', '2023-10-28 12:29:07.469874', '0772272537', 'Hoang Nguyen', '$2a$10$zb/hT3F4DF8FG.GYuO5C0.uACwdHTWNuCPutFhTYECg20utr6rTXq', 'https://images.unsplash.com/photo-1602779717364-d044d7492ed7?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyNzk5OTkzM3x8ZW58MHx8fHx8'),
(4, '2023-10-28 15:23:16.111863', '2023-10-28 15:23:16.111863', '077227258', 'Dat Tien Hoang', '$2a$10$.3MC2.OZYjwHA8rZub5aVuS7NCTJScAmKVG.vlbAeJtdCcrWs3fHe', 'https://images.unsplash.com/photo-1602779717364-d044d7492ed7?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyNzk5OTkzM3x8ZW58MHx8fHx8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7cf4a4df1f2627f72bf6231635f` (`conversationId`),
  ADD KEY `FK_bc096b4e18b1f9508197cd98066` (`senderId`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`conversationId`,`userModelId`),
  ADD KEY `IDX_6b54f24a585e94ef3fc7aa7ef5` (`conversationId`),
  ADD KEY `IDX_05688b427eb8322ec86e01a59c` (`userModelId`);

--
-- Indexes for table `read_message`
--
ALTER TABLE `read_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bc84010358ac7b191e56fdf78c7` (`messageId`),
  ADD KEY `FK_883e95c71563ed88aa0c2339131` (`userId`);

--
-- Indexes for table `user_model`
--
ALTER TABLE `user_model`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_9e7cf8b773880f68fcade93063` (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `read_message`
--
ALTER TABLE `read_message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_model`
--
ALTER TABLE `user_model`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_7cf4a4df1f2627f72bf6231635f` FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`),
  ADD CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user_model` (`id`);

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `FK_05688b427eb8322ec86e01a59c8` FOREIGN KEY (`userModelId`) REFERENCES `user_model` (`id`),
  ADD CONSTRAINT `FK_6b54f24a585e94ef3fc7aa7ef5d` FOREIGN KEY (`conversationId`) REFERENCES `conversation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `read_message`
--
ALTER TABLE `read_message`
  ADD CONSTRAINT `FK_883e95c71563ed88aa0c2339131` FOREIGN KEY (`userId`) REFERENCES `user_model` (`id`),
  ADD CONSTRAINT `FK_bc84010358ac7b191e56fdf78c7` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
