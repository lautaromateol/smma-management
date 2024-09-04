import { PDFDocument, rgb } from 'pdf-lib';

// Función para convertir encabezados a camel case
const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, '');
};

export async function generatePDF(headers, data, title = 'Document') {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Dimensiones de una página A4 en puntos

  // Título del documento
  page.drawText(title, {
    x: 50,
    y: 820,
    size: 20,
    color: rgb(0, 0, 0.8),
  });

  // Posición inicial en el eje Y
  let y = 780;

  // Calcular el espacio horizontal para las columnas
  const pageWidth = 595;
  const margin = 50;
  const availableWidth = pageWidth - margin * 2; // Espacio disponible para las columnas
  const columnWidth = availableWidth / headers.length; // Ancho para cada columna

  // Dibujar encabezados de la tabla
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: margin + index * columnWidth,
      y,
      size: 12,
      color: rgb(0, 0, 0),
    });
  });

  y -= 20; // Espacio entre encabezados y datos

  // Dibujar cada fila de la tabla
  data.forEach((row, rowIndex) => {
    headers.forEach((header, colIndex) => {
      // Convertir el encabezado a camel case para acceder a la clave correcta
      const key = toCamelCase(header);
      const text = row[key] !== undefined ? row[key].toString() : '';
      page.drawText(text, {
        x: margin + colIndex * columnWidth,
        y: y - rowIndex * 20,
        size: 10,
        color: rgb(0, 0, 0),
      });
    });
  });

  // Guardar el PDF en formato de bytes
  const pdfBytes = await pdfDoc.save();

  // Crear un blob y descargarlo
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.pdf`;
  link.click();
}
