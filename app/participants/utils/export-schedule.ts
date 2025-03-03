import html2canvas from "html2canvas";


export async function exportScheduleAsImage() {
  const element = document.getElementById("schedule-template");
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher resolution
    });

    // Convert to PNG and download
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "meeting-schedule.png";
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
}
