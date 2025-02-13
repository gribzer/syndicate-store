import { useCart } from "../../context/CartContext";
import Layout from "../../components/Layout";
import { fetchProductBySlug } from "../../services/api";

export default function ProductPage({ product }) {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="text-red-500">Товар не найден</div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-300 mb-4">{product.description}</p>
      <p className="text-secondary font-semibold mb-4">{product.price} ₽</p>
      <button
        onClick={handleAddToCart}
        className="bg-primary text-black py-2 px-4 rounded hover:opacity-90"
      >
        Добавить в корзину
      </button>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);
  return {
    props: {
      product,
    },
  };
}
