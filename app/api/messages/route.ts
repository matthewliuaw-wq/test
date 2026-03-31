import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

// GET: 获取所有留言，按时间倒序
export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: 提交一条新留言
export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "留言内容不能为空" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ content: content.trim() }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0], { status: 201 });
}
