import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
// import { createOrder } from "../services/api";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [isOrderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Здесь может быть запрос на создание заказа в Strapi:
    // await createOrder({
    //   email,
    //   cartItems,
    //   totalPrice
    // });
    clearCart();
    setOrderSuccess(true);
  };

  if (isOrderSuccess) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Спасибо за заказ!</h1>
        <p>На указанный email придёт вся необходимая информация.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="email">
            Ваш email
          </label>
          <input
            required
            type="email"
            id="email"
            className="w-full bg-[#1C2021] border border-gray-600 rounded p-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p>Сумма заказа: <strong>{totalPrice} ₽</strong></p>
        <button
          type="submit"
          className="bg-primary text-black py-2 px-4 rounded hover:opacity-90"
        >
          Подтвердить заказ
        </button>
      </form>
    </Layout>
  );
}
