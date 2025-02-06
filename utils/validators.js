const isValidUrl = (url) => {
  const pattern =  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?$/;
  return pattern.test(url);
};


const isValidAlias = (alias) => /^[a-zA-Z0-9-]{5,15}$/.test(alias);

module.exports = {isValidUrl, isValidAlias};
