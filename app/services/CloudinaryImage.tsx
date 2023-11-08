import {Cloudinary} from "@cloudinary/url-gen";

const CloudinaryImage = (imagePath: string): string => {

    const myCloudinary = new Cloudinary({
        cloud: {
            cloudName: "dmef6dgiq",
        },
    });

    const cloudinaryImg = myCloudinary.image(`${imagePath}`);
    const cloudinaryImageUrl = cloudinaryImg.toURL();

    return (
        cloudinaryImageUrl
    )

}

export default CloudinaryImage;
