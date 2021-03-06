const mongoose = require("mongoose");
const slugify = require("slugify");
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    unique: true,
    trim: true,
    maxlength: [40, "Max name limit is 100 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please enter a name"],
    unique: true,

    maxlength: [500, "Max name limit is 100 characters"],
  },
  website: {
    type: String,
    // eslint-disable
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],

      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10 "],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "invalid.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Bootcamp slug from the name

BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model("Bootcamp", BootcampSchema);
