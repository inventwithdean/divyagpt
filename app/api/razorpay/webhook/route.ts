import { NextResponse } from "next/server";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";

interface RazorpayWebhookEvent {
  event: string;
  payload: {
    payment: {
      entity: RazorpayPaymentEntity;
    };
  };
}
export interface RazorpayPaymentEntity {
  id: string;
  amount: number;
  currency: string;
  order_id: string;
  notes: {
    phone: string;
    email_you_use_in_divyagpt: string;
  };
}

const processedEventIds = new Set();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const eventId = req.headers.get("x-razorpay-event-id");
    if (processedEventIds.has(eventId)) {
      console.log("Duplicate event with ID: ", eventId);
      return new NextResponse("Duplicate EVENT ID", { status: 200 });
    }

    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return new NextResponse("Invalid Signature!", { status: 400 });
    }

    const event: RazorpayWebhookEvent = JSON.parse(rawBody);
    switch (event.event) {
      case "payment.captured":
        console.log("Payment Captured: ", event.payload.payment);
        const payment = event.payload.payment.entity;
        const notes = payment.notes;
        const amount = payment.amount;
        const email = notes.email_you_use_in_divyagpt;
        console.log(
          `${notes.phone} made a successful Payment! EMAIL: ${email}`
        );
        const userStats = await prismadb.userStats.findUnique({
          where: { email: email },
        });
        if (userStats) {
          const currentMaxGenerations = userStats.maxgenerations;
          let amountToIncrease = 0;
          switch (amount) {
            case 1500:
              amountToIncrease = 5;
              break;
            case 4000:
              amountToIncrease = 15;
              break;
            case 12000:
              amountToIncrease = 50;
              break;
            case 20000:
              amountToIncrease = 100;
              break;
            case 100000:
              amountToIncrease = 600;
              break;
            default:
              amountToIncrease = 0;
              break;
          }
          await prismadb.userStats.update({
            where: { email: email },
            data: { maxgenerations: currentMaxGenerations + amountToIncrease },
          });
          console.log(`Added ${amountToIncrease} generations to ${email}`);
        } else {
          // User hasn't generated anything yet! They won't be able to see the Razorpay Button
        }
        break;
      case "payment.failed":
        console.log("Payment Failed: ", event.payload.payment);
        break;
      default:
        console.log("Unhandled event type: ", event.event);
        break;
    }
    processedEventIds.add(eventId);
    return new NextResponse("Webhook processed successfuly!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in processing webhook: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
