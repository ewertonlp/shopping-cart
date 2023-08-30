import { Stack, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/shoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { Trash } from '@phosphor-icons/react'

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, data } = useShoppingCart()

  const item = data.find((i) => i.id === id)
  if (item == null) return null

  const limiteCaracteres = 25

  if (item.title.length > limiteCaracteres) {
    item.title = item.title.substring(0, limiteCaracteres) + '...'
  }

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex align-items-start border-bottom"
    >
      <img
        src={item.image}
        style={{ width: '100px', height: '150px', objectFit: 'contain' }}
        alt=""
      />
      <div className="me-auto d-flex flex-column gap-3 pt-2">
        <div className=''>
          {item.title}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '0.875rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className='d-flex flex-column align-items-end gap-5 pt-2'>
        <div className='fw-bolder'>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash size={20} />
        </Button>
      </div>
    </Stack>
  )
}
