import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();
        console.log('Received data:', requestData);

        const { Type, FirstName, LastName, Position, CompanyName, Phone, Website, Email } = requestData;


        // Prepare the data object to match Airtable's structure
        const fields = {
            "Contact full name": `${FirstName} ${LastName}`.trim(),
            "Investor or startup?":Type,
            "First name": FirstName,
            "Last name":LastName,
            "Position in a company": Position,
            "Company name": CompanyName,
            "Company website": Website,
            "E-Mail address":Email,
            "Phone": Phone,
        };

        console.log('Prepared fields:', fields); // Log the fields before sending

        // Ensure Airtable API key is set
        if (!process.env.AIRTABLE_API_KEY) {
            console.error("Airtable API key is missing");
            return NextResponse.json({ error: "Airtable API key is not set" }, { status: 500 });
        }

        // Send the request to Airtable
        const response = await fetch(
            'https://api.airtable.com/v0/appJDzxyOB7vPkIcM/tblo8ZZ7ran3QFOKO',
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