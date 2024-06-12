import React, { useState } from 'react';
import './MenuPlanner.css';

const MenuPlanner: React.FC = () => {
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setMenuItems([...menuItems, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const editItem = (index: number) => {
    setIsEditing(index);
    setEditedItem(menuItems[index]);
  };

  const saveEdit = () => {
    if (isEditing !== null && editedItem.trim() !== '') {
      const updatedItems = [...menuItems];
      updatedItems[isEditing] = editedItem;
      setMenuItems(updatedItems);
      setIsEditing(null);
      setEditedItem('');
    }
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
          <li key={index}>
            {isEditing === index ? (
              <>
                <input 
                  type="text" 
                  value={editedItem} 
                  onChange={(e) => setEditedItem(e.target.value)} 
                />
                <button onClick={saveEdit}>Salva</button>
                <button onClick={() => setIsEditing(null)}>Annulla</button>
              </>
            ) : (
              <>
                {item}
                <button onClick={() => editItem(index)}>Modifica</button>
                <button onClick={() => removeItem(index)}>Rimuovi</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPlanner;
