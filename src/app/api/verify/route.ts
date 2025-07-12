import {
  verifyCloudProof,
  IVerifyResponse,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export async function POST(req: NextRequest) {
  try {
    const { payload, action, signal } = (await req.json()) as IRequestPayload;
    const app_id = process.env.APP_ID as `app_${string}`;

    const verifyRes: IVerifyResponse = await verifyCloudProof(
      payload,
      app_id,
      action,
      signal
    );

    // ✅ Consideramos verificación exitosa también si ya estaba verificado
    if (
      verifyRes.success ||
      verifyRes.code === "already_verified" ||
      verifyRes.detail?.toLowerCase().includes("already verified")
    ) {
      return NextResponse.json({ success: true, verifyRes }, { status: 200 });
    }

    // ❌ Cualquier otro error
    return NextResponse.json({ success: false, verifyRes }, { status: 400 });
  } catch (error) {
    console.error("Error en la verificación:", error);
    return NextResponse.json({ success: false, error: "internal_error" }, { status: 500 });
  }
}
