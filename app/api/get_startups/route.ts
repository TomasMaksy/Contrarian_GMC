import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";



interface Startup {
  id: string;
  name: string;
  representative: string;
  email: string;
  title: string;
  website: string;
  logo: string;
  type: string;
  fundraising: string;
  stage: string;
}

const AIRTABLE_READONLY_API = process.env.AIRTABLE_READONLY_API as string;
const BASE_ID = "appCup7R4k8cZF33V";
const TABLE_NAME = "tblDvZCr0MilynhrF";

const base = new Airtable({ apiKey: AIRTABLE_READONLY_API }).base(BASE_ID);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const namesParam = searchParams.get("names"); // e.g., "Startup1,Startup2"
  const requestedNames = namesParam
    ?.split(",")
    .map((name) => name.trim()) || [];

  try {
    // Fetch all startups from Airtable
    const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
      const allRecords: Record<FieldSet>[] = [];

      base(TABLE_NAME)
        .select({
          view: "Growth Meets Capital Startups",
          sort: [{ field: "Startup Name", direction: "asc" }],
        })
        .eachPage(
          (records, fetchNextPage) => {
            allRecords.push(...records);
            fetchNextPage();
          },
          (err) => {
            if (err) return reject(err);
            resolve(allRecords);
          }
        );
    });

    // If no search parameters -> return all startups sorted
    if (requestedNames.length === 0) {
      const allSortedRecords = records.map((record) => {
        const logoField = record.get("Logo");
        const logoUrl =
          Array.isArray(logoField) && logoField.length > 0
            ? logoField[0]?.url
            : "N/A";

        return {
          id: record.id,
          name: (record.get("Startup Name") as string) || "Unknown",
          representative: (record.get("Representative Name") as string) || "N/A",
          email: (record.get("Email") as string) || "N/A",
          title: "N/A",
          website: (record.get("Website") as string) || "N/A",
          logo: logoUrl,
          type: (record.get("Type") as string) || "N/A",
          fundraising: (record.get("Fundraising in 2025?") as string) || "N/A",
          stage: (record.get("Stage") as string) || "N/A",
        };
      });

      return NextResponse.json({ success: true, data: allSortedRecords });
    }

    // Function to return a default startup object
    const getDefaultStartup = (name = "N/A"): Startup => ({
      id: "N/A",
      name,
      representative: "N/A",
      email: "N/A",
      title: "N/A",
      website: "N/A",
      logo: "N/A",
      type: "N/A",
      fundraising: "N/A",
      stage: "N/A",
    });

    // Create an array to store the final results in the correct order
    const finalResults: Startup[] = [];
    
    // Loop through requested names and process each
    for (const name of requestedNames) {
      if (!name) {
        finalResults.push(getDefaultStartup());
        continue;
      }

      // Find the record for the given startup name
      const record = records.find(
        (record) => (record.get("Startup Name") as string) === name
      );
      // If no record is found, insert an empty object at the current position
      if (record) {
        const logoField = record.get("Logo");
        const logoUrl =
          Array.isArray(logoField) && logoField.length > 0
            ? logoField[0]?.url
            : "N/A";

        finalResults.push({
          id: record.id,
          name: (record.get("Startup Name") as string) || "Unknown",
          representative: (record.get("Representative Name") as string) || "N/A",
          email: (record.get("Email") as string) || "N/A",
          title: "N/A",
          website: (record.get("Website") as string) || "N/A",
          logo: logoUrl,
          type: (record.get("Type") as string) || "N/A",
          fundraising: (record.get("Fundraising in 2025?") as string) || "N/A",
          stage: (record.get("Stage") as string) || "N/A",
        });
      } else {
        finalResults.push(getDefaultStartup(name));
      }
    }

    // Ensure exactly 10 objects in response by filling with default entries
    while (finalResults.length < 10) {
      finalResults.push(getDefaultStartup());
    }

    return NextResponse.json({ success: true, data: finalResults });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}