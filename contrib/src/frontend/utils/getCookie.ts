export default (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop() || '';
    try {
      return part.split(';').shift() || '';
    } catch (error) {
      throw new Error('Error finding cookie');
    }
  } else {
    return '';
  }
};
