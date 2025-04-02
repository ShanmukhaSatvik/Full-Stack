const Joi=require("joi");
const categoryEnum=["Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Farms","Arctic","Domes","Boats","Historical Landmarks","Golfing","Camping","Ski-in/out","Beach","Towers"];
module.exports.createListingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.any()
        .custom((value, helpers) => {
            if (!value || !value.mimetype) {
                return helpers.error("any.invalid");
            }
            const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedMimes.includes(value.mimetype)) {
                return helpers.message("Only JPG, JPEG, and PNG files are allowed");
            }
            return value;
        })
        .required()
        .messages({
            "any.required": "Listing image is required",
            "any.invalid": "Invalid file upload",
        }),
    price: Joi.number().required().min(1).messages({
        'number.min': 'Price is too low for Wanderlust listing',
    }),
    country: Joi.string().required(),
    location: Joi.string().required(),
    categories: Joi.array().items(Joi.string().valid(...categoryEnum)).min(1).required(),
});
module.exports.updateListingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.any().custom((value, helpers) => {
        if (!value || !value.mimetype) {
            return helpers.error("any.invalid");
        }
        const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedMimes.includes(value.mimetype)) {
            return helpers.message("Only JPG, JPEG, and PNG files are allowed");
        }
        return value;
    }).optional().messages({
        "any.invalid": "Invalid file upload",
    }),
    price: Joi.number().required().min(1).messages({
        'number.min': 'Price is too low for Wanderlust listing',
    }),
    country: Joi.string().required(),
    location: Joi.string().required(),
    categories: Joi.array().items(Joi.string().valid(...categoryEnum)).min(1).required(),
});
module.exports.reviewSchema=Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
});
module.exports.userSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
});