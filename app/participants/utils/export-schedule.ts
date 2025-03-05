
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportScheduleAsPDF() {
  const element = document.getElementById("schedule-template");
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher resolution for better quality
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Adjust dimensions to fit the PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("meeting-schedule.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}