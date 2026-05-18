const mongoose = require("mongoose");

const isValidDocumentId = (id) => {
   return mongoose.Types.ObjectId.isValid(id);
} 

module.exports = isValidDocumentId;