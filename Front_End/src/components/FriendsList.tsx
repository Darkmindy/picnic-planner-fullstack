import React, { useState } from 'react';

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<string[]>([]);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    setFriends([...friends, newFriend]);
    setNewFriend('');
  };

  return (
    <div className="friends-list">
      <h2>Invita amici</h2>
      <input 
        type="text" 
        value={newFriend} 
        onChange={(e) => setNewFriend(e.target.value)} 
        placeholder="Aggiungi un amico"
      />
      <button onClick={addFriend}>Aggiungi</button>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
