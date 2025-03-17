import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = "https://www.growthmeetscapital.com"; // Change this to your domain

    const urls = [
        { loc: "/", lastmod: "2025-03-13", changefreq: "daily", priority: "1.0" },
        { loc: "/home", lastmod: "2025-03-11", changefreq: "monthly", priority: "1" },
        { loc: "/participants", lastmod: "2025-03-11", changefreq: "weekly", priority: "0.8" },
        { loc: "/landing", lastmod: "2025-03-16", changefreq: "weekly", priority: "1" },

    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
            .map(
                (url) => `
        <url>
            <loc>${baseUrl}${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
            <changefreq>${url.changefreq}</changefreq>
            <priority>${url.priority}</priority>
        </url>
        `
            )
            .join("")}
    </urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}