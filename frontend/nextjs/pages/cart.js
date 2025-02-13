import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Моя корзина</h1>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <strong>{item.title}</strong> – {item.price} ₽
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <div className="mb-4">Сумма: {totalPrice} ₽</div>
          <div className="space-x-2">
            <button
              onClick={clearCart}
              className="bg-gray-600 py-1 px-3 rounded hover:bg-gray-500"
            >
              Очистить корзину
            </button>
            <Link href="/checkout">
              <a className="bg-primary text-black py-1 px-3 rounded hover:opacity-90">
                Оформить заказ
              </a>
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
}
