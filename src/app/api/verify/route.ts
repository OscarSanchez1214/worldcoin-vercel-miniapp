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
  const { payload, action, signal } = (await req.json()) as IRequestPayload;
  const app_id = process.env.APP_ID as `app_${string}`;

  const verifyRes: IVerifyResponse = await verifyCloudProof(
    payload,
    app_id,
    action,
    signal
  );

  if (verifyRes.success) {
    return NextResponse.json({ success: true, verifyRes }, { status: 200 });
  } else {
    return NextResponse.json({ success: false, verifyRes }, { status: 400 });
  }
}