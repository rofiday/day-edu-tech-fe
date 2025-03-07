import { useEffect } from "react";

const MidtransPaymentSection = () => {
  const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  const snapUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <div>MidtransPaymentSection</div>;
};

export default MidtransPaymentSection;
