import { UserAddOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Input, Button, message } from 'antd';
import { useProffeseurs } from '@/network';
import { useEffect, useState } from 'react';
import TableProff from '@/Components/Table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import Create from '@/Components/create';
import Delete from '@/Components/delete';

export default function Dashboard({ auth }) {
    const [nameSearch, setNameSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [selectedProf, setSelectedProf] = useState({
        numens: '',
        nom: '',
        nbheures: 0,
        tauxhoraire: 0,
    });

    useEffect(()=>{
        console.log(selectedProf)
    }, [selectedProf])


    const { //Les hooks pour intéragir avec la base de données
        proffeseurs,
        isLoading,
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

    const [messageAPI, contextHolder] = message.useMessage();

    return (
        <Authenticated>
            {contextHolder}
            <main className='w-full h-[100vh] flex items-center p-4'>
                <div className='h-[85vh] bg-white w-[60%] rounded-xl p-8 shadow-2xl'>
                    <div className='flex gap-10 mb-4'>
                        <Input value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} className='rounded-lg' placeholder='Rechercher....' />
                        <Button onClick={()=>{setShowCreate(true)}} icon={<UserAddOutlined/>} type='primary' size='large'>Ajouter</Button>
                    </div>
                    <TableProff setOpenDelete={setShowDelete} setOpenUpdate={setShowUpdate} setProf={setSelectedProf} data={proffeseurs?.enseignants ?? []} />
                    <Delete isOpen={showDelete} onCancel={()=>{setShowDelete(false)}} onOk={handleDeleteProf} ></Delete>
                    <Create setProf={selectedProf} isOpen={showCreate} onOk={handleCreateProf} onCancel={() => setShowCreate(false)} />
                </div>
            </main>
        </Authenticated>
    );
}
