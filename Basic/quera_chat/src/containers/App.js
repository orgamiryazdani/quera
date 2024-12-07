import React, { useState } from 'react';
import MessageForm from '../components/MessageForm/MessageForm';
import MessageList from '../components/MessageList/MessageList';
import './App.css';

function App() {
  const [messages, setMessages] = useState([])

  const onMessageSend = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { me: "me", body: message }
    ]);
    try {
      const response = await fetch(`http://localhost:3001/message/${message}`);
      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { body: data.message }
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <MessageList messages={messages} />
      <MessageForm onMessageSend={onMessageSend} />
    </div>
  );
}

export default App;