from database import Database  # 載入您的 Database 類別

def run_tests():
    # 連接到資料庫
    db = Database()
    db.connect()

    # 新增用戶
    first_user_id = db.add_user("Monkey", "monkey@example.com", "12345")
    second_user_id = db.add_user("Godton", "godton@example.com", "56789")
    print(f"新增使用者 ID: {first_user_id}")
    print(f"新增使用者 ID: {second_user_id}")

    # 獲取並打印使用者資料
    user_data = db.get_user_by_id(first_user_id)
    print("使用者資料:", user_data["name"], user_data["email"], user_data["pwd_hash"], user_data["credit_score"])

    # 更新信用積分
    new_credit_score = 100
    db.update_credit_score(first_user_id, new_credit_score)

    # 再次查詢並顯示更新後的資料
    updated_user_data = db.get_user_by_id(first_user_id)
    print("更新後的資料:", updated_user_data["name"], updated_user_data["email"], updated_user_data["credit_score"])

    # 創建好友關係
    friend_list_id = db.create_friend(first_user_id, second_user_id, "PigPigBaby")
    print(f"新增好友關係 ID: {friend_list_id}")

    # 查詢用戶的所有好友
    friends = db.get_friends_by_user_id(first_user_id)
    print(f"用戶 ID {first_user_id} 的所有好友：")
    for friend in friends:
        print(f"好友 ID: {friend['friend_id']}, 暱稱: {friend['nickname']}")

    # 刪除好友關係
   # db.delete_friend(friend_list_id)
    print(f"刪除好友關係 ID: {friend_list_id}")

    # 確認是否刪除成功，查詢該用戶的好友
   # friends_after_deletion = db.get_friends_by_user_id(first_user_id)
   # print(f"刪除好友後， 用戶 ID {first_user_id} 的所有好友：")
   # if not friends_after_deletion:
   #     print("無好友資料")
   # else:
   #     for friend in friends_after_deletion:
   #         print(f"好友 ID: {friend['friend_id']}, 暱稱: {friend['nickname']}")

    # 創建交易類別
    new_category_id = db.create_category("Food")
    print(f"新增交易類別 ID: {new_category_id}")

    # 創建交易
    new_transaction_id = db.create_transaction("Lunch", 100, "Lunch with friends", new_category_id, first_user_id, 2)
    print(f"新增交易 ID: {new_transaction_id}")

    # 查詢並顯示交易資訊
    transaction_data = db.get_transaction_by_id(new_transaction_id)
    if transaction_data:
        print(f"交易 ID: {transaction_data['transaction_id']}")
        print(f"物品: {transaction_data['item']}")
        print(f"金額: {transaction_data['amount']}")
        print(f"描述: {transaction_data['description']}")
        print(f"類別 ID: {transaction_data['category_id']}")
        print(f"付款人 ID: {transaction_data['payer_id']}")
        print(f"分帳數量: {transaction_data['split_count']}")
    else:
        print(f"未找到 ID 為 {new_transaction_id} 的交易")

    # 創建債務人
    db.create_transaction_debtor(new_transaction_id, first_user_id, 50)

    # 查詢交易的債務人
    debtors = db.get_debtors_by_transaction_id(new_transaction_id)
    for debtor in debtors:
        print(f"債務人 ID: {debtor['user_id']}, 姓名: {debtor['name']}, 金額: {debtor['amount']}")

    # 更新債務金額
    db.update_debt_amount(new_transaction_id, first_user_id, 75)

    # 查詢並顯示更新後的債務人資料
    updated_debtors = db.get_debtors_by_transaction_id(new_transaction_id)
    for debtor in updated_debtors:
        print(f"更新後的債務人 ID: {debtor['user_id']}, 姓名: {debtor['name']}, 金額: {debtor['amount']}")

    # 創建分帳
    new_split_id = db.create_split(new_transaction_id, first_user_id, first_user_id, 50)

    # 查詢並顯示分帳資料
    splits = db.get_splits_by_transaction_id(new_transaction_id)
    for split in splits:
        print(f"分帳 ID: {split['split_id']}, 交易 ID: {split['transaction_id']}, 債務人 ID: {split['debtor_id']}, 付款人 ID: {split['payer_id']}, 金額: {split['amount']}")

    # 更新分帳金額
    db.update_split_amount(new_transaction_id, first_user_id, 75)

    # 查詢並顯示更新後的分帳資料
    updated_splits = db.get_splits_by_transaction_id(new_transaction_id)
    for split in updated_splits:
        print(f"更新後的分帳 ID: {split['split_id']}, 交易 ID: {split['transaction_id']}, 債務人 ID: {split['debtor_id']}, 付款人 ID: {split['payer_id']}, 金額: {split['amount']}")

    # 清理資料：刪除分帳、債務人、交易、類別和使用者
   # db.delete_split(new_split_id)
   # db.delete_transaction_debtor(new_transaction_id, first_user_id)
   # db.delete_transaction(new_transaction_id)
   # db.delete_category(new_category_id)
   # db.delete_user(first_user_id)
   # db.delete_user(second_user_id)

    db.close()

if __name__ == "__main__":
    run_tests()
