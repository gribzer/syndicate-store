import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-[#1C2021] p-4 rounded shadow-md text-textMain">
      <Link href={`/product/${product.slug}`}>
        <a className="block mb-2 font-bold text-lg hover:text-primary">
          {product.title}
        </a>
      </Link>
      <div className="text-gray-300 text-sm mb-2 line-clamp-2">
        {product.description}
      </div>
      <div className="text-secondary font-semibold mb-2">
        {product.price} ₽
      </div>
      <Link href={`/product/${product.slug}`}>
        <a className="bg-primary text-black py-1 px-3 rounded hover:opacity-90">
          Подробнее
        </a>
      </Link>
    </div>
  );
}
