import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Upload,
  CheckCircle2,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ContactInquirySectionProps {
  prefilledProduct?: string;
}

export const ContactInquirySection: React.FC<ContactInquirySectionProps> = ({
  prefilledProduct,
}) => {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    cardType: prefilledProduct || 'Student ID Cards',
    quantity: '500 Cards',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert('File size exceeds the maximum limit of 25MB. Please choose a smaller file.');
        e.target.value = '';
        setAttachedFileName(null);
        return;
      }
      setAttachedFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Hello IDCraft India! Here is an institutional quotation inquiry:\n` +
        `• Institution: ${formData.institutionName}\n` +
        `• Contact Person: ${formData.contactPerson}\n` +
        `• Phone: ${formData.phone}\n` +
        `• Email: ${formData.email}\n` +
        `• City/State: ${formData.city}\n` +
        `• Card Type: ${formData.cardType}\n` +
        `• Volume: ${formData.quantity}\n` +
        `• Notes: ${formData.message || 'None'}\n\n` +
        `Please share the formal proforma quote & design layout.`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
    window.location.href = '/thank-you';
  };

  return (
    <section id="contact-section" className="py-24 md:py-28 lg:py-[136px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-blue-600 mb-3 block">
            Direct procurement desk
          </span>
          <h2 className="font-semibold text-[30px] md:text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-[#0F172A] mb-4">
            Request an institutional quotation and digital sample
          </h2>
          <p className="font-normal text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.01em] text-[#334155] max-w-[680px] text-left">
            Receive an official proforma quote with GST HSN 3920 breakdown within 15 minutes during operating hours, or speak directly with production managers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT: FORM (7 cols) ================= */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                      Institution or corporate name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.institutionName}
                      onChange={(e) =>
                        setFormData({ ...formData, institutionName: e.target.value })
                      }
                      placeholder="e.g. St. Xavier's Senior Secondary"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                      Contact person and designation *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPerson: e.target.value })
                      }
                      placeholder="e.g. Dr. Anil Mehra (Principal)"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                      WhatsApp or mobile number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98110 12345"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">Official email address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@schoolname.edu.in"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">City and state *</label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Gurugram, Haryana"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">Card product required</label>
                    <select
                      value={formData.cardType}
                      onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Student ID Cards</option>
                      <option>Employee ID Cards</option>
                      <option>Faculty & Teacher Identity Badges</option>
                      <option>Hospital Staff Cards</option>
                      <option>Visitor Badges & Passes</option>
                      <option>Custom Printed Lanyards & Holders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">Estimated batch quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>50 – 100 Cards (Starter batch)</option>
                    <option>100 – 250 Cards</option>
                    <option>500 Cards (Standard institutional batch)</option>
                    <option>1,000 – 2,500 Cards</option>
                    <option>5,000+ Cards (Enterprise volume)</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                    Technical requirements or delivery schedule
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify requirements such as barcode encoding, slot punching, or expedited 48-hour dispatch..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                    Upload roster or logo file (optional)
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-white border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span className="text-[14px] text-[#334155]">
                      {attachedFileName ? attachedFileName : 'Attach institution logo, Excel roster, or existing PDF proof'}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.xls,.pdf,.png,.jpg,.zip"
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1">Uploaded files are strictly used for fulfilling this order and will be securely deleted afterward. Max 25MB.</p>
                </div>

                <div className="flex items-start gap-2 mt-4">
                  <input type="checkbox" required id="consent" className="mt-1" />
                  <label htmlFor="consent" className="text-[12px] text-slate-600">
                    I agree to the <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="/terms-conditions" target="_blank" className="text-blue-600 hover:underline">Terms & Conditions</a>. I consent to be contacted regarding my quotation.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit quotation request and receive WhatsApp proof</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-[22px] font-semibold text-[#0F172A]">
                  Inquiry received successfully
                </h3>
                <p className="text-[14px] text-[#334155] max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="font-semibold text-[#0F172A]">{formData.contactPerson}</strong>.
                  Our institutional sales representative has been notified and will share your digital layout proofs shortly on WhatsApp ({formData.phone}).
                </p>
              </div>
            )}
          </div>

          {/* ================= RIGHT: DIRECT CONTACT INFO (5 cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Action Card */}
            <div className="p-6 rounded-3xl bg-emerald-800 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-[20px] font-semibold text-white">Direct WhatsApp desk</h3>
                <p className="text-[14px] text-emerald-100 mt-1 leading-relaxed font-normal">
                  Connect immediately with our manufacturing coordinator. Send your logo vector for an immediate digital sample proof.
                </p>
              </div>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20IDCraft%20India!%20I%20need%20a%20quote%20for%20ID%20cards.`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-emerald-900 font-medium text-[14px] hover:bg-emerald-50 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
                <span>Message on WhatsApp ({COMPANY_INFO.phone})</span>
              </a>
            </div>

            {/* Factory Addresses Card */}
            <div className="p-6 rounded-3xl bg-[#0F172A] text-white shadow-md border border-slate-800 space-y-4">
              <h4 className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                Manufacturing facility & works
              </h4>

              <div className="flex gap-3 text-[13px]">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central manufacturing facility & head office:</p>
                  <p className="text-slate-400 mt-0.5 leading-relaxed font-normal">
                    {COMPANY_INFO.factoryAddress}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px] pt-3 border-t border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Operating hours:</p>
                  <p className="text-slate-400 mt-0.5 font-normal">{COMPANY_INFO.workingHours}</p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px] pt-3 border-t border-slate-800">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct telephone line:</p>
                  <p className="text-slate-400 mt-0.5 font-normal">{COMPANY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex gap-3 text-[13px] pt-3 border-t border-slate-800">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Official orders desk:</p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-400 hover:text-white mt-0.5 font-normal transition-colors inline-block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
