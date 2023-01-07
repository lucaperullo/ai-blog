//middleware that post the image on cloudinary and add the url to the req.body
export const imageAdd = async (req, res, next) => {
    try {
        // console.log("1")
        const image = req.file.path;
        // console.log(image)
        req.body.cover = image;
        next();
    } catch (error) {
        next(error);
    }
}