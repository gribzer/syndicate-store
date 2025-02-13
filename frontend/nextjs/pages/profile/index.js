import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchUserProfile, fetchUserOrders } from "../../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Загрузка профиля (можно использовать JWT-токен из context или localStorage)
    async function loadProfile() {
      try {
        const userData = await fetchUserProfile();
        setProfile(userData);

        const userOrders = await fetchUserOrders();
        setOrders(userOrders);
      } catch (err) {
        console.error("Ошибка при загрузке профиля/заказов:", err);
      }
    }
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <Layout>
        <div className="text-gray-300">Загрузка...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-primary font-bold mb-4">Личный кабинет</h1>

      <div className="mb-6">
        <p className="text-white">Привет, <strong>{profile.username}</strong>!</p>
        <p className="text-gray-400">Email: {profile.email}</p>
      </div>

      {/* Список заказов */}
      <h2 className="text-xl text-secondary font-semibold mb-2">Мои заказы</h2>
      {orders.length === 0 ? (
        <p className="text-gray-300">Заказов нет.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="bg-[#1C2021] p-4 rounded border border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">
                    Заказ #{order.id}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Сумма: {order.totalPrice} ₽
                  </p>
                </div>
                <div>
                  <span className="text-gray-300 text-sm">
                    Статус: {order.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
