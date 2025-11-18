import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  purpose: { type: String, required: true },
  time: { type: Date, required: true },
  description: { type: String },
  isImportant: { type: Boolean, default: false },
});

export default mongoose.model("Task", TaskSchema);
