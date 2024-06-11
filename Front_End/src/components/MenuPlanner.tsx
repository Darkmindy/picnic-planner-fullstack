import React, { useState } from 'react';

const MenuPlanner: React.FC = () => {
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    setMenuItems([...menuItems, newItem]);
    setNewItem('');
  };

  return (
    <div className="menu-planner">
      <h2>Pianifica il menù</h2>
      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="Aggiungi un elemento del menù"
      />
      <button onClick={addItem}>Aggiungi</button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPlanner;
