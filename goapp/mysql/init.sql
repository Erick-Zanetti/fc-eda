-- Criar tabelas
CREATE TABLE clients (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at DATE
);

CREATE TABLE accounts (
    id VARCHAR(36) PRIMARY KEY,
    client_id VARCHAR(36),
    balance INT,
    created_at DATE,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    account_id_from VARCHAR(36),
    account_id_to VARCHAR(36),
    amount INT,
    created_at DATE,
    FOREIGN KEY (account_id_from) REFERENCES accounts(id),
    FOREIGN KEY (account_id_to) REFERENCES accounts(id)
);

INSERT INTO clients (id, name, email, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'John Doe', 'john@j.com', CURDATE()),
('22222222-2222-2222-2222-222222222222', 'Jane Smith', 'jane@s.com', CURDATE());

INSERT INTO accounts (id, client_id, balance, created_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 1000, CURDATE()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 2000, CURDATE());
