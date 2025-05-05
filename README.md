# 🛍️ E-Commerce Produk App (Firebase + Xendit)

A lightweight e-commerce web app built with **Firebase Firestore & Auth**, featuring real-time product stock, user ratings, likes, cart, checkout via **Xendit**, and admin-friendly features.

## 🚀 Features

### 👤 User Side
- 👤 Edit user profile
- 🔍 View product detail
- ⭐ Rate & review products
- ❤️ Like products (wishlist-style)
- 🛒 Add to cart & checkout
- 🔄 Real-time stock update
- 💸 Payment integration via Xendit

### 🔧 Admin Side
- 📦 Add/edit/delete products (Firestore)
- 📊 View product stats (likes, ratings)
- 🔐 Auth secured with Firebase Auth
- ✔ Telegram BOT Order notification
- ✅ Realtime chat telegram (in progress)
- ✅ Realtime order tracking (Coming soon)

## 🛠️ Tech Stack

| Layer       | Tech                                  |
|-------------|---------------------------------------|
| Frontend    | HTML, CSS, JavaScript                 |
| Backend     | Firebase Firestore & Auth     		  |
| Payment     | [Xendit API](https://xendit.co/)      |
| Auth        | Google Button, Email/Password Login   |
| Hosting     | Cloudflare Pages                      |

## 🔧 Setup & Development

1. **Clone repo:**
   ```bash
   git clone https://github.com/putridinar/xenditCart-onlineShop.git
   cd ecommerce-firebase
   ```

2. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login & init:**
   ```bash
   firebase login
   firebase init
   ```

4. **Run locally:**
   ```bash
   firebase emulators:start
   ```

5. **Deploy:**
   ```bash
   firebase deploy
   ```

## 🔐 Firebase Setup

- Create Firebase project
- Enable:
  - **Authentication > Email/Password**
  - **Firestore Database**
- Add Firebase config to your HTML:
  ```html
  <script>
    const firebaseConfig = {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      ...
    };
    firebase.initializeApp(firebaseConfig);
  </script>
  ```

## 💳 Payment (Xendit)

- Register at [xendit.co](https://xendit.co)
- Generate API Key
- Use Xendit API in checkout integration

## 📦 Firestore Structure (Example)

```json
products: {
  [productId]: {
    name: "Kaos Polos",
    price: 50000,
    stock: 20,
    description: "Kaos katun combed 30s",
    imageUrl: "...",
    colors: ["Hitam", "Putih"],
    rating: 4.6,
    totalRating: 18,
    likedBy: ["uid1", "uid2"]
  }
}
```

## ✅ Status

- [x] Product detail + rating
- [x] Likes & real-time stock
- [x] Cart & checkout
- [ ] Admin dashboard (in progress)
- [ ] Realtime chat (in progress)
- [ ] Order history (coming soon)

## 🧑‍💻 Author

Developed by [Putri Dinar]  
Contact: putridinar1990@gmail.com

---

> Build lightweight, mobile-first apps with Firebase + JS ✨