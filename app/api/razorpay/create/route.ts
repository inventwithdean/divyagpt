// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { razorpay } from "@/lib/razorpay";
// import { randomUUID } from "crypto";

// export async function GET() {
//   try {
//     const { userId } = auth();
//     const user = await currentUser();
//     if (!userId || !user) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const order = await razorpay.orders.create({
//       amount: 1000,
//       currency: "INR",
//       receipt: randomUUID(),
//       notes: {
//         userId: userId,
//         email: user.emailAddresses[0].emailAddress,
//       },
//     });
//     return NextResponse.json({ message: "success", order });
//   } catch (error) {
//     console.log("[RAZORPAY ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
