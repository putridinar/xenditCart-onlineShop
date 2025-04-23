import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔥 Config Firebase Project kamu
const firebaseConfig = {
  apiKey: "AIzaSyDN2dgu-Sdsc9K5fermxPFwDUiCzX71ce8",
  authDomain: "tokoputridinar.firebaseapp.com",
  projectId: "tokoputridinar",
  storageBucket: "tokoputridinar.firebasestorage.app",
  messagingSenderId: "747234240117",
  appId: "1:747234240117:web:a87af4f6724ab87ad23a3c",
  measurementId: "G-M2JGJH3NVQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🔥 Tangkap currentUser
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountMobile = document.getElementById('cartCountMobile');
  const cartCountDesktop = document.getElementById('cartCountDesktop');
  
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountMobile) cartCountMobile.innerText = totalItems;
  if (cartCountDesktop) cartCountDesktop.innerText = totalItems;
}

async function checkoutCart() {
  if (!currentUser) {
    showToast("Silakan login untuk checkout!", "warning");
    return;
  }

  const cartRef = collection(db, `carts/${currentUser.uid}/items`);
  const snapshot = await getDocs(cartRef);

  if (snapshot.empty) {
    showToast("Keranjang kosong!", "warning");
    return;
  }

  let cartItems = [];
  let totalPrice = 0;

  snapshot.forEach(docSnap => {
    const item = docSnap.data();
    cartItems.push({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      image: item.image
    });
    totalPrice += item.price * item.quantity;
  });

  // 🔥 Kirim data ini ke server / Xendit
  try {
    const res = await fetch('https://xendit-app.putridinar.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        total: totalPrice
      })
    });

    const result = await res.json();

    if (result.invoice_url) {
      window.location.href = result.invoice_url;
    } else {
      showToast('❌ Gagal buat invoice: ' + (result.message || 'Unknown error'), 'danger');
    }
  } catch (error) {
    console.error(error);
    showToast('❌ Checkout Error: ' + error.message, 'danger');
  }
}
window.checkoutCart = checkoutCart;