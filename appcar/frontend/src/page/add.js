import React,{ useState }  from 'react';
import { Button, Form, Input, Space,DatePicker } from 'antd';
import Axios from 'axios';
import Modal from '../component/modal';
import { Spin } from 'antd';
import { CarTwoTone } from '@ant-design/icons';
const { TextArea } = Input;

const Add = () => {
  const [form] = Form.useForm();

  const [isModal, setIsModal] = useState(false);

  const onFinish = values => {
    Axios.post('http://localhost:3333/add', { 
      vehicle_registration: values.vehicle_registration,
      car_brand: values.car_brand,
      car_model: values.car_model,
      vin: values.vin,
      model_year: values.model_year ? values.model_year.format('YYYY-MM-DD') : null,
      body_color: values.body_color,
      note: values.note,
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

  return (
    <div className="flex justify-center">
      <div className="flex items-center py-5 my-10 border border-gray-300 rounded-lg shadow-md w-[800px] flex-col">
      <h2><CarTwoTone /> Add Information Car</h2>
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
      <Form.Item name="vehicle_registration" label="ทะเบียนรถยนต์" rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถยนต์ของคุณ!' }]}  >
        <Input placeholder='ทะเบียนรถยนต์' type="text"/>
      </Form.Item>
      <Form.Item name="car_brand" label="ยี่ห้อรถ" rules={[{ required: true, message: 'กรุณากรอกยี่ห้อรถของคุณ!' }]} >
        <Input placeholder='ยี่ห้อรถ' type="text"/>
      </Form.Item>
      <Form.Item name="car_model" label="รุ่นรถ" rules={[{ required: true, message: 'กรุณากรอกรุ่นรถของคุณ!' }]} >
        <Input placeholder='รุ่นรถ' type="text"/>
      </Form.Item>
      <Form.Item name="vin" label="เลขตัวถัง" rules={[{ required: true, message: 'กรุณากรอกเลขตัวถังของคุณ!' }]} >
        <Input placeholder='เลขตัวถัง' type="text"/>
      </Form.Item>
      <Form.Item name="model_year" label="ปีที่ผลิต" rules={[{ required: true, message: 'กรุณากรอกปีที่ผลิตของคุณ!' }]} >
        <DatePicker />
      </Form.Item>
      <Form.Item name="body_color" label="สีตัวถัง" rules={[{ required: true, message: 'กรุณากรอกสีตัวถังของคุณ!' }]} >
        <Input placeholder='สีตัวถัง' type="text"/>
      </Form.Item>
      <Form.Item name="note" label="หมายเหตุ">
        <TextArea rows={5} placeholder='หมายเหตุ'/>
      </Form.Item>
      
      <Form.Item>
        <Space className="flex justify-center">
          <Button type="primary" htmlType="submit">{
            isModal ? 
            <Spin styles={stylesObject}></Spin> : 'Submit' 
            }
            </Button>
          <Button htmlType="reset">
            {isModal ? 
            <Spin></Spin> : 'Reset' 
            }
            </Button>
          <Button onClick={() => window.location.href = '/'} >
            {isModal ? 
            <Spin></Spin> : 'Cancel' 
            }
          </Button>
        </Space>
      </Form.Item>
      </Form>
      </div>
      {isModal && <div className="flex bg-gray-100 w-full fixed z-50 h-screen top-0 left-0 bg-opacity-50">
        <Modal isVisible={isModal} />
      </div>}
    </div>
  );
}

export default Add;