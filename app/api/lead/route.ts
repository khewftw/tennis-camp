import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const token = process.env.TG_BOT_TOKEN;
  const chat = process.env.TG_CHAT_ID;

  if (!token || !chat) {
    console.log("lead", body);
    return NextResponse.json({ ok: true });
  }

  const text = [
    "Новая заявка Camp n Tennis",
    `Имя: ${body.name ?? ""}`,
    `Телефон: ${body.phone ?? ""}`,
    `Связь: ${body.channel ?? ""}`,
    `Уровень: ${body.level ?? ""}`,
    `Формат: ${body.format ?? ""}`,
    `Корт: ${body.court ?? ""}`,
    `Кэмп: ${body.campId ?? ""}`,
    `Источник: ${body.source ?? ""}`,
  ].join("\n");

  const telegram = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text }),
    },
  );

  if (!telegram.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
