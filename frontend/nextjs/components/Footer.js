export default function Footer() {
    return (
      <footer className="bg-background border-t border-gray-700 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Syndicate Store. Все права защищены.
          </p>
        </div>
      </footer>
    );
  }
  