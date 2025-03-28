import { NextResponse } from "next/server";
import Airtable, { FieldSet, Record } from "airtable";

// Set up Airtable API key and base details
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY as string;
const BASE_ID = "appJDzxyOB7vPkIcM";
const TABLE_NAME = "tblP9bukennHgvKuR";

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

// Define the Airtable record type
export interface TimetableProps {
	id: string;
	orgName: string;
	type: string;
	table: number;
	link: string;
	meeting1: string;
	meeting2: string;
}

// Update to extract the `id` from the URL path params
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const timetableId = params.id;

		if (!timetableId) {
			return NextResponse.json(
				{ success: false, error: "Timetable ID is required" },
				{ status: 400 }
			);
		}

		// Fetch the specific record using the timetable ID from fields.id
		const records = await new Promise<Record<FieldSet>[]>((resolve, reject) => {
			const allRecords: Record<FieldSet>[] = [];

			base(TABLE_NAME)
				.select({
					view: "Grid view",
					filterByFormula: `{id} = '${timetableId}'`, // Search by fields.id
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

		// If no records were found
		if (records.length === 0) {
			return NextResponse.json(
				{ success: false, error: "Timetable not found" },
				{ status: 404 }
			);
		}

		const timetable: TimetableProps = {
			id: String(records[0].fields.id || "N/A"),
			orgName: String(records[0].fields.Name || "N/A"),
			type: String(records[0].fields.Type || "N/A"),
			table: Number(records[0].fields.Table || 0),
			link: String(records[0].fields.Link || "N/A"),
			meeting1: String(records[0].fields["Meeting 1"] || "N/A"),
			meeting2: String(records[0].fields["Meeting 2"] || "N/A"),
		};

		return NextResponse.json({ success: true, data: timetable });
	} catch (error) {
		console.error("Error fetching data from Airtable:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch timetable record" },
			{ status: 500 }
		);
	}
}
