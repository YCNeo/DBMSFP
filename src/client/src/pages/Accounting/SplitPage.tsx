import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SplitDetails {
  payer: string;
  splitters: { name: string; amount: string }[];
  totalAmount: string;
  description: string;
  date: string;
}

const SplitPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactionDetails = location.state as SplitDetails;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-warning">Detail</h2>
      </div>

      {/* Group Name & Transaction Info */}
      <div className="mb-3 text-center">
        <div className="mb-1">GroupName-ChannelName</div>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div>
            <strong>{transactionDetails.date}</strong>
          </div>
          <div>
            <strong>${transactionDetails.totalAmount}</strong> {transactionDetails.description}
          </div>
        </div>
      </div>

      {/* Split Results */}
      <div className="mb-4">
        <h5>Split Result</h5>
        <div className="border p-3 rounded">
          {transactionDetails.splitters.map((splitter, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mb-3"
            >
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-secondary text-white text-center" style={{ width: '40px', height: '40px', lineHeight: '40px' }}>
                  {transactionDetails.payer}
                </div>
                <span className="ms-2">${splitter.amount}</span>
              </div>
              <div className="arrow text-warning">→</div>
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-secondary text-white text-center" style={{ width: '40px', height: '40px', lineHeight: '40px' }}>
                  {splitter.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="text-center mb-4">
        <button className="btn btn-warning px-4" onClick={() => navigate('/')}>
          Confirm
        </button>
      </div>

      {/* Search Section */}
      <div className="border-top pt-3">
        <p>搜尋分帳結果</p>
        <ul>
          <li>用 Transaction 的資料欄位查詢</li>
          <li>依 User 名稱查詢</li>
        </ul>
      </div>
    </div>
  );
};

export default SplitPage;

