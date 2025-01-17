import { MailtrapClient } from "mailtrap";

const TOKEN = "bea7f558b49093944cc82f419e059356";
const ENDPOINT = "https://send.api.mailtrap.io/api/send";

export const client = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "eddiebrook636@gmail.com",
  },
];
