
import { FC, useEffect } from 'react';
import { Flex, Form, Input, InputNumber, Modal } from 'antd';
import { Products } from '../../types/types';

interface IProps {
  visible: boolean;
  data: Products | null;
  onClose: () => void;
}

const MyModal: FC<IProps> = ({ visible, data, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        brand: data.brand,
        price: data.price,
        discountPercentage: data.discountPercentage,
        stock: data.stock,
        rating: data.rating,
        description: data.description,
      });
    }
  }, [data, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      onClose();
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Edit Product"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="h-80 overflow-x-auto">
        <Form form={form} layout="vertical">
          <Form.Item className='mb-2.5' label="Product Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item className='mb-2.5' label="Brand" name="brand">
            <Input />
          </Form.Item>

          <Flex className='flex-wrap justify-between'>
            <Form.Item className='mb-2.5' name="price" label="Price" rules={[{ type: 'number' }]}>
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item className='mb-2.5' name="discountPercentage" label="Discount" rules={[{ type: 'number', min: 0, max: 99 }]}>
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item className='mb-2.5' name="stock" label="Stock" rules={[{ type: 'number' }]}>
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item className='mb-2.5' name="rating" label="Rating" rules={[{ type: 'number', min: 0, max: 5 }]}>
              <InputNumber className='w-full' />
            </Form.Item>
          </Flex>

          <Form.Item className='mb-2.5' name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default MyModal;
