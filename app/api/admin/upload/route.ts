import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { requireAdminAction } from "@/lib/admin-auth";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);
const maxSize = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireAdminAction();
    const formData = await request.formData();
    const file = formData.get("file");
    const bucket = formData.get("bucket") === "blog-images" ? "blog-images" : "product-images";
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    const extension = allowedTypes.get(file.type);
    if (!extension) return NextResponse.json({ error: "Use a JPG, PNG, WebP, or AVIF image." }, { status: 400 });
    if (file.size > maxSize) return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 413 });

    const path = `${user.id}/${randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    const { data, error: signingError } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
    if (signingError || !data?.signedUrl) {
      await supabase.storage.from(bucket).remove([path]);
      return NextResponse.json({ error: signingError?.message ?? "Could not create an image preview." }, { status: 500 });
    }
    return NextResponse.json({ storage_path: path, alt_text: "", url: data.signedUrl, bucket });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image upload failed.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
