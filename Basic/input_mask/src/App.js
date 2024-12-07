import React, { useState } from 'react';
import Input from './Input';
import city from "./cities.json";

function App() {
   const [hint, setHint] = useState('');

   const handleChange = (e) => {
      const value = e.target.value;
      const result = city.filter((item) => item.startsWith(value));
      if (result.length > 0) {
         setHint(result);
      } else {
         setHint('');
      }
      if (value === "") setHint('');
   }

   return (
      <div>
         <Input handleChange={handleChange} hint={hint} />
      </div>
   )
}

export default App;
