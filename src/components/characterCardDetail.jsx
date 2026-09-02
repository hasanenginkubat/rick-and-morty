import { useNavigate, useParams } from 'react-router-dom';
import { fetchCharacterById } from '@/api.js'
import { useQuery } from '@tanstack/react-query';



export const CharacterCardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: character, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacterById(id),
        enabled: !!id, 
    });

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div 
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row"
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 text-gray-700 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer hover:bg-red-500"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {isLoading && (
                    <div className="w-full h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                )}

                {isError && (
                    <div className="w-full p-12 text-center text-red-500 font-semibold">
                        Karakter yüklenirken bir hata oluştu.
                    </div>
                )}

                {character && (
                    <>
                        <div className="relative w-full md:w-1/2 h-72 md:h-auto">
                            <img 
                                src={character.image} 
                                alt={character.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md bg-white/90
                                    ${character.status === 'Alive' ? 'text-green-600' : 
                                      character.status === 'Dead' ? 'text-red-600' : 'text-gray-600'}`}>
                                    {character.status}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                                    {character.name}
                                </h2>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-xl">
                                        {character.species}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider rounded-xl">
                                        {character.gender}
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                                    <div>
                                        <span className="font-semibold text-gray-400 block text-xs uppercase tracking-wider">Origin</span>
                                        <span className="text-gray-800 font-medium text-base">{character.origin?.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-400 block text-xs uppercase tracking-wider">Last Known Location</span>
                                        <span className="text-gray-800 font-medium text-base">{character.location?.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-400 block text-xs uppercase tracking-wider">Episodes Count</span>
                                        <span className="text-gray-800 font-medium text-base">{character.episode?.length} Episodes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default CharacterCardDetail;