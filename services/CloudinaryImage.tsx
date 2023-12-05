import {Cloudinary} from "@cloudinary/url-gen";

const CloudinaryImage = (imagePath: string): string => {

    const myCloudinary = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        },
    });
    const cloudinaryImg = myCloudinary.image(`gamebazar/${imagePath}`);
    const cloudinaryImageUrl = cloudinaryImg.toURL();

    return (
        cloudinaryImageUrl
    )
}

export default CloudinaryImage;
