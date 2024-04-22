import { Logger } from "./logger";
import { config } from "../config";
import { createTransport } from "nodemailer";

export function EmailRepository(logger: Logger) {
  return {
    sendMail: async (jobPosts: Record<string, unknown>) => {
      // const transporter = createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: config.app.emailUser,
      //     // la contraseña de app se obtiene aca: https://myaccount.google.com/u/1/security
      //     // en la opcion de "verificacion de dos pasos" se crean las claves de app
      //     pass: config.app.emailPass,
      //   },
      // });
      // // Verifica si se hace el login
      // // transporter.verify().then(console.log).catch(console.error);
      // let text = `Nuevos trabajos:`;
      // let html = `<b>Nuevos trabajos:</b><ul>`;
      // for (let index = 0; index < jobPosts.length; index += 1) {
      //   const item = jobPosts[index];
      //   text += `
      // - ${item.title}
      // ${item.url}
      // ${item.utcDate} - ${item.bidsCount} Bids${item.budget ? ` - ${item.budget}` : ""}
      // ${item.description}`;
      //   html += `<li>
      //         <a href="${item.url}">${item.title}</a>
      //         <b><p>${item.utcDate} - ${item.bidsCount} Bids${item.budget ? ` - ${item.budget}` : ""}</p></b>
      //         <p>${item.description}</p>
      //         </li>`;
      // }
      // html += `</ul>`;
      // transporter
      //   .sendMail({
      //     from: '"Trabajos Upwork" <jobs@upwork.com>', // sender address
      //     to: config.app.targetEmail, // list of receivers (comma separated)
      //     subject: `Trabajos Upwork - ${new Date().getTime()}`, // Subject line
      //     text, // plain text body
      //     html, // html body
      //   })
      //   .then((info) => {
      //     logger.debug("Email sent", { info });
      //     transporter.close();
      //   })
      //   .catch((error) => {
      //     transporter.close();
      //     throw error;
      //   });
    },
  };
}
