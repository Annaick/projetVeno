import axios from "axios";


export async function getProffeseur (name = ''){
    const professeurs = await axios.get(`/api/enseignants/salaire?name=${name}`);
    return professeurs.data;
}

export async function createProffeseur (data){
    const professeurs = await axios.post('/api/enseignant/ajouter', data);
    return professeurs.data;
}

export async function modifierProffeseur (id, data){
    const professeurs = await axios.put(`/api/enseignants/${id}`, data);
    return professeurs.data;
}

export async function deleteProffesseur (id){
    const professeurs = await axios.delete(`/api/enseignants/${id}`);
    return professeurs.data;
}

export async function afficherStatistiqueSalaires (){
    const stats = await axios.get('/api/enseignants/statistiques-salaires')
    return stats.data
}