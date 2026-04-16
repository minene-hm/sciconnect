import { useState } from 'react';
import { FaEdit, FaTrash, FaPlay, FaStop } from 'react-icons/fa';

const availableSpeakers = [
  { id: 1, name: 'Prof. Khadidja Minasseri' },
  { id: 2, name: 'Dr. Amine Bouzid' },
  { id: 3, name: 'Prof. Salah Bendjabo' },
  { id: 4, name: 'Dr. Fatima Zohra' },
];

const themes = ['AI & Cognition', 'Data Science', 'Cybersecurity', 'Renewable Energy', 'Health Technology'];

const initialSessions = {
  1: [
    { id: 1, timeStart: '09:00', timeEnd: '10:30', title: 'Keynote: Future of AI', speakerId: 1, theme: 'AI & Cognition', isLive: false },
    { id: 2, timeStart: '11:00', timeEnd: '12:30', title: 'Machine Learning Workshop', speakerId: 2, theme: 'Data Science', isLive: false },
  ],
  2: [
    { id: 3, timeStart: '09:00', timeEnd: '10:30', title: 'Quantum Computing', speakerId: 3, theme: 'Cybersecurity', isLive: false },
  ],
  3: [],
  4: [],
};

const AgendaEditor = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [sessions, setSessions] = useState(initialSessions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [emergencyAnnouncement, setEmergencyAnnouncement] = useState('');
  const [formData, setFormData] = useState({
    timeStart: '09:00',
    timeEnd: '10:30',
    title: '',
    speakerId: '',
    theme: themes[0],
  });

  const currentSessions = [...(sessions[activeDay] || [])].sort((a, b) => a.timeStart.localeCompare(b.timeStart));

  const openModal = (session = null) => {
    if (session) {
      setEditingSession(session);
      setFormData({
        timeStart: session.timeStart,
        timeEnd: session.timeEnd,
        title: session.title,
        speakerId: session.speakerId,
        theme: session.theme,
      });
    } else {
      setEditingSession(null);
      setFormData({
        timeStart: '09:00',
        timeEnd: '10:30',
        title: '',
        speakerId: '',
        theme: themes[0],
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveSession = () => {
    if (!formData.title || !formData.speakerId) {
      alert('Please fill all required fields');
      return;
    }
    const newSession = {
      id: editingSession ? editingSession.id : Date.now(),
      timeStart: formData.timeStart,
      timeEnd: formData.timeEnd,
      title: formData.title,
      speakerId: parseInt(formData.speakerId),
      theme: formData.theme,
      isLive: editingSession ? editingSession.isLive : false,
    };
    setSessions(prev => ({
      ...prev,
      [activeDay]: editingSession
        ? prev[activeDay].map(s => s.id === editingSession.id ? newSession : s)
        : [...(prev[activeDay] || []), newSession],
    }));
    closeModal();
  };

  const deleteSession = (id) => {
    if (window.confirm('Delete this session?')) {
      setSessions(prev => ({
        ...prev,
        [activeDay]: prev[activeDay].filter(s => s.id !== id),
      }));
    }
  };

  const toggleLiveStatus = (id) => {
    setSessions(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].map(s => ({
        ...s,
        isLive: s.id === id ? !s.isLive : false,
      })),
    }));
  };

  const getSpeakerName = (speakerId) => {
    const speaker = availableSpeakers.find(s => s.id === speakerId);
    return speaker ? speaker.name : 'Unknown';
  };

  return (
    <div className="agenda-editor">
      <div className="agenda-header">
        <h2>Agenda Editor</h2>
        <button className="btn-add-session" onClick={() => openModal()}>
          + Add Session
        </button>
      </div>

      <div className="emergency-announcement">
        <label>Emergency Announcement (shown on public Program page)</label>
        <input
          type="text"
          placeholder="e.g., Session moved to Room B"
          value={emergencyAnnouncement}
          onChange={(e) => setEmergencyAnnouncement(e.target.value)}
        />
      </div>

      <div className="agenda-day-tabs">
        {[1, 2, 3, 4].map(day => (
          <button
            key={day}
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            Day 0{day}
          </button>
        ))}
      </div>

      <div className="agenda-table-container">
        <table className="agenda-table">
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>Session Title</th>
              <th>Assigned Speaker</th>
              <th>Theme/Track</th>
              <th>Live</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-sessions">No sessions scheduled for this day.</td>
              </tr>
            ) : (
              currentSessions.map(session => (
                <tr key={session.id} className={session.isLive ? 'live-row' : ''}>
                  <td>{session.timeStart} – {session.timeEnd}</td>
                  <td>{session.title}</td>
                  <td>{getSpeakerName(session.speakerId)}</td>
                  <td>{session.theme}</td>
                  <td>
                    <button className="live-toggle" onClick={() => toggleLiveStatus(session.id)}>
                      {session.isLive ? <FaStop /> : <FaPlay />}
                      {session.isLive ? ' Live' : ' Set Live'}
                    </button>
                  </td>
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => openModal(session)}><FaEdit /></button>
                    <button className="delete-btn" onClick={() => deleteSession(session.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="agenda-modal-overlay" onClick={closeModal}>
          <div className="agenda-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSession ? 'Edit Session' : 'Add New Session'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveSession(); }}>
              <div className="form-group">
                <label>Start Time *</label>
                <input type="time" name="timeStart" value={formData.timeStart} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>End Time *</label>
                <input type="time" name="timeEnd" value={formData.timeEnd} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Session Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Speaker *</label>
                <select name="speakerId" value={formData.speakerId} onChange={handleInputChange} required>
                  <option value="">Select a speaker</option>
                  {availableSpeakers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Theme/Track</label>
                <select name="theme" value={formData.theme} onChange={handleInputChange}>
                  {themes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaEditor;