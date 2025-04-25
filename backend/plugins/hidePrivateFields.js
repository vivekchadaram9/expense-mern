function hidePrivateFields(schema, options) {
    const fieldsToHide = options?.fields || ['password'];
  
    schema.set('toJSON', {
      transform: (doc, ret) => {
        fieldsToHide.forEach(field => {
          delete ret[field];
        });
        return ret;
      }
    });
  
    schema.set('toObject', {
      transform: (doc, ret) => {
        fieldsToHide.forEach(field => {
          delete ret[field];
        });
        return ret;
      }
    });
  }
  
  module.exports = hidePrivateFields;
  