import React from 'react';

interface DeleteConfirmationProps {
  show: boolean;
  friendName: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  show,
  friendName,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null; // Only render when `show` is true

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">確認刪除</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>確定要刪除好友 <strong>{friendName}</strong> 嗎？</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              取消
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
