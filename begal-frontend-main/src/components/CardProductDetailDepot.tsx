import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';
import dummyImg from '@/assets/feature-slider.png';
import { Link } from 'react-router-dom';

interface CardProductProps {
  id: string;
  image_url: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  seller_id: string;
}

const CardProductDetailDepot: React.FC<CardProductProps> = ({
  id,
  image_url,
  name,
  description,
  price,
  stock,
  seller_id,
}) => {
  return (
    <Card className='w-full overflow-hidden transition-all duration-300 hover:shadow-lg group'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={image_url || dummyImg}
          alt={name}
          className='w-full h-full object-cover'
        />
        {stock <= 0 && (
          <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center'>
            <span className='text-white text-lg font-semibold'>Habis</span>
          </div>
        )}
      </div>
      <CardContent className='p-4'>
        <Link to={`/product-detail/${id}`}>
          <h3 className='text-lg font-semibold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors'>
            {name}
          </h3>
        </Link>
        <p className='text-sm text-gray-600 mb-3 line-clamp-2'>{description}</p>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-lg font-bold text-blue-600'>
            Rp {price.toLocaleString('id-ID')}
          </span>
          <span className='text-sm text-gray-500 flex items-center gap-1'>
            <Package className='w-4 h-4' />
            Stok: {stock}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProductDetailDepot;
