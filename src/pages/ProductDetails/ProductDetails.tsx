import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Products } from '../../types/types';
import ProductsDetailsWrapper from './components/ProductsDetailsWrapper';


const ProductDetail: FC = () => {
  const location = useLocation();
  const { record } = (location.state as { record: Products }) || {};  
  return (
    <>
      {record ? (
        <ProductsDetailsWrapper record={record}/>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductDetail;
