import User from "../models/user.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async(req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created":{
        await User.create(userData);
        console.log("User created:", userData);
        break;
      }
      case "user.updated":{
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated:", userData);
        break;
      }
      case "user.deleted":{
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", userData);
        break;
      }
    
      default:
        break;
    }

    res.json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.json({ success: false, message: "Webhook processing failed" });
  }
};

export default clerkWebhooks;