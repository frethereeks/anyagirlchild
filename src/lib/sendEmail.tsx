import nodeMailer from "nodemailer"
import { config } from "@/config";
import { appRoutePaths } from "@/routes/paths";

export const sendEmail = async (subject: string, email: string | string[], message: string,reply?: string, copy?: { email: string, fullname?: string }) => {
    try {
        const html = `
              <section style="max-width: 40rem; width: 100%; margin: 0 auto; padding: 2rem;" className="flex flex-col">
                  <div className="flex gap-1">
                    <h4 style="background: #0d182d; font-size: 2rem; color: white; text-align: center; padding: 2rem 1rem;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">AnyagirlChild Mail</h4>
                    <div style="padding: 1rem;" className="flex flex-col flex-1">
                        <p style="color: #64748b; font-size: 12px; line-height: 16px;" className="text-xs text-slate-500">${message}</p>
                        ${copy ?
                "" :
                `<a href='${config.APP_PRIMARY_API_BASE_URL}/${appRoutePaths.signin}' target="_blank" style="background: #16a394; padding: .5rem 1.2rem; width: max-content; margin: 0 auto; color: white; font-weight: bold; font-size: 12px; line-height: 16px;" className="font-bold text-secondary py-2 px-4 text-lg">Login to your account to view this</a>`
            }
                    </div>
                    <p style="color: #334155; font-size: .65rem; padding: 1rem; text-align:center; line-height: 1.25rem;" className="text-xs text-slate-700 text-center py-2">If you did not initiate this action. Simply ignore this message.</p>
                  </div>
              </section>
          `;
        const transport = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })
        transport.sendMail({
            from: `${config.APP_NAME} <${process.env.MAIL_FROM}>`,
            to: email,
            bcc: `${copy?.fullname ?? ""} <${copy?.email}>`,
            replyTo: reply ? `${reply}` : `No Reply <no-reply@anyagirlchild.com>`,
            subject,
            html
        }, (err) => {
            if (err) {
                return false
            }
        })
        return true
    } catch (error) {
        console.log({ error })
        return false
    }
}