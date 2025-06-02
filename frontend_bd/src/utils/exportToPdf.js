// @/utils/exportToPDF.js
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToPDF(data, headers, columns, filename = 'reporte', title = 'Reporte') {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar')
    return
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // Añadir título y fecha
  doc.setFontSize(16)
  doc.text(title, 14, 15)

  doc.setFontSize(10)
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 25)

  // Preparar datos para la tabla
  const tableHeaders = [headers]
  const tableData = data.map(item => columns.map(col => item[col]))

  // Configurar tabla
  autoTable(doc, {
    head: tableHeaders,
    body: tableData,
    startY: 35,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 35 }
  })

  // Guardar el PDF
  doc.save(`${filename}_${new Date().toISOString().slice(0, 10)}.pdf`)
}