import { Client, Databases, Account } from "appwrite";

const config = useRuntimeConfig()

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(config.public.APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export default function useAppWrite() {
  return {
    client,
    account,
    databases,
  }
}