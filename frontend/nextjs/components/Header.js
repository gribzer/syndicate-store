import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <a className="text-primary font-bold text-xl">Syndicate Store</a>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/cart">
            <a className="hover:text-secondary">Корзина</a>
          </Link>
          <Link href="/checkout">
            <a className="hover:text-secondary">Оформить заказ</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
