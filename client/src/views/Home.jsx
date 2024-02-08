import { useEffect, useState } from "react"
import axios from 'axios'

const Home = () => {

   const [products, setProducts] = useState([])

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get('http://localhost:3001/product')
         setProducts(response.data)
      }
      getData()
   }, [])

   return (
      <>
         <div className="card-container">
            {products.map((product) => (
               <div className="card-item" key={product.id}>
                  <img src={product.url} alt="" />
                  <p className="name">{product.name}</p>
               </div>
            ))}
         </div>
      </>
   )
}

export default Home