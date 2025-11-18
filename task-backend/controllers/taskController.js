import Task from "../models/Task.js";
export const createTask = async (req, res) => {
  try {
    const { purpose, time, description, isImportant } = req.body;

    if (!purpose || !time)
      return res.status(400).json({ msg: "Purpose & time required" });

    const task = await Task.create({
      user: req.user.id,
      purpose,
      time,
      description,
      isImportant,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const search = req.query.q || "";

    const filter = {
      user: req.user.id,
      purpose: { $regex: search, $options: "i" },
    };

    const total = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ time: -1 });

    res.json({ page, totalPages: Math.ceil(total / limit), tasks });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    Object.assign(task, req.body);
    const updated = await task.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    await task.deleteOne();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
