export const fetchCharacters = async (name = '', status = '', page = 1) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&page=${page}`);
  
  if (!response.ok) {
    throw new Error('Occuried an error.');
  }
  return response.json();
};

export const fetchCharacterById = async (id) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  if(!response.ok) {
    throw new Error('Occuried an error.')
  }
  return response.json();
}