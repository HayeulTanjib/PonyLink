const getExpiryDate = (value, unit) => {
  const expiryDate = new Date();

  switch (unit) {
    case 'seconds':
      expiryDate.setSeconds(expiryDate.getSeconds() + value);
      break;
    case 'minutes':
      expiryDate.setMinutes(expiryDate.getMinutes() + value);
      break;
    case 'hours':
      expiryDate.setHours(expiryDate.getHours() + value);
      break;
    case 'days':
      expiryDate.setDate(expiryDate.getDate() + value);
      break;

    default:
      throw new Error('Invalid time unit. Use seconds, minutes, hours, or days.');
  }

  return expiryDate;
};

module.exports = getExpiryDate;
