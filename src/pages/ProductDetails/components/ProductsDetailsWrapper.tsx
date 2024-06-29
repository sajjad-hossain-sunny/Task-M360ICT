import { FC, useState } from "react"
import { Products, Reviews } from "../../../types/types"
import { Button, Divider, Flex, Image, Tag, Typography, Card, Modal, Form, Input, InputNumber, DatePicker } from "antd"
import type { DatePickerProps } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

type Props = {
  record: Products
}


const ProductsDetailsWrapper: FC<Props> = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-12 py-10 gap-6">
        <div className="col-span-6 ">
          <Image
            className="w-full"
            src={record.thumbnail}
          />
        </div>
        <div className="col-span-6">
          <Title level={2}>{record.title}</Title>
          <Text>{record.description}</Text><br />
          <Text className="text-red-500">{record.availabilityStatus}</Text>
          <Flex className="items-center gap-x-5 mt-3 ">
            <Title className="!my-0" level={5}>Brand: {record.brand}</Title>
            <Title className="!my-0" level={5}>Rating: {record.rating}</Title>
            <Title className="!my-0" level={5}>Stock: {record.stock}</Title>
          </Flex>
          <Divider />
          <Flex className="items-center gap-x-2 mb-2">
            <Title className="!m-0 !text-red-600" level={4}>-{record.discountPercentage}%</Title>
            <Title className="!m-0" level={2}>${record.price}</Title>
          </Flex>
          <Title className="!my-0" level={5}>Dimensions: {record.dimensions.width} x {record.dimensions.height}</Title>
          <Flex className="gap-x-4 mt-4">
            <Button type="primary" icon={<ShoppingCartOutlined className="text-xl" />}>Add To Cart</Button>
            <Button type="primary" >Buy Now</Button>
          </Flex>
          <Divider />
          <Title className="!my-0" level={5}>Category: {record.category}</Title>
          <Flex className="my-3 gap-x-2">
            <Title className="!my-0" level={5}>Tags: </Title>
            {
              record?.tags?.map((items) => (
                <Tag className="!m-0">{items}</Tag>
              ))
            }
          </Flex>
          <Title className="!my-0" level={5}>Delivery: {record.shippingInformation}</Title>
          <Title className="!my-3" level={5}>Return Policy: {record.returnPolicy}</Title>

        </div>

        {record?.reviews?.map((review: Reviews, index: number) => (
          <div key={index} className="col-span-4">
            <Card className="bg-teal-300 !w-full" title={`Rating: ${review.rating}`} bordered={false}>
              <p>Date: {review.date}</p>
              <p>Reviewer Name: {review.reviewerName}</p>
              <p>Comment: {review.comment}</p>
              <p>Reviewer Email: {review.reviewerEmail}</p>
              <Flex className="justify-end">
                <Button className="mt-4" type="primary" onClick={showModal}>Edit Rating</Button>
              </Flex>
            </Card>
          </div>
        ))}


        <Modal
          title="Edit Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="h-80 overflow-x-auto">
            <Form layout="vertical">
              <Form.Item className='mb-2.5' label="Reviewer Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item className='mb-2.5' label="Comment" name="comment">
                <Input />
              </Form.Item>
              <Form.Item className='mb-2.5' label="Reviewer Email" name="email">
                <Input />
              </Form.Item>

              <Flex className='flex-wrap justify-between'>
                <Form.Item className='mb-2.5' name="date" label="Date" rules={[{ type: 'date' }]}>
                  <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item className='mb-2.5' name="discountPercentage" label="Discount" rules={[{ type: 'number', min: 0, max: 5 }]}>
                  <InputNumber className='w-full' />
                </Form.Item>
              </Flex>
            </Form>
          </div>
        </Modal>

      </div>
    </>
  )
}

export default ProductsDetailsWrapper