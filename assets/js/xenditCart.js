import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔥 Config Firebase Project kamu
const firebaseConfig = {
    apiKey: "{{site.api_key}}",
    authDomain: "{{site.auth_domain}}",
    projectId: "{{site.project_id}}",
    storageBucket: "{{site.storage_bucket}}",
    messagingSenderId: "{{site.sender_id}}",
    appId: "{{site.app_id}}",
    measurementId: "{{site.measure_id}}"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
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
    const res = await fetch('{% if page.xendit_options == "live" %}{{site.env.live_url}}{% elsif page.xendit_options == "test" %}{{site.env.test_url}}{% endif %}', {
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