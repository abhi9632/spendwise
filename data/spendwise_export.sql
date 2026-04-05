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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,'Woolworths BIG shop',87.5,'Food','2025-09-05','Weekly grocery run'),(2,'Opal card top-up',50,'Transport','2025-09-08','Monthly commute'),(3,'Netflix',22.99,'Entertainment','2025-09-01','Monthly subscription'),(5,'Chemist Warehouse',34.2,'Health','2025-09-10','Vitamins'),(6,'UTS library printing',12,'Education','2025-09-12','Assignment printouts'),(7,'Thai restaurant',45,'Food','2025-09-14','Dinner with friends'),(8,'Uber to airport',38,'Transport','2025-09-15','Sydney Airport'),(9,'ASOS order',119.9,'Shopping','2025-09-18','Winter clothes'),(10,'Spotify Premium',12.99,'Entertainment','2025-10-01','Monthly subscription'),(11,'Electricity bill',180,'Housing','2025-10-05','Quarterly bill'),(12,'Coles groceries',95.3,'Food','2025-10-08','Weekly shop'),(13,'GP visit',30,'Health','2025-10-11','Bulk billing gap'),(14,'Udemy course',24.99,'Education','2025-10-15','React advanced'),(15,'Rent',1400,'Housing','2025-11-01','Monthly rent'),(18,'Test coffee',5.5,'Food','2025-11-10','Test'),(19,'Food at Antera',12,'Food','2026-04-05','I ate biryani at Antera. it was 12 dollars'),(20,'Grocery',12,'Shopping','2026-04-05','Coles'),(21,'Rent',500,'Housing','2026-04-05','');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-06  2:08:01
