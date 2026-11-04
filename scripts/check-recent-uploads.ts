import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function main() {
  const res = await cloudinary.search
    .expression("")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  console.log("Found total:", res.total_count);
  for (const r of res.resources) {
    console.log(`${r.created_at} | folder: ${r.asset_folder || r.folder} | public_id: ${r.public_id} | filename: ${r.filename}`);
  }
}

main().catch(console.error);

