import { NextResponse } from "next/server"

type LeadPayload = {
  name?: string
  organization?: string
  contact?: string
  interest?: string
  message?: string
  language?: string
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload

  if (!payload.name || !payload.contact) {
    return NextResponse.json({ error: "Name and contact are required" }, { status: 400 })
  }

  const lead = {
    ...payload,
    source: "faraday-landing",
    createdAt: new Date().toISOString(),
  }

  if (process.env.LEADS_WEBHOOK_URL) {
    const response = await fetch(process.env.LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Lead webhook failed" }, { status: 502 })
    }
  } else {
    console.info("FARADAY lead received", lead)
  }

  return NextResponse.json({ ok: true })
}
