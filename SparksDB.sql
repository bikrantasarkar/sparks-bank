CREATE DATABASE Sparks;
USE Sparks;

-- to store the user account information
CREATE TABLE `accounts`(
`id` int(11) AUTO_INCREMENT,
`name` VARCHAR(100) ,
`date_registered` DATETIME ,
`acc_balance` INT(11),
PRIMARY KEY(`id`)
);

-- to store the transaction history
CREATE TABLE `transactions`(
`tid` int(11) AUTO_INCREMENT,
`tname1` VARCHAR(100) ,
`tname2` VARCHAR(100) ,
`tdate` DATETIME ,
`tamount` INT(11),
PRIMARY KEY(`tid`)
);

DESC accounts;
SELECT * FROM accounts;
DESC transactions;
SELECT * FROM transactions;
TRUNCATE TABLE transactions;


-- Transaction used in nodejs code
start transaction;
SELECT @x:=acc_balance FROM accounts WHERE id=?;
SELECT @y:=acc_balance FROM accounts WHERE id=?;

UPDATE accounts SET acc_balance = @x-? WHERE id=?;
UPDATE accounts SET acc_balance = @y+? WHERE id=?;

SELECT @n1:=name FROM accounts WHERE id=?;
SELECT @n2:=name FROM accounts WHERE id=?;
INSERT INTO transactions(tname1,tname2,tdate,tamount) VALUES(@n1,@n2,?,?);
commit;