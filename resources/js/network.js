import { useMutation, useQueryClient, useQuery } from 'react-query';
import * as api from './api'; // Vos fonctions API

export function useProffeseurs(name = '') {
    const queryClient = useQueryClient();

    const { mutateAsync: createProffeseur } = useMutation(api.createProffeseur, {
        onSuccess: () => {
            queryClient.invalidateQueries('proffeseurs');
        },
    });

    const { mutateAsync: modifierProffeseur } = useMutation(api.modifierProffeseur, {
        onSuccess: () => {
            queryClient.invalidateQueries('proffeseurs');
        },
    });

    const { mutateAsync: deleteProffeseur } = useMutation(api.deleteProffesseur, {
        onSuccess: () => {
            queryClient.invalidateQueries('proffeseurs');
        },
    });

    const { data: proffeseurs, isLoading } = useQuery(['proffeseurs', name], () => api.getProffeseur(name), {
        staleTime: 1000 * 5
    });

    return {
        proffeseurs,
        isLoading,
        createProffeseur,
        modifierProffeseur,
        deleteProffeseur,
    };
}
