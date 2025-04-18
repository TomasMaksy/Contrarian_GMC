import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";

const AIRTABLE_READONLY_API = process.env.AIRTABLE_READONLY_API as string;
const BASE_ID = "appCup7R4k8cZF33V";
const TABLE_NAME = "GMC Investors";

// Define the Airtable record type
export interface InvestorRecord {
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
  table: number;
}

const base = new Airtable({ apiKey: AIRTABLE_READONLY_API }).base(BASE_ID);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const namesParam = searchParams.get("names"); // e.g., "Investor1,Investor2"
  const requestedNames = namesParam
    ?.split(",")
    .map((name) => name.trim()) // Trim whitespace
    .slice(0, 10) || []; // Ensure max 10 names

  try {
    // Fetch all records from Airtable
    const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
      const allRecords: Record<FieldSet>[] = [];

      base(TABLE_NAME)
        .select({
          view: "Growth Meets Capital Investors",
          sort: [{ field: "Investor Name", direction: "asc" }],
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

    const getDefaultInvestor = (name = "N/A"): InvestorRecord => ({
      id: "N/A",
      name,
      representative: "N/A",
      title: "N/A",
      email: "N/A",
      website: "N/A",
      logo: "N/A",
      type: "N/A",
      fundraising: "N/A",
      stage: "N/A",
      table: 0,
    });

    // Case 1: No search parameters -> return all sorted records
    if (requestedNames.length === 0) {
      const allSortedRecords = records.map((record) => {
        const logoField = record.get("Logo");
        const logoUrl =
          Array.isArray(logoField) && logoField.length > 0
            ? logoField[0]?.url
            : "N/A";

        return {
          id: record.id,
          name: (record.get("Investor Name") as string) || "Unknown",
          representative: (record.get("Representative Name") as string) || "N/A",
          email: (record.get("Email") as string) || "N/A",
          title: "N/A",
          website: (record.get("Website") as string) || "N/A",
          logo: logoUrl,
          type: (record.get("Type") as string) || "N/A",
          fundraising: (record.get("Fundraising in 2025?") as string) || "N/A",
          stage: (record.get("Stage") as string) || "N/A",
          table: (record.get("Table Number") as number) || 0,
        };
      });

      return NextResponse.json({ success: true, data: allSortedRecords });
    }

    // Case 2: Search parameters provided -> return only the requested ones
    const filteredRecords = requestedNames.map((name) => {
      if (!name) return getDefaultInvestor(); // Handle empty name

      const record = records.find(
        (record) => (record.get("Investor Name") as string) === name
      );

      if (record) {
        const logoField = record.get("Logo");
        const logoUrl =
          Array.isArray(logoField) && logoField.length > 0
            ? logoField[0]?.url
            : "N/A";

        return {
          id: record.id,
          name: (record.get("Investor Name") as string) || "Unknown",
          representative: (record.get("Representative Name") as string) || "N/A",
          email: (record.get("Email") as string) || "N/A",
          title: "N/A",
          website: (record.get("Website") as string) || "N/A",
          logo: logoUrl,
          type: (record.get("Type") as string) || "N/A",
          fundraising: (record.get("Fundraising in 2025?") as string) || "N/A",
          stage: (record.get("Stage") as string) || "N/A",
          table: (record.get("Table Number") as number) || 0,
        };
      }

      return getDefaultInvestor(name); // Return placeholder for missing names
    });

    // Ensure exactly 10 objects in response
    while (filteredRecords.length < 10) {
      filteredRecords.push(getDefaultInvestor());
    }

    return NextResponse.json({ success: true, data: filteredRecords });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}