import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import toast from 'react-hot-toast';

function ExportReportModal({ moods = [], isOpen, onClose }) {
  const [format, setFormat] = useState('pdf');
  const [includeAi, setIncludeAi] = useState(true);

  if (!isOpen) return null;

  const totalEntries = moods.length;
  const avgEnergy = totalEntries > 0
    ? (moods.reduce((acc, m) => acc + (Number(m.energy) || 7), 0) / totalEntries).toFixed(1)
    : 'N/A';
  
  const positiveCount = moods.filter(m => ['happy', 'calm', 'excited', 'loved'].includes(m.mood?.toLowerCase().split(' ')[0])).length;
  const stabilityRate = totalEntries > 0 ? Math.round((positiveCount / totalEntries) * 100) : 0;

  const allTags = moods.flatMap(m => m.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => ({ ...acc, [tag]: (acc[tag] || 0) + 1 }), {});
  const topTrigger = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None identified';

  const handleExportCSV = () => {
    if (totalEntries === 0) {
      toast.error('No mood entries to export!');
      return;
    }

    const headers = ['Date', 'Time', 'Mood', 'Energy Score (1-10)', 'Context Tags', 'Personal Notes'];
    const rows = moods.map(m => {
      const dateObj = new Date(m.date);
      const dateStr = dateObj.toLocaleDateString();
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const cleanMood = m.mood ? m.mood.replace(/,/g, '') : '';
      const cleanTags = (m.tags || []).join('; ');
      const cleanNote = m.note ? `"${m.note.replace(/"/g, '""')}"` : '';
      return [dateStr, timeStr, cleanMood, m.energy || 'N/A', `"${cleanTags}"`, cleanNote].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MoodLogs_Clinical_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Clinical CSV downloaded successfully!');
    onClose();
  };

  const handleExportPDF = () => {
    if (totalEntries === 0) {
      toast.error('No mood entries to generate report!');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) {
      toast.error('Please allow popups to generate PDF report.');
      return;
    }

    const reportDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Clinical Mood & Behavioral Health Report - MoodLogs</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
          
          body {
            font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
            color: #1c1917;
            margin: 0;
            padding: 40px;
            background: #ffffff;
            line-height: 1.5;
          }
          .header {
            border-bottom: 2px solid #1c1917;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .brand {
            font-family: 'Instrument Serif', serif;
            font-size: 32px;
            margin: 0;
          }
          .title {
            font-size: 20px;
            font-weight: 700;
            margin-top: 4px;
          }
          .meta {
            font-size: 12px;
            color: #57534e;
            text-align: right;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 32px;
          }
          .stat-card {
            background: #f5f5f4;
            padding: 16px;
            border-radius: 12px;
            border: 1px solid #e7e5e0;
          }
          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #78716c;
            font-weight: 600;
          }
          .stat-val {
            font-size: 24px;
            font-weight: 700;
            margin-top: 4px;
          }
          .section-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            border-bottom: 1px solid #e7e5e0;
            padding-bottom: 8px;
            margin-top: 32px;
            margin-bottom: 16px;
          }
          .ai-box {
            background: #fcfaf7;
            border-left: 4px solid #1c1917;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            margin-bottom: 32px;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 10px;
          }
          th {
            background: #f5f5f4;
            text-align: left;
            padding: 10px 12px;
            font-weight: 600;
            font-size: 12px;
            color: #57534e;
            border-bottom: 2px solid #d6d3d1;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e7e5e0;
            vertical-align: top;
          }
          .tag {
            display: inline-block;
            background: #f5f5f4;
            border: 1px solid #d6d3d1;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            margin-right: 4px;
            margin-bottom: 4px;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e7e5e0;
            font-size: 11px;
            color: #8a8581;
            display: flex;
            justify-content: space-between;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="brand">MoodLogs</h1>
            <div class="title">Clinical Patient Summary & Behavioral Audit</div>
          </div>
          <div class="meta">
            <div><strong>Generated:</strong> ${reportDate}</div>
            <div><strong>Report Type:</strong> Longitudinal Check-in Audit</div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Total Check-ins</div>
            <div class="stat-val">${totalEntries}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Avg Energy Level</div>
            <div class="stat-val">${avgEnergy}/10</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Positive Index</div>
            <div class="stat-val">${stabilityRate}%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Primary Trigger</div>
            <div class="stat-val" style="font-size: 18px;">${topTrigger}</div>
          </div>
        </div>

        ${includeAi ? `
          <div class="section-title">Clinical AI Synthesis (Mindful CBT Engine)</div>
          <div class="ai-box">
            <p style="margin-top:0;"><strong>Clinical Observation:</strong> Patient exhibits an average energy baseline of ${avgEnergy}/10 across ${totalEntries} logged sessions. Identified behavioral triggers correlate frequently with context tags such as <em>${topTrigger}</em>.</p>
            <p style="margin-bottom:0;"><strong>Recommended Therapeutic Reframe:</strong> Continue tracking emotional shifts and practicing proactive labeling during periods of high tension. Encourage mindfulness grounding exercises prior to high-trigger events.</p>
          </div>
        ` : ''}

        <div class="section-title">Log History & Contextual Notes</div>
        <table>
          <thead>
            <tr>
              <th style="width: 15%;">Date & Time</th>
              <th style="width: 15%;">Mood State</th>
              <th style="width: 12%;">Energy Score</th>
              <th style="width: 23%;">Context Tags</th>
              <th style="width: 35%;">Patient Notes</th>
            </tr>
          </thead>
          <tbody>
            ${moods.map(m => {
              const dt = new Date(m.date);
              const tagsHtml = (m.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
              return `
                <tr>
                  <td>
                    <strong>${dt.toLocaleDateString()}</strong><br/>
                    <span style="color:#78716c; font-size:11px;">${dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </td>
                  <td><strong>${m.mood || 'Unrecorded'}</strong></td>
                  <td><strong>${m.energy || 'N/A'}</strong> / 10</td>
                  <td>${tagsHtml || '<span style="color:#a8a29e;">None</span>'}</td>
                  <td>${m.note || '<span style="color:#a8a29e; font-style:italic;">No notes provided</span>'}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div>CONFIDENTIAL CLINICAL SUMMARY · GENERATED VIA MOODLOGS THERAPEUTIC ENGINE</div>
          <div>Page 1 of 1</div>
        </div>

        <script>
          setTimeout(() => {
            window.print();
          }, 500);
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    toast.success('Clinical report ready for printing/saving!');
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-lg bg-white dark:bg-[#141413] border border-[#e7e5e4] dark:border-white/[0.1] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden my-auto flex flex-col relative z-[1000000]">
        
        {}
        <div className="px-6 py-5 border-b border-[#f5f5f4] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f4] dark:bg-white/[0.06] flex items-center justify-center text-lg shadow-2xs">
              📄
            </div>
            <div>
              <h2 className="font-serif font-semibold text-lg text-[#1c1917] dark:text-[#f5f5f4] tracking-tight">
                Export Clinical Report
              </h2>
              <p className="text-xs text-[#78716c] dark:text-[#a8a29e] mt-0.5">
                Generate structured summaries for therapists or doctor appointments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-white hover:bg-[#f5f5f4] dark:hover:bg-white/[0.06] transition-all cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {}
        <div className="p-6 space-y-6">
          
          {}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#fafaf9] dark:bg-[#1c1c1a] p-3.5 rounded-2xl border border-[#e7e5e4]/60 dark:border-white/[0.05] text-center">
              <span className="text-[10px] uppercase font-semibold text-[#8a8581] block">Entries</span>
              <span className="text-base font-bold text-[#1c1917] dark:text-[#f5f5f4]">{totalEntries}</span>
            </div>
            <div className="bg-[#fafaf9] dark:bg-[#1c1c1a] p-3.5 rounded-2xl border border-[#e7e5e4]/60 dark:border-white/[0.05] text-center">
              <span className="text-[10px] uppercase font-semibold text-[#8a8581] block">Avg Energy</span>
              <span className="text-base font-bold text-[#1c1917] dark:text-[#f5f5f4]">{avgEnergy}/10</span>
            </div>
            <div className="bg-[#fafaf9] dark:bg-[#1c1c1a] p-3.5 rounded-2xl border border-[#e7e5e4]/60 dark:border-white/[0.05] text-center truncate">
              <span className="text-[10px] uppercase font-semibold text-[#8a8581] block">Key Trigger</span>
              <span className="text-sm font-bold text-[#1c1917] dark:text-[#f5f5f4] truncate block">{topTrigger.split(' ')[0]}</span>
            </div>
          </div>

          {}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-[#57534e] dark:text-[#d6d3d1] uppercase tracking-wider block">
              Select Output Format
            </span>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-1 cursor-pointer transition-all ${format === 'pdf' ? 'border-[#1c1917] dark:border-white bg-[#f5f5f4] dark:bg-white/[0.08]' : 'border-[#e7e5e4] dark:border-white/[0.06] hover:bg-[#fafaf9] dark:hover:bg-white/[0.03]'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm text-[#1c1917] dark:text-white">Clinical PDF Report</span>
                  <span className="text-base">🖨️</span>
                </div>
                <span className="text-[11px] text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
                  Medical-grade printable document formatted for doctors & therapists.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-1 cursor-pointer transition-all ${format === 'csv' ? 'border-[#1c1917] dark:border-white bg-[#f5f5f4] dark:bg-white/[0.08]' : 'border-[#e7e5e4] dark:border-white/[0.06] hover:bg-[#fafaf9] dark:hover:bg-white/[0.03]'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm text-[#1c1917] dark:text-white">Raw Data CSV</span>
                  <span className="text-base">📊</span>
                </div>
                <span className="text-[11px] text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
                  Excel spreadsheet with raw timestamps, energy scores, and tags.
                </span>
              </button>
            </div>
          </div>

          {}
          {format === 'pdf' && (
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#fafaf9] dark:bg-[#1c1c1a] border border-[#e7e5e4]/60 dark:border-white/[0.05] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeAi}
                onChange={(e) => setIncludeAi(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#1c1917] dark:accent-white cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-semibold text-[#1c1917] dark:text-[#f5f5f4] block">Include Mindful AI Clinical Synthesis</span>
                <span className="text-[#78716c] dark:text-[#a8a29e]">Embed CBT observations & trigger summaries in header</span>
              </div>
            </label>
          )}

        </div>

        {}
        <div className="px-6 py-4 bg-[#fafaf9] dark:bg-[#111110] border-t border-[#f5f5f4] dark:border-white/[0.06] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#57534e] dark:text-[#a8a29e] hover:bg-[#e7e5e4] dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={format === 'pdf' ? handleExportPDF : handleExportCSV}
            className="px-6 py-2.5 rounded-xl bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] hover:opacity-90 text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            <span>{format === 'pdf' ? 'Generate & Print PDF' : 'Download CSV File'}</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}

export default ExportReportModal;
