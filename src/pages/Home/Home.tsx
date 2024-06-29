import { FC, useState } from "react";
import { useGetProductsQuery } from "../../services/api";

import { Table, Flex, Spin, Button, Pagination, Space } from 'antd';
import type { TableColumnsType } from 'antd';
import { useNavigate } from "react-router-dom";
import { MyModal } from "../../core";
import { Products } from "../../types/types"
import { EditOutlined } from '@ant-design/icons';

const Home: FC = () => {
  const [limit, setLimit] = useState(10); // Default limit
  const [skip, setSkip] = useState(0);    // Default skip
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Products | null>(null);

  const { data, isError, isLoading } = useGetProductsQuery({ limit, skip });
  const products: Products[] = data?.products ?? []
  const Navigate = useNavigate()

  const handlePageChange = (page: number, pageSize: number) => {
    setSkip((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const handleShowAll = () => {
    setLimit(0);
    setSkip(0);
  };

  const columns: TableColumnsType<Products> = [
    {
      title: 'SL no.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Discount',
      dataIndex: `discountPercentage`,
      key: 'discountPercentage',
      render: (text) => `${text}%`,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'View Product',
      dataIndex: 'action',
      key: 'view',
      render: (_: Products, record: Products) => (
        <Button type="primary" onClick={() => handleClick(record)}>View Product</Button>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: Products, record: Products) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} iconPosition={'end'} onClick={() => handleOpenModal(record)}>Edit</Button>
          <Button className="text-red-600" danger type="link">Delete</Button>
        </Space>
      ),
    },
  ];

  const handleClick = (record: Products) => {
    console.log(record)
    Navigate(`/products/${record.id}${record.title}`, { state: { record } })
  }

  const handleOpenModal = (record: Products) => {
    setModalData(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  return (
    <div className="container mx-auto pb-10">
      {
        isLoading ?
          <>
            <Flex align="center" justify="center" gap="middle" className="h-dvh">
              <Spin size="large" />
            </Flex>
          </>
          : isError ?
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Error:</div>
            :
            <>
              <Table
                columns={columns}
                dataSource={products}
                pagination={false}
                rowKey="id"
              />

              <Flex className="flex items-center flex-col mt-10 gap-5">
                <Pagination
                  current={Math.floor(skip / (limit || 1)) + 1}
                  total={data?.total}
                  pageSize={limit || data?.total}
                  onChange={handlePageChange}
                  showSizeChanger
                  onShowSizeChange={handlePageChange}
                />
                <Button type="primary" onClick={handleShowAll}>Show All</Button>
              </Flex>
            </>
      }
      <MyModal
        visible={modalVisible}
        data={modalData}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Home;
