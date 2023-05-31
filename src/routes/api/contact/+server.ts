import { SENDGRID_API_KEY } from '$env/static/private';
import sgMail from "@sendgrid/mail"
import type { RequestEvent } from './$types';

export async function POST ({request}: RequestEvent) {

    const body = await request.json();
  
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
      to: 'mattgehrls@gmail.com',
      from: 'matt@mattgehrls.com',
      subject: 'Feedback from Streamsave',
      text: `Name: ${body.name}, Email: ${body.email}, Subject: ${body.subject}, Message: ${body.message}`,
      html: `<strong>Name: ${body.name}<br/> Email: ${body.email}<br/> Subject: ${body.subject}<br/> Message: ${body.message}</strong>`
    }
  
    return await sgMail
      .send(msg)
      .then((x) => {
        return new Response(JSON.stringify({message: "Email sent successfully"}), {status: x[0].statusCode})})
}