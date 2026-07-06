import React,{ useState }  from 'react';
import { Button, Form, Input, Space } from 'antd';
import Axios from 'axios';
import Modal from '../component/modal';
import { Spin } from 'antd';

const Add = () => {
  const [form] = Form.useForm();

  const [isModal, setIsModal] = useState(false);

  const onFinish = values => {
    Axios.post('http://localhost:3333/add', { 
      vehicle_registration: values.vehicle_registration,
      car_brand: values.car_brand,
      car_model: values.car_model,
      note: values.note,
    })
    .then(response => {
      console.log('successfully:', response.data);
      setIsModal(true);
    })
    .catch(error => {
    }); 
  };
    
  const stylesObject = {
    indicator: {
      color: '#ffffff',
    },
};

  return (
    <div>
      <div className="flex justify-center my-20">
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
      <Form.Item name="vehicle_registration" label="ทะเบียนรถยนต์" rules={[{ required: true }]}  >
        <Input placeholder='ทะเบียนรถยนต์' type="text"/>
      </Form.Item>
      <Form.Item name="car_brand" label="ยี่ห้อรถ" rules={[{ required: true }]} >
        <Input placeholder='ยี่ห้อรถ' type="text"/>
      </Form.Item>
      <Form.Item name="car_model" label="รุ่นรถ" rules={[{ required: true }]} >
        <Input placeholder='รุ่นรถ' type="text"/>
      </Form.Item>
      <Form.Item name="note" label="หมายเหตุ" rules={[{ required: true }]} >
        <Input placeholder='หมายเหตุ' type="text"/>
      </Form.Item>
      
      <Form.Item>
        <Space>
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
        </Space>
      </Form.Item>
      </Form>
    </div>
      <div className="flex">
        <Modal isVisible={isModal} />
      </div>
    </div>
    
  );
};

export default Add;