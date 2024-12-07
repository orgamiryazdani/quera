import { useState } from 'react';
import './MessageForm.css';

function MessageForm({ onMessageSend }) {
  const [message, setMessage] = useState('')

  function handleFormSubmit(event) {
    event.preventDefault();
    if (message.trim() !== '') {
      onMessageSend(message);
      setMessage('');
    }
  }

  return (
    <form
      className="MessageForm"
      onSubmit={handleFormSubmit}
      data-testid="submit-message"
    >
      <div className="input-container">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          data-testid="input-message"
          autoFocus
          type="text"
          placeholder="پیام خود را اینجا بنویسید..."
        />
      </div>
      <div className="button-container">
        <button type="submit">ارسال</button>
      </div>
    </form>
  );
}

export default MessageForm;