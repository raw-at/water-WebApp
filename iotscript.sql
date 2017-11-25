CREATE TABLE `appStats`.`water` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `appartmentId` INT NULL,
  `timestamp` VARCHAR(45) NULL,
  `liters` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `appStats`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `appartmentId` INT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  `startdate` DATE NULL,
  `enddate` DATE NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `appStats`.`tank` (
  `timestamp` DATE NULL,
  `liters` VARCHAR(45) NULL);



