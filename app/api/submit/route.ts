import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();

        const { Organisation, Name, Email, Type, ...rest } = requestData;

        // Extract preferences dynamically
        const formattedPreferences: Record<string, string> = {};
        for (let i = 1; i <= 24; i++) {
            formattedPreferences[`Preference ${i}`] = rest[`Preference ${i}`] || "";
        }

        // Prepare the data object to match Airtable's structure
        const fields = {
            Organisation,
            Type,
            Name,
            Email,
            ...formattedPreferences,
        };

        console.log('Prepared fields:', fields); // Log the fields before sending

        // Ensure Airtable API key is set
        if (!process.env.AIRTABLE_API_KEY) {
            console.error("Airtable API key is missing");
            return NextResponse.json({ error: "Airtable API key is not set" }, { status: 500 });
        }

        // Send the request to Airtable
        const response = await fetch(
            'https://api.airtable.com/v0/apppnPtARbtxMjV3h/tblHEZBwzj5lEfOQH',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ records: [{ fields }] }), // Wrap fields in `records`
            }
        );

        const responseData = await response.json();
        console.log('Airtable response:', responseData); // Log the Airtable response

        if (!response.ok) {
            return NextResponse.json({
                error: "Something went wrong with Airtable",
                details: responseData,
            }, { status: 400 });
        }

        return NextResponse.json({ data: "ok" });

    } catch (error) {
        console.error("Error in submitting form:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}