import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";

const AIRTABLE_READONLY_API = process.env.AIRTABLE_READONLY_API as string;
const BASE_ID = "appCup7R4k8cZF33V";
const TABLE_NAME = "GMC Startups";

import type { OrganisationTypes } from "@/app/participants/utils/types";

const base = new Airtable({ apiKey: AIRTABLE_READONLY_API }).base(BASE_ID);

export async function GET() {
  try {
    const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
      const allRecords: Record<FieldSet>[] = [];

      base(TABLE_NAME)
        .select({
          view: "Growth Meets Capital Startups",
          sort: [{ field: "Startup Name", direction: "asc" }], // Sort by Investor Name in ascending order

        })
        .eachPage(
          (records: ReadonlyArray<Record<FieldSet>>, fetchNextPage) => {
            allRecords.push(...records);
            fetchNextPage();
          },
          (err) => {
            if (err) return reject(err);
            resolve(allRecords);
          }
        );
    });

    // Format the records into a clean JSON response
    const investors: OrganisationTypes[] = records.map((record) => {
      // Safely handle the logo field
      const logoField = record.get("Logo");
      const logoUrl = logoField && Array.isArray(logoField) && logoField.length > 0
        ? logoField[0]?.url // Use the URL of the first logo if available
        : "N/A"; // Fallback to "N/A" if no logo or logo field is not an array

      
      return {
        id: record.id,
        name: (record.get("Startup Name") as string) || "Unknown",
        representative:  "",
        title: "",
        website: (record.get("Website") as string) || "",
        logo: logoUrl, // Use the logo URL
        type: (record.get("Type") as string) || "",
        fundraising: (record.get("Fundraising in 2025?") as string) || "N/A",
        stage: (record.get("Stage") as string) || "N/A",
      };
    });

    return NextResponse.json({ success: true, data: investors });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch records" }, { status: 500 });
  }
}