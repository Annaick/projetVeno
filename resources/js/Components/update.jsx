import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";


const Update = ({isOpen, onOk, onCancel, prof})=>{
    const [form] = Form.useForm();
    useEffect(()=>{
      form.setFieldsValue({
        numens: prof.numens,
        nom: prof.nom,
        nbheures: Number(prof.nbheures),
        tauxhoraire: Number (prof.tauxhoraire),
      })
    }, [isOpen, prof]);

    return (<Modal zIndex={9999} open={isOpen} onOk={form.submit} onCancel={onCancel} okText="Modifier" cancelText="Annuler" title="Modifier un professeur">
            <Form layout="vertical" form={form} onFinish={async (e)=>{ await onOk(e); form.resetFields()}}>
                <Form.Item
                label="Numero enseignant"
                name="numens"
                initialValue={prof.numens}
                rules={[{ required: true, message: 'Veuillez entrer le numéro!' }]}
                >
                    <Input className="rounded-lg" />
                </Form.Item>
                <Form.Item
                label="Nom"
                name="nom"
                initialValue={prof.nom}
                rules={[{ required: true, message: 'Veuillez entrer un nom!' }]}
                >
                    <Input className="rounded-lg bg-0" />
                </Form.Item>
                <Form.Item
                label="Nombre d'heures"
                name="nbheures"
                initialValue={Number(prof.nbheures)}
                rules={[
                    {
                      required: true,
                      message: 'Veuillez entrer un taux horaire',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Le taux horaire doit être positif',
                    },
                  ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                label="Taux horaire"
                name="tauxhoraire"
                initialValue={Number(prof.tauxhoraire)}
                rules={[
                    {
                      required: true,
                      message: 'Veuillez entrer un taux horaire',
                    },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Le taux horaire doit être positif',
                    },
                  ]}
                >
                    <InputNumber/>
                </Form.Item>
            </Form>
    </Modal>)
}

export default Update;