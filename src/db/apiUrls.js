import supabase from "./supabase";
import supabaseUrl from "./supabase";
import UAParser from "ua-parser-js";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }
  return data;
}
export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete("*").eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }
  return data;
}
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);

  const filename = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(filename, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${"https://sbfqyfalktpbdwxnypch.supabase.co"}/storage/v1/object/public/qrs/${filename}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }
  return data;
}
export async function getLongUrl(id) {
  const { data, error } = await (
    await supabase.from("urls").select("id,original_url")
  ).error(`short_url.eq.${id},custom_url.eq.${id}`);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Urls");
  }
  return data;
}
const parser = new UAParser();
export const storeClicks = async ({ id, original_url }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country_name } = await response.json();
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });
    window.location.href = original_url;
  } catch (error) {}
};
