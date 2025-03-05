import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY as string;
const BASE_ID = "appJDzxyOB7vPkIcM";
const TABLE_NAME = "Assigned_Meetings";

// Define the Airtable record type
export interface TimetableProps {
orgName: string;
meetings: string[];
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

export async function GET() {
  try {
    const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
      const allRecords: Record<FieldSet>[] = [];

      base(TABLE_NAME)
        .select({
          view: "Grid view",
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
    const timetables: TimetableProps[] = records.map((record) => {
      
      return {
        id: record.id,
        orgName: (record.get("Organisation") as string),
        meetings: Array.from({ length: 10 }, (_, i) =>
            String(record.get(`Meeting ${i + 1}`) ?? "N/A")
          ),
      };
    });

    return NextResponse.json({ success: true, data: timetables });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch timetable records" }, { status: 500 });
  }
}
