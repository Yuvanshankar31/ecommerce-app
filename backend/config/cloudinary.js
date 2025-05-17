import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: "dvv7iosuq",
            api_key:"214869914839835",
            api_secret:"X_Sww0Ds0Y6zFeke2ld5gvEvmf8"
        });

        const result = await cloudinary.api.ping();
        console.log("✅ Cloudinary is connected:", result);
    } catch (error) {
        console.error("🚨 Cloudinary connection failed:", error.message);
    }
};

export default connectCloudinary;
