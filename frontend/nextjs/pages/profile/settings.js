import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchUserProfile, updateUserProfile } from "../../services/api";

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const userData = await fetchUserProfile();
        setProfile(userData);
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUserProfile({ username, email });
      setProfile(updated);
      alert("Данные успешно сохранены!");
    } catch (err) {
      console.error("Ошибка сохранения профиля:", err);
      alert("Ошибка сохранения данных!");
    }
  };

  if (!profile) {
    return (
      <Layout>
        <p className="text-gray-300">Загрузка...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-primary font-bold mb-4">Настройки профиля</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-white mb-1">Имя пользователя</label>
          <input
            type="text"
            className="w-full bg-[#1C2021] p-2 rounded border border-gray-600 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-[#1C2021] p-2 rounded border border-gray-600 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-black px-4 py-2 rounded hover:bg-opacity-80"
        >
          Сохранить
        </button>
      </form>
    </Layout>
  );
}
