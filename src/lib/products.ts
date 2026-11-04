import { prisma, withDbTimeout } from "@/lib/prisma";
import { ShopQueryParams } from "@/lib/validators/shop";
import { Prisma } from "@prisma/client";

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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544200/0115c7346b28bbb3a9eefe1447dae0d8.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544197/06c0a1550c47859f8131020992ccb479.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544200/089af24e91018ca4cc9498e1a48632b4.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544191/0fbbfeef9100fe9a085a1ea5a0c348c5.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544199/12d62d86cc61736de9b7eb4c8cc75938.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544201/139e139166186af4ed64ed32771f4f8c.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544203/195ed28533727c88d6197307609551b8.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544194/1b877f18dfd4021f3f83a7c615afef3c.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544194/1c5c2c9f796eac1320117ca96bd27778.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544204/24108bdce626d095728a118b1d44f726.jpg"
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy2w35005iumw404xu7gus",
    "title": "Anime Edition #11",
    "slug": "anime-edition-11",
    "catalogCode": "CAM-AN-11",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544195/2f1c2e3a39642257410ea73bbb7205c4.jpg"
    ],
    "tags": [
      "anime",
      "edition-11",
      "cam-an-11",
      "#11"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy2wva005kumw49qekoouh",
    "a3VariantId": "cmvxy2xii005mumw41tbw9vtd",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy2y66005oumw48x6hgekc",
    "title": "Anime Edition #12",
    "slug": "anime-edition-12",
    "catalogCode": "CAM-AN-12",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544204/31526e61ac1a5e8c0064db44ddd12926.jpg"
    ],
    "tags": [
      "anime",
      "edition-12",
      "cam-an-12",
      "#12"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy2yt7005qumw4713et8fb",
    "a3VariantId": "cmvxy2zgd005sumw4fqmg7jos",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy303i005uumw48741eyyd",
    "title": "Anime Edition #13",
    "slug": "anime-edition-13",
    "catalogCode": "CAM-AN-13",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544203/3288cb9982c02e0e1f8131615f05574d.jpg"
    ],
    "tags": [
      "anime",
      "edition-13",
      "cam-an-13",
      "#13"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy30qt005wumw4l6joie76",
    "a3VariantId": "cmvxy31fp005yumw41qazu0zl",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy322t0060umw4cx1pkzt3",
    "title": "Anime Edition #14",
    "slug": "anime-edition-14",
    "catalogCode": "CAM-AN-14",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544203/332ded66919c3b4b092478ab4d8e138a.jpg"
    ],
    "tags": [
      "anime",
      "edition-14",
      "cam-an-14",
      "#14"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy32qg0062umw464sa91wk",
    "a3VariantId": "cmvxy33dh0064umw46n6vvn1t",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy343d0066umw4bwyo9wvw",
    "title": "Anime Edition #15",
    "slug": "anime-edition-15",
    "catalogCode": "CAM-AN-15",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544206/35372b785e8f7e92c744295942d872da.jpg"
    ],
    "tags": [
      "anime",
      "edition-15",
      "cam-an-15",
      "#15"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy34xi0068umw41i2xgz9p",
    "a3VariantId": "cmvxy35kk006aumw4e8uz1eps",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy367r006cumw4frj68q6f",
    "title": "Anime Edition #16",
    "slug": "anime-edition-16",
    "catalogCode": "CAM-AN-16",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544199/38f872962b35675c17b39a8a5a6bbf95.jpg"
    ],
    "tags": [
      "anime",
      "edition-16",
      "cam-an-16",
      "#16"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy36vk006eumw4e04trbko",
    "a3VariantId": "cmvxy37ja006gumw41l0oiksz",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy38c8006iumw4rvyyb72j",
    "title": "Anime Edition #17",
    "slug": "anime-edition-17",
    "catalogCode": "CAM-AN-17",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544195/3da437e48ff89ef53a7387d2068ee406.jpg"
    ],
    "tags": [
      "anime",
      "edition-17",
      "cam-an-17",
      "#17"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy393y006kumw4s6l18u8z",
    "a3VariantId": "cmvxy39r3006mumw46l2n6adk",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3aed006oumw4zwm3siyo",
    "title": "Anime Edition #18",
    "slug": "anime-edition-18",
    "catalogCode": "CAM-AN-18",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544195/3ece09d86f12595a65dddfa395723d52.jpg"
    ],
    "tags": [
      "anime",
      "edition-18",
      "cam-an-18",
      "#18"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3b1g006qumw4hmb0yfna",
    "a3VariantId": "cmvxy3bp0006sumw45mcb89gm",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3cdp006uumw48lgn8aob",
    "title": "Anime Edition #19",
    "slug": "anime-edition-19",
    "catalogCode": "CAM-AN-19",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544207/408393a7c2fdb042ea910c32f10d7708.jpg"
    ],
    "tags": [
      "anime",
      "edition-19",
      "cam-an-19",
      "#19"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3d0u006wumw4idl5f1iv",
    "a3VariantId": "cmvxy3doi006yumw46hj6qy9q",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3ebq0070umw4okbwzksm",
    "title": "Anime Edition #20",
    "slug": "anime-edition-20",
    "catalogCode": "CAM-AN-20",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544200/43c5335880cbf27282c06b9a1ad8a852.jpg"
    ],
    "tags": [
      "anime",
      "edition-20",
      "cam-an-20",
      "#20"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3f0z0072umw4p2blyeq6",
    "a3VariantId": "cmvxy3gbf0074umw49o36iaq0",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3iob0076umw4jlkrnp2e",
    "title": "Anime Edition #21",
    "slug": "anime-edition-21",
    "catalogCode": "CAM-AN-21",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544207/471497bea7c230e039a57ee43aa6fbae.jpg"
    ],
    "tags": [
      "anime",
      "edition-21",
      "cam-an-21",
      "#21"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3jbj0078umw4couqbtx3",
    "a3VariantId": "cmvxy3k2d007aumw4w4wub3hm",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3mgx007cumw4losrt8wt",
    "title": "Anime Edition #22",
    "slug": "anime-edition-22",
    "catalogCode": "CAM-AN-22",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544195/4d4d6826b1b430f9d730d22124c5ebdc.jpg"
    ],
    "tags": [
      "anime",
      "edition-22",
      "cam-an-22",
      "#22"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3nki007eumw4qrloedzv",
    "a3VariantId": "cmvxy3o9r007gumw4eenz275w",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3oxq007iumw4a9f4dt4o",
    "title": "Anime Edition #23",
    "slug": "anime-edition-23",
    "catalogCode": "CAM-AN-23",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544187/53517e7e4c6590291b74fdee5abd7c3f.jpg"
    ],
    "tags": [
      "anime",
      "edition-23",
      "cam-an-23",
      "#23"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3poq007kumw4yohh0kjg",
    "a3VariantId": "cmvxy3qvc007mumw4zi3yuzx0",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3rwf007oumw4p2diexdr",
    "title": "Anime Edition #24",
    "slug": "anime-edition-24",
    "catalogCode": "CAM-AN-24",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544186/548dbf1dfae269371dc4e0cfe012c082.jpg"
    ],
    "tags": [
      "anime",
      "edition-24",
      "cam-an-24",
      "#24"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3sro007qumw4mtmi92a2",
    "a3VariantId": "cmvxy3tk6007sumw4ggvq3pzi",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3ufh007uumw4uxzgmo65",
    "title": "Anime Edition #25",
    "slug": "anime-edition-25",
    "catalogCode": "CAM-AN-25",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544182/55c436267f3495c4f2ed77b8b32f37f5.jpg"
    ],
    "tags": [
      "anime",
      "edition-25",
      "cam-an-25",
      "#25"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3v7x007wumw4qa2xncgb",
    "a3VariantId": "cmvxy3vx1007yumw4wuujcsm3",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3wkc0080umw4w4n07mdo",
    "title": "Anime Edition #26",
    "slug": "anime-edition-26",
    "catalogCode": "CAM-AN-26",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544182/56f06fa97513a8d4854d36393a58742b.jpg"
    ],
    "tags": [
      "anime",
      "edition-26",
      "cam-an-26",
      "#26"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3x7q0082umw4a43pizdh",
    "a3VariantId": "cmvxy3xv00084umw4kp0tlkhk",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy3yn90086umw4h8jhxvp0",
    "title": "Anime Edition #27",
    "slug": "anime-edition-27",
    "catalogCode": "CAM-AN-27",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544186/5885cc4d5596900cae2323caa4848d79.jpg"
    ],
    "tags": [
      "anime",
      "edition-27",
      "cam-an-27",
      "#27"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy3zad0088umw41ue7x3am",
    "a3VariantId": "cmvxy400o008aumw43vqa05a4",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy40nw008cumw43p1v6kjb",
    "title": "Anime Edition #28",
    "slug": "anime-edition-28",
    "catalogCode": "CAM-AN-28",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544177/5acda39053aeaae70a0db3de3213b4b8.jpg"
    ],
    "tags": [
      "anime",
      "edition-28",
      "cam-an-28",
      "#28"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy41bj008eumw48jtu0r99",
    "a3VariantId": "cmvxy41za008gumw4thdnovc7",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy42mj008iumw4is7iq29c",
    "title": "Anime Edition #29",
    "slug": "anime-edition-29",
    "catalogCode": "CAM-AN-29",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544178/5c8a35f59e865c5fd3ff7bc12e05f0c8.jpg"
    ],
    "tags": [
      "anime",
      "edition-29",
      "cam-an-29",
      "#29"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy43fx008kumw4uhni9gm4",
    "a3VariantId": "cmvxy4463008mumw4r8w25d2q",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy44wv008oumw4bbbofd66",
    "title": "Anime Edition #30",
    "slug": "anime-edition-30",
    "catalogCode": "CAM-AN-30",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544183/60b2c4ac4fd25cc34d2eef5a0708f394.jpg"
    ],
    "tags": [
      "anime",
      "edition-30",
      "cam-an-30",
      "#30"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy45lg008qumw416xclsek",
    "a3VariantId": "cmvxy47oo008sumw4ryn31zzi",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy48cc008uumw4fyhzdlrw",
    "title": "Anime Edition #31",
    "slug": "anime-edition-31",
    "catalogCode": "CAM-AN-31",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544188/64613e8d9d8c234ce4265ae13874b08d.jpg"
    ],
    "tags": [
      "anime",
      "edition-31",
      "cam-an-31",
      "#31"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy497q008wumw48ljk4wyy",
    "a3VariantId": "cmvxy49v1008yumw4jypl9pau",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4amw0090umw4r5fm035u",
    "title": "Anime Edition #32",
    "slug": "anime-edition-32",
    "catalogCode": "CAM-AN-32",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544191/6886923f72ca2996ad67467a286154a3.jpg"
    ],
    "tags": [
      "anime",
      "edition-32",
      "cam-an-32",
      "#32"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4bav0092umw4tti562zh",
    "a3VariantId": "cmvxy4bzv0094umw4ho2vczzd",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4cnh0096umw4fdfgbgt0",
    "title": "Anime Edition #33",
    "slug": "anime-edition-33",
    "catalogCode": "CAM-AN-33",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544183/68df68026c035a6f0d2333c8baa6020c.jpg"
    ],
    "tags": [
      "anime",
      "edition-33",
      "cam-an-33",
      "#33"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4dbb0098umw4m3ulxt29",
    "a3VariantId": "cmvxy4dz5009aumw4la0901fu",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4emb009cumw4q01jb2jf",
    "title": "Anime Edition #34",
    "slug": "anime-edition-34",
    "catalogCode": "CAM-AN-34",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544178/6fd806575247ed3a1f2ce2550c1ea11c.jpg"
    ],
    "tags": [
      "anime",
      "edition-34",
      "cam-an-34",
      "#34"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4fgr009eumw4rnvz7sjh",
    "a3VariantId": "cmvxy4g9j009gumw452gj2yus",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4gwk009iumw4mv9gehcr",
    "title": "Anime Edition #35",
    "slug": "anime-edition-35",
    "catalogCode": "CAM-AN-35",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544190/78721df28fa45c178395c1f14bfac4ee.jpg"
    ],
    "tags": [
      "anime",
      "edition-35",
      "cam-an-35",
      "#35"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4hjr009kumw4lxt5pybd",
    "a3VariantId": "cmvxy4i6w009mumw4cwghwt3z",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4ivk009oumw4govi4dgy",
    "title": "Anime Edition #36",
    "slug": "anime-edition-36",
    "catalogCode": "CAM-AN-36",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544178/7a3c8544d20520801914fbabc989af3b.jpg"
    ],
    "tags": [
      "anime",
      "edition-36",
      "cam-an-36",
      "#36"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4joh009qumw43p05fbdv",
    "a3VariantId": "cmvxy4kbq009sumw4wlnt8xuh",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxy4kz4009uumw4r7hz46ok",
    "title": "Anime Edition #37",
    "slug": "anime-edition-37",
    "catalogCode": "CAM-AN-37",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544181/7bcc1c6bf617c2881afe0a711a2a3851.jpg"
    ],
    "tags": [
      "anime",
      "edition-37",
      "cam-an-37",
      "#37"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxy4lu7009wumw456xrujea",
    "a3VariantId": "cmvxycwb9009yumm8usxhosfw",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycwfi00a0umm8p08pdnhx",
    "title": "Anime Edition #38",
    "slug": "anime-edition-38",
    "catalogCode": "CAM-AN-38",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544191/8007849db99702590fc24d56610c0dc3.jpg"
    ],
    "tags": [
      "anime",
      "edition-38",
      "cam-an-38",
      "#38"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycwjs00a2umm8i7ngc67u",
    "a3VariantId": "cmvxycwnz00a4umm8q4eq7au7",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycws700a6umm8hok321pm",
    "title": "Anime Edition #39",
    "slug": "anime-edition-39",
    "catalogCode": "CAM-AN-39",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544190/83553ff6fd91eb6a40d846eda0a33a97.jpg"
    ],
    "tags": [
      "anime",
      "edition-39",
      "cam-an-39",
      "#39"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycwwi00a8umm8z9gm3rzb",
    "a3VariantId": "cmvxycx0v00aaumm8lp5j9xm9",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycx5300acumm8evdz1w9t",
    "title": "Anime Edition #40",
    "slug": "anime-edition-40",
    "catalogCode": "CAM-AN-40",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544191/8596863db2d5df206e44c4a0b2afdcf2.jpg"
    ],
    "tags": [
      "anime",
      "edition-40",
      "cam-an-40",
      "#40"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycx9c00aeumm8lntxj3ow",
    "a3VariantId": "cmvxycxdo00agumm82ypr9a0h",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycxhx00aiumm8djsouu72",
    "title": "Anime Edition #41",
    "slug": "anime-edition-41",
    "catalogCode": "CAM-AN-41",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544185/86c718578e9159499381d7393a7bd5df.jpg"
    ],
    "tags": [
      "anime",
      "edition-41",
      "cam-an-41",
      "#41"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycxm500akumm89begqvae",
    "a3VariantId": "cmvxycxqd00amumm8lci1hxn4",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycxum00aoumm8xq6pnuul",
    "title": "Anime Edition #42",
    "slug": "anime-edition-42",
    "catalogCode": "CAM-AN-42",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544186/890a2c98a49b8c80a69ef1631f25fc60.jpg"
    ],
    "tags": [
      "anime",
      "edition-42",
      "cam-an-42",
      "#42"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycy0100aqumm8yjukmban",
    "a3VariantId": "cmvxycy4a00asumm8hh6axrsh",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycy8l00auumm87ijob3bl",
    "title": "Anime Edition #43",
    "slug": "anime-edition-43",
    "catalogCode": "CAM-AN-43",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544186/9236cce25f245bbdc29d8ff6ffbe28e2.jpg"
    ],
    "tags": [
      "anime",
      "edition-43",
      "cam-an-43",
      "#43"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycycy00awumm82gxtd639",
    "a3VariantId": "cmvxycyh900ayumm8jg6poo4w",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycyll00b0umm8ppwsq4zz",
    "title": "Anime Edition #44",
    "slug": "anime-edition-44",
    "catalogCode": "CAM-AN-44",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/9a06bf4d352e0577accf5f4d76b8b3c4.jpg"
    ],
    "tags": [
      "anime",
      "edition-44",
      "cam-an-44",
      "#44"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycypx00b2umm8xt2h0hxk",
    "a3VariantId": "cmvxycyu700b4umm80xbv0eex",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxycyye00b6umm83glifv4c",
    "title": "Anime Edition #45",
    "slug": "anime-edition-45",
    "catalogCode": "CAM-AN-45",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544169/9bbc7f040c74fd708c9ed1f436e34945.jpg"
    ],
    "tags": [
      "anime",
      "edition-45",
      "cam-an-45",
      "#45"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxycz4i00b8umm8axhrm5zf",
    "a3VariantId": "cmvxyczba00baumm8ctwp7v45",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyczh400bcumm8mv7j7nuw",
    "title": "Anime Edition #46",
    "slug": "anime-edition-46",
    "catalogCode": "CAM-AN-46",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544169/9cda54126b6fd69f8f3c61859626574d.jpg"
    ],
    "tags": [
      "anime",
      "edition-46",
      "cam-an-46",
      "#46"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyczmq00beumm8byv4grv5",
    "a3VariantId": "cmvxyczsr00bgumm8g61i1t6r",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyczxd00biumm84yin969r",
    "title": "Anime Edition #47",
    "slug": "anime-edition-47",
    "catalogCode": "CAM-AN-47",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/a356886f4077655254cacac79911a33f.jpg"
    ],
    "tags": [
      "anime",
      "edition-47",
      "cam-an-47",
      "#47"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd03f00bkumm8bjkjgcgr",
    "a3VariantId": "cmvxyd09j00bmumm80h3gy9bn",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd0fh00boumm87ttndf9s",
    "title": "Anime Edition #48",
    "slug": "anime-edition-48",
    "catalogCode": "CAM-AN-48",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/a48ec10dc5da87d2ad24dc12587af7da.jpg"
    ],
    "tags": [
      "anime",
      "edition-48",
      "cam-an-48",
      "#48"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd0kz00bqumm8x7ml22s1",
    "a3VariantId": "cmvxyd0t600bsumm8qd6hhej5",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd0yy00buumm8ztc7etc6",
    "title": "Anime Edition #49",
    "slug": "anime-edition-49",
    "catalogCode": "CAM-AN-49",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/a76d1b4cb791e54595c58e1a34be7666.jpg"
    ],
    "tags": [
      "anime",
      "edition-49",
      "cam-an-49",
      "#49"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd13k00bwumm88ektkpm8",
    "a3VariantId": "cmvxyd17x00byumm87984xgzm",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd1ca00c0umm89gbr09qj",
    "title": "Anime Edition #50",
    "slug": "anime-edition-50",
    "catalogCode": "CAM-AN-50",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544169/b30d97bfe185514c18948aa7fe6ff585.jpg"
    ],
    "tags": [
      "anime",
      "edition-50",
      "cam-an-50",
      "#50"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd1gn00c2umm8m6kvv30z",
    "a3VariantId": "cmvxyd1l200c4umm82bgb49a2",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd1pc00c6umm8i27z9hkj",
    "title": "Anime Edition #51",
    "slug": "anime-edition-51",
    "catalogCode": "CAM-AN-51",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/ba972f10a009e9d7a4d988ca63eaf9f8.jpg"
    ],
    "tags": [
      "anime",
      "edition-51",
      "cam-an-51",
      "#51"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd1tl00c8umm8kco7u19b",
    "a3VariantId": "cmvxyd1xv00caumm83c0uj4u8",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd22700ccumm8tdb9jv8m",
    "title": "Anime Edition #52",
    "slug": "anime-edition-52",
    "catalogCode": "CAM-AN-52",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/c5023bc8509f42170c047cdda1524c8d.jpg"
    ],
    "tags": [
      "anime",
      "edition-52",
      "cam-an-52",
      "#52"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd26i00ceumm8fvuux5e2",
    "a3VariantId": "cmvxyd2at00cgumm8swaiaxmm",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd2f300ciumm8ubbkp2j6",
    "title": "Anime Edition #53",
    "slug": "anime-edition-53",
    "catalogCode": "CAM-AN-53",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/c550e555e3b4f8a0bb2ce2858bf33356.jpg"
    ],
    "tags": [
      "anime",
      "edition-53",
      "cam-an-53",
      "#53"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd2nj00ckumm83k179s4s",
    "a3VariantId": "cmvxyd2rv00cmumm8sbzw8ike",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd2w400coumm8ml95h5hy",
    "title": "Anime Edition #54",
    "slug": "anime-edition-54",
    "catalogCode": "CAM-AN-54",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544170/c5ddf8a10f26fde49b4594aef47fa488.jpg"
    ],
    "tags": [
      "anime",
      "edition-54",
      "cam-an-54",
      "#54"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd30e00cqumm8c3iachpn",
    "a3VariantId": "cmvxyd34m00csumm8yf59z14p",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd38y00cuumm8o3wq0iuh",
    "title": "Anime Edition #55",
    "slug": "anime-edition-55",
    "catalogCode": "CAM-AN-55",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/d8d1a1c249c9519bf67d5d8dd969b363.jpg"
    ],
    "tags": [
      "anime",
      "edition-55",
      "cam-an-55",
      "#55"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd3di00cwumm8444jdrcj",
    "a3VariantId": "cmvxyd3hq00cyumm81z87ioom",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd3m000d0umm80bqok5gl",
    "title": "Anime Edition #56",
    "slug": "anime-edition-56",
    "catalogCode": "CAM-AN-56",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/d8d846b7acf87e2e6c269d1bf4d1ee80.jpg"
    ],
    "tags": [
      "anime",
      "edition-56",
      "cam-an-56",
      "#56"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd3qn00d2umm8fg0vmua3",
    "a3VariantId": "cmvxyd3vb00d4umm8o6jkb5ok",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd3zk00d6umm8k4kt0ju5",
    "title": "Anime Edition #57",
    "slug": "anime-edition-57",
    "catalogCode": "CAM-AN-57",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/db9532406aee85c2308b108506aa17ec.jpg"
    ],
    "tags": [
      "anime",
      "edition-57",
      "cam-an-57",
      "#57"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd43w00d8umm820whr8tw",
    "a3VariantId": "cmvxyd48300daumm8e1colply",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd4ce00dcumm8yu24v8qk",
    "title": "Anime Edition #58",
    "slug": "anime-edition-58",
    "catalogCode": "CAM-AN-58",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544171/de58a6339c1fef7f3184b8c4a1c7916b.jpg"
    ],
    "tags": [
      "anime",
      "edition-58",
      "cam-an-58",
      "#58"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd4gu00deumm8ts96cxtj",
    "a3VariantId": "cmvxyd4m200dgumm8fvy8u682",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd4si00diumm8f3z6ibuw",
    "title": "Anime Edition #59",
    "slug": "anime-edition-59",
    "catalogCode": "CAM-AN-59",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544172/download.png"
    ],
    "tags": [
      "anime",
      "edition-59",
      "cam-an-59",
      "#59"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd50100dkumm86whevu0c",
    "a3VariantId": "cmvxyd54b00dmumm8si4gpxsw",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd58o00doumm8wnfchcc9",
    "title": "Anime Edition #60",
    "slug": "anime-edition-60",
    "catalogCode": "CAM-AN-60",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544177/e40ea2aff37fe8138ff26b60bcae051b.jpg"
    ],
    "tags": [
      "anime",
      "edition-60",
      "cam-an-60",
      "#60"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd5d100dqumm8wrtnfjsd",
    "a3VariantId": "cmvxyd5h900dsumm8rmpuyp2e",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd5n700duumm8f127zyia",
    "title": "Anime Edition #61",
    "slug": "anime-edition-61",
    "catalogCode": "CAM-AN-61",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544177/e49a0413a6a838522f604369fbf772d7.jpg"
    ],
    "tags": [
      "anime",
      "edition-61",
      "cam-an-61",
      "#61"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd5sq00dwumm8jcnnage8",
    "a3VariantId": "cmvxyd5yd00dyumm8tq0m7lj2",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd62t00e0umm84w6m82lh",
    "title": "Anime Edition #62",
    "slug": "anime-edition-62",
    "catalogCode": "CAM-AN-62",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793544177/f8d96f7d1bce2bd1bac6017594c136d8.jpg"
    ],
    "tags": [
      "anime",
      "edition-62",
      "cam-an-62",
      "#62"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd69w00e2umm8374ittjo",
    "a3VariantId": "cmvxyd6fg00e4umm88kxd1bc2",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd6l900e6umm84u3fq2pd",
    "title": "Anime Edition #63",
    "slug": "anime-edition-63",
    "catalogCode": "CAM-AN-63",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design.jpg"
    ],
    "tags": [
      "anime",
      "edition-63",
      "cam-an-63",
      "#63"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd6qv00e8umm85725j4m6",
    "a3VariantId": "cmvxyd6wm00eaumm8uonmbs99",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd71e00ecumm8d6myhgw3",
    "title": "Anime Edition #64",
    "slug": "anime-edition-64",
    "catalogCode": "CAM-AN-64",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_10_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-64",
      "cam-an-64",
      "#64"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd75v00eeumm8e617ottq",
    "a3VariantId": "cmvxyd7a300egumm8thpv2nlr",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd7ec00eiumm8mzd73r68",
    "title": "Anime Edition #65",
    "slug": "anime-edition-65",
    "catalogCode": "CAM-AN-65",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_13_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-65",
      "cam-an-65",
      "#65"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd7il00ekumm8yo2sqtbp",
    "a3VariantId": "cmvxyd7mv00emumm8ia7zs02g",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd7r400eoumm8rc6s6ggd",
    "title": "Anime Edition #66",
    "slug": "anime-edition-66",
    "catalogCode": "CAM-AN-66",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_30.jpg"
    ],
    "tags": [
      "anime",
      "edition-66",
      "cam-an-66",
      "#66"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd7vd00equmm854bolr4q",
    "a3VariantId": "cmvxyd7zm00esumm8kgyrhhwe",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd83u00euumm89t1uiwgk",
    "title": "Anime Edition #67",
    "slug": "anime-edition-67",
    "catalogCode": "CAM-AN-67",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_32.jpg"
    ],
    "tags": [
      "anime",
      "edition-67",
      "cam-an-67",
      "#67"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd88700ewumm8jurv3u1x",
    "a3VariantId": "cmvxyd8cj00eyumm86ozflxz4",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd8gu00f0umm8v4sd0don",
    "title": "Anime Edition #68",
    "slug": "anime-edition-68",
    "catalogCode": "CAM-AN-68",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_34.jpg"
    ],
    "tags": [
      "anime",
      "edition-68",
      "cam-an-68",
      "#68"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd8l400f2umm8n1sto876",
    "a3VariantId": "cmvxyd8r900f4umm8t6jmzswb",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd8zg00f6umm8yvs6wf4z",
    "title": "Anime Edition #69",
    "slug": "anime-edition-69",
    "catalogCode": "CAM-AN-69",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459549/Untitled_design_36.jpg"
    ],
    "tags": [
      "anime",
      "edition-69",
      "cam-an-69",
      "#69"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd94600f8umm83pe8vy7t",
    "a3VariantId": "cmvxyd98n00faumm8u3nyt8ux",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd9fn00fcumm8sykueiud",
    "title": "Anime Edition #70",
    "slug": "anime-edition-70",
    "catalogCode": "CAM-AN-70",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design_37.jpg"
    ],
    "tags": [
      "anime",
      "edition-70",
      "cam-an-70",
      "#70"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd9le00feumm862jwadah",
    "a3VariantId": "cmvxyd9pm00fgumm8yr10zoe3",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxyd9v400fiumm8pbasgs8g",
    "title": "Anime Edition #71",
    "slug": "anime-edition-71",
    "catalogCode": "CAM-AN-71",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_8_-_Copy.jpg"
    ],
    "tags": [
      "anime",
      "edition-71",
      "cam-an-71",
      "#71"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxyd9zh00fkumm8wq1tb3qa",
    "a3VariantId": "cmvxyda4d00fmumm8lskgn2m9",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  },
  {
    "id": "cmvxydaav00foumm8vo8w5j77",
    "title": "Anime Edition #72",
    "slug": "anime-edition-72",
    "catalogCode": "CAM-AN-72",
    "categoryName": "Anime",
    "categorySlug": "anime",
    "description": "",
    "images": [
      "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459548/Untitled_design_9.jpg"
    ],
    "tags": [
      "anime",
      "edition-72",
      "cam-an-72",
      "#72"
    ],
    "isActive": true,
    "isFeatured": false,
    "isCustomBase": false,
    "a4VariantId": "cmvxydahf00fqumm8u9vkxd11",
    "a3VariantId": "cmvxydamn00fsumm83dgv4co3",
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
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
    "a4PricePaise": 3900,
    "a3PricePaise": 7900,
    "stock": 50
  }
];

/**
 * Pure synchronous filter of staticCatalog — zero DB/network overhead.
 * Used by the shop page for instant rendering.
 */
export function getStaticCatalogProducts(params: { category?: string; q?: string }): CatalogProduct[] {
  let products = staticCatalog.filter((p) => p.isActive && !p.isCustomBase);

  if (params.category && params.category !== "ALL") {
    const target = params.category.toLowerCase();
    products = products.filter((p) => p.categorySlug.toLowerCase() === target);
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

function extractCatalogCode(tags: string[]): string {
  const codeTag = tags.find((t) => /^cam-[a-z]{2}-\d{2}$/i.test(t));
  return codeTag ? codeTag.toUpperCase() : "";
}

/**
 * Retrieves catalog products from DB with fast fallback to static catalog.
 */
export async function getCatalogProducts(params: ShopQueryParams): Promise<CatalogProduct[]> {
  try {
    const whereClause: Prisma.ProductWhereInput = {
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

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
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
      5000
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
          a4PricePaise: a4Var ? a4Var.pricePaise : 3900,
          a3PricePaise: a3Var ? a3Var.pricePaise : 7900,
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
    const target = params.category.toLowerCase();
    products = products.filter((p) => p.categorySlug.toLowerCase() === target);
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
      5000
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
        a4PricePaise: a4Var ? a4Var.pricePaise : 3900,
        a3PricePaise: a3Var ? a3Var.pricePaise : 7900,
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
