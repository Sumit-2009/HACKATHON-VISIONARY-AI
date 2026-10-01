import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Tag,
  Share2,
  X
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import { documentsAPI } from '../api/client';

export const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeModalData, setActiveModalData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, [search]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const res = await documentsAPI.list({ search });
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAction = async (doc, action) => {
    setActionLoading(true);
    try {
      const res = await documentsAPI.action(doc.id, { action });
      setActiveModalData(res.data);
      if (action === 'route') {
        loadDocuments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <PageHeader
        title="AI Document Intelligence"
        subtitle="Understand and route enterprise documents automatically."
      />

      {/* Search Bar */}
      <div className="bg-white border border-[#E6E8EC] rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents by title, department, or type..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm text-[#101828] placeholder-[#98A2B3] outline-none"
          />
        </div>
        <span className="text-xs text-[#667085]">
          {documents.length} documents tracked
        </span>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-[#E6E8EC] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E8EC] bg-[#F7F8FA] text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                <th className="py-4 px-6">Document</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Uploaded</th>
                <th className="py-4 px-6">AI Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7] text-sm">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F9FAFB] transition-colors">
                  
                  {/* Title & ID */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#101828] block">{doc.title}</span>
                        <span className="text-xs text-[#98A2B3]">{doc.id} • {doc.size}</span>
                      </div>
                    </div>
                  </td>

                  {/* Document Type */}
                  <td className="py-4 px-6 font-medium text-[#344054] whitespace-nowrap">
                    {doc.type}
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6 text-[#667085] whitespace-nowrap">
                    {doc.department}
                  </td>

                  {/* Uploaded */}
                  <td className="py-4 px-6 text-xs text-[#667085] whitespace-nowrap">
                    {doc.uploaded}
                  </td>

                  {/* AI Status */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4F2FF] border border-[#DDD6FE] text-[#4F46E5]">
                      <Sparkles className="w-3 h-3 text-[#6366F1]" />
                      <span>{doc.aiStatus}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDocumentAction(doc, 'summarize')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#101828] bg-[#F7F8FA] border border-[#E6E8EC] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors cursor-pointer"
                        title="Summarize with AI"
                      >
                        Summarize
                      </button>
                      <button
                        onClick={() => handleDocumentAction(doc, 'extract')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#101828] bg-[#F7F8FA] border border-[#E6E8EC] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors cursor-pointer"
                        title="Extract Key Fields"
                      >
                        Extract
                      </button>
                      <button
                        onClick={() => handleDocumentAction(doc, 'classify')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#101828] bg-[#F7F8FA] border border-[#E6E8EC] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors cursor-pointer"
                        title="Classify Document"
                      >
                        Classify
                      </button>
                      <button
                        onClick={() => handleDocumentAction(doc, 'route')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#14213D] hover:bg-[#1E293B] transition-colors cursor-pointer"
                        title="Route to Destination Queue"
                      >
                        Route
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intelligence Result Modal */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#101828]/25 backdrop-blur-sm"
            onClick={() => setActiveModalData(null)}
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-[#E6E8EC] z-10 space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#6366F1]" />
                <h3 className="text-xl font-semibold text-[#101828] capitalize">
                  Document {activeModalData.action}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalData(null)}
                className="p-1.5 text-[#667085] hover:text-[#101828] rounded-xl hover:bg-[#F7F8FA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs text-[#98A2B3]">{activeModalData.documentId}</span>
              <h4 className="text-base font-semibold text-[#101828]">{activeModalData.title}</h4>
            </div>

            {/* Content for Summarize */}
            {activeModalData.summary && (
              <div className="space-y-3">
                <div className="bg-[#F4F2FF] border border-[#DDD6FE] rounded-2xl p-4 text-xs text-[#101828] leading-relaxed">
                  {activeModalData.summary}
                </div>
                {activeModalData.keyInsights && (
                  <ul className="space-y-1.5 text-xs text-[#667085]">
                    {activeModalData.keyInsights.map((ins, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#6366F1]">✓</span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Content for Extracted Fields */}
            {activeModalData.extractedFields && (
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase text-[#667085] tracking-wider">
                  Extracted Telemetry
                </span>
                <div className="bg-[#F7F8FA] border border-[#E6E8EC] rounded-2xl p-4 space-y-2 text-xs">
                  {Object.entries(activeModalData.extractedFields).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-1 border-b border-[#E6E8EC] last:border-0">
                      <span className="text-[#667085] font-medium">{key}</span>
                      <span className="font-semibold text-[#101828]">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content for Classification */}
            {activeModalData.classifiedCategory && (
              <div className="space-y-3 bg-[#F4F2FF] border border-[#DDD6FE] rounded-2xl p-5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Category</span>
                  <span className="font-semibold text-[#4F46E5]">{activeModalData.classifiedCategory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Data Sensitivity</span>
                  <span className="font-semibold text-[#101828]">{activeModalData.sensitivity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">AI Model Match</span>
                  <span className="font-semibold text-[#15803D]">{activeModalData.confidence}%</span>
                </div>
              </div>
            )}

            {/* Content for Route */}
            {activeModalData.status && (
              <div className="bg-[#ECFDF3] border border-[#A6F4C5] rounded-2xl p-5 text-xs space-y-2 text-[#027A48]">
                <div className="font-semibold text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{activeModalData.status}</span>
                </div>
                <p>Destination Queue: <strong>{activeModalData.destinationQueue}</strong></p>
                <p>Assigned Reviewer: <strong>{activeModalData.assignedOwner}</strong></p>
              </div>
            )}

            <div className="pt-4 border-t border-[#F2F4F7] text-right">
              <button
                onClick={() => setActiveModalData(null)}
                className="px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-xs font-semibold hover:bg-[#1E293B]"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Documents;
