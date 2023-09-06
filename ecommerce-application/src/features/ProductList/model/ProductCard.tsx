import { useNavigate } from 'react-router-dom';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import clsx from 'clsx';

interface ProductCardProps {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
  description: string;
}

export const ProductCard = ({
  id,
  productName,
  price,
  imageUrl,
  description,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const shortDescription =
    description.length > 100 ? `${description.slice(0, 97)}...` : description;
  const discountedPrice = Math.floor(price * 0.95);

  return (
    <div
      className={clsx(
        'border rounded-md p-2',
        'transition cursor-pointer',
        'hover:shadow-lg hover:border-hover-color hover:-translate-y-1',
      )}
      key={id}
      role="presentation"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={imageUrl}
        alt={productName}
      />
      <Header5>{productName}</Header5>
      <div className="space-x-2">
        <span className="text-neutral-400 line-through">€{price}</span>
        <span className="text-danger-color">€{discountedPrice}</span>
      </div>
      <Paragraph>{shortDescription}</Paragraph>
    </div>
  );
};
