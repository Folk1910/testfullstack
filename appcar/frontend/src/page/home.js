import React ,{ useState, useEffect  } from 'react';
import { Flex, Space, Table, Tag } from 'antd';
import Axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'ทะเบียนรถยนต์',
    dataIndex: 'vehicle_registration',
    key: 'vehicle_registration',
  },
  {
    title: 'ยี่ห้อรถยนต์',
    dataIndex: 'car_brand',
    key: 'car_brand',
  },
  {
    title: 'รุ่นรถ',
    dataIndex: 'car_model',
    key: 'car_model',
  },
  {
    title: 'หมายเหตุ',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="medium">
        <a href={`/edit/${record.id}`}>
          <EditOutlined />
        </a>
        <a href={`/delete/${record.id}`}>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

const Home = () => {

  const [listData, setListData] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3333/list')
      .then(response => {
        console.log('successfully:', response.data);
        setListData(response.data);
      })
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={listData} />
    </div>
  );
};

export default Home;