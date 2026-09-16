import React, { useState } from 'react';
import {
  X,
  Package,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface FreeSampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeSampleKitModal: React.FC<FreeSampleKitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    institution: '',
    name: '',
    role: 'School Principal / Administrator',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    quantityNeed: '500 - 1,000 cards/year',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const text = encodeURIComponent(
      `Hello IDCraft India! I would like to request a FREE Physical Sample Kit:\n` +
        `• Institution: ${formData.institution}\n` +
        `• Name: ${formData.name} (${formData.role})\n` +
        `• Phone: ${formData.phone}\n` +
        `• Courier Address: ${formData.address}, PIN: ${formData.pincode}\n` +
        `• Expected Volume: ${formData.quantityNeed}\n\n` +
        `Please confirm sample kit dispatch via BlueDart/DTDC.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="max-w-lg mb-6 text-left">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-emerald-700 mb-2 block">
                Complimentary sample dispatch
              </span>
              <h3 className="font-semibold text-[22px] leading-[1.2] tracking-[-0.02em] text-[#0F172A] mb-2">
                Request an institutional physical sample kit
              </h3>
              <p className="text-[14px] text-[#334155] font-normal leading-[1.6]">
                Review card thickness, edge durability, photo color accuracy, and satin lanyards in person before issuing a formal purchase order.
              </p>
            </div>

            {/* Inclusions Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 space-y-2.5">
              <div className="font-semibold text-[#0F172A] text-[12px] uppercase tracking-wider">
                Contents included in your verification kit:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#334155] font-normal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 PVC card samples (Gloss, Matte, Metallic, Frost)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 Printed satin lanyards (16mm & 20mm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1 High-density QR & Barcode sample card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2 Badge holders (Acrylic case + soft pouch)</span>
                </div>
              </div>
            </div>

            {/* Request Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                    Institution or company name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Delhi Public School / Infosys"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">Contact person name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">Designation or role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option>School Principal / Administrator</option>
                    <option>HR Head / People Operations</option>
                    <option>Administrative / Purchase Officer</option>
                    <option>Coaching Director / Owner</option>
                    <option>Hospital Administrator</option>
                    <option>Other Institutional Head</option>
                  </select>
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
                    placeholder="+91 93365 22126"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                  Courier dispatch address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Campus address, Building / Floor, Landmark, City, State"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">PIN code *</label>
                  <input
                    required
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 110001"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium text-[13px] text-[#0F172A] block mb-1.5">
                    Estimated annual requirement
                  </label>
                  <select
                    value={formData.quantityNeed}
                    onChange={(e) => setFormData({ ...formData, quantityNeed: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-[14px] text-[#0F172A] focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option>100 – 250 cards</option>
                    <option>250 – 500 cards</option>
                    <option>500 – 1,000 cards/year</option>
                    <option>1,000 – 5,000 cards/year</option>
                    <option>5,000+ cards/year</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-[14px] shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Truck className="w-4 h-4" />
                <span>Dispatch complimentary sample kit via air courier</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-[22px] font-semibold text-[#0F172A]">
              Sample kit request dispatched
            </h3>
            <p className="text-[14px] text-[#334155] max-w-md mx-auto mt-2 leading-relaxed font-normal">
              We have received your sample kit requisition for{' '}
              <strong className="font-semibold text-[#0F172A]">{formData.institution}</strong>. Our logistics
              desk will ship your kit via BlueDart Air within 24 hours with real-time tracking sent
              to your WhatsApp ({formData.phone}).
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-[13px] hover:bg-slate-800 transition-colors"
            >
              Close window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
