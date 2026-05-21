import mongoose, {Schema} from "mongoose";

const ComponentSchema = new Schema({
    name: {type: String, required: true},
    props: [{type: String}],
    code: {type: String, required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: "User"},
    visibility: {type: String, default: "private", enum: ["public", "private"]},
    npmPackageName: {type: String},
}, {timestamps: true});

const Component = mongoose.model("Component", ComponentSchema);
export default Component;