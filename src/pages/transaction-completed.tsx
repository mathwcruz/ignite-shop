import { GetServerSideProps } from "next";
import Link from "next/link";
import Stripe from "stripe";

import { ImageContainer, TransactionCompletedContainer } from "@/styles/pages/transaction-completed";
import { stripe } from "@/lib/stripe";
import { Session } from "@/interfaces/session";
import Image from "next/image";

interface TransactionCompletedProps {
  session: Session;
}

export default function TransactionCompleted({ session }: TransactionCompletedProps) {
  return (
    <TransactionCompletedContainer>
      <h1>Purchase completed!</h1>

      <ImageContainer>
        <Image src={session.shirt?.imageUrl} width={120} height={110} alt={session.shirt?.name} />
      </ImageContainer>

      <p>Woo-hoo, <strong>{session.customer?.name}</strong> your <strong>{session.shirt?.name}</strong> is on its way to your home.</p>

      <Link href="/">
        Back to catalog
      </Link>
    </TransactionCompletedContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const response = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'line_items.data.price.product'] })

  const product = response.line_items?.data[0].price?.product as Stripe.Product

  const session: Session = {
    customer: {
      name: response.customer_details?.name ?? ""
    },
    shirt: {
      imageUrl: product.images[0],
      name: product.name
    }
  }

  return {
    props: {
      session
    }
  }
}