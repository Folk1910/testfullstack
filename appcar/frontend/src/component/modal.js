import React from 'react';
import { Button, Result } from 'antd';

const Modal = ({ isVisible }) => {

 return (
        isVisible && <Result
        className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-[400px] h-25 bg-white z-50 border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center"
        status="success"
        title="Success"
        extra={[
        <Button type="primary" key="console" onClick={() => window.location.href = '/'} >
            OK
        </Button>,
        // <Button key="buy">Buy Again</Button>,
        ]}
    />
 )
};
export default Modal;