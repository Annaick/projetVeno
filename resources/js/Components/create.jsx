import { Modal, Form, Input, InputNumber } from "antd";


const Create = ({isOpen, onOk, onCancel})=>{
    const [form] = Form.useForm();

    return (<Modal zIndex={9999} open={isOpen} onOk={form.submit} onCancel={onCancel} okText="Ajouter" cancelText="Annuler" title="Ajouter un professeur">
            <Form layout="vertical" form={form} onFinish={(e)=>{onOk(e); form.resetFields()}}>
                <Form.Item
                label="Numero enseignant"
                name="numens"
                rules={[{ required: true, message: 'Veuillez entrer le numéro!' }]}
                >
                    <Input className="rounded-lg" />
                </Form.Item>
                <Form.Item
                label="Nom"
                name="nom"
                rules={[{ required: true, message: 'Veuillez entrer un nom!' }]}
                >
                    <Input className="rounded-lg bg-0" />
                </Form.Item>
                <Form.Item
                label="Nombre d'heures"
                name="nbheures"
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

export default Create;