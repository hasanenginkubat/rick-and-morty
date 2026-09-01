export const fetchCharacters = async (name = '', status = '') => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`);
  
  if (!response.ok) {
    throw new Error('API yanıt vermedi');
  }
  
  return response.json();
};