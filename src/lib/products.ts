import { prisma, withDbTimeout } from "@/lib/prisma";
import { ShopQueryParams } from "@/lib/validators/shop";

export interface CatalogProduct {
  id: string;
  title: string;
  slug: string;
  catalogCode: string;
  description: string;
  categoryName: string;
  categorySlug: string;
  images: string[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isCustomBase: boolean;
  a4VariantId: string;
  a3VariantId: string;
  a4PricePaise: number;
  a3PricePaise: number;
  stock: number;
}

export const staticCatalog: CatalogProduct[] = [
  {
    "id": "cmvwn66v10006umj4veoq0a59",
    "title": "Sports Edition #01",
    "slug": "sports-edition-01",
    "catalogCode": "CAM-SP-01",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460176/36.jpg"
    ],
    "tags": [
      "sports",
      "edition-01",
      "cam-sp-01",
      "#01"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn67n20008umj4vcmywm8l",
    "a3VariantId": "cmvwn68if000aumj41lzexqkv",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn69au000cumj4iw2p7jtp",
    "title": "Sports Edition #02",
    "slug": "sports-edition-02",
    "catalogCode": "CAM-SP-02",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460173/37.jpg"
    ],
    "tags": [
      "sports",
      "edition-02",
      "cam-sp-02",
      "#02"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6a35000eumj4f86syavo",
    "a3VariantId": "cmvwn6apo000gumj4fvbhl08n",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6b9l000iumj41rzu9qzy",
    "title": "Sports Edition #03",
    "slug": "sports-edition-03",
    "catalogCode": "CAM-SP-03",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460173/38.jpg"
    ],
    "tags": [
      "sports",
      "edition-03",
      "cam-sp-03",
      "#03"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6bwq000kumj4ghscdofy",
    "a3VariantId": "cmvwn6cp4000mumj4xnj6g4xq",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6dem000oumj45gmvflxz",
    "title": "Sports Edition #04",
    "slug": "sports-edition-04",
    "catalogCode": "CAM-SP-04",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460173/39.jpg"
    ],
    "tags": [
      "sports",
      "edition-04",
      "cam-sp-04",
      "#04"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6dzv000qumj4zbupno34",
    "a3VariantId": "cmvwn6ejy000sumj425qm63zs",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6fay000uumj4unjzmvg9",
    "title": "Sports Edition #05",
    "slug": "sports-edition-05",
    "catalogCode": "CAM-SP-05",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460175/40.jpg"
    ],
    "tags": [
      "sports",
      "edition-05",
      "cam-sp-05",
      "#05"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6gd9000wumj4u11vr91q",
    "a3VariantId": "cmvwn6h54000yumj4nrbqingm",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6hws0010umj4dz7annue",
    "title": "Sports Edition #06",
    "slug": "sports-edition-06",
    "catalogCode": "CAM-SP-06",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460176/41_-_Copy.jpg"
    ],
    "tags": [
      "sports",
      "edition-06",
      "cam-sp-06",
      "#06"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6igr0012umj4mvpovske",
    "a3VariantId": "cmvwn6j0z0014umj48ch544mq",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6jn00016umj45wzjmy3u",
    "title": "Sports Edition #07",
    "slug": "sports-edition-07",
    "catalogCode": "CAM-SP-07",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460179/42.jpg"
    ],
    "tags": [
      "sports",
      "edition-07",
      "cam-sp-07",
      "#07"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6kd10018umj4ub1drwum",
    "a3VariantId": "cmvwn6l1d001aumj4k7old80j",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6lxv001cumj48744m45i",
    "title": "Sports Edition #08",
    "slug": "sports-edition-08",
    "catalogCode": "CAM-SP-08",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460178/43.jpg"
    ],
    "tags": [
      "sports",
      "edition-08",
      "cam-sp-08",
      "#08"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6mqx001eumj4lljo5ngw",
    "a3VariantId": "cmvwn6nav001gumj40opl0egc",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6nux001iumj4s8ig6fg3",
    "title": "Sports Edition #09",
    "slug": "sports-edition-09",
    "catalogCode": "CAM-SP-09",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460180/44_-_Copy.jpg"
    ],
    "tags": [
      "sports",
      "edition-09",
      "cam-sp-09",
      "#09"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6of3001kumj40r2zslld",
    "a3VariantId": "cmvwn6ozg001mumj4lea07zho",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6pjk001oumj440qsy2gu",
    "title": "Sports Edition #10",
    "slug": "sports-edition-10",
    "catalogCode": "CAM-SP-10",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/45_-_Copy.jpg"
    ],
    "tags": [
      "sports",
      "edition-10",
      "cam-sp-10",
      "#10"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6q7k001qumj468rotzhb",
    "a3VariantId": "cmvwn6r2s001sumj456rqnplf",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6rou001uumj4hwhtof5z",
    "title": "Sports Edition #11",
    "slug": "sports-edition-11",
    "catalogCode": "CAM-SP-11",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"
    ],
    "tags": [
      "sports",
      "edition-11",
      "cam-sp-11",
      "#11"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6sd0001wumj4ytss82nc",
    "a3VariantId": "cmvwn6sx6001yumj4z0zedqqh",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6toy0020umj4dlx2g48d",
    "title": "Sports Edition #12",
    "slug": "sports-edition-12",
    "catalogCode": "CAM-SP-12",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460182/msd2.jpg"
    ],
    "tags": [
      "sports",
      "edition-12",
      "cam-sp-12",
      "#12"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6uiv0022umj47byz13ss",
    "a3VariantId": "cmvwn6vdn0024umj4bt55yp22",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6w4w0026umj43u8hxpb0",
    "title": "Sports Edition #13",
    "slug": "sports-edition-13",
    "catalogCode": "CAM-SP-13",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460184/Untitled_design_-_Copy.jpg"
    ],
    "tags": [
      "sports",
      "edition-13",
      "cam-sp-13",
      "#13"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6wwd0028umj4za3cg4fr",
    "a3VariantId": "cmvwn6xmv002aumj42qc3n1h9",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn6yi5002cumj4ciy4zez1",
    "title": "Sports Edition #14",
    "slug": "sports-edition-14",
    "catalogCode": "CAM-SP-14",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460189/Untitled_design_17.jpg"
    ],
    "tags": [
      "sports",
      "edition-14",
      "cam-sp-14",
      "#14"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn6zam002eumj4q7ibsdrt",
    "a3VariantId": "cmvwn7006002gumj4ta38pmdf",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn70sq002iumj408rq3khm",
    "title": "Sports Edition #15",
    "slug": "sports-edition-15",
    "catalogCode": "CAM-SP-15",
    "categoryName": "Sports",
    "categorySlug": "sports",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460187/Untitled_design_3_-_Copy.jpg"
    ],
    "tags": [
      "sports",
      "edition-15",
      "cam-sp-15",
      "#15"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn71ib002kumj403ldzueq",
    "a3VariantId": "cmvwn727u002mumj4l2rlvj22",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn72xg002oumj4a32g30ei",
    "title": "God Edition #01",
    "slug": "god-edition-01",
    "catalogCode": "CAM-GD-01",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460207/download_10.jpg"
    ],
    "tags": [
      "god",
      "edition-01",
      "cam-gd-01",
      "#01"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn73px002qumj44r451jww",
    "a3VariantId": "cmvwn74o2002sumj48ijltist",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn75gh002uumj4e3pcak64",
    "title": "God Edition #02",
    "slug": "god-edition-02",
    "catalogCode": "CAM-GD-02",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460208/download_11.jpg"
    ],
    "tags": [
      "god",
      "edition-02",
      "cam-gd-02",
      "#02"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn76zj002wumj4gjr1s50w",
    "a3VariantId": "cmvwn77jy002yumj4yvlusoft",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn783z0030umj4rjyu5xgo",
    "title": "God Edition #03",
    "slug": "god-edition-03",
    "catalogCode": "CAM-GD-03",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460210/download_14.jpg"
    ],
    "tags": [
      "god",
      "edition-03",
      "cam-gd-03",
      "#03"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn78ph0032umj42j1066d0",
    "a3VariantId": "cmvwn79hj0034umj4my8j7so6",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7afm0036umj4ywhraii5",
    "title": "God Edition #04",
    "slug": "god-edition-04",
    "catalogCode": "CAM-GD-04",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460217/Untitled_design_6.jpg"
    ],
    "tags": [
      "god",
      "edition-04",
      "cam-gd-04",
      "#04"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7b840038umj4dghwcq3m",
    "a3VariantId": "cmvwn7c0k003aumj4nskkttjn",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7cvt003cumj4prmtlzfp",
    "title": "God Edition #05",
    "slug": "god-edition-05",
    "catalogCode": "CAM-GD-05",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460218/Untitled_design_7.jpg"
    ],
    "tags": [
      "god",
      "edition-05",
      "cam-gd-05",
      "#05"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7dlk003eumj4jbnq1imy",
    "a3VariantId": "cmvwn7edw003gumj4uak5z0km",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7f6d003iumj4egzvsocl",
    "title": "God Edition #06",
    "slug": "god-edition-06",
    "catalogCode": "CAM-GD-06",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460219/Untitled_design_8.jpg"
    ],
    "tags": [
      "god",
      "edition-06",
      "cam-gd-06",
      "#06"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7fyr003kumj4vlzfntiz",
    "a3VariantId": "cmvwn7gwv003mumj4sf1jeb91",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7hpb003oumj4fgzhujjk",
    "title": "God Edition #07",
    "slug": "god-edition-07",
    "catalogCode": "CAM-GD-07",
    "categoryName": "God",
    "categorySlug": "god",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460221/Untitled_design-84.jpg"
    ],
    "tags": [
      "god",
      "edition-07",
      "cam-gd-07",
      "#07"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7ihs003qumj4wrnas2ji",
    "a3VariantId": "cmvwn7jdt003sumj4spsar2qy",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7k8c003uumj4d9hu2elp",
    "title": "Anime Edition #01",
    "slug": "anime-edition-01",
    "catalogCode": "CAM-AN-01",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design.jpg"
    ],
    "tags": [
      "anime",
      "edition-01",
      "cam-an-01",
      "#01"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7kxz003wumj439l0pzkj",
    "a3VariantId": "cmvwn7lqd003yumj48ihqk395",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7mk10040umj4b2pxes43",
    "title": "Anime Edition #02",
    "slug": "anime-edition-02",
    "catalogCode": "CAM-AN-02",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_10_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-02",
      "cam-an-02",
      "#02"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7n4p0042umj4z8g1ohw0",
    "a3VariantId": "cmvwn7nor0044umj4kegh3skf",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7oc90046umj4otllj6b1",
    "title": "Anime Edition #03",
    "slug": "anime-edition-03",
    "catalogCode": "CAM-AN-03",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_13_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-03",
      "cam-an-03",
      "#03"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7p1n0048umj42dvd6824",
    "a3VariantId": "cmvwn7pqu004aumj4braaghb9",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7qas004cumj4y6zceuum",
    "title": "Anime Edition #04",
    "slug": "anime-edition-04",
    "catalogCode": "CAM-AN-04",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_30.jpg"
    ],
    "tags": [
      "anime",
      "edition-04",
      "cam-an-04",
      "#04"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7quo004eumj45j6rzedb",
    "a3VariantId": "cmvwn7rgi004gumj4r3dzdmvo",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7s4x004iumj4v8ogzb17",
    "title": "Anime Edition #05",
    "slug": "anime-edition-05",
    "catalogCode": "CAM-AN-05",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_32.jpg"
    ],
    "tags": [
      "anime",
      "edition-05",
      "cam-an-05",
      "#05"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7t2w004kumj47ea1qe3a",
    "a3VariantId": "cmvwn7tvd004mumj49h10jpzf",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7unv004oumj4we302agv",
    "title": "Anime Edition #06",
    "slug": "anime-edition-06",
    "catalogCode": "CAM-AN-06",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_34.jpg"
    ],
    "tags": [
      "anime",
      "edition-06",
      "cam-an-06",
      "#06"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7vg9004qumj4dfr3hkwi",
    "a3VariantId": "cmvwn7wbg004sumj4pyf6xh1x",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7x41004uumj4c9o6slwz",
    "title": "Anime Edition #07",
    "slug": "anime-edition-07",
    "catalogCode": "CAM-AN-07",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459549/Untitled_design_36.jpg"
    ],
    "tags": [
      "anime",
      "edition-07",
      "cam-an-07",
      "#07"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7y17004wumj4f5nbalpu",
    "a3VariantId": "cmvwn7yrq004yumj4rqbgi7le",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn7zdp0050umj436rpu84x",
    "title": "Anime Edition #08",
    "slug": "anime-edition-08",
    "catalogCode": "CAM-AN-08",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design_37.jpg"
    ],
    "tags": [
      "anime",
      "edition-08",
      "cam-an-08",
      "#08"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn7zz90052umj496pj008h",
    "a3VariantId": "cmvwn80jv0054umj497bufhr7",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn813w0056umj4hkw82y5r",
    "title": "Anime Edition #09",
    "slug": "anime-edition-09",
    "catalogCode": "CAM-AN-09",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_8_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-09",
      "cam-an-09",
      "#09"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn81nv0058umj4ou41ts7j",
    "a3VariantId": "cmvwn827t005aumj40wj09eot",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn82s3005cumj4gceb5jhu",
    "title": "Anime Edition #10",
    "slug": "anime-edition-10",
    "catalogCode": "CAM-AN-10",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_9.jpg"
    ],
    "tags": [
      "anime",
      "edition-10",
      "cam-an-10",
      "#10"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn83c1005eumj4v88c4ofu",
    "a3VariantId": "cmvwn842c005gumj499s72w8b",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn84uu005iumj4gttiyvzm",
    "title": "Marvel Edition #01",
    "slug": "marvel-edition-01",
    "catalogCode": "CAM-MV-01",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459816/645e876a-7d7d-4849-8900-1e54da21fe69.jpg"
    ],
    "tags": [
      "marvel",
      "edition-01",
      "cam-mv-01",
      "#01"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn85fj005kumj4fz9au5u9",
    "a3VariantId": "cmvwn85zl005mumj4k358kjr0",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn86jk005oumj470y8stqb",
    "title": "Marvel Edition #02",
    "slug": "marvel-edition-02",
    "catalogCode": "CAM-MV-02",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459815/68cce7c7-5acb-460c-b91f-5a06dc1f6adf.jpg"
    ],
    "tags": [
      "marvel",
      "edition-02",
      "cam-mv-02",
      "#02"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8748005qumj4xln1ezvl",
    "a3VariantId": "cmvwn87nz005sumj4ie0mftcs",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn889e005uumj44u9oeavk",
    "title": "Marvel Edition #03",
    "slug": "marvel-edition-03",
    "catalogCode": "CAM-MV-03",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459815/7c9ca74b-7633-434d-afdf-cafb85876c6e.jpg"
    ],
    "tags": [
      "marvel",
      "edition-03",
      "cam-mv-03",
      "#03"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn891g005wumj4khou0sd0",
    "a3VariantId": "cmvwn89ym005yumj4ou2h97dm",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8akt0060umj4si07amt1",
    "title": "Marvel Edition #04",
    "slug": "marvel-edition-04",
    "catalogCode": "CAM-MV-04",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459817/931fc9d1-8b72-48b7-8f19-9c4a815878e1.jpg"
    ],
    "tags": [
      "marvel",
      "edition-04",
      "cam-mv-04",
      "#04"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8bsi0062umj4t6li5q6z",
    "a3VariantId": "cmvwn8cd00064umj4zbpqgw43",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8cww0066umj4xdicrxel",
    "title": "Marvel Edition #05",
    "slug": "marvel-edition-05",
    "catalogCode": "CAM-MV-05",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459818/An%C3%A1lise_do_filme_Doutor_Estranho_No_Multiverso_da_Loucura_CLIQUE_NO_PIN.jpg"
    ],
    "tags": [
      "marvel",
      "edition-05",
      "cam-mv-05",
      "#05"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8dgt0068umj4mrruiols",
    "a3VariantId": "cmvwn8e0t006aumj4te938a2u",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8eo9006cumj4d55v7j7q",
    "title": "Marvel Edition #06",
    "slug": "marvel-edition-06",
    "catalogCode": "CAM-MV-06",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459818/c06553fa-7973-4d4e-b8c1-c96ceb0c2402.jpg"
    ],
    "tags": [
      "marvel",
      "edition-06",
      "cam-mv-06",
      "#06"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8fgg006eumj4k9wricdj",
    "a3VariantId": "cmvwn8gbe006gumj4m0nuxv2n",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8h9w006iumj4f427v3ol",
    "title": "Marvel Edition #07",
    "slug": "marvel-edition-07",
    "catalogCode": "CAM-MV-07",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459819/DEADPOOL_4K_WALLPAPER_nel_2024___Sfondi_per_iphone_Supereroi_Sfondi_per_cellulare.jpg"
    ],
    "tags": [
      "marvel",
      "edition-07",
      "cam-mv-07",
      "#07"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8hw4006kumj4xxp7lsj3",
    "a3VariantId": "cmvwn8ion006mumj4h3aoc2u6",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8jcg006oumj4572g9f2m",
    "title": "Marvel Edition #08",
    "slug": "marvel-edition-08",
    "catalogCode": "CAM-MV-08",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459820/dedc17b8-a313-4623-9b11-72c98ac97dad.jpg"
    ],
    "tags": [
      "marvel",
      "edition-08",
      "cam-mv-08",
      "#08"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8jwj006qumj4il0skv8g",
    "a3VariantId": "cmvwn8kgx006sumj4je1mc6cu",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8l1p006uumj4h7d3235v",
    "title": "Marvel Edition #09",
    "slug": "marvel-edition-09",
    "catalogCode": "CAM-MV-09",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459821/Marvel_Avengers_%EF%B8%8F.jpg"
    ],
    "tags": [
      "marvel",
      "edition-09",
      "cam-mv-09",
      "#09"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8lo8006wumj43u26fezn",
    "a3VariantId": "cmvwn8m85006yumj4umkxiffx",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8msa0070umj4jf43u8r9",
    "title": "Marvel Edition #10",
    "slug": "marvel-edition-10",
    "catalogCode": "CAM-MV-10",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459822/SpiderMan_Home_Coming.jpg"
    ],
    "tags": [
      "marvel",
      "edition-10",
      "cam-mv-10",
      "#10"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8nca0072umj46znifomb",
    "a3VariantId": "cmvwn8nwe0074umj4lm8w8mrj",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8ojc0076umj4blfnrg73",
    "title": "Marvel Edition #11",
    "slug": "marvel-edition-11",
    "catalogCode": "CAM-MV-11",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459823/The_Scarlet_Witch.jpg"
    ],
    "tags": [
      "marvel",
      "edition-11",
      "cam-mv-11",
      "#11"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8p8k0078umj44a2wn9v2",
    "a3VariantId": "cmvwn8psz007aumj4sml68gnw",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8qd3007cumj427h02fad",
    "title": "Marvel Edition #12",
    "slug": "marvel-edition-12",
    "catalogCode": "CAM-MV-12",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459825/Thor__God_of_Thunder.jpg"
    ],
    "tags": [
      "marvel",
      "edition-12",
      "cam-mv-12",
      "#12"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8qx9007eumj42ktmdtbh",
    "a3VariantId": "cmvwn8rh9007gumj43v5hfvx1",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8s19007iumj4gmuamptf",
    "title": "Marvel Edition #13",
    "slug": "marvel-edition-13",
    "catalogCode": "CAM-MV-13",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459824/Thor_personaje_de_Marvel_Comics_creado_con_IA.jpg"
    ],
    "tags": [
      "marvel",
      "edition-13",
      "cam-mv-13",
      "#13"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8sll007kumj4mhjapb3e",
    "a3VariantId": "cmvwn8ti6007mumj42niuq9f7",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8udm007oumj4o6kk5if3",
    "title": "Marvel Edition #14",
    "slug": "marvel-edition-14",
    "catalogCode": "CAM-MV-14",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459824/Thor_Wallpaper_4K.jpg"
    ],
    "tags": [
      "marvel",
      "edition-14",
      "cam-mv-14",
      "#14"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8vko007qumj4jx6vlt5o",
    "a3VariantId": "cmvwn8w6j007sumj4o6itidji",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8wsv007uumj4c6nd6u93",
    "title": "Marvel Edition #15",
    "slug": "marvel-edition-15",
    "catalogCode": "CAM-MV-15",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459826/Tony_Stark__3.jpg"
    ],
    "tags": [
      "marvel",
      "edition-15",
      "cam-mv-15",
      "#15"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn8xgf007wumj4o7b6y2vm",
    "a3VariantId": "cmvwn8y69007yumj4xn02l65z",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn8zo20080umj4plrgnd5h",
    "title": "Marvel Edition #16",
    "slug": "marvel-edition-16",
    "catalogCode": "CAM-MV-16",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Vengadores_Endgame_Fondo_Pantalla_4k_Descargar_Wallpapers_De_Avengers_D23.jpg"
    ],
    "tags": [
      "marvel",
      "edition-16",
      "cam-mv-16",
      "#16"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn90fk0082umj4e1mb5fn2",
    "a3VariantId": "cmvwn90zl0084umj49amg8di8",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn91jk0086umj4nemygz2c",
    "title": "Marvel Edition #17",
    "slug": "marvel-edition-17",
    "catalogCode": "CAM-MV-17",
    "categoryName": "Marvel",
    "categorySlug": "marvel",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Wanda_Maximoff__Scarlet_Witch_wallpaper.jpg"
    ],
    "tags": [
      "marvel",
      "edition-17",
      "cam-mv-17",
      "#17"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn927d0088umj4uwrtowju",
    "a3VariantId": "cmvwn932e008aumj4xa2t8cb3",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn93uu008cumj4tqb11ms0",
    "title": "Motivation Edition #01",
    "slug": "motivation-edition-01",
    "catalogCode": "CAM-MT-01",
    "categoryName": "Motivation",
    "categorySlug": "motivation",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463264/Untitled_design_1.jpg"
    ],
    "tags": [
      "motivation",
      "edition-01",
      "cam-mt-01",
      "#01"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn94n8008eumj492tuti91",
    "a3VariantId": "cmvwn95ld008gumj453cayevx",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn96e6008iumj47h28aai6",
    "title": "Motivation Edition #02",
    "slug": "motivation-edition-02",
    "catalogCode": "CAM-MT-02",
    "categoryName": "Motivation",
    "categorySlug": "motivation",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463265/Untitled_design_2.jpg"
    ],
    "tags": [
      "motivation",
      "edition-02",
      "cam-mt-02",
      "#02"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn976b008kumj4idou4g60",
    "a3VariantId": "cmvwn97yr008mumj46hixp7gu",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn98r6008oumj48baslvqi",
    "title": "Motivation Edition #03",
    "slug": "motivation-edition-03",
    "catalogCode": "CAM-MT-03",
    "categoryName": "Motivation",
    "categorySlug": "motivation",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463265/Untitled_design_3.jpg"
    ],
    "tags": [
      "motivation",
      "edition-03",
      "cam-mt-03",
      "#03"
    ],
    "isActive": true,
    "isFeatured": true,
    "isCustomBase": false,
    "a4VariantId": "cmvwn99gv008qumj4ltogifc4",
    "a3VariantId": "cmvwn9ac1008sumj4iiy6zlvi",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn9b4v008uumj4exglft7q",
    "title": "Motivation Edition #04",
    "slug": "motivation-edition-04",
    "catalogCode": "CAM-MT-04",
    "categoryName": "Motivation",
    "categorySlug": "motivation",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463267/Untitled_design_4.jpg"
    ],
    "tags": [
      "motivation",
      "edition-04",
      "cam-mt-04",
      "#04"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn9bwx008wumj49fwva4ou",
    "a3VariantId": "cmvwn9cpe008yumj4kf8q2y0c",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  },
  {
    "id": "cmvwn9df20090umj447ovn4tw",
    "title": "Motivation Edition #05",
    "slug": "motivation-edition-05",
    "catalogCode": "CAM-MT-05",
    "categoryName": "Motivation",
    "categorySlug": "motivation",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463269/Untitled_design_5.jpg"
    ],
    "tags": [
      "motivation",
      "edition-05",
      "cam-mt-05",
      "#05"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvwn9e7h0092umj4fgx3rf3e",
    "a3VariantId": "cmvwn9ezx0094umj41pmt8f8q",
    "a4PricePaise": 7000,
    "a3PricePaise": 12000,
    "stock": 50
  }
];

function extractCatalogCode(tags: string[]): string {
  const codeTag = tags.find((t) => /^cam-[a-z]{2}-\d{2}$/i.test(t));
  return codeTag ? codeTag.toUpperCase() : "";
}

/**
 * Retrieves catalog products from DB with fast fallback to static catalog.
 */
export async function getCatalogProducts(params: ShopQueryParams): Promise<CatalogProduct[]> {
  try {
    const whereClause: any = {
      isActive: true,
      isCustomBase: false,
    };

    if (params.category && params.category !== "ALL") {
      whereClause.category = {
        slug: params.category,
      };
    }

    if (params.q) {
      whereClause.OR = [
        { title: { contains: params.q, mode: "insensitive" } },
        { tags: { has: params.q.toLowerCase() } },
      ];
    }

    const orderBy: any = {};
    if (params.sort === "price_asc") orderBy.createdAt = "asc";
    else if (params.sort === "price_desc") orderBy.createdAt = "desc";
    else orderBy.createdAt = "desc";

    const dbProducts = await withDbTimeout(
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
          variants: true,
        },
        orderBy,
      }),
      1000
    );

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => {
        const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
        const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          catalogCode: extractCatalogCode(p.tags),
          description: "",
          categoryName: p.category.name,
          categorySlug: p.category.slug,
          images: p.images.length > 0 ? p.images : ["https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"],
          tags: p.tags,
          isActive: p.isActive,
          isFeatured: p.isFeatured,
          isCustomBase: p.isCustomBase,
          a4VariantId: a4Var ? a4Var.id : `a4_${p.id}`,
          a3VariantId: a3Var ? a3Var.id : `a3_${p.id}`,
          a4PricePaise: a4Var ? a4Var.pricePaise : 7000,
          a3PricePaise: a3Var ? a3Var.pricePaise : 12000,
          stock: a4Var ? a4Var.stock : 50,
        };
      });
    }
  } catch (error) {
    console.warn("[getCatalogProducts] DB query error or timeout, falling back to static catalog:", error);
  }

  // Fast offline / build fallback
  let products = [...staticCatalog];
  if (params.category && params.category !== "ALL") {
    products = products.filter((p) => p.categorySlug === params.category);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.catalogCode.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  try {
    const p = await withDbTimeout(
      prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          variants: true,
        },
      }),
      800
    );

    if (p) {
      const a4Var = p.variants.find((v) => v.size === "A4") || p.variants[0];
      const a3Var = p.variants.find((v) => v.size === "A3") || p.variants[p.variants.length - 1];
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        catalogCode: extractCatalogCode(p.tags),
        description: "",
        categoryName: p.category.name,
        categorySlug: p.category.slug,
        images: p.images.length > 0 ? p.images : ["https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg"],
        tags: p.tags,
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        isCustomBase: p.isCustomBase,
        a4VariantId: a4Var ? a4Var.id : `a4_${p.id}`,
        a3VariantId: a3Var ? a3Var.id : `a3_${p.id}`,
        a4PricePaise: a4Var ? a4Var.pricePaise : 7000,
        a3PricePaise: a3Var ? a3Var.pricePaise : 12000,
        stock: a4Var ? a4Var.stock : 50,
      };
    }
  } catch {
    // fallback
  }

  const found = staticCatalog.find((p) => p.slug === slug);
  return found || null;
}

export async function getRelatedProducts(slug: string, categorySlug: string): Promise<CatalogProduct[]> {
  const all = await getCatalogProducts({ q: "", category: categorySlug, size: "ALL", finish: "ALL", sort: "popular", minPrice: 0, maxPrice: 50000, page: 1 });
  return all.filter((p) => p.slug !== slug).slice(0, 4);
}
