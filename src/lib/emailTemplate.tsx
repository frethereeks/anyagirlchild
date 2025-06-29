import { config } from "@/config";
import { appRoutePaths } from "@/routes/paths";
import { SOCIAL_LINKS } from "@/constants";

type TMailProps = {
    intro?: string
    fullname?: string
    email?: string
    message: string
    amount?: number
}
{/**
    export const sendEmail = async (subject: string, email: string | string[], message: string, reply?: string, copy?: { email: string, fullname?: string }) => {
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
*/}

export const emailTemplate = ({ amount, fullname, email, message, intro = `You've got a new message from ${config.APP_NAME}! The details are as follows` }: TMailProps) => {
    return (`
                    <section style="position: relative; width: 100%; max-width: 640px; margin: 40px auto; overflow: hidden; padding: 40px 16px; background-image: linear-gradient(to top right, #f8fafc, #e2e8f0); height: 100%; font-family: Arial, Helvetica, sans-serif;">
                        <div style="position: absolute; width: 704px; height: 704px; border-radius: 100%; background-color: #64748b; opacity: 0.1; left: -33.3%; transform: translateX(-33.3%); top: -40px;"></div>
                        <div style="position: absolute; width: 700px; height: 700px; border-radius: 100%; background-color: #64748b; opacity: 0.1; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); left: 33.333333%; transform: translateX(-33.333333%); top: 33.333333%;"></div>
                        <aside style="position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
                            <header style="display: flex; justify-content: space-between; gap: 16px;">
                                <a href="${appRoutePaths.home}" style="display: flex; justify-items: center; gap: 8px; text-decoration: none;">
                                    <div style="height: 48px; width: 48px; border-radius: 6px; flex-shrink: 0; background: #fff; overflow: hidden;"></div>
                                    <div style="flex: 1; display: flex; flex-direction: column; width: max-content; margin-top: 0px;">
                                        <h1 style="font-size: 16px; margin: 0; margin-left: 1px; line-height: 24px; color: #16a394; font-weight: 700; text-transform: uppercase;">AnyagirlChild</h1>
                                        <h3 style="font-size: 12px; margin: 0; line-height: 16px; color: #f34f7c; letter-spacing: 4.5px; text-transform: uppercase; background: #fff; font-weight: 600; padding: 2px 6px; width: max-content;">Foundation</h3>
                                    </div>
                                </a>
                                <div style="flex: 1 1 0%; display: flex; justify-content: flex-end; align-items: center; gap: 8px;">
                                    <a href="${SOCIAL_LINKS.facebook}" style="height: 20px; width: 20px; text-decoration: none; display: grid; place-items: center; background: #0979ff; font-size: 12px; line-height: 16px; color: #fff; border-radius: 100%;">f</a>
                                    <a href="${SOCIAL_LINKS.whatsapp}" style="height: 20px; width: 20px; text-decoration: none; display: grid; place-items: center; background: #16a394; font-size: 12px; line-height: 16px; color: #fff; border-radius: 100%;">w</a>
                                    <a href="${SOCIAL_LINKS.youtube}" style="height: 20px; width: 20px; text-decoration: none; display: grid; place-items: center; background: #f34f7c; font-size: 12px; line-height: 16px; color: #fff; border-radius: 100%;">y</a>
                                </div>
                            </header>
                            <div style="flex: 1 1 0%; display: flex; flex-direction: column; gap: 8px; margin: 16px 0; padding: 16px; border-radius: 6px; background: white; text-align: justify;">
                                <div style="font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;">Hi there,</p>
                                <p style="font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;">${intro}</p>
                                <div style="display: flex; flex-direction: column; padding: 16px 0">
                                    ${fullname && `<p style="margin: 0; font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;"><strong>Full Name</strong>: ${fullname}</p>`}
                                    ${email && `<p style="margin: 0; font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;"><strong>Email</strong>: ${email}</p>`}
                                    ${amount && `<p style="margin: 0; font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;"><strong>Amount</strong>: ${amount}.</p>`}
                                    <p style="margin: 5px 0; font-size: 16px; line-height: 24px; color: #334155; font-weight: 400;">${message}.</p>
                                </div>
                            </div>
                            <p style="font-size: 12px; line-height: 16px; color: #334155; text-align: center; font-weight: 100; padding: 10px 0 0;">You received this mail because you of an action you performed on <a style="text-decoration-line: underline; font-weight: 700; color: inherit;" href="${appRoutePaths.home}">AnyagirlChild Foundation</a>. If you wish to stop receiving mails from us, please, click <a style="text-decoration-line: underline; font-weight: 700; color: inherit;" href="${appRoutePaths.home}">here</a>
                            </p>
                        </aside>
                    </section>
                `)
}
