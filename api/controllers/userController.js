import cloudinary from "../config/cloudinary.js";
import User from "../models/User.model.js";

export const updateProfile = async (req, res) => {
	// image => cloudinary -> image.cloudinary.your => mongodb

	try {
		const { image, ...otherData } = req.body;

		let updatedData = otherData;
		const userId = req.user._id;

		if(!image) {
			return res.status(400).json({message: "Profile pic is required"});
		}
		if (image) {
			// base64 format
			if (image.startsWith("data:image")) {
				try {
					const uploadResponse = await cloudinary.uploader.upload(image);
					updatedData.image = uploadResponse.secure_url;
				} catch (error) {
					console.error("Error uploading image:", error);

					return res.status(400).json({
						success: false,
						message: "Error uploading image",
					});
				}
			}
		}
		const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

		res.status(200).json({
			success: true,
			user: updatedUser,
		});
	} catch (error) {
		console.log("Error in updateProfile: ", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};