import React,{ useState, useEffect }  from 'react';
import { Button, Form, Input, Space,DatePicker } from 'antd';
import Axios from 'axios';
import Modal from '../component/modal';
import { useParams } from 'react-router-dom';
import { CarTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;

const Edit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isModal, setIsModal] = useState(false);

  const onFinish = values => {
    Axios.put(`http://localhost:3333/update`, { 
      vehicle_registration: values.vehicle_registration,
      car_brand: values.car_brand,
      car_model: values.car_model,
      vin: values.vin,
      model_year: values.model_year ? values.model_year.format('YYYY-MM-DD') : null,
      body_color: values.body_color,
      note: values.note,
      id: parseInt(id)
    })
    .then(response => {
      console.log('successfully:', response.data);
      setIsModal(true);
    })
  };
    
  const stylesObject = {
    indicator: {
      color: '#ffffff',
    },
  };

 const [Data, setData] = useState();

  useEffect(() => {
    Axios.get(`http://localhost:3333/list/${id}`)
      .then(response => {
        console.log('successfully:', response.data);
        setData(response.data);
      })
  }, [id]);

  return (
    Data && Data[0] ? (
    <div className="flex justify-center">
      <div className="flex items-center py-5 my-10 border border-gray-300 rounded-lg shadow-md w-[800px] flex-col">
      <h2><CarTwoTone /> Edit Information Car</h2>
      <Form form={form} 
        name="wrap"
        // labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        layout="vertical"
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        className="w-full"
        onFinish={onFinish}
      >
      <Form.Item name="vehicle_registration" label="ทะเบียนรถยนต์" rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถยนต์ของคุณ!' }]} initialValue={Data && Data[0] ? Data[0].vehicle_registration : ''}  >
        <Input placeholder='ทะเบียนรถยนต์' type="text" />
      </Form.Item>
      <Form.Item name="car_brand" label="ยี่ห้อรถ" rules={[{ required: true, message: 'กรุณากรอกยี่ห้อรถของคุณ!' }]} initialValue={Data && Data[0] ? Data[0].car_brand : ''}>
        <Input placeholder='ยี่ห้อรถ' type="text"  />
      </Form.Item>
      <Form.Item name="car_model" label="รุ่นรถ" rules={[{ required: true, message: 'กรุณากรอกรุ่นรถของคุณ!' }]} initialValue={Data && Data[0] ? Data[0].car_model : ''}  >
        <Input placeholder='รุ่นรถ' type="text" />
      </Form.Item>
      <Form.Item name="vin" label="เลขตัวถัง" rules={[{ required: true, message: 'กรุณากรอกเลขตัวถังของคุณ!' }]} initialValue={Data && Data[0] ? Data[0].vin : ''}>
        <Input placeholder='เลขตัวถัง' type="text"/>
      </Form.Item>
      <Form.Item name="model_year" label="ปีที่ผลิต" rules={[{ required: true, message: 'กรุณากรอกปีที่ผลิตของคุณ!' }]} initialValue={Data && Data[0] ? dayjs(Data[0].model_year) : null}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="body_color" label="สีตัวถัง" rules={[{ required: true, message: 'กรุณากรอกสีตัวถังของคุณ!' }]} initialValue={Data && Data[0] ? Data[0].body_color : ''}>
        <Input placeholder='สีตัวถัง' type="text"/>
      </Form.Item>
      <Form.Item name="note" label="หมายเหตุ" initialValue={Data && Data[0] ? Data[0].note : ''}>
        <TextArea rows={5} placeholder='หมายเหตุ'/>
      </Form.Item>
      <Form.Item>
        <Space className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">
            Reset
          </Button>
          <Button onClick={() => window.location.href = '/'} >
            Cancel
          </Button>
        </Space>
      </Form.Item>
      </Form>
    </div>
      {isModal && <div className="flex bg-gray-100 w-full fixed z-50 h-screen top-0 left-0 bg-opacity-50">
        <Modal isVisible={isModal} />
      </div>}
    </div>
    ) : <div className="flex justify-center my-20"><Spin size="large" /></div>
  );
};

export default Edit;