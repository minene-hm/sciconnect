import { useEffect, useState } from 'react';
import { FaEnvelope, FaCheck, FaTrash, FaFlag, FaReply } from 'react-icons/fa';
import { api } from '../../../utils/api';

const priorityKeywords = ['problem', 'error', 'register', 'not working', 'bug', 'issue', 'cannot'];

const SupportInbox = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await api.get('/api/contact-messages');
        setMessages(
          (data || []).map((msg) => ({
            ...msg,
            name: `${msg.firstName || ''} ${msg.lastName || ''}`.trim() || 'Anonymous',
            createdAt: (msg.createdAt || '').slice(0, 10),
          }))
        );
      } catch (error) {
        alert(error.message);
      }
    };
    loadMessages();
  }, []);

  const getPriority = (subject, message) => {
    const text = (subject + ' ' + message).toLowerCase();
    return priorityKeywords.some(keyword => text.includes(keyword));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/api/contact-messages/${id}`, { status: newStatus });
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/api/contact-messages/${id}`);
        setMessages(prev => prev.filter(msg => msg.id !== id));
      } catch (error) {
        alert(error.message);
      }
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