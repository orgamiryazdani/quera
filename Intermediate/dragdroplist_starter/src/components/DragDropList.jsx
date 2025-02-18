import { useState } from 'react';

const DragDropList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  const [dragStartIndex, setDragStartIndex] = useState(null);

  const handleDragStart = (index) => {
    setDragStartIndex(index);
  };

  const handleDrop = (dropIndex) => {
    const newItems = [...items];
    const draggedItem = newItems[dragStartIndex];
    newItems.splice(dragStartIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <>
      <h1>DRAG AND DROP</h1>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DragDropList;