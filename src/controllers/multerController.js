export const insertImg = (req, res) => {
  try {
    res.status(200).send("Imagen cargada correctamente");
  } catch (e) {
    res.status(500).send("Error al cargar imagen");
  }
};
