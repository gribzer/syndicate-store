import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import { searchProducts } from "../../services/api";

export default function SearchPage({ products, query }) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.search.value;
    router.push(`/search?search=${encodeURIComponent(newQuery)}`);
  };

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl text-primary font-bold">Поиск товаров</h1>
      </div>

      {/* Форма поиска (снова) */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Введите запрос..."
          className="flex-1 bg-[#1C2021] p-3 rounded text-white border border-gray-600"
        />
        <button
          type="submit"
          className="bg-primary text-black px-5 py-3 rounded font-semibold hover:bg-opacity-80"
        >
          Найти
        </button>
      </form>

      {products.length === 0 ? (
        <p className="text-gray-300">Ничего не найдено по запросу &laquo;{query}&raquo;.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`}>
              <a className="bg-[#1C2021] p-4 rounded border border-gray-700 hover:bg-opacity-80 block">
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-gray-300 mb-2">{p.price} ₽</p>
                <p className="text-primary">Подробнее &rarr;</p>
              </a>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const searchQuery = query.search || "";
  let products = [];

  try {
    if (searchQuery) {
      products = await searchProducts(searchQuery);
    }
  } catch (err) {
    console.error("Ошибка при поиске:", err);
  }

  return {
    props: {
      products: products || [],
      query: searchQuery,
    },
  };
}
