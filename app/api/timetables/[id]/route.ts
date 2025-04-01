import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY as string;
const BASE_ID = "apppnPtARbtxMjV3h";
const TABLE_NAME = "tblzdhGykBx9LuxzU";

export interface TimetableProps {
  id: string;
  orgName: string;
  type: string;
  table: number;
  link: string;
  meeting1: string;
  meeting2: string;
  meeting3: string;
  meeting4: string;
  meeting5: string;
  meeting6: string;
  meeting7: string;
  meeting8: string;
  meeting9: string;
  meeting10: string;
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const timetableId = params.id;

    if (!timetableId) {
      return NextResponse.json(
        { success: false, error: "Timetable ID is required" },
        { status: 400 }
      );
    }

    const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
      const allRecords: Record<FieldSet>[] = [];

      base(TABLE_NAME)
        .select({
          view: "Grid view",
          filterByFormula: `{id} = '${timetableId}'`,
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

    if (records.length === 0) {
      return NextResponse.json({ success: false, error: "Timetable not found" }, { status: 404 });
    }

    const record = records[0];
    const timetable: TimetableProps = {
      id: String(record.fields.id || "N/A"),
      orgName: String(record.fields.Name || "N/A"),
      type: String(record.fields.Type || "N/A"),
      table: Number(record.fields.Table || 0),
      link: String(record.fields.Link || "N/A"),
      meeting1: String(record.fields["Meeting 1"] || "N/A"),
      meeting2: String(record.fields["Meeting 2"] || "N/A"),
      meeting3: String(record.fields["Meeting 3"] || "N/A"),
      meeting4: String(record.fields["Meeting 4"] || "N/A"),
      meeting5: String(record.fields["Meeting 5"] || "N/A"),
      meeting6: String(record.fields["Meeting 6"] || "N/A"),
      meeting7: String(record.fields["Meeting 7"] || "N/A"),
      meeting8: String(record.fields["Meeting 8"] || "N/A"),
      meeting9: String(record.fields["Meeting 9"] || "N/A"),
      meeting10: String(record.fields["Meeting 10"] || "N/A"),
    };

    return NextResponse.json({ success: true, data: timetable });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch timetable record";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
