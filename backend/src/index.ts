import { http, Request, Response } from "@google-cloud/functions-framework";
import { v4 as uuidv4 } from "uuid";
import { createLogger } from "./common/logger";
import { EmailRepository } from "./common/emailRepository";
import { config } from "./config";
import { Auth, sheets_v4 } from "googleapis";
import { resolve as pathResolve } from "node:path";

const logger = createLogger("GOOGLE_SHEET_INTEGRATION", {
  processId: uuidv4(),
});

http("index", async (request: Request, response: Response) => {
  try {
    const options: Auth.GoogleAuthOptions = {
      keyFile: pathResolve(__dirname, "..", "credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    };
    const authClient = new Auth.GoogleAuth(options);

    const sheets = new sheets_v4.Sheets({ auth: authClient });
    const mainSpreadsheetId = "1iO206WNoQ-OOZlkQcrZ8jWCpz2rFtWZTlZCIvk9teGM";
    // TODO: PARA GRABAR - todo va en la main spreadsheet
    // - tener solo los headers como namedRange
    // - append normal con retry (siempre con el mismo ID generado en el front)
    // - elimino duplicados, por si se se duplico el registro en el paso anterior

    // TODO: para lectura
    // - Crear nueva hoja por cada usuario (al momento de registrarse) para hacer queries
    // - Insertar QUERY con IMPORTRANGE en al celda A1 del tab con el mismo nombre del namedRange al que hace referencia (namedRange kindof entity)
    // - Hacer get normal del rango completo del resultado QUERY_RESULT_{REQUEST_ID}!A:D
    // FALTA VER
    // - si se puede controlar donde se crea el spreadsheet en el drive (mantener organizado)
    // - Incluir column index y row index del registro en el main spreadsheet
    //  en el resultado del QUERY para poder eliminar / actualizar

    // TODO: PARA ACTUALIZAR / ELIMINAR (soft delete)
    // - NO ENCONTRE UN METODO QUE RETORNARA LA POSICION DE LA CELDA DE CADA VALOR
    // - Se hace un get para encontrar el row index y column index del registro (ojala se pueda hacer directo en el QUERY de cada usuario)
    // - Se modifica el valor, nunca se elimina el registro, usamos soft deletes
    // FALTA VER
    // - si al filtrar u ordernar con un filter view, se modifica el orden real de los registros

    // Query formula for payroll on main spreadsheet
    const sheetsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: mainSpreadsheetId,
      range: "payroll!G1",
      valueRenderOption: "FORMULA",
      prettyPrint: false,
    });

    // const sheetsRes = await sheets.spreadsheets.values.append({
    //   spreadsheetId: "1iO206WNoQ-OOZlkQcrZ8jWCpz2rFtWZTlZCIvk9teGM",
    //   valueInputOption: "USER_ENTERED",
    //   // range: "payroll",
    //   // requestBody: {
    //   //   majorDimension: "ROWS",
    //   //   values: [[5, "21/04/2024 23:25:46", 20681104]],
    //   // },
    //   range: "waiters",
    //   requestBody: {
    //     majorDimension: "ROWS",
    //     values: [[12345, "otro", true]],
    //   },
    // });

    // sheets.spreadsheets.getByDataFilter()

    // const sheetsRes = await sheets.spreadsheets.batchUpdate({
    //   spreadsheetId: "1iO206WNoQ-OOZlkQcrZ8jWCpz2rFtWZTlZCIvk9teGM",
    //   requestBody: {
    //     requests: [
    //       {insertRange:{
    //         range:{},
    //         shiftDimension:"ROWS"
    //       }},
    //       {updateCells:{

    //       }},
    //       {
    //         deleteDuplicates:
    //       }
    //     ]
    // }})

    // sheets.spreadsheets.developerMetadata.search

    const values = sheetsRes.data || [];

    response.status(200).json({ message: "success", data: values });
  } catch (error) {
    logger.error("Event handler error", { error: (error as Error).message });
    response.status(500).json({ message: "error" });
  }
});
