// components/MessageItem.jsx
const MessageItem = ({ message }) => {
    return (
      <div className="message-item">
        {message.text && <p>{message.text}</p>}
        {message.image && <ChatImage src={message.image} alt="Chat image" />}
      </div>
    );
  };
  