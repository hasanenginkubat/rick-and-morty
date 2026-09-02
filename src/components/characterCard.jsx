import { useNavigate } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchStore } from '@/store';
import { fetchCharacters } from '@/api';
import { useDebounce } from 'use-debounce';

export const CharacterCard = () => {
    const navigate = useNavigate();

    const { searchQuery, setSearchQuery, status, setStatus, page, setPage } = useSearchStore()

    const [debouncedQuery] = useDebounce(searchQuery, 500);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['characters', debouncedQuery, status, page],
        queryFn: () => fetchCharacters(debouncedQuery, status, page),
        placeholderData: keepPreviousData,
    });

    const totalPages = data?.info?.pages || 1;

    const options = [
        { value: 'Alive', label: 'Alive' },
        { value: 'Dead', label: 'Dead' },
        { value: 'unknown', label: 'Unknown' }
    ];

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 font-sans'>
            <div className='max-w-7xl mx-auto'>

                <h1 className='text-4xl md:text-5xl font-light text-center mb-12 tracking-tight'>
                    Rick and Morty <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500'>Characters</span>
                </h1>

                <div className='flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-16'>
                    <input 
                        type='text'
                        placeholder='Search Character...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='flex-1 px-6 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder-gray-400 bg-white text-gray-700'        
                    />

                    <select 
                        onChange={(e) => setStatus(e.target.value)}
                        className='w-full md:w-48 px-6 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none bg-white text-gray-700 cursor-pointer transition-all'
                    >
                        <option value=''>All Status</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {isLoading && (
                    <div className='flex justify-center items-center py-20'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500'></div>
                    </div>
                )}
                {isError && (
                    <div className='text-center py-4 bg-red-50 text-red-600 rounded-xl border border-red-100 max-w-md mx-auto'>
                        An error ocurried...
                    </div>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {data?.results?.map((character) => (
                        <div
                            key={character.id} 
                            onClick={() => navigate(`/detail/${character.id}`)}
                            className='group flex flex-col bg-white border border-gray-100 rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer'
                        >
                            <div className='relative w-full aspect-square overflow-hidden rounded-3xl mb-5'>
                                <img 
                                    src={character.image} 
                                    alt={character.name}
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                                />
                                
                                <div className='absolute top-3 right-3'>
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md bg-white/90
                                        ${character.status === 'Alive' ? 'text-green-600' : 
                                          character.status === 'Dead' ? 'text-red-600' : 'text-gray-600'}`}>
                                        {character.status}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col flex-1 px-2 pb-2'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-3 line-clamp-1'>
                                    {character.name}
                                </h2>

                                <div className='flex flex-wrap gap-2 mb-6'>
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-xl">
                                        {character.species}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider rounded-xl">
                                        {character.gender}
                                    </span>
                                </div>

                                <div className='mt-auto pt-4 border-t border-gray-100'>
                                    {character.origin.name !== 'unknown' ? (
                                        <p className='text-sm text-gray-500 flex items-center gap-2'>
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className='truncate font-medium'>{character.origin.name}</span>
                                        </p>
                                    ) : (
                                        <p className='text-sm text-gray-400 italic'>Origin Unknown</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center items-center gap-4 mt-12 mb-8'>
                    <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className='px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
                    >
                        Previous
                    </button>
                    
                    <span className='text-gray-700 font-medium'>
                        Page <strong className='text-green-600'>{page}</strong> of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((old) => (data?.info?.next ? old + 1 : old))}
                        disabled={page === totalPages || !data?.info?.next}
                        className='px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'   
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};