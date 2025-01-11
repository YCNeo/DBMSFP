from flask import Flask
from database import Database  # 引入 database.py

app = Flask(__name__)

# 創建 Database 實例
db = Database()

@app.route("/")
def home():
    # 連接資料庫
    db.connect()

    #CodeExample
    # 新增使用者
    user_id = db.add_user("Monkey", "monkey@example.com", "hashed_password")


    # 關閉資料庫連線
    db.close()

    return "Hello, Flask!"

if __name__ == "__main__":
    app.run(debug=True)
