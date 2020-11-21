-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2020 at 06:55 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crowdsoucing`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `receiver` varchar(100) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `body` varchar(1000) NOT NULL,
  `sta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `username`, `name`, `receiver`, `subject`, `body`, `sta`) VALUES
(1, 'jan', 'Jane Alam', 'fsafdas', '		fasfadsf			', '		sdafasfas			', ''),
(2, 'jan', 'Jane Alam', 'gfdgsgt', '		r5tretre			', '		teytbvdgfd			', ''),
(3, 'saqib', 'saqib', 'zami', 'ghawrgf', 'aifhasdghf', ''),
(4, 'zami', 'Al Zami Arafat', 'ahnaf alam', '		kijykg			', '			fjffj7u		', '');

-- --------------------------------------------------------

--
-- Table structure for table `post_table`
--

CREATE TABLE `post_table` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `post_body` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `buyer_id` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `seller_name` varchar(100) NOT NULL,
  `buyer_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_table`
--

INSERT INTO `post_table` (`id`, `title`, `post_body`, `status`, `buyer_id`, `amount`, `seller_id`, `seller_name`, `buyer_name`) VALUES
(1, '	 vcb			\r\n					\r\n					', '	; cvlvsdyytkgh		\r\n					\r\n					', 'fadbvgfdutr', '2', 454365476, 0, '', 'Al Zami Arafat');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `balance` int(11) NOT NULL,
  `project_title` varchar(500) NOT NULL,
  `buyer_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`id`, `user_id`, `name`, `category_name`, `balance`, `project_title`, `buyer_name`) VALUES
(1, 3, 'ahnaf alam', 'web developer', 1200, 'Hospital Management syestem', 'Al Zami Arafat');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_roll` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `full_name`, `username`, `password`, `email`, `contact`, `address`, `user_roll`) VALUES
(1, 'Aminul Islam Saqib', 'saqib', '123', 'saqib@email.com', '01821500050', 'Narayanganj', 'admin'),
(2, 'Al Zami Arafat', 'zami', '123', 'z@email.com', '634578349', 'Dhaka', 'buyer'),
(3, 'ahnaf alam', 'ahnaf', '123', 'ahnaf@email.com', '456875212', 'Dhaka, Bangladesh', 'seller');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_table`
--
ALTER TABLE `post_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `post_table`
--
ALTER TABLE `post_table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
