import c from "config";
import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    _id: {type: String,
        required: true,
    },
    title: {type: String,
        required: true,
    },
    data: {type: Object,
        required: true,
        default: {},
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;