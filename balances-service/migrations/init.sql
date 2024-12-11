CREATE TABLE IF NOT EXISTS balances (
  account_id UUID PRIMARY KEY,
  balance FLOAT NOT NULL
);

INSERT INTO balances (account_id, balance) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1000.00),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2000.00);