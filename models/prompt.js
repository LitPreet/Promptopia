import mongoose, {Schema, model, models} from "mongoose";

const promptSchema = new mongoose.Schema ({
    creator:{
        type: Schema.Types.ObjectId,
        ref :'User',
    },
    prompt : {
        type : String,
        required : [true, 'Prompt is required .']
    },
    tag : {
        type : String,
        required : [true, 'Tag is required.']
    }
})


const Prompt = models.Prompt || model('Prompt', promptSchema);
// const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt;