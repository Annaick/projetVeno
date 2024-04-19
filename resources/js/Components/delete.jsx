import { Modal, Form, Input, InputNumber } from "antd";


const Delete = ({isOpen, onOk, onCancel})=>{
    return (<Modal zIndex={9999} open={isOpen} onOk={onOk} onCancel={onCancel} okText="Supprimer" cancelText="Annuler" title="Supprimer un professeur">
            <p>Voulez-vous vraiment effacer cet(te) enseignant(e)?</p>
    </Modal>)
}

export default Delete;