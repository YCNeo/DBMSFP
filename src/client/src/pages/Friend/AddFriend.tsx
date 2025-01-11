import React, { useState } from 'react';

interface AddFriendModalProps {
  show: boolean;
  onAdd: (username: string, nickname: string) => void;
  onClose: () => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
  show,
  onAdd,
  onClose,
}) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  if (!show) return null;

  const handleAdd = () => {
    if (username.trim() && nickname.trim()) {
      onAdd(username.trim(), nickname.trim());
      setUsername('');
      setNickname('');
      onClose();
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">新增好友</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">使用者名稱</label>
              <input
                type="text"
                className="form-control"
                placeholder="輸入使用者名稱"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">暱稱</label>
              <input
                type="text"
                className="form-control"
                placeholder="輸入暱稱"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              關閉
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              新增
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
