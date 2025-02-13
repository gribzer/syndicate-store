import Layout from "../../components/Layout";
import Link from "next/link";
import { fetchCategories, fetchAllProducts } from "../../services/api";

export default function CatalogPage({ categories, products }) {
  return (
    <Layout>
      <h1 className="text-2xl text-primary font-bold mb-4">Каталог</h1>

      {/* Блок категорий */}
      <section className="mb-8">
        <h2 className="text-xl text-secondary font-semibold mb-2">Категории</h2>
        {categories.length === 0 ? (
          <p className="text-gray-300">Категории не найдены.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/catalog/${cat.slug}`}>
                <a className="bg-[#1C2021] p-4 rounded border border-gray-700 hover:bg-opacity-80 flex flex-col items-center">
                  {cat.iconUrl ? (
                    <img
                      src={cat.iconUrl}
                      alt={cat.title}
                      className="w-12 h-12 mb-2"
                    />
                  ) : (
                    <div className="w-12 h-12 mb-2 bg-gray-600" />
                  )}
                  <span className="font-semibold text-white">{cat.title}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Блок всех товаров (по желанию — или делаем отдельную страницу) */}
      <section>
        <h2 className="text-xl text-secondary font-semibold mb-2">Все товары</h2>
        {products.length === 0 ? (
          <p className="text-gray-300">Товары не найдены.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <a className="bg-[#1C2021] p-4 rounded border border-gray-700 hover:bg-opacity-80 block">
                  <h3 className="font-semibold text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-300 mb-2">{product.price} ₽</p>
                  <p className="text-primary">Подробнее &rarr;</p>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  let categories = [];
  let products = [];
  try {
    categories = await fetchCategories();
    products = await fetchAllProducts();
  } catch (err) {
    console.error("Ошибка при загрузке каталога:", err);
  }

  return {
    props: {
      categories: categories || [],
      products: products || [],
    },
  };
}
