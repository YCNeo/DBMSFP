import React, { useState } from 'react';
import FriendList from './FriendList';
import AddFriendModal from './AddFriend';
import DeleteConfirmation from './DeleteConfirmation';

interface Friend {
  username: string;
  nickname: string;
}

const FriendListPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null); // Track friend to delete

  const addFriend = (username: string, nickname: string) => {
    setFriends((prev) => [...prev, { username, nickname }]);
  };

  const deleteFriend = () => {
    if (friendToDelete) {
      setFriends((prev) =>
        prev.filter((friend) => friend.username !== friendToDelete.username)
      );
      setFriendToDelete(null); // Close confirmation modal
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-4">好友清單</h2> {/* Add margin-bottom */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowAddModal(true)}
      >
        新增好友
      </button>

      {friends.length === 0 ? (
        <p className="text-center text-muted">
          你還沒有好友 😢，快來新增一個吧！
        </p>
      ) : (
        <FriendList
          friends={friends}
          onDelete={(username) => {
            const friend = friends.find((f) => f.username === username);
            if (friend) setFriendToDelete(friend); // Show confirmation modal
          }}
        />
      )}

      <AddFriendModal
        show={showAddModal}
        onAdd={addFriend}
        onClose={() => setShowAddModal(false)}
      />

      <DeleteConfirmation
        show={!!friendToDelete}
        friendName={friendToDelete?.nickname}
        onConfirm={deleteFriend}
        onCancel={() => setFriendToDelete(null)}
      />
    </div>
  );
};

export default FriendListPage;
