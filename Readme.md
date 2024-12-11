# Wallet Service - API Testing Guide

This guide provides step-by-step instructions to run and test the Wallet Service API. It covers how to create clients, accounts, make transactions, and query balances.

---

## **1. Prerequisites**

Ensure you have the following installed:

- **Docker** and **Docker Compose**
- An API testing tool, such as **Postman**, **Insomnia**, or a text editor plugin like `REST Client` for VSCode.

---

## **2. Setup**

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   cd <PROJECT_NAME>
   ```

2. Start all services with Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Wait until all services are running. You should see logs indicating that the servers are up.

---

## **3. Preloaded Data**

The system comes preloaded with the following data:

### **Clients and Accounts**

| **Client ID**                          | **Name**     | **Email**       |
| -------------------------------------- | ------------ | --------------- |
| `11111111-1111-1111-1111-111111111111` | John Doe     | <john@j.com>    |
| `22222222-2222-2222-2222-222222222222` | Jane Smith   | <<jane@s.co>      |

| **Account ID**                         | **Client ID**                          | **Initial Balance** |
| -------------------------------------- | -------------------------------------- | ------------------- |
| `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` | `11111111-1111-1111-1111-111111111111` | `1000`              |
| `bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb` | `22222222-2222-2222-2222-222222222222` | `2000`              |

---

## **4. API Endpoints**

### **Create a Client**

- **Endpoint**: `POST /clients`
- **Request**:

    ```http
    POST http://localhost:3002/clients
    Content-Type: application/json

    {
        "name": "John Doe",
        "email": "john@j.com"
    }
    ```

- **Response**:

    ```json
    {
        "ID": "client-uuid"
    }
    ```

### **Create an Account**

Use the client ID returned from the `/clients` endpoint to create an account.

- **Endpoint**: `POST /accounts`
- **Request**:

    ```http
    POST http://localhost:3002/accounts
    Content-Type: application/json

    {
        "client_id": "client-uuid"
    }
    ```

- **Response**:

    ```json
    {
        "ID": "account-uuid"
    }
    ```

### **Make a Transaction**

To perform a transaction, specify the source account (`account_id_from`), destination account (`account_id_to`), and the amount to transfer.

- **Endpoint**: `POST /transactions`
- **Request**:

    ```http
    POST http://localhost:3002/transactions
    Content-Type: application/json

    {
        "account_id_from": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "account_id_to": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        "amount": 100
    }
    ```

- **Response**:

    ```json
    {
        "status": "success"
    }
    ```

### **Query Account Balance**

You can query the balance of a specific account using its ID.

- **Endpoint**: `GET /balances/{account_id}`
- **Request**:

    ```http
    GET http://localhost:3003/balances/{account_id}
    ```

    Example:

    ```http
    GET http://localhost:3003/balances/bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb
    ```

- **Response**:

    ```json
    {
        "account_id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        "balance": 2000
    }
    ```

---

## **5. Full Workflow Example**

### **1. Create a Client**

Request:

```http
POST http://localhost:3002/clients
Content-Type: application/json

{
    "name": "Alice",
    "email": "alice@domain.com"
}
```

Response:

```json
{
    "ID": "abcd1234-abcd-1234-abcd-1234567890ab"
}
```

### **2. Create an Account**

Request:

```http
POST http://localhost:3002/accounts
Content-Type: application/json

{
    "client_id": "abcd1234-abcd-1234-abcd-1234567890ab"
}
```

Response:

```json
{
    "ID": "abcd5678-abcd-5678-abcd-1234567890ef"
}
```

### **3. Perform a Transaction**

Request:

```http
POST http://localhost:3002/transactions
Content-Type: application/json

{
    "account_id_from": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "account_id_to": "abcd5678-abcd-5678-abcd-1234567890ef",
    "amount": 500
}
```

Response:

```json
{
    "status": "success"
}
```

### **4. Query the Balance**

Request:

```http
GET http://localhost:3003/balances/abcd5678-abcd-5678-abcd-1234567890ef
```

Response:

```json
{
    "account_id": "abcd5678-abcd-5678-abcd-1234567890ef",
    "balance": 500
}
```

---

## **6. Important Notes**

- **Default IDs**: The system includes preloaded IDs:
  - Accounts: `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` and `bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb`
  - Use these IDs to skip creating clients and accounts if needed.

- **Initial Balance**: New accounts start with a balance of `0`. To transfer money from a new account, it must first receive funds from another account.

---

## **7. Running Tests**

Use the provided `.http` file or an API testing tool to test the endpoints.

1. Create a client.
2. Use the client ID to create an account.
3. Perform transactions between accounts.
4. Query account balances to verify updates.

If you encounter any issues, check the logs using:

```bash
docker-compose logs
```
