-- User 表：存儲使用者資訊
CREATE TABLE "User" (
    user_ID SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    pwd_hash VARCHAR(255) NOT NULL,
    credit_score INTEGER
);

-- Friend_List 表：存儲使用者之間的好友關係
CREATE TABLE Friend_List (
    list_ID SERIAL PRIMARY KEY,
    user_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
    friend_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
    nickname VARCHAR(100)
);

-- Category 表：存儲交易類別資訊
CREATE TABLE Category (
    category_ID SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

-- Transaction 表：存儲交易資訊
CREATE TABLE Transaction (
    transaction_ID SERIAL PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_ID INTEGER REFERENCES Category(category_ID) ON DELETE SET NULL,
    payer_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
	split_count INTEGER NOT NULL
);

-- Transaction_Debtor 關聯表：處理交易與債務人的多對多關係
CREATE TABLE Transaction_Debtor (
    transaction_ID INTEGER NOT NULL REFERENCES Transaction(transaction_ID) ON DELETE CASCADE,
    debtor_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    PRIMARY KEY (transaction_ID, debtor_ID)
);

-- Split 表：記錄更詳細的分帳資訊
CREATE TABLE Split (
    split_ID SERIAL PRIMARY KEY,
    transaction_ID INTEGER NOT NULL REFERENCES Transaction(transaction_ID) ON DELETE CASCADE,
    debtor_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
    payer_ID INTEGER NOT NULL REFERENCES "User"(user_ID) ON DELETE CASCADE,
	amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0)
);

