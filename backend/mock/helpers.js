const findById = (collection, id) => collection.find((item) => item.id === id);

const findIndexById = (collection, id) => collection.findIndex((item) => item.id === id);

const findSubmissionByAuthorEmail = (submissions, email) =>
  submissions.find((sub) => sub.authors.some((author) => author.email === email));

module.exports = {
  findById,
  findIndexById,
  findSubmissionByAuthorEmail,
};
