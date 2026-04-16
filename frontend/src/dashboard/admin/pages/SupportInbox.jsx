import { useState } from 'react';
import { FaEnvelope, FaCheck, FaTrash, FaFlag, FaReply } from 'react-icons/fa';

const initialMessages = [
  { id: 1, name: 'Aymen Mohamed', email: 'aymen@example.com', subject: 'Registration problem', message: 'I cannot register for the conference. The button does nothing.', status: 'Pending', createdAt: '2026-04-15' },
  { id: 2, name: 'Ismail youcef', email: 'ycf@example.com', subject: 'Speaker application', message: 'When will I know if my speaker application is accepted?', status: 'Pending', createdAt: '2026-04-14' },
  { id: 3, name: 'Prof. Ahmed', email: 'ahmed@univ.dz', subject: 'Technical error', message: 'The program page is not loading properly on mobile.', status: 'Pending', createdAt: '2026-04-16' },
];

const priorityKeywords = ['problem', 'error', 'register', 'not working', 'bug', 'issue', 'cannot'];

const SupportInbox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState('all'); 

  const getPriority = (subject, message) => {
    const text = (subject + ' ' + message).toLowerCase();
    return priorityKeywords.some(keyword => text.includes(keyword));
  };

  const updateStatus = (id, newStatus) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status.toLowerCase() === filter;
  });

  return (
    <div className="support-inbox">
      <div className="support-header">
        <h2>Support Inbox</h2>
      </div>

      <div className="support-filters">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
        <button className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>Resolved</button>
        <button className={`filter-btn ${filter === 'spam' ? 'active' : ''}`} onClick={() => setFilter('spam')}>Spam</button>
      </div>

      <div className="support-table-container">
        <table className="support-table">
          <thead>
            <tr>
              <th>Priority</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map(msg => {
              const isPriority = getPriority(msg.subject, msg.message);
              return (
                <tr key={msg.id} className={isPriority ? 'priority-row' : ''}>
                  <td>{isPriority ? <FaFlag className="priority-icon" /> : '—'}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td className="message-cell">{msg.message}</td>
                  <td>{msg.createdAt}</td>
                  <td>
                    <select
                      className="status-select"
                      value={msg.status}
                      onChange={(e) => updateStatus(msg.id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Resolved</option>
                      <option>Spam</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="btn-reply" title="Quick Reply">
                      <FaReply /> Reply
                    </a>
                    <button className="btn-delete" onClick={() => deleteMessage(msg.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredMessages.length === 0 && (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportInbox;