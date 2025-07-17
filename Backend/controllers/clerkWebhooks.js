import User from "../models/user.model.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // varifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    // getting data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.firt_name + " " + data.last_name,
      image: data.image_url,
    };

    // switch cases for different events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdated(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDeleted(data.id);
        break;
      }
      default:
        break;
    }

    res.json({ success: true, message: "Webhook recieved" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
