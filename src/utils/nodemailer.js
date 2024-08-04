import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lucasrtinte19@gmail.com",
    pass: "ibjm stki fzcq sdbz",
  },
});
export const sendEmailChangePassword = async (email, linkChangePassword) => {
  const mailOption = {
    from: "lucasrtinte19@gmail.com",
    to: email,
    subjetc: "Recuperacion de email",
    text: `Haz clic para cambiar tu contra:${linkChangePassword}`,
    html: `<p>Clik para cambiar:</p><button><a>href=${linkChangePassword}</a><button>`,
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("error al enviar correo de cambio de contrasena" + error);
    } else {
      console.log("correo enviando correctamente", info.response);
    }
  });
};
