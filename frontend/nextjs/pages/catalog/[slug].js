import Layout from "../../components/Layout";
import Link from "next/link";
import { fetchCategoryBySlug, fetchProductsByCategory } from "../../services/api";

export default function CategoryPage({ category, products }) {
  if (!category) {
    return (
      <Layout>
        <h1 className="text-2xl text-red-500">Категория не найдена</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-primary font-bold mb-4">
        Категория: {category.title}
      </h1>

      <section>
        {products.length === 0 ? (
          <p className="text-gray-300">В этой категории пока нет товаров.</p>
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

export async function getServerSideProps({ params }) {
  const { slug } = params;
  let category = null;
  let products = [];

  try {
    category = await fetchCategoryBySlug(slug);
    if (category) {
      products = await fetchProductsByCategory(category.id);
    }
  } catch (err) {
    console.error("Ошибка при загрузке категории:", err);
  }

  return {
    props: {
      category,
      products,
    },
  };
}
