"use client";

import { useCallback, useState } from "react";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/minikit-js";

export function VerifyButton({ onVerificationSuccess }: { onVerificationSuccess: () => void }) {
  const [status, setStatus] = useState("");

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setStatus("❌ MiniKit no está instalado.");
      return;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify({
      action: process.env.NEXT_PUBLIC_WLD_ACTION || "demo-action",
      signal: "",
      verification_level: VerificationLevel.Orb,
    });

    if (finalPayload.status === "error") {
      setStatus("❌ Falló la verificación");
      return;
    }

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: process.env.NEXT_PUBLIC_WLD_ACTION || "demo-action",
        signal: "",
      }),
    });

    const result = await res.json();

    if (res.status === 200 && result.success) {
      setStatus("✅ Verificación exitosa");
      onVerificationSuccess();
    } else if (result.verifyRes?.code === "already_verified") {
      setStatus("✅ Ya estabas verificado.");
      onVerificationSuccess();
    } else {
      setStatus("❌ Verificación fallida");
    }
  }, [onVerificationSuccess]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleVerify}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Verificar con World ID
      </button>
      <p>{status}</p>
    </div>
  );
}