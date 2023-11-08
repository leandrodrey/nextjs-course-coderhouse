import {FC} from "react";
import {Cloudinary} from "@cloudinary/url-gen";

const CloudinaryImage = (imagePath: string): string => {

    const myCld = new Cloudinary({
        cloud: {
            cloudName: "dmef6dgiq",
        },
    });

    const cloudinaryImg = myCld.image(`${imagePath}`);
    const cloudinaryImageUrl = cloudinaryImg.toURL();

    return (
        cloudinaryImageUrl
    )

}

export default CloudinaryImage;
