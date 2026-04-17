import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { api } from '../../../utils/api';

const topics = ['AI & Cognition', 'Data Science', 'Cybersecurity', 'Renewable Energy', 'Health Technology'];

const SpeakerHub = () => {
  const [speakers, setSpeakers] = useState([]);
  useEffect(() => {
    const loadSpeakers = async () => {
      try {
        const data = await api.get('/api/speakers');
        setSpeakers((data || []).map((s) => ({
          id: s.id,
          name: s.name,
          title: s.academicTitle || '',
          affiliation: s.affiliation || '',
          topic: s.scientificTheme || '',
          bio: s.biography || '',
          photo: s.photoUrl || null,
          visibility: typeof s.visibility === 'boolean' ? s.visibility : true,
          agendaSlots: [],
          paperTitle: '',
        })));
      } catch (error) {
        alert(error.message);
      }
    };
    loadSpeakers();
  }, []);

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

  const saveSpeaker = async () => {
    const newSpeaker = {
      id: editingSpeaker ? editingSpeaker.id : Date.now(),
      ...formData,
      agendaSlots: editingSpeaker?.agendaSlots || [],
      paperTitle: editingSpeaker?.paperTitle || '',
    };
    const payload = {
      name: formData.name,
      academicTitle: formData.title,
      affiliation: formData.affiliation,
      scientificTheme: formData.topic,
      biography: formData.bio,
      photoUrl: photoPreview || '',
      visibility: formData.visibility,
    };
    try {
      if (editingSpeaker) {
        await api.put(`/api/speakers/${editingSpeaker.id}`, payload);
        setSpeakers(speakers.map(s => s.id === editingSpeaker.id ? { ...newSpeaker, ...payload } : s));
      } else {
        const created = await api.post('/api/speakers', payload);
        setSpeakers([...speakers, {
          id: created.id,
          name: created.name,
          title: created.academicTitle || '',
          affiliation: created.affiliation || '',
          topic: created.scientificTheme || '',
          bio: created.biography || '',
          photo: created.photoUrl || null,
          visibility: created.visibility,
          agendaSlots: [],
          paperTitle: '',
        }]);
      }
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteSpeaker = async (id) => {
    if (window.confirm('Delete this speaker?')) {
      try {
        await api.delete(`/api/speakers/${id}`);
        setSpeakers(speakers.filter(s => s.id !== id));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const toggleVisibility = async (id) => {
    const speaker = speakers.find((s) => s.id === id);
    if (!speaker) return;
    const next = !speaker.visibility;
    try {
      await api.put(`/api/speakers/${id}`, { visibility: next });
      setSpeakers(speakers.map(s => s.id === id ? { ...s, visibility: next } : s));
    } catch (error) {
      alert(error.message);
    }
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