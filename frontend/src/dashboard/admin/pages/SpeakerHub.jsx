import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

const initialSpeakers = [
  { id: 1, name: 'Prof. Khadidja Minasseri', title: 'Professor', affiliation: 'University of Blida', topic: 'AI & Cognition', bio: 'Expert in neural networks.', photo: null, visibility: true, agendaSlots: ['Day 1 - 9:00 AM'], paperTitle: 'Neural Architecture Search' },
  { id: 2, name: 'Dr. Amine Bouzid', title: 'Researcher', affiliation: 'USTHB', topic: 'Renewable Energy', bio: 'Solar energy specialist.', photo: null, visibility: false, agendaSlots: [], paperTitle: '' },
];

const topics = ['AI & Cognition', 'Data Science', 'Cybersecurity', 'Renewable Energy', 'Health Technology'];

const SpeakerHub = () => {
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [filterTopic, setFilterTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [formData, setFormData] = useState({
    name: '', title: '', affiliation: '', topic: '', bio: '', photo: null, visibility: true,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const filteredSpeakers = speakers.filter(speaker => {
    const matchTopic = filterTopic ? speaker.topic === filterTopic : true;
    const matchSearch = speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        speaker.affiliation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTopic && matchSearch;
  });

  const openModal = (speaker = null) => {
    if (speaker) {
      setEditingSpeaker(speaker);
      setFormData({
        name: speaker.name, title: speaker.title, affiliation: speaker.affiliation,
        topic: speaker.topic, bio: speaker.bio, photo: speaker.photo, visibility: speaker.visibility,
      });
      setPhotoPreview(speaker.photo);
    } else {
      setEditingSpeaker(null);
      setFormData({ name: '', title: '', affiliation: '', topic: '', bio: '', photo: null, visibility: true });
      setPhotoPreview(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      if (file) setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const saveSpeaker = () => {
    const newSpeaker = {
      id: editingSpeaker ? editingSpeaker.id : Date.now(),
      ...formData,
      agendaSlots: editingSpeaker?.agendaSlots || [],
      paperTitle: editingSpeaker?.paperTitle || '',
    };
    if (editingSpeaker) {
      setSpeakers(speakers.map(s => s.id === editingSpeaker.id ? newSpeaker : s));
    } else {
      setSpeakers([...speakers, newSpeaker]);
    }
    closeModal();
  };

  const deleteSpeaker = (id) => {
    if (window.confirm('Delete this speaker?')) setSpeakers(speakers.filter(s => s.id !== id));
  };

  const toggleVisibility = (id) => {
    setSpeakers(speakers.map(s => s.id === id ? { ...s, visibility: !s.visibility } : s));
  };

  return (
    <div className="speaker-hub">
      {/* Header */}
      <div className="speaker-hub-header">
        <h2>Speaker Hub</h2>
        <button className="btn-add-speaker" onClick={() => openModal()}>
          <FaPlus /> Add Speaker
        </button>
      </div>

      <div className="speaker-filters">
        <input
          type="text"
          placeholder="Search by name or institution..."
          className="speaker-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="speaker-filter" value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
          <option value="">All Topics</option>
          {topics.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="speaker-table-container">
        <table className="speaker-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Affiliation</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpeakers.map(speaker => (
              <tr key={speaker.id}>
                <td className="speaker-name">{speaker.name}</td>
                <td>{speaker.title}</td>
                <td>{speaker.affiliation}</td>
                <td>{speaker.topic}</td>
                <td>
                  <span className={`speaker-status-badge ${speaker.bio && speaker.photo ? 'speaker-status-complete' : 'speaker-status-missing'}`}>
                    {speaker.bio && speaker.photo ? 'Complete' : 'Missing Info'}
                  </span>
                </td>
                <td>
                  <button className="speaker-visibility-btn" onClick={() => toggleVisibility(speaker.id)}>
                    {speaker.visibility ? <FaEye className="visibility-visible" /> : <FaEyeSlash className="visibility-hidden" />}
                  </button>
                </td>
                <td className="speaker-actions">
                  <button className="speaker-action-btn speaker-edit" onClick={() => openModal(speaker)}>
                    <FaEdit />
                  </button>
                  <button className="speaker-action-btn speaker-delete" onClick={() => deleteSpeaker(speaker.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="speaker-modal-overlay" onClick={closeModal}>
          <div className="speaker-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); saveSpeaker(); }}>
              <div className="speaker-form-group">
                <label>Full Name *</label>
                <input name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="speaker-form-group">
                <label>Academic Title</label>
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Professor, Researcher, etc." />
              </div>
              <div className="speaker-form-group">
                <label>Affiliation (University/Lab)</label>
                <input name="affiliation" value={formData.affiliation} onChange={handleInputChange} />
              </div>
              <div className="speaker-form-group">
                <label>Scientific Theme</label>
                <select name="topic" value={formData.topic} onChange={handleInputChange} required>
                  {topics.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="speaker-form-group">
                <label>Biography</label>
                <textarea name="bio" rows="4" value={formData.bio} onChange={handleInputChange} />
              </div>
              <div className="speaker-form-group">
                <label>Photo Upload</label>
                <input type="file" accept="image/*" onChange={handleInputChange} />
                {photoPreview && <img src={photoPreview} alt="Preview" className="speaker-photo-preview" />}
              </div>
              <div className="speaker-form-group speaker-checkbox-group">
                <label>
                  <input type="checkbox" name="visibility" checked={formData.visibility} onChange={handleInputChange} />
                  Visible on website
                </label>
              </div>
              {editingSpeaker && (
                <>
                  <div className="speaker-form-group">
                    <label>Assigned Agenda Slots</label>
                    <div className="speaker-readonly-info">
                      {editingSpeaker.agendaSlots.length ? editingSpeaker.agendaSlots.join(', ') : 'None'}
                    </div>
                  </div>
                  <div className="speaker-form-group">
                    <label>Linked Paper</label>
                    <div className="speaker-readonly-info">{editingSpeaker.paperTitle || 'None'}</div>
                  </div>
                </>
              )}
              <div className="speaker-modal-actions">
                <button type="submit" className="speaker-modal-save">Save</button>
                <button type="button" className="speaker-modal-cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakerHub;