import { NextRequest, NextResponse } from "next/server";
import companyData from "./companyData.json";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get("page") ?? 1) - 1, 0);
    const companies = companyData.slice(page * 20, (page + 1) * 20);
    return NextResponse.json(companies);
}