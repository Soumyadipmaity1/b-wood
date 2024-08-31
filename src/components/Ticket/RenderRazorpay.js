import { useEffect, useRef } from "react";
import { createPayment } from "../../actions/razorpay";
import crypto from 'crypto-js';
import { useRouter } from 'next/navigation';

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({ orderId, keyId, keySecret, amount, showtime, selectedSeats }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const router = useRouter();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  const handlePayment = async (status, orderDetails) => {
    console.log(status, orderDetails);
    await createPayment(status, orderDetails, showtime, selectedSeats, amount);

    if (status === "succeeded") {
      router.push('/'); // Safe to navigate since the component is still mounted
    }
  };

  const options = {
    key: keyId,
    amount,
    currency: 'INR',
    name: "amit",
    order_id: orderId,
    handler: (response) => {
      console.log("succeeded");
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
          console.log("cancelled");
          handlePayment("Cancelled");
        } else if (reason === "timeout") {
          console.log("timedout");
          handlePayment("timedout");
        } else {
          console.log("failed");
          handlePayment("failed", reason.error);
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: "",
    },
  };

  useEffect(() => {
    console.log("in razorpay");
    displayRazorpay(options);
  }, []);

  return null;
};

export default RenderRazorpay;