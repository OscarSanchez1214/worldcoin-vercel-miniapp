"use client";

import { useState, useEffect } from "react";
import { VerifyButton } from "@/components/VerifyButton";

export default function Page() {
  const [verified, setVerified] = useState(false);

  const handleVerificationSuccess = () => {
    setVerified(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">MiniApp World ID</h1>
      {verified ? (
        <p className="text-green-600 text-xl">✅ Verificación exitosa</p>
      ) : (
        <VerifyButton onVerificationSuccess={handleVerificationSuccess} />
      )}
    </div>
  );
}