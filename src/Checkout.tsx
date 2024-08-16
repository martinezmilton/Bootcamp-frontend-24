import { useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
// import { getProducts } from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1bcXpGUzJUyUwITOqEn8QPj8ZOgUbTGQD/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places

type Product = {
  id: number;
  name: string;
  price: number;
  availableCount: number;
}


const Productt = ({ id, name, availableCount, price, orderedQuantity, total, onAdd, onRemove }) => { //Add and remove
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price.toFixed(2)}</td>
      <td>{orderedQuantity}</td>   
      <td>${total.toFixed(2)}</td>
      <td>
        <button className={styles.actionButton} onClick={() => onAdd(id)} disabled={orderedQuantity >= availableCount}>+</button>
        <button className={styles.actionButton} onClick={() => onRemove(id)} disabled={orderedQuantity <= 0}>-</button>
      </td>
    </tr>    
  );
}


const Checkout = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderedQuantities, setOrderQuatities] = useState<{[key: number]: number}>({});
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => {
      const quantity = orderedQuantities[product.id] || 0;
      return sum + quantity * product.price;
    }, 0)

    const discount = newTotal > 1000 ? newTotal * 0.1 : 0;
    setTotal(newTotal - discount);
    setDiscount(discount);
  }, [orderedQuantities, products])

  const handleAdd = (id: number) => {
    setOrderQuatities((prev) => ({...prev, [id] : (prev[id] || 0) + 1}))
  }

  const handleRemove = (id: number) => {
    setOrderQuatities((prev) => ({ ...prev, [id] : Math.max((prev[id] || 0) -1, 0)}))
  }

  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        {loading ? (
          <LoadingIcon />  
        ) : (
          <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {products.map((product) => (
            <Productt
              key={product.id}
              id={product.id}
              name={product.name}
              availableCount={product.availableCount}
              price={product.price}
              orderedQuantity={orderedQuantities[product.id] || 0}
              total={(orderedQuantities[product.id] || 0) * product.price}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          ))}
          </tbody>
        </table>
        )}
        <h2>Order summary</h2>
        {discount > 0 && <p>Discount: ${discount.toFixed(2)} </p>}
        <p>Total: ${total.toFixed(2)} </p>       
      </main>
    </div>
  );
};

export default Checkout;