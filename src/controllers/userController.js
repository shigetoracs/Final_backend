import { userModel } from "../models/user.js";


export const getUsers = async () => {
  const users = await userModel.find({}, "first_name last_name email rol");
  return users;
};
export const sendDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const newDocs = req.body;
    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        $push: { documents: { $each: newDocs } },
      },
      { new: true }
    );
    if (!user) {
      res.status(404).send("user no existe");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteInactiveUsers = async () => {
  try {
    const inactiveThreshold = new Date(Date.now() - 30 * 60 * 1000); // 30 minutos para pruebas
    const inactiveUsers = await userModel.find({
      last_connection: { $lt: inactiveThreshold },
    });

    for (let user of inactiveUsers) {
     

      await userModel.deleteOne({ _id: user._id });
    }

    return { message: "Usuarios inactivos eliminados" };
  } catch (error) {
    throw new Error("Error al eliminar usuarios inactivos: " + error.message);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    await userModel.findByIdAndDelete(uid);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el usuario: " + error.message });
  }
};
