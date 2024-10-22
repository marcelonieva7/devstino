import { Client, Account, Storage, Databases } from 'appwrite';
import { envServer } from "@/env/serverEnv";

export const client = new Client();

client.setEndpoint(envServer.APPWRITE_URL)
  .setProject(envServer.APPWRITE_PROJECT);

export const account = new Account(client);

export { ID } from 'appwrite';

export const storage = new Storage(client);

export const db = new Databases(client)