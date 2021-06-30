import * as crypto from "crypto-js";
import { AppError } from "../errors/AppError";

export class Cryptography{
    public static async doEncrypt(string: string) {
        try {
            const encrypted = crypto.AES.encrypt(
                string.trim(),
                process.env.PASS_KEY
            ).toString()

            return encrypted;
        } catch (error) {
            throw new AppError("Error to encrypt - " + error);
        }
    }
    public static async doDecrypt(string: string){
        try {
            const decrypted = crypto.AES.decrypt(
                string.trim(),
                process.env.PASS_KEY
            ).toString(crypto.enc.Utf8);

            return decrypted;
        } catch (error) {
            console.log("error:"+error);
            
            throw new AppError("Error to decrypt" + error);
        }
    }
}
