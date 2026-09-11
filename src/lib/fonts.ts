import localFont from "next/font/local";

export const bounded = localFont({
  src: "../../fonts/Bounded-Variable.ttf",
  variable: "--font-bounded",
  display: "swap",
  weight: "200 900",
});

export const productSans = localFont({
  src: [
    {
      path: "../../fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/ProductSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-product-sans",
  display: "swap",
});
