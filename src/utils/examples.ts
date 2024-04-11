import { Product } from "../models";

export const exampleProds: Product[] = [
  {
    id: "3480c083-a8ec-11ed-9883-5266b0bd59ca",
    created_at: 1675996796,
    updated_at: 1675996796,
    category: "clothes",
    name: "Addidas Black T-Shirt Basketball",
    description: "The best T-shirt in the world.",
    price: 2599,
    discount_rate: 30,
    images_url: [
      "https://titan22.com/cdn/shop/files/IR8492-A_1082x.png?v=1690430352",
      "https://titan22.com/cdn/shop/files/IR8492-B_1082x.png?v=1690430352",
    ],
    tags: ["t-shirts", "clothes", "addidas"],
    available: true,
  },
  {
    id: "2229674a-00cc-4846-8f71-4b28b6e246db",
    created_at: 1675996796,
    updated_at: 1675996796,
    category: "clothes",
    name: "Nike Black Cup",
    description: "The best cup. Super comfortable.",
    price: 1549,
    discount_rate: 0,
    images_url: [
      "https://static.nike.com/a/images/t_default/84588c76-14b7-42cb-a65c-5bbb77f6699d/gorra-estructurada-con-cierre-a-presi%C3%B3n-dri-fit-rise-hR0Mq4.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ad1dbe01-7a5a-4862-bdd6-416e3a120703/gorra-estructurada-con-cierre-a-presi%C3%B3n-dri-fit-rise-hR0Mq4.png",
    ],
    tags: ["cups", "clothes", "nike"],
    available: true,
  },
  {
    id: "1119674a-00cc-4846-8f71-4b28b6e246da",
    created_at: 1675996796,
    updated_at: 1675996796,
    category: "tenis",
    name: "Running Tenis Puma Black",
    description: "Very comfortable shoes for running.",
    price: 1530,
    discount_rate: 10,
    images_url: [
      "https://martimx.vtexassets.com/arquivos/ids/489205-800-800?v=637346702472670000&width=800&height=800&aspect=true",
      "https://martimx.vtexassets.com/arquivos/ids/489294-800-800?v=637346703167700000&width=800&height=800&aspect=true",
    ],
    tags: ["shoes", "clothes", "puma"],
    available: true,
  },
];
