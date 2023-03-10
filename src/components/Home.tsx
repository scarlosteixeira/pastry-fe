import React from 'react'
import { IProduct } from '../interfaces/product'
import Product from './Product'
import { baseUrl } from '../config'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { ICart } from '../interfaces/cart'
import Hero from '../../assets/img/Hero.png'

type Products = null | Array<IProduct>

function Home({
  fetchCart,
  cart
}: {
  cart: ICart | null
  fetchCart: () => void
}) {
  const [Products, updateProducts] = React.useState<Products>(null)

  React.useEffect(() => {
    // console.log('The Home Page has mounted')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      // console.log(ProductsData)
    }
    fetchProducts()
  }, [])
  if (!Products) return <h1>Loading...</h1>
  return (
    <>
      <Container>
      <Image src={Hero} className="rounded mb-3" fluid={true} style={{width:"100%"}}/>
        <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3">
          {Products?.map(product => (
            <Col key={product.id}>
              {product.in_stock && (
                <Product {...product} fetchCart={fetchCart} cart={cart} />
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
