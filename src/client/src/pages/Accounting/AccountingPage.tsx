import React, { useState } from 'react';

const AccountingPage: React.FC = () => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // 預設為今天日期
  const [splitters, setSplitters] = useState([{ name: '', amount: '' }]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('飲食'); // 預設分類
  const [note, setNote] = useState(''); // 備註欄位

  const handleAddSplitter = () => {
    setSplitters([...splitters, { name: '', amount: '' }]);
  };

  const handleSplitterChange = (index: number, field: string, value: string) => {
    const updatedSplitters = splitters.map((splitter, i) =>
      i === index ? { ...splitter, [field]: value } : splitter
    );
    setSplitters(updatedSplitters);
  };

  const handleSubmit = () => {
    const transactionData = {
      payer,
      amount,
      date,
      splitters,
      description,
      category,
      note,
    };
    console.log('Transaction Data:', transactionData);
    alert('Transaction Submitted!');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">新增交易</h2>

      {/* 輸入金額 */}
      <div className="mb-3">
        <label className="form-label">金額</label>
        <input
          type="number"
          className="form-control"
          placeholder="輸入金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* 輸入帳務名稱 */}
      <div className="mb-3">
        <label className="form-label">帳務名稱</label>
        <input
          type="text"
          className="form-control"
          placeholder="輸入帳務名稱"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* 選擇日期 */}
      <div className="mb-3">
        <label className="form-label">日期</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* 選擇分類 */}
      <div className="mb-3">
        <label className="form-label">分類</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="飲食">飲食</option>
          <option value="服飾">服飾</option>
          <option value="交通">交通</option>
          <option value="娛樂">娛樂</option>
          <option value="其他">其他</option>
        </select>
      </div>

      {/* 輸入付款人 */}
      <div className="mb-3">
        <label className="form-label">付款人</label>
        <input
          type="text"
          className="form-control"
          placeholder="輸入付款人姓名"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
      </div>

      {/* 分帳者 */}
      <div className="mb-3">
        <label className="form-label">分帳者</label>
        {splitters.map((splitter, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="姓名"
              value={splitter.name}
              onChange={(e) =>
                handleSplitterChange(index, 'name', e.target.value)
              }
            />
            <input
              type="number"
              className="form-control me-2"
              placeholder="金額"
              value={splitter.amount}
              onChange={(e) =>
                handleSplitterChange(index, 'amount', e.target.value)
              }
            />
          </div>
        ))}
        <button
          className="btn btn-outline-primary"
          onClick={handleAddSplitter}
        >
          新增分帳者
        </button>
      </div>

      {/* 備註欄位 */}
      <div className="mb-3">
        <label className="form-label">備註</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="輸入備註"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>

      {/* 確認按鈕 */}
      <button className="btn btn-success w-100" onClick={handleSubmit}>
        確認
      </button>
    </div>
  );
};

export default AccountingPage;

