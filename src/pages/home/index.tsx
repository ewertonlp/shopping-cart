import { Row, Col } from 'react-bootstrap'
import { StoreItem } from '../../components/storeItem'
import { useShoppingCart } from '../../context/shoppingCartContext'

export function Home() {
  const { data } = useShoppingCart()
  

  return (
    <div>
      <h2 className='my-4'>Store</h2>
      <Row md={3} xs={1} lg={4} className="g-3">
        {data.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
