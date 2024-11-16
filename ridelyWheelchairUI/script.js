// Import and configure Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzAkFZCALk96ngCmC9u6Wbns3IFoMVCPI",
    authDomain: "auto-wheel.firebaseapp.com",
    projectId: "auto-wheel",
    storageBucket: "auto-wheel.firebasestorage.app",
    messagingSenderId: "56170845456",
    appId: "1:56170845456:web:ddc0031ddc4e99414c0195"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // DOM elements
  const batteryElement = document.getElementById("battery");
  const distanceElement = document.getElementById("distance");
  const locationElement = document.getElementById("location");
  const statusElement = document.getElementById("status");
  const qrCodeElement = document.getElementById("qr-code");
  
  // Fetch wheelchair data from Firestore
  const fetchWheelchairData = async () => {
    try {
      const docRef = doc(db, "wheelchairs", "WC004"); // Replace 'wheelchair1' with your document ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        batteryElement.textContent = data.battery || "N/A";
        distanceElement.textContent = data.distance || "N/A";
        locationElement.textContent = data.location || "N/A";
        statusElement.textContent = data.status || "N/A";
        if (data.qrCode) {
          qrCodeElement.src = data.qrCode;
          qrCodeElement.alt = "QR Code for the selected wheelchair";
        } else {
          qrCodeElement.src = "";
          qrCodeElement.alt = "No QR Code available";
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  
  // Call the function to fetch data
  fetchWheelchairData();
  