import { useState, useEffect } from 'react';
import DonutChart3D from '../components/DonutChart3D';
import defaultAvatar from '../../../assets/profile.png';

const initialSpeaker = {
  email: 'minene-hm@gmail.com',
  firstName: 'minene',
  lastName: 'Hm',
  phone: '+213 555 123456',
  currentPosition: 'Professor',
  department: 'Computer Science',
  institution: 'University of Blida',
  institutionCountry: 'Algeria',
  educationLevel: 'PhD',
  biography: 'AI researcher with 10+ years of experience in machine learning and data science.',
  externalLinks: 'https://linkedin.com/in/minene-Hm',
  findOutHow: 'Social Media',
};

const totalFields = Object.keys(initialSpeaker).length;

const Profile = () => {
  const [speaker, setSpeaker] = useState(() => {
    const saved = localStorage.getItem('speakerData');
    return saved ? JSON.parse(saved) : initialSpeaker;
  });
  const [profileImage, setProfileImage] = useState(() => {
    const savedImage = localStorage.getItem('speakerImage');
    return savedImage || defaultAvatar;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...speaker });

  useEffect(() => {
    localStorage.setItem('speakerData', JSON.stringify(speaker));
  }, [speaker]);

  const completedFields = Object.values(speaker).filter(val => val && val.trim() !== '').length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('speakerImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSpeaker(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm({ ...speaker });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-card">
      <h2>My Profile</h2>
      <div className="card-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-image-upload">
          <label className="btn-primary" style={{ cursor: 'pointer' }}>
            Upload Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
          <small>Default image if none</small>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <DonutChart3D percentage={completionPercentage} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '1rem' }}>
        {!isEditing ? (
          <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          <>
            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>

      <div className="profile-grid">
        {Object.entries(isEditing ? editForm : speaker).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            {isEditing ? (
              key === 'biography' ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleEditChange}
                  rows="3"
                  className="editable-input"
                />
              ) : (
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleEditChange}
                  className="editable-input"
                />
              )
            ) : (
              <div className="profile-value">{value || '—'}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;