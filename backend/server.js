const express = require('express');
const cors = require('cors');
const {
  nowIso,
  generateId,
  speakers,
  speakerProfiles,
  submissions,
  registrations,
  agenda,
  contactMessages,
  themeRequests,
  activityLogs,
  committeeMembers,
  aboutData,
} = require('./mock/store');
const { findIndexById, findSubmissionByAuthorEmail } = require('./mock/helpers');

const app = express();

// Middlewares pour lire le JSON et autoriser le Frontend (React)
app.use(express.json());
app.use(cors());

// --- MODE DUMMY (SANS BASE DE DONNEES) ---

// --- ROUTES POUR LES SPEAKERS (Experts) ---

// GET : Récupérer tous les speakers ou filtrer par pays/thème [cite: 27]
app.get('/api/speakers', (req, res) => {
  const { country, theme } = req.query;
  const filtered = speakers.filter((sp) => {
    const byCountry = country ? sp.country === country : true;
    const byTheme = theme ? sp.scientificTheme === theme : true;
    return byCountry && byTheme;
  });
  res.json(filtered);
});

app.post('/api/speakers', (req, res) => {
  const payload = req.body || {};
  const speaker = {
    id: generateId('sp'),
    name: payload.name || 'Unnamed Speaker',
    academicTitle: payload.academicTitle || '',
    affiliation: payload.affiliation || '',
    scientificTheme: payload.scientificTheme || '',
    biography: payload.biography || '',
    photoUrl: payload.photoUrl || '',
    country: payload.country || 'Algeria',
    province: payload.province || '',
    visibility: typeof payload.visibility === 'boolean' ? payload.visibility : true,
  };
  speakers.unshift(speaker);
  res.status(201).json(speaker);
});

app.put('/api/speakers/:id', (req, res) => {
  const idx = findIndexById(speakers, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Speaker introuvable' });
  speakers[idx] = { ...speakers[idx], ...req.body };
  res.json(speakers[idx]);
});

app.delete('/api/speakers/:id', (req, res) => {
  const idx = findIndexById(speakers, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Speaker introuvable' });
  speakers.splice(idx, 1);
  res.json({ message: 'Speaker supprime' });
});

// GET : Récupérer un speaker public par email
app.get('/api/speakers/:email', (req, res) => {
  const profile = speakerProfiles.find((sp) => sp.email === req.params.email);
  if (!profile) return res.status(404).json({ message: 'Speaker non trouvé' });
  res.json(profile);
});

// --- ROUTES POUR LES SUBMISSIONS (Recherche) ---

// POST : Envoyer un nouveau papier de recherche [cite: 26]
app.post('/api/submit-paper', (req, res) => {
  const payload = req.body || {};
  const newSubmission = {
    id: generateId('sub'),
    paperTitle: payload.paperTitle || 'Untitled',
    abstract: payload.abstract || '',
    authors: payload.authors || [],
    track: payload.track || 'General',
    reviewer: '',
    fileName: payload.fileName || '',
    status: 'Pending',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  submissions.unshift(newSubmission);
  res.status(201).json({ message: 'Votre papier a ete soumis avec succes !', submission: newSubmission });
});

// POST : Soumettre un talk (version dashboard speaker)
app.post('/api/talks', (req, res) => {
  const { talkTitle, abstract, category, fileName, speakerEmail } = req.body || {};
  const submission = {
    id: generateId('sub'),
    paperTitle: talkTitle || 'Untitled Talk',
    abstract: abstract || '',
    track: category || 'General',
    authors: [{ name: speakerEmail || 'Speaker', email: speakerEmail || 'unknown@speaker.local' }],
    fileName: fileName || '',
    reviewer: '',
    status: 'Pending',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  submissions.unshift(submission);
  res.status(201).json({ message: 'Talk soumis avec succes', submission });
});

// GET : Suivi du statut d'un papier pour un auteur [cite: 38]
app.get('/api/track-paper/:email', (req, res) => {
  const paper = findSubmissionByAuthorEmail(submissions, req.params.email);
  if (!paper) return res.status(404).json({ message: 'Aucun papier trouve pour cet email' });
  res.json(paper);
});

// GET : Liste de soumissions (admin)
app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

// PATCH : Mise à jour du statut/reviewer d'une soumission
app.patch('/api/submissions/:id', (req, res) => {
  const { status, reviewer } = req.body || {};
  const idx = findIndexById(submissions, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Soumission introuvable' });
  submissions[idx] = { ...submissions[idx], ...(status ? { status } : {}), ...(reviewer ? { reviewer } : {}), updatedAt: nowIso() };
  res.json(submissions[idx]);
});

// --- ROUTES POUR LES REGISTRATIONS (Inscriptions) ---

// POST : Inscription d'un participant [cite: 26]
app.post('/api/register', (req, res) => {
  const { fullName, email, affiliation, institution, role } = req.body || {};
  const exists = registrations.some((item) => item.email === email);
  if (exists) return res.status(400).json({ error: 'Erreur : Cet email est peut-etre deja inscrit.' });
  registrations.push({
    id: generateId('reg'),
    fullName: fullName || 'Unknown',
    email: email || '',
    institution: institution || affiliation || '',
    role: role || 'Participant',
    hasAttended: false,
    registrationDate: nowIso(),
  });
  res.status(201).json({ message: 'Inscription a la conference reussie !' });
});

// POST : Candidature comité
app.post('/api/committee-applications', (req, res) => {
  const { fullName, email, organization } = req.body || {};
  registrations.push({
    id: generateId('reg'),
    fullName: fullName || 'Unknown',
    email: email || '',
    institution: organization || '',
    role: 'CommitteeApplicant',
    hasAttended: false,
    registrationDate: nowIso(),
  });
  res.status(201).json({ message: 'Candidature comite envoyee avec succes' });
});

app.get('/api/registrations', (req, res) => {
  const { role } = req.query;
  if (!role) return res.json(registrations);
  return res.json(registrations.filter((item) => item.role === role));
});

app.patch('/api/registrations/:id', (req, res) => {
  const idx = findIndexById(registrations, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Inscription introuvable' });
  registrations[idx] = { ...registrations[idx], ...req.body };
  res.json(registrations[idx]);
});

// GET : Committee member directories (dummy data)
app.get('/api/committee-members', (req, res) => {
  res.json(committeeMembers);
});

// GET : About page dummy data
app.get('/api/about-info', (req, res) => {
  res.json(aboutData);
});

// POST : Création d'un compte speaker
app.post('/api/speaker-register', (req, res) => {
  const incoming = req.body || {};
  const exists = speakerProfiles.some((profile) => profile.email === incoming.email);
  if (exists) return res.status(400).json({ error: 'Speaker deja inscrit' });
  const profile = { ...incoming };
  speakerProfiles.push(profile);
  res.status(201).json({ message: 'Compte speaker cree', profile });
});

// POST : Auth speaker simple (MVP)
app.post('/api/speaker-login', (req, res) => {
  const { email, password } = req.body || {};
  const profile = speakerProfiles.find((sp) => sp.email === email && sp.password === password);
  if (!profile) return res.status(401).json({ message: 'Identifiants invalides' });
  res.json({ message: 'Connexion reussie', profile });
});

// GET : Profil speaker par email
app.get('/api/speaker-profile/:email', (req, res) => {
  const profile = speakerProfiles.find((sp) => sp.email === req.params.email);
  if (!profile) return res.status(404).json({ message: 'Profil introuvable' });
  res.json(profile);
});

// PUT : Mise à jour profil speaker
app.put('/api/speaker-profile/:email', (req, res) => {
  const idx = speakerProfiles.findIndex((sp) => sp.email === req.params.email);
  if (idx === -1) {
    const profile = { email: req.params.email, ...req.body };
    speakerProfiles.push(profile);
    return res.json({ message: 'Profil mis a jour', profile });
  }
  speakerProfiles[idx] = { ...speakerProfiles[idx], ...req.body };
  res.json({ message: 'Profil mis a jour', profile: speakerProfiles[idx] });
});

// --- ROUTES POUR L'AGENDA (Programme) ---

// GET : Récupérer tout le programme de la conférence [cite: 27]
app.get('/api/agenda', (req, res) => {
  res.json(agenda);
});

app.post('/api/agenda', (req, res) => {
  const payload = req.body || {};
  const item = {
    id: generateId('ag'),
    timeSlot: payload.timeSlot || 'TBD',
    sessionTitle: payload.sessionTitle || 'Untitled session',
    location: payload.location || 'Main Hall',
    speakerId: payload.speakerId || '',
    dateLabel: payload.dateLabel || 'TBD',
    theme: payload.theme || '',
    day: payload.day || 1,
    isLive: Boolean(payload.isLive),
  };
  agenda.unshift(item);
  res.status(201).json(item);
});

app.put('/api/agenda/:id', (req, res) => {
  const idx = findIndexById(agenda, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Session introuvable' });
  agenda[idx] = { ...agenda[idx], ...req.body };
  res.json(agenda[idx]);
});

app.delete('/api/agenda/:id', (req, res) => {
  const idx = findIndexById(agenda, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Session introuvable' });
  agenda.splice(idx, 1);
  res.json({ message: 'Session supprimee' });
});

// POST : Envoyer un message de contact
app.post('/api/contact-messages', (req, res) => {
  const newMsg = { id: generateId('msg'), ...req.body, status: 'Pending', createdAt: nowIso() };
  contactMessages.unshift(newMsg);
  res.status(201).json({ message: 'Message envoye avec succes', data: newMsg });
});

// GET : Inbox support (admin)
app.get('/api/contact-messages', (req, res) => {
  res.json(contactMessages);
});

// PATCH : Changer statut d'un message support
app.patch('/api/contact-messages/:id', (req, res) => {
  const idx = findIndexById(contactMessages, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Message introuvable' });
  contactMessages[idx] = { ...contactMessages[idx], status: req.body.status || contactMessages[idx].status };
  res.json(contactMessages[idx]);
});

// DELETE : Supprimer message support
app.delete('/api/contact-messages/:id', (req, res) => {
  const idx = findIndexById(contactMessages, req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Message introuvable' });
  contactMessages.splice(idx, 1);
  res.json({ message: 'Message supprime' });
});

// POST : Demande d'ajout de thème
app.post('/api/theme-requests', (req, res) => {
  const item = { id: generateId('th'), theme: req.body?.theme || '', createdAt: nowIso() };
  themeRequests.unshift(item);
  res.status(201).json({ message: 'Demande de theme envoyee', data: item });
});

// GET : Liste des thèmes demandés (admin)
app.get('/api/theme-requests', (req, res) => {
  res.json(themeRequests);
});

// GET : Journal d'activités (admin)
app.get('/api/activity-log', (req, res) => {
  res.json(activityLogs);
});

// GET : Rapports disponibles pour un speaker (MVP)
app.get('/api/reports/:email', (req, res) => {
  const report = submissions.find(
    (sub) => sub.status === 'Accepted' && sub.authors.some((author) => author.email === req.params.email)
  );
  if (!report) return res.json({ fileName: '', url: '', available: false });
  res.json({
    fileName: `${report.paperTitle.replace(/\s+/g, '_').toLowerCase()}_report.pdf`,
    url: '#',
    available: true,
  });
});

// --- LANCEMENT DU SERVEUR ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur SciConnect actif sur : http://localhost:${PORT}`);
});