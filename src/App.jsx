import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from './store';
import { fetchCharacters } from './api';
import { useDebounce } from 'use-debounce';

function App() {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const status = useSearchStore((state) => state.status)
  const setStatus = useSearchStore((state) => state.setStatus)

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', debouncedQuery, status],
    queryFn: () => fetchCharacters(debouncedQuery, status),
  });

  const options = [
    { value: 'Alive', label: 'Alive' },
    { value: 'Dead', label: 'Dead' },
    { value: 'unknown', label: 'unkown' },
  ]



  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Rick and Morty Explorer</h1>

      <input
        type='text'
        placeholder='Search character...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px', fontSize: '16px' }}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value=''>All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
          {opt.label}
          </option>
        ))}
      </select>

      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred...</p>}

      <div style={{ display: 'grid', gap: '10px' }}>
        {data?.results?.map((character) => (
          <div key={character.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <strong>{character.name}</strong> - {character.species}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;