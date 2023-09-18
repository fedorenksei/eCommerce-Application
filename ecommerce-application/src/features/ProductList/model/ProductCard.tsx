import { useNavigate } from 'react-router-dom';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getButtonStyles } from '../../../shared/ui/styles';
import { AddCartAction, DeleteItemAction } from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
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
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  const productSearch = lineItems.filter(
    (lineItem) => lineItem.productId === id,
  );
  const lineItemOfProduct = productSearch[0];
  let isCart = false;
  let nameButton: string = '';
  const serverApi = ServerAPI.getInstance();
  const lineItemId: string | undefined = lineItemOfProduct?.id;

  if (lineItemId === undefined) {
    isCart = false;
    nameButton = 'Add to cart';
  } else {
    isCart = true;
    nameButton = 'Delete';
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    updateCard(id);
  };

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
      <button
        onClick={handleButtonClick}
        className={getButtonStyles({
          size: 'small',
          filling: 'transparent',
          shape: 'round',
        })}
      >
        {nameButton}
      </button>

      <Header5>{productName}</Header5>
      <div className="space-x-2">
        <span className="text-neutral-400 line-through">€{price}</span>
        <span className="text-danger-color">€{discountedPrice}</span>
      </div>
      <Paragraph>{shortDescription}</Paragraph>
    </div>
  );
  async function updateCard(id: string | undefined) {
    if (isCart) {
      delInCart();
    } else {
      addToCart(id);
    }
    return;
  }

  async function addToCart(idProduct: string | undefined, amount: number = 1) {
    const res = await serverApi.updateCart(getUpdateActions(idProduct, amount));
    console.log(res);
  }

  function getUpdateActions(id: string | undefined, amount: number = 1) {
    const actions: AddCartAction[] = [
      {
        action: 'addLineItem',
        productId: id,
        variantId: 1,
        quantity: amount,
      },
    ];
    return actions;
  }

  async function delInCart() {
    if (lineItemId) {
      await serverApi.updateCart(deleteActions(lineItemId));
      return;
    }
  }
  function deleteActions(ItemId: string) {
    const actions: DeleteItemAction[] = [
      {
        action: 'removeLineItem',
        lineItemId: ItemId,
      },
    ];
    return actions;
  }
};
