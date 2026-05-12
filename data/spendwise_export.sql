-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: spendwise
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `category` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (23,'Morning Coffee',6.5,'Food','2026-05-04','Flat white from the cafe downstairs',1),(24,'Uber to CBD',19,'Transport','2026-05-12','Ride to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meetingRide to work meeting',1),(25,'Netflix',22.99,'Entertainment','2026-05-01','Monthly subscription',1),(26,'Coffee Beans',14,'Food','2026-05-10','Bag of beans from market',1),(27,'Woolworths groceries',87.5,'Food','2025-09-05','Weekly grocery run',1),(28,'Opal card top-up',50,'Transport','2025-09-08','Monthly commute',1),(29,'Netflix',22.99,'Entertainment','2025-09-01','Monthly subscription',1),(30,'Rent',1400,'Housing','2025-09-01','Monthly rent',1),(31,'Chemist Warehouse',34.2,'Health','2025-09-10','Vitamins',1),(32,'UTS library printing',12,'Education','2025-09-12','Assignment printouts',1),(33,'Thai restaurant',45,'Food','2025-09-14','Dinner with friends',1),(34,'Uber to airport',38,'Transport','2025-09-15','Sydney Airport',1),(35,'ASOS order',119.9,'Shopping','2025-09-18','Winter clothes',1),(36,'Spotify Premium',12.99,'Entertainment','2025-10-01','Monthly subscription',1),(37,'Electricity bill',180,'Housing','2025-10-05','Quarterly bill',1),(38,'Coles groceries',95.3,'Food','2025-10-08','Weekly shop',1),(39,'GP visit',30,'Health','2025-10-11','Bulk billing gap',1),(40,'Udemy course',24.99,'Education','2025-10-15','React advanced',1),(41,'Rent',1400,'Housing','2025-11-01','Monthly rent',1);
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_user_username` (`username`),
  UNIQUE KEY `ix_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@spendwise.com','$2b$12$YE2pJVrULXqVaDX6LWKSg.pQnqURDEaNffvtKuiKFwDMCg8WbdzH2',1,'2026-05-12 17:59:21'),(2,'string','string','$2b$12$1sB6UB5ApSCri/Gam1iOhegdtJMWO0EG9nIDMVX7Z34iskZdIs50q',0,'2026-05-12 18:08:31'),(3,'testuser','test@example.com','$2b$12$NcRmfIkt8bmXpj5/3rZQZ.Z6FiqU0mgo.8GnIBJWnIeY9gHUg0L7a',0,'2026-05-12 18:09:20');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useractivity`
--

DROP TABLE IF EXISTS `useractivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useractivity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action` varchar(100) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `useractivity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useractivity`
--

LOCK TABLES `useractivity` WRITE;
/*!40000 ALTER TABLE `useractivity` DISABLE KEYS */;
INSERT INTO `useractivity` VALUES (1,2,'register','New user registered: string','2026-05-12 18:08:31'),(2,3,'register','New user registered: testuser','2026-05-12 18:09:20'),(3,1,'login','admin logged in','2026-05-12 18:10:23'),(4,1,'login','admin logged in','2026-05-12 18:17:52'),(5,1,'login','admin logged in','2026-05-12 18:22:10'),(6,1,'login','admin logged in','2026-05-12 18:25:05'),(7,1,'create_expense','Created: Morning Coffee','2026-05-12 18:54:44'),(8,1,'create_expense','Created: Uber to CBD','2026-05-12 18:57:30'),(9,1,'create_expense','Created: Netflix','2026-05-12 18:57:36'),(10,1,'create_expense','Created: Coffee Beans','2026-05-12 18:57:43'),(12,1,'login','admin logged in','2026-05-12 19:07:06'),(13,1,'update_expense','Updated: Morning Coffee','2026-05-12 19:08:28'),(14,1,'update_expense','Updated: Uber to CBD','2026-05-12 19:08:33'),(15,1,'login','admin logged in','2026-05-12 19:15:17'),(16,1,'update_expense','Updated: Uber to CBD','2026-05-12 19:17:26'),(17,1,'update_expense','Updated: Uber to CBD','2026-05-12 19:31:13');
/*!40000 ALTER TABLE `useractivity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-13  5:44:05
