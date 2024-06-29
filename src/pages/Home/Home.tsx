import { FC, useEffect, useState } from "react";
import { useDeleteItemMutation, useGetProductsQuery } from "../../services/api";

import { Table, Flex, Spin, Button, Pagination, Space, Popconfirm, message } from "antd";
import type { TableColumnsType, PopconfirmProps } from "antd";
import { useNavigate } from "react-router-dom";
import { CustomSelect, MyModal } from "../../core";
import { Products } from "../../types/types";
import { EditOutlined } from "@ant-design/icons";

const Home: FC = () => {
  const [limit, setLimit] = useState(10); // Default limit
  const [skip, setSkip] = useState(0); // Default skip
  const [products, setProducts] = useState<Products[]>([]);
  const { data, isError, isLoading } = useGetProductsQuery({
    limit,
    skip,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Products | null>(null);

  useEffect(() => {
    setProducts(data?.products ?? []);
  }, [data]);
  const Navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setSkip((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const handleShowAll = () => {
    setLimit(0);
    setSkip(0);
  };

  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id).unwrap();
      message.success('Deleted');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete the item:", error);
    }
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
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button  className="text-red-600" danger type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const cancel: PopconfirmProps['onCancel'] = () => {
    message.error('Cancelled');
  };

  const handleClick = (record: Products) => {
    Navigate(`/products/${record.id}`, { state: { record } })
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
            <Flex className="justify-end">
              <CustomSelect />
            </Flex>
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
