import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    aiCredits:{
        type: Number,
        default: 100
    }
},
{
    timestamps: true
} 
)

const User = mongoose.model("User", userSchema);

export default User;