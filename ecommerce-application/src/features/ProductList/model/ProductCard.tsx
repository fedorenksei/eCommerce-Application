import { useNavigate } from 'react-router-dom';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getTextStyles } from '../../../shared/ui/styles';
import { AddCartAction, DeleteItemAction } from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import clsx from 'clsx';
import { useState } from 'react';
import { BsCartPlus, BsCartX } from 'react-icons/bs';

interface ProductCardProps {
  id: string;
  productName: string;
  price: number;
  priceDiscount: number;
  imageUrl: string;
  description: string;
}

export const ProductCard = ({
  id,
  productName,
  price,
  priceDiscount,
  imageUrl,
  description,
}: ProductCardProps) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();

  const shortDescription =
    description.length > 100 ? `${description.slice(0, 97)}...` : description;
  const discountedPrice = priceDiscount;
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  const productSearch = lineItems.filter(
    (lineItem) => lineItem.productId === id,
  );
  const lineItemOfProduct = productSearch[0];
  const serverApi = ServerAPI.getInstance();
  const lineItemId: string | undefined = lineItemOfProduct?.id;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    updateCard(id);
  };

  return (
    <div
      className={clsx(
        'space-y-2',
        'border dark:border-second-text-color rounded-md p-2',
        'transition cursor-pointer',
        'bg-bg-color dark:bg-dt-bg-color',
        'hover:shadow-lg hover:border-hover-color dark:hover:border-hover-color hover:scale-[1.02]',
      )}
      key={id}
      role="presentation"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={imageUrl}
        alt={productName}
        className={clsx('w-full aspect-square', isImgLoading && 'hidden')}
        onLoad={() => setIsImgLoading(false)}
      />
      {isImgLoading && (
        <div className="w-full aspect-square grid place-items-center">
          <div className="w-5 h-5 border border-hover-color rounded-full border-r-0 border-t-0 animate-spin"></div>
        </div>
      )}

      <Header5>{productName}</Header5>

      <div className="flex flex-wrap items-center justify-between">
        <div className="space-x-2">
          <span
            className={clsx(
              discountedPrice
                ? 'text-neutral-400 line-through'
                : 'text-text-color dark:text-dt-text-color',
            )}
          >
            €{price}
          </span>
          {discountedPrice > 0 && (
            <span className="text-danger-color">€{discountedPrice}</span>
          )}
        </div>

        {isButtonLoading ? (
          <div className="w-[1.5rem] aspect-square grid place-items-center">
            <div className="w-5 h-5 border border-hover-color rounded-full border-r-0 border-t-0 animate-spin"></div>
          </div>
        ) : (
          <button
            onClick={handleButtonClick}
            className={
              (clsx(getTextStyles({})),
              'text-hover-color hover:text-primary-color')
            }
          >
            {lineItemId ? (
              <BsCartX
                size="1.5rem"
                title="Remove from cart"
              />
            ) : (
              <BsCartPlus
                size="1.5rem"
                title="Add to cart"
              />
            )}
          </button>
        )}
      </div>

      <Paragraph>{shortDescription}</Paragraph>
    </div>
  );

  async function updateCard(id: string | undefined) {
    setIsButtonLoading(true);
    if (lineItemId) {
      await delInCart();
    } else {
      await addToCart(id);
    }
    setIsButtonLoading(false);
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
