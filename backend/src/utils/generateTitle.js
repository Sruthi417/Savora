const generateTitle = (message) => {
  const cleanedMessage = message.trim();

  if (cleanedMessage.length <= 40) {
    return cleanedMessage;
  }

  return `${cleanedMessage.slice(0, 40)}...`;
};

export default generateTitle;