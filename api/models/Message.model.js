import monggose from "mongoose";

// sender => type objectid ref user, req
// receiver => type objectid ref user,
// content => type string, req

const messageSchema = new monggose.Schema({
    sender: {
        type: monggose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: monggose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {timestamps: true});


const Message = monggose.model("Message", messageSchema);
export default Message;