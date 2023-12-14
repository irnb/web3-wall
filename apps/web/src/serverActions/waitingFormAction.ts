"use server";
import { extractNameFromEmail } from "@/utils";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function joinWaitingList(email: string) {
  "use server";
  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_WAITING_DATABASE_ID!,
      },
      properties: {
        date: {
          title: [
            {
              text: {
                content: new Date().toString(),
              },
            },
          ],
        },
        email: {
          email,
        },
      },
    });
  } catch (error) {
    console.log("joinWaitingList api error:", error);
  }
}
