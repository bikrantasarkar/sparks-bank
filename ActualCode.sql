start transaction;
SELECT @x:=acc_balance FROM accounts WHERE id=?;
SELECT @y:=acc_balance FROM accounts WHERE id=?;

UPDATE accounts SET acc_balance = @x-? WHERE id=?;
UPDATE accounts SET acc_balance = @y+? WHERE id=?;

SELECT @n1:=name FROM accounts WHERE id=?;
SELECT @n2:=name FROM accounts WHERE id=?;
INSERT INTO transactions(tname1,tname2,tdate,tamount) VALUES(@n1,@n2,?,?);
commit;
