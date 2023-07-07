import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateFormValues } from './actions';
import { useHistory } from 'react-router-dom';

const BasicInfoForm = ({ formValues, updateFormValues }) => {
  const history = useHistory();

  const onFinish = (values) => {
    updateFormValues(values);
    history.push('/second-form'); // Navigate to the second form
  };

  return (
    <>
    <Form onFinish={onFinish} initialValues={formValues}>
      <Form.Item
        name="email"
        label="Email Registration"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Contact Number"
        rules={[{ required: true, message: 'Please enter your contact number' }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
      </Form.Item>

      <Form.Item
        name="landlordDetails"
        label="Landlord Basic Details"
        rules={[{ required: true, message: 'Please enter landlord details' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Landlord Basic Details" />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter your address' }]}
      >
        <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
      </Form.Item>
          
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
  </>
};

const mapStateToProps = (state) => {
  return {
    formValues: state.formValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFormValues: (values) => dispatch(updateFormValues(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoForm);
