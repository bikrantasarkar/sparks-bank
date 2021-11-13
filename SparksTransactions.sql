-- setting  autocommit to OFF ,we will do manual commmit
SET autocommit=0;
USE Sparks;
-- id1,id2,amt,id1,amt,id2,id1,id2,date
-- Bank transfer transaction
start transaction;
-- Stores initial values of sender and recipient
SELECT @x:=acc_balance FROM accounts WHERE id=5;
SELECT @y:=acc_balance FROM accounts WHERE id=7;

-- Updates sender and recipient's balance in 'accounts' Table
UPDATE accounts
SET acc_balance = @x+300
WHERE id=5;
UPDATE accounts
SET acc_balance = @y-300
WHERE id=7;

-- Entries for the transaction happened between sender and recipent stored in 'transactions' Table
SELECT @n1:=name FROM accounts WHERE id=5;
SELECT @n2:=name FROM accounts WHERE id=7;
INSERT INTO transactions(tname1,tname2,tdate,tamount)
VALUES(@n1,@n2,'2021-11-21',300);
commit;



-- code for nodejs backend:
-- 
start transaction;
-- Stores initial values of sender and recipient
SELECT @id1=5;
SELECT @id2=7;
SELECT @amt=300;
SELECT @x:=acc_balance FROM accounts WHERE id=@id1;
SELECT @y:=acc_balance FROM accounts WHERE id=@id2;

-- Updates sender and recipient's balance in 'accounts' Table
SELECT @a=@x+@amt;
SELECT @b= @y-@amt;
UPDATE accounts
SET acc_balance = @a
WHERE id=@id1;
UPDATE accounts
SET acc_balance =@b
WHERE id=@id2;

-- Entries for the transaction happened between sender and recipent stored in 'transactions' Table
SELECT @n1:=name FROM accounts WHERE id=@id1;
SELECT @n2:=name FROM accounts WHERE id=@id2;
INSERT INTO transactions(tname1,tname2,tdate,tamount)
VALUES(@n1,@n2,'2021-11-21',300);
commit;