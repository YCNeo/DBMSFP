import React from 'react';

interface Friend {
  username: string;
  nickname: string;
}

interface FriendListProps {
  friends: Friend[];
  onDelete: (username: string) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onDelete }) => {
  return (
    <ul className="list-group">
      {friends.map((friend) => (
        <li
          key={friend.username}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div style={{ flex: 1 }}>
            <strong className="d-block">{friend.nickname}</strong>
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
              @{friend.username}
            </span>
          </div>
          <button
            className="btn btn-danger btn-sm"
            style={{ marginLeft: '200px' }} // spacing between Uname and delete button
            onClick={() => onDelete(friend.username)}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
