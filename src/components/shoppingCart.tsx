import { Offcanvas, Stack, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/shoppingCartContext'
import { CartItem } from './cartItem'
import { formatCurrency } from '../utils/formatCurrency'

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, data } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = data.find((i) => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
          <Link
            to="/"
            onClick={closeCart}
            className="text-end text-dark text-decoration-none"
          >
            {' '}
            Continuar comprando
          </Link>
        </Stack>
      </Offcanvas.Body>
      <Button className="mb-4 mx-4 py-2 fw-semibold">
        Ir para o Pagamento
      </Button>
    </Offcanvas>
  )
}
