import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Head } from "next/document";
import Stripe from "stripe";

import { Shirt } from "@/interfaces/shirt";
import { stripe } from "@/lib/stripe";
import { api } from "@/lib/axios";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

interface ProductProps {
  shirt: Shirt;
}

export default function Product({ shirt }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function handleBuyShirt() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await api.post("checkout", {
        priceId: shirt.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);

      alert("Error on redirect to checkout");
    }
  }

  return (
    <>
      <Head>
        <title>shirt?.name | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={shirt?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{shirt?.name}</h1>
          <span>{shirt?.price}</span>

          <p>{shirt?.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyShirt}>
            Buy now
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_OheONz21YMPvoO" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  const shirt: Shirt = {
    id: product.id,
    name: product.name,
    description: product.description || "",
    imageUrl: product.images[0],
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount || 0) / 100),
    defaultPriceId: price.id,
  };

  return {
    props: {
      shirt,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
