import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Head } from "next/document";
import Stripe from "stripe";
import { useKeenSlider } from "keen-slider/react";

import { stripe } from "@/lib/stripe";
import { Shirt } from "@/interfaces/shirt";
import { HomeContainer, Product } from "@/styles/pages/home";

import "keen-slider/keen-slider.min.css";

interface HomeProps {
  shirts: Shirt[];
}

export default function Home({ shirts }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {shirts?.map(({ id, name, imageUrl, price }) => (
          <Link href={`/product/${id}`} key={id} prefetch={false}>
            <Product className="keen-slider__slide">
              <Image src={imageUrl} alt="" width={520} height={480} />

              <footer>
                <strong>{name}</strong>
                <span>{price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const shirts: Shirt[] = data?.map((product) => {
    const price = product?.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format((price.unit_amount || 0) / 100),
    };
  });

  return {
    props: {
      shirts,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
