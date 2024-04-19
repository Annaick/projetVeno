import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Tag, Button, Space } from "antd";
const columns = [
    {
      title: '#',
      dataIndex: 'numens',
      key: 'numero',
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'name',
    },
    {
      title: 'Nombre d\'heures',
      key: 'nbheures',
      dataIndex: 'nbheures'
    },
    {
        title: 'Taux horaire',
        key: 'tauxhoraire',
        dataIndex: 'tauxhoraire'
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />}></Button>
          <Button type="default" danger icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
];

const TableProf = ({data}) => <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={data} />;
export default TableProf