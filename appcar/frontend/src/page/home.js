import React ,{ useState, useEffect, useRef  } from 'react';
import { Space, Table,Button, Input, message, Popconfirm} from 'antd';
import Axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const Home = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [listData, setListData] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3333/list')
      .then(response => {
        console.log('successfully:', response.data);
        setListData(response.data);
      })
  }, []);

  const confirm = (id) => () => {
      Axios.delete(`http://localhost:3333/delete/${id}`)
      .then(response => {
        window.location.reload();
      });
  };

  const cancel = e => {
  };

  const columns = [
    {
      title: 'ทะเบียนรถยนต์',
      dataIndex: 'vehicle_registration',
      key: 'vehicle_registration',
      ...getColumnSearchProps('vehicle_registration'),
    },
    {
      title: 'ยี่ห้อรถยนต์',
      dataIndex: 'car_brand',
      key: 'car_brand',
      ...getColumnSearchProps('car_brand'),
    },
    {
      title: 'รุ่นรถ',
      dataIndex: 'car_model',
      key: 'car_model',
      ...getColumnSearchProps('car_model'),
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'note',
      key: 'note',
      ...getColumnSearchProps('note'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="medium">
          <a href={`/edit/${record.id}`}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="Delete the information"
            description="Are you sure to delete this information?"
            onConfirm={confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined></DeleteOutlined>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  
  return (
    <div>
      <Table columns={columns} dataSource={listData} />
    </div>
  );
};

export default Home;