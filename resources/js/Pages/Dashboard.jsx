import { UserAddOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Input, Button, message } from 'antd';
import { useProffeseurs } from '@/network';
import { useEffect, useState } from 'react';
import TableProff from '@/Components/Table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Create from '@/Components/create';
import Delete from '@/Components/delete';
import Update from '@/Components/update';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip);
import { Pie } from 'react-chartjs-2';
export default function Dashboard({ auth }) {
    const [nameSearch, setNameSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [selectedProf, setSelectedProf] = useState({
        id: 0,
        numens: '',
        nom: '',
        nbheures: 0,
        tauxhoraire: 0,
    });

    const { //Les hooks pour intéragir avec la base de données
        proffeseurs,
        stats,
        createProffeseur,
        modifierProffeseur,
        deleteProffeseur,
    } = useProffeseurs(nameSearch);

    const handleCreateProf = async (value) => {
        try{
            await createProffeseur(value);
            messageAPI.success('Enseignant ajoute avec succes');
            setShowCreate(false);
        }catch(error){
            messageAPI.error('Une erreur est survenue: ' + error.message);
        }
    }
    const handleDeleteProf = async () => {
        try{
            await deleteProffeseur(selectedProf.id);
            messageAPI.success('Enseignant supprimé avec succes');
            setShowDelete(false);
        }catch(error){
            messageAPI.error('Une erreur est survenue: ' + error.message);
        }
    }   

    const handleUpdate = async (e) => {
        try{
            await modifierProffeseur({
                id: selectedProf.id,
                numens: e.numens,
                nom: e.nom,
                tauxhoraire: Number(e.tauxhoraire),
                nbheures: Number (e.nbheures)
            });
            messageAPI.success('Enseignant mis à jour avec succes');
            setShowUpdate(false);
        }catch(error){
            messageAPI.error('Une erreur est survenue: ' + error.message);
        }
    }

    const [messageAPI, contextHolder] = message.useMessage();

    useEffect(()=>{
        console.log (proffeseurs)
    }, [proffeseurs])

    return (
        <Authenticated>
            {contextHolder}
            <main className='w-full h-[100vh] flex gap-4 items-center p-4'>
                <div className='h-[85vh] bg-white w-[60%] rounded-xl p-8 shadow-2xl'>
                    <div className='flex gap-10 mb-4'>
                        <Input value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} className='rounded-lg' placeholder='Rechercher....' />
                        <Button onClick={()=>{setShowCreate(true)}} icon={<UserAddOutlined/>} type='primary' size='large'>Ajouter</Button>
                    </div>
                    <TableProff setOpenDelete={setShowDelete} setOpenUpdate={setShowUpdate} setProf={setSelectedProf} data={proffeseurs?.enseignants ?? []} />
                    <Delete isOpen={showDelete} onCancel={()=>{setShowDelete(false)}} onOk={handleDeleteProf} ></Delete>
                    <Create setProf={selectedProf} isOpen={showCreate} onOk={handleCreateProf} onCancel={() => setShowCreate(false)} />
                    <Update isOpen={showUpdate} onCancel={()=>{setShowUpdate(false)}} onOk={handleUpdate} prof={selectedProf}></Update>
                </div>
                <div className='flex flex-col gap-4 h-[85vh] w-[40%] rounded-xl'>
                    <div className='bg-white h-[28%] p-4 rounded-xl shadow-2xl'>
                        <h3 className='font-bold text-lg text-gray-500 mb-4'>
                            STATISTIQUE
                        </h3>
                        <div className='flex w-full justify-between'>
                            <span className='text-gray-500'>Salaire min: <span className='text-blue-500'>{stats?.salaire_minimal ?? 'aucun'}</span></span>
                            <span className='text-gray-500'>Salaire max: <span className='text-red-500'>{stats?.salaire_maximal ?? 'aucun'}</span></span>
                            <span className='text-gray-500'>Salaire total: <span className='text-yellow-500'>{stats?.montant_total_salaires ?? 'aucun'}</span></span>
                        </div>
                    </div>
                    <div className='bg-white flex items-center justify-center h-[80%] shadow-2xl     p-4 rounded-xl'>
                        <Pie
                            className='chart'
                            data={{
                                labels: proffeseurs?.enseignants.map (prof => prof.nom) ?? [],
                                datasets:[
                                    {
                                        data: proffeseurs?.enseignants.map(enseignant => Number(enseignant.salaire))?? [],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                           ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                           ],
                                        borderWidth: 1,

                                    }
                                ]
                            }}

                        >

                        </Pie>
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}
