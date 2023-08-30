import { Card, Button } from 'react-bootstrap'
import { formatCurrency } from '../utils/formatCurrency'
import { Minus, Plus } from '@phosphor-icons/react'
import { useShoppingCart } from '../context/shoppingCartContext'

type StoreItemProps = {
  id: number
  title: string
  price: number
  image: string
}

export function StoreItem({ id, title, price, image }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()

  const quantity = getItemQuantity(id)

  const limiteCaracteres = 30

  if (title.length > limiteCaracteres) {
    title = title.substring(0, limiteCaracteres) + '...'
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="400px"
        style={{ objectFit: 'contain', padding: '1rem' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5" id="textoSpan">
            {title}
          </span>
          <span className="ms-4 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Adicionar ao Carrinho
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '0.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '0.5rem' }}
              >
                <Button>
                  <Minus
                    size={22}
                    weight="bold"
                    onClick={() => decreaseCartQuantity(id)}
                  />
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button>
                  <Plus
                    size={24}
                    weight="bold"
                    onClick={() => increaseCartQuantity(id)}
                  />
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Excluir
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
