import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Tag, Button, Space } from "antd";
const TableProf = ({data, setProf, setOpenDelete, setOpenUpdate}) => {

  
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
      title: 'Salaire',
      key: 'salaire',
      dataIndex: 'salaire'
    },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="text" onClick={() => {setProf(record); setOpenUpdate(true)}} icon={<EditOutlined/>}></Button>
        <Button type="default" onClick={() => {setProf(record); setOpenDelete(true)}} danger icon={<DeleteOutlined/>}></Button>
      </Space>
    ),
  },
];
  return (<Table pagination={{ pageSize: 7 }} columns={columns} dataSource={data} />)
}
export default TableProf