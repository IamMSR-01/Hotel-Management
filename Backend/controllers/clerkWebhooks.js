import User from "../models/user.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    console.log("Is MONGO_URI set on Vercel?", !!process.env.MONGO_URI);
    console.log(
      "Is CLERK_WEBHOOK_SECRET set on Vercel?",
      !!process.env.CLERK_WEBHOOK_SECRET
    );

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Use raw body when available (express.raw for webhook route). Otherwise stringify parsed body.
    const payload = req.rawBody ? req.rawBody : JSON.stringify(req.body || {});
    await whook.verify(payload, headers);

    const { data, type } = req.body || {};

    if (!data) {
      console.warn("Webhook received with no data:", req.body);
      return res.status(400).json({ success: false, message: "No data in webhook payload" });
    }

    const email =
      Array.isArray(data.email_addresses) && data.email_addresses.length
        ? data.email_addresses[0]?.email_address
        : data.email_address ||
          (data.primary_email_address && data.primary_email_address.email_address) ||
          null;

    const userData = {
      clerkId: data.id,
      email: email,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || null,
    };

    console.log("Webhook type:", type, "userData:", userData);

    switch (type) {
      case "user.created": {
        await User.create(userData);
        console.log("User created:", userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate({ clerkId: data.id }, userData, { new: true, upsert: false });
        console.log("User updated:", userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete({ clerkId: data.id });
        console.log("User deleted:", userData);
        break;
      }
      default:
        console.log("Unhandled webhook type:", type);
        break;
    }

    res.json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    // Return 400 for signature/validation errors, 500 otherwise
    const status = error?.message?.toLowerCase?.().includes("signature") ? 400 : 500;
    res.status(status).json({ success: false, message: "Webhook processing failed", error: error.message });
  }
};

export default clerkWebhooks;