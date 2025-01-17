-- User 表：存儲使用者資訊
CREATE TABLE
    "user" (
        user_ID SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        pwd_hash VARCHAR(255) NOT NULL,
        credit_score INTEGER
    );

-- "friend_list" 表：存儲使用者之間的好友關係
CREATE TABLE
    "friend_list" (
        list_ID SERIAL PRIMARY KEY,
        user_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        friend_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        nickname VARCHAR(100),
        -- Constraint: Ensure no duplicate friendships between users
        CONSTRAINT unique_user_friend UNIQUE (user_ID, friend_ID),
        -- Constraint: Prevent users from adding themselves as a friend
        CONSTRAINT no_self_friendship CHECK (user_ID <> friend_ID)
    );

-- Category 表：存儲交易類別資訊
CREATE TABLE
    "category" (
        category_ID SERIAL PRIMARY KEY,
        category_name VARCHAR(50) NOT NULL
    );

-- Transaction 表：存儲交易資訊
CREATE TABLE
    "transaction" (
        transaction_ID SERIAL PRIMARY KEY,
        item VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
        description TEXT,
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category_ID INTEGER REFERENCES "category" (category_ID) ON DELETE SET NULL,
        payer_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        split_count INTEGER NOT NULL
    );

-- Transaction_Debtor 關聯表：處理交易與債務人的多對多關係
CREATE TABLE
    "transaction_debtor" (
        transaction_ID INTEGER NOT NULL REFERENCES "transaction" (transaction_ID) ON DELETE CASCADE,
        debtor_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
        PRIMARY KEY (transaction_ID, debtor_ID)
    );

-- Split 表：記錄更詳細的分帳資訊
CREATE TABLE
    "split" (
        split_ID SERIAL PRIMARY KEY,
        transaction_ID INTEGER NOT NULL REFERENCES "transaction" (transaction_ID) ON DELETE CASCADE,
        debtor_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        payer_ID INTEGER NOT NULL REFERENCES "user" (user_ID) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0)
    );

UPDATE "transaction" 
SET category_id = 1 -- 將所有 category_id 設置為 Food (ID: 1)
WHERE transaction_id = 1;

UPDATE "transaction" 
SET category_id = 2
WHERE transaction_id = 2;

UPDATE "transaction" 
SET category_id = 3
WHERE transaction_id = 3;

UPDATE "transaction" 
SET category_id = 4
WHERE transaction_id = 4;

UPDATE "transaction" 
SET category_id = 5
WHERE transaction_id = 5;
