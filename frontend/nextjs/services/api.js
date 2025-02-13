// services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://example.com/api";

// Заглушка для получения всех категорий
export async function fetchCategories() {
  try {
    // Пример REST-запроса: GET /categories
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Все товары
export async function fetchAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Категория по slug
export async function fetchCategoryBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/categories?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch category");
    const data = await res.json();
    return data && data[0] ? data[0] : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Товары в категории
export async function fetchProductsByCategory(categoryId) {
  try {
    const res = await fetch(`${API_URL}/products?category=${categoryId}`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Поиск товаров
export async function searchProducts(query) {
  try {
    // Пример: GET /products?filters[title][$contains]=query
    const res = await fetch(`${API_URL}/products?search=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to fetch search results");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Профиль
export async function fetchUserProfile() {
  try {
    const res = await fetch(`${API_URL}/user/profile`, {
      // возможно, нужен токен:
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Заказы пользователя
export async function fetchUserOrders() {
  try {
    const res = await fetch(`${API_URL}/user/orders`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    if (!res.ok) throw new Error("Failed to fetch user orders");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Обновление профиля
export async function updateUserProfile(profileData) {
  try {
    const res = await fetch(`${API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(profileData)
    });
    if (!res.ok) throw new Error("Failed to update user profile");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
