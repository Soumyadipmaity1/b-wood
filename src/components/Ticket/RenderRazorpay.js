import { useEffect, useRef, useState } from "react";
import { createPayment, sendEmail } from "../../actions/razorpay";
import crypto from 'crypto-js';
import { redirect, useRouter } from 'next/navigation';
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("Razorpay loaded successfully");
      resolve(true);
      // Remove the script element from the DOM after it loads.
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
    script.onerror = () => {
      console.log("Error in loading Razorpay");
      resolve(false);
      // Remove the script element from the DOM if an error occurs.
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
    // Only append the script if document.body is not null
    if (document.body) {
      document.body.appendChild(script);
    } else {
      console.error("document.body is null. Cannot append Razorpay script.");
      resolve(false);
    }
  });

const RenderRazorpay = ({ orderId, keyId, keySecret, amount, showtime, selectedSeats }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const router = useRouter();
  const isMounted = useRef(true);
  const id=showtime.movieId._id
  const [user,setUser]=useState('')
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch the username from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);        
        if (userDoc.exists()) {
          setUser(userDoc.data().username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle payment success or failure
  const handlePayment = async (status, orderDetails) => {
    console.log(showtime, selectedSeats, amount);
    const email = auth.currentUser?.email;
    await createPayment(status, orderDetails, showtime, selectedSeats, amount,email);
    const paymentDetails = {
      status,
      orderId: orderDetails.orderId,
      paymentId: orderDetails.paymentId,
      showtime,
      selectedSeats,
      amount,
    };
    
    if (email) {
      const res = await sendEmail(email, paymentDetails);
      console.log(res);
    }    
    if (status === "succeeded") {
      window.location.href='/'
    }
  };

  // Options for Razorpay
  const options = {
    key: keyId,
    amount,
    currency: 'INR',
    name: username,
    order_id: orderId,
    handler: (response) => {
      console.log("Payment succeeded");
      console.log(response);
      paymentId.current = response.razorpay_payment_id;
      const succeeded =
        crypto
          .HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret)
          .toString() === response.razorpay_signature;

      if (succeeded) {
        handlePayment("succeeded", {
          orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
      } else {
        handlePayment("failed", {
          orderId,
          paymentId: response.razorpay_payment_id,
        });
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        if (reason === undefined) {
          console.log("Payment cancelled");
          handlePayment("Cancelled");
        } else if (reason === "timeout") {
          console.log("Payment timed out");
          handlePayment("timedout");
        } else {
          console.log("Payment failed");
          handlePayment("failed", reason.error);
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 1200,
    theme: {
      color: "",
    },
  };

  useEffect(() => {
    console.log("Initializing Razorpay");
    displayRazorpay(options);
  }, []);

  // Function to display the Razorpay payment form
  const displayRazorpay = async (options) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    rzp1.open();
  };

  return null;
};

export default RenderRazorpay;