import Layout from "../components/Layout";
// Здесь добавим несколько фейковых функций, которые вы можете заменить
// на реальные запросы к Strapi или любому другому backend.
import { fetchHeroBanner, fetchCategories, fetchPopularProducts } from "../services/api";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

// Главная страница
export default function HomePage({ heroData, categories, popularProducts }) {
  return (
    <Layout>
      {/* Hero / баннер секция */}
      <section className="relative bg-[#1C2021] text-white rounded-md overflow-hidden mb-8 p-8 md:p-16">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {heroData.title || "Добро пожаловать в Syndicate Store"}
            </h1>
            <p className="text-gray-200 mb-6">
              {heroData.description || "Здесь вы найдёте ключи, аккаунты, подписки, игры и многое другое."}
            </p>
            <div>
              <Link href="/catalog">
                <a className="bg-secondary text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 mr-2">
                  Перейти в каталог
                </a>
              </Link>
              <Link href="/cart">
                <a className="bg-primary text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80">
                  Корзина
                </a>
              </Link>
            </div>
          </div>
          {/* Картинка справа, если есть */}
          <div className="hidden md:block md:w-1/2">
            {heroData.imageUrl ? (
              <img 
                src={heroData.imageUrl} 
                alt="Hero" 
                className="max-w-full rounded" 
              />
            ) : (
              <img 
                src="/hero-placeholder.png" 
                alt="Hero placeholder" 
                className="max-w-full rounded" 
              />
            )}
          </div>
        </div>
      </section>

      {/* Поисковый блок (как на ggsel.net и т.п.) */}
      <section className="mb-8 px-4">
        <SearchBlock />
      </section>

      {/* Категории */}
      <section className="mb-8 px-4">
        <CategoriesBlock categories={categories} />
      </section>

      {/* Популярные товары */}
      <section className="mb-8 px-4">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Популярные товары
        </h2>
        {popularProducts.length === 0 ? (
          <p className="text-gray-300">Нет популярных товаров на данный момент.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Секция с акциями/предложениями (опционально) */}
      <section className="mb-8 px-4">
        <SpecialOffers />
      </section>
    </Layout>
  );
}

// ---- SSR/SSG ----
export async function getServerSideProps() {
  let heroData = {};
  let categories = [];
  let popularProducts = [];

  try {
    heroData = await fetchHeroBanner();
  } catch (err) {
    console.error("Ошибка при загрузке heroData:", err);
  }

  try {
    categories = await fetchCategories();
  } catch (err) {
    console.error("Ошибка при загрузке категорий:", err);
  }

  try {
    popularProducts = await fetchPopularProducts();
  } catch (err) {
    console.error("Ошибка при загрузке популярных товаров:", err);
  }

  return {
    props: {
      heroData: heroData || {},
      categories: categories || [],
      popularProducts: popularProducts || [],
    },
  };
}

// ---- Дополнительные блоки ----
function SearchBlock() {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    // Редирект или логика поиска
    // Например:
    // Router.push(`/catalog?search=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 items-center max-w-2xl mx-auto">
      <input
        type="text"
        name="search"
        placeholder="Поиск товаров..."
        className="flex-1 bg-[#1C2021] p-3 rounded text-white border border-gray-600"
      />
      <button
        type="submit"
        className="bg-primary text-black px-5 py-3 rounded font-semibold hover:bg-opacity-80"
      >
        Искать
      </button>
    </form>
  );
}

function CategoriesBlock({ categories }) {
  // Если пусто, показываем заглушку
  if (!categories || categories.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-primary mb-4">Категории</h2>
        <p className="text-gray-300">Категории не найдены.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">Категории</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/catalog?category=${cat.slug}`}>
            <a className="bg-[#1C2021] flex flex-col items-center justify-center p-4 rounded hover:bg-opacity-90 border border-gray-600">
              {cat.iconUrl ? (
                <img src={cat.iconUrl} alt={cat.title} className="w-12 h-12 mb-2" />
              ) : (
                <div className="w-12 h-12 mb-2 flex items-center justify-center bg-gray-700 rounded">
                  <span className="text-sm">No icon</span>
                </div>
              )}
              <span className="text-white font-semibold">{cat.title}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SpecialOffers() {
  return (
    <div className="bg-[#1C2021] p-6 rounded border border-gray-600">
      <h2 className="text-2xl text-secondary font-bold mb-4">Акции и скидки</h2>
      <p className="text-gray-300 mb-4">
        Здесь можно отобразить текущие скидки, распродажи или временные акции вашего магазина.
      </p>
      <Link href="/catalog?special=offers">
        <a className="bg-primary text-black px-4 py-2 rounded hover:bg-opacity-80 font-semibold">
          Все акции
        </a>
      </Link>
    </div>
  );
}
