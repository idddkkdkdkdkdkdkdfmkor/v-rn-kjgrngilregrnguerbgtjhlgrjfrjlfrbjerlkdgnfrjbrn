import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, UploadCloud, MonitorCheck, 
  Files, Star, CheckCircle2, 
  LogOut, PlayCircle, PlusCircle, Upload,
  Search, FolderPlus, FolderOpen, Users, Building2,
  ChevronLeft, LayoutTemplate, Type, Image as ImageIcon,
  ShieldCheck, Shapes, ZoomIn, ZoomOut, Keyboard,
  Undo2, Redo2, Grid, Download, Plus, Save, X, AlignHorizontalJustifyStart, Printer,
  Copy, Edit3, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { clearSession, getSession } from '../../lib/portalAuth';
import { BulkCardGenerator } from './BulkCardGenerator';
import {
  IDCardTemplateId,
  ID_CARD_TEMPLATES,
  PREMIUM_TEMPLATE_IDS,
  TEMPLATE_CATEGORIES,
  getDesignerElementsForTemplate,
  SAMPLE_MEMBERS,
} from '../../data/idCardTemplates';
import { printMembers } from '../../lib/idCardExport';
import { PrintableIDCard } from './PrintableIDCard';

type Tab = 'dashboard' | 'upload' | 'designer' | 'bulk' | 'settings';
type DesignerTab = 'get-started' | 'templates' | 'editor' | 'my-designs';
type EditorTool = 'card-options' | 'text' | 'images' | 'security' | 'shapes' | null;
type ElementType = 'text' | 'image' | 'shape';

interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  content?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
}

export const SuperAdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const session = getSession();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  useEffect(() => {
    if (!session || session.role !== 'superadmin') {
      navigate('/portal/login', { replace: true });
    }
  }, [navigate, session]);

  const handleSignOut = () => {
    clearSession();
    navigate('/portal/login');
  };

  const applyTemplate = (templateId: IDCardTemplateId) => {
    setElements(getDesignerElementsForTemplate(templateId));
    setSelectedTemplateId(templateId);
    setDesignerOrientation('HORIZONTAL');
    setCanvasSide('front');
    setBacksidePrinting('COLOR');
    setHistory([]);
    setHistoryIndex(-1);
    setSelectedElementId(null);
    setDesignerTab('editor');
    toast.success(`${ID_CARD_TEMPLATES[templateId].name} template loaded`);
  };
  const [designerTab, setDesignerTab] = useState<DesignerTab>('get-started');
  const [activeTool, setActiveTool] = useState<EditorTool>('card-options');
  const [designerOrientation, setDesignerOrientation] = useState<'VERTICAL'|'HORIZONTAL'>('HORIZONTAL');
  const [canvasSide, setCanvasSide] = useState<'front' | 'back'>('front');
  const [selectedTemplateId, setSelectedTemplateId] = useState<IDCardTemplateId | null>('royal-blue-academic');
  const [cardType, setCardType] = useState<'30MIL'|'ADHESIVE'>('30MIL');
  const [backsidePrinting, setBacksidePrinting] = useState<'NONE'|'BW'|'COLOR'>('NONE');
  const [slotPunch, setSlotPunch] = useState<'NONE'|'SHORT'|'LONG'>('NONE');
  const [lamination, setLamination] = useState<'NONE'|'TRANS'|'HOLO'>('NONE');
  const [magStripe, setMagStripe] = useState(false);
  const [safeZone, setSafeZone] = useState(true);
  const [rightTab, setRightTab] = useState<'CUSTOMIZE'|'LAYERS'>('CUSTOMIZE');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<CanvasElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateCategory, setTemplateCategory] = useState<string>('all');
  const [favoriteTemplates, setFavoriteTemplates] = useState<Set<IDCardTemplateId>>(new Set());

  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: 'bg-header',
      type: 'shape',
      x: -2,
      y: -2,
      width: 244,
      height: 120,
      backgroundColor: '#0A4A28',
      borderRadius: 12
    },
    {
      id: 'logo-text',
      type: 'text',
      x: 20,
      y: 20,
      content: 'IDCraft India',
      fontSize: 18,
      fontWeight: '900',
      color: '#FFFFFF'
    },
    {
      id: 'tagline',
      type: 'text',
      x: 20,
      y: 45,
      content: 'ENTERPRISE SOLUTIONS',
      fontSize: 8,
      fontWeight: 'bold',
      color: '#A7F3D0'
    },
    {
      id: 'photo',
      type: 'image',
      x: 70,
      y: 80,
      width: 100,
      height: 100,
      backgroundColor: '#F1F5F9',
      borderRadius: 50
    },
    {
      id: 'name',
      type: 'text',
      x: 35,
      y: 200,
      content: 'Aarav Sharma',
      fontSize: 22,
      fontWeight: '900',
      color: '#0F172A'
    },
    {
      id: 'role',
      type: 'text',
      x: 65,
      y: 230,
      content: 'Senior Developer',
      fontSize: 12,
      fontWeight: 'bold',
      color: '#14764B'
    },
    {
      id: 'id-label',
      type: 'text',
      x: 20,
      y: 280,
      content: 'ID NO:',
      fontSize: 10,
      fontWeight: 'bold',
      color: '#64748B'
    },
    {
      id: 'id-val',
      type: 'text',
      x: 60,
      y: 280,
      content: 'EMP-2026',
      fontSize: 10,
      fontWeight: '900',
      color: '#0F172A'
    },
    {
      id: 'bg-footer',
      type: 'shape',
      x: -2,
      y: 350,
      width: 244,
      height: 32,
      backgroundColor: '#14764B',
      borderRadius: 12
    },
    {
      id: 'website',
      type: 'text',
      x: 55,
      y: 356,
      content: 'www.idcraftindia.com',
      fontSize: 10,
      fontWeight: 'bold',
      color: '#FFFFFF'
    }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const visibleTemplates = useMemo(() => {
    const query = templateSearch.toLowerCase().trim();
    return PREMIUM_TEMPLATE_IDS.map((id) => ID_CARD_TEMPLATES[id]).filter((template) => {
      const matchesCategory = templateCategory === 'all' || template.category === templateCategory;
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.subtitle.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [templateCategory, templateSearch]);

  const toggleFavoriteTemplate = (templateId: IDCardTemplateId) => {
    setFavoriteTemplates((prev) => {
      const next = new Set(prev);
      if (next.has(templateId)) next.delete(templateId);
      else next.add(templateId);
      return next;
    });
  };

  const selectedTemplatePreview = selectedTemplateId
    ? {
        ...(SAMPLE_MEMBERS.find((member) => member.templateId === selectedTemplateId) ?? SAMPLE_MEMBERS[0]),
        templateId: selectedTemplateId,
      }
    : null;

  const addTextElement = () => {
    const newEl: CanvasElement = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'text',
      x: 40,
      y: 180,
      content: 'New Text',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0f172a'
    };
    updateElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
  };

  const addImageElement = (isRound = false) => {
    const newEl: CanvasElement = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'image',
      x: 70,
      y: 180,
      width: 100,
      height: 100,
      backgroundColor: '#E2E8F0',
      borderRadius: isRound ? 50 : 8
    };
    updateElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
  };

  const handleDragEnd = (id: string, info: any) => {
    updateElements(elements.map(el => {
      if (el.id === id) {
        return {
          ...el,
          x: el.x + info.offset.x,
          y: el.y + info.offset.y
        };
      }
      return el;
    }));
  };

  // Update elements with history
  const updateElements = (newElements: CanvasElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(elements); // push old state
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const currentElements = elements;
      setElements(history[historyIndex]);
      setHistoryIndex(historyIndex - 1);
      // We don't push to history on undo, just move index
    } else {
      toast.error('Nothing to undo');
    }
  };

  const handleRedo = () => {
    // Basic redo logic if we had forward history (omitted for brevity, we can just disable redo)
    toast.error('Redo not available');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Design saved successfully!');
    }, 1000);
  };

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (!selectedElementId) return;
    updateElements(elements.map(el => 
      el.id === selectedElementId ? { ...el, ...updates } : el
    ));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Data Upload', icon: UploadCloud },
    { id: 'designer', label: 'Designer', icon: MonitorCheck },
    { id: 'bulk', label: 'Bulk Generator', icon: Files },
  ];

  // ==========================================
  // DESIGNER SUITE VIEW (FULL SCREEN)
  // ==========================================
  if (activeTab === 'designer') {
    return (
      <div className="flex flex-col h-screen bg-[#F4F6F3] font-sans selection:bg-emerald-500/20">
        <Helmet>
          <title>Card Designer | IDCraft India</title>
        </Helmet>
        
        {/* Top Header */}
        <header className="h-[60px] bg-[#F4F6F3] border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
          <div className="w-[200px]">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>
          </div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setDesignerTab('get-started')}
              className={`text-[13px] font-bold pb-1.5 border-b-[3px] transition-colors ${designerTab === 'get-started' ? 'border-[#14764B] text-[#14764B]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              GET STARTED
            </button>
            <button
              onClick={() => setDesignerTab('templates')}
              className={`text-[13px] font-bold pb-1.5 border-b-[3px] transition-colors ${designerTab === 'templates' ? 'border-[#14764B] text-[#14764B]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              TEMPLATES
            </button>
            <button 
              onClick={() => setDesignerTab('editor')}
              className={`text-[13px] font-bold pb-1.5 border-b-[3px] transition-colors ${designerTab === 'editor' ? 'border-[#14764B] text-[#14764B]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              CARD DESIGNER
            </button>
            <button 
              onClick={() => setDesignerTab('my-designs')}
              className={`text-[13px] font-bold pb-1.5 border-b-[3px] transition-colors ${designerTab === 'my-designs' ? 'border-[#14764B] text-[#14764B]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              MY DESIGNS
            </button>
          </div>
          
          <div className="w-[200px] flex justify-end gap-2">
            <button className="px-4 py-1.5 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[12px] font-bold transition-colors shadow-sm">
              VIEW MEMBERS
            </button>
            <button className="px-4 py-1.5 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[12px] font-bold transition-colors shadow-sm">
              ALL PREVIEWS
            </button>
          </div>
        </header>

        {/* Get Started View */}
        {designerTab === 'get-started' && (
          <div className="flex-1 overflow-y-auto p-10 bg-white">
            <div className="max-w-[1200px] mx-auto">
              <h1 className="text-[32px] font-black text-slate-900 tracking-tight mb-2">Get Started</h1>
              <p className="text-[16px] text-slate-700 font-medium mb-10">Pick a professional template or start from scratch.</p>
              
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <LayoutTemplate className="w-4 h-4" />
                  </div>
                  <h2 className="text-[18px] font-black text-slate-900 tracking-wider">OFFICIAL ID TEMPLATES</h2>
                </div>
                
                <div className="flex bg-[#0A472E] p-1 rounded-[12px]">
                  <button 
                    onClick={() => setDesignerOrientation('VERTICAL')}
                    className={`px-6 py-2 rounded-[8px] text-[13px] font-bold tracking-widest transition-colors ${designerOrientation === 'VERTICAL' ? 'bg-white text-[#14764B] shadow-sm' : 'text-white/80 hover:text-white'}`}
                  >
                    VERTICAL
                  </button>
                  <button 
                    onClick={() => setDesignerOrientation('HORIZONTAL')}
                    className={`px-6 py-2 rounded-[8px] text-[13px] font-bold tracking-widest transition-colors ${designerOrientation === 'HORIZONTAL' ? 'bg-white text-[#14764B] shadow-sm' : 'text-white/80 hover:text-white'}`}
                  >
                    HORIZONTAL
                  </button>
                </div>
              </div>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setDesignerTab('templates')}
                  className="px-5 py-3 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[13px] font-black flex items-center gap-2 transition-colors"
                >
                  <LayoutTemplate className="w-4 h-4" /> Templates Gallery
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[13px] font-black flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" /> Generate & Batch Print
                </button>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Blank Canvas */}
                <div onClick={() => { setElements([]); setSelectedTemplateId(null); setDesignerTab('editor'); }} className="cursor-pointer group">
                  <div className="aspect-[3/4] bg-slate-50 rounded-[24px] border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                    <Plus className="w-12 h-12 text-emerald-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-slate-900">Blank Canvas</h3>
                    <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">Start From Scratch</p>
                  </div>
                </div>

                {PREMIUM_TEMPLATE_IDS.slice(0, 7).map((templateId) => {
                  const template = ID_CARD_TEMPLATES[templateId];
                  const sample = {
                    ...(SAMPLE_MEMBERS.find((member) => member.templateId === templateId) ?? SAMPLE_MEMBERS[0]),
                    templateId,
                  };
                  return (
                    <div key={templateId} onClick={() => applyTemplate(templateId)} className="cursor-pointer group">
                      <div className="h-[250px] rounded-[18px] border border-slate-200 shadow-sm overflow-hidden mb-4 relative bg-slate-100 flex items-center justify-center">
                        <PrintableIDCard member={sample} compact side="front" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-black text-slate-900">{template.name}</h3>
                        <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">{template.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {designerTab === 'templates' && (
          <div className="flex-1 overflow-y-auto p-10 bg-white">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-[32px] font-black text-slate-900 tracking-tight mb-2">Templates Gallery</h1>
                  <p className="text-[16px] text-slate-700 font-medium">
                    20 premium CR80 front/back templates for school batch production.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      placeholder="Search templates"
                      className="w-[280px] pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] focus:outline-none focus:border-[#14764B]"
                    />
                  </div>
                  <select
                    value={templateCategory}
                    onChange={(e) => setTemplateCategory(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-[12px] text-[14px] font-bold text-slate-700 focus:outline-none focus:border-[#14764B]"
                  >
                    <option value="all">All Categories</option>
                    {TEMPLATE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {visibleTemplates.map((template) => {
                  const sample = {
                    ...(SAMPLE_MEMBERS.find((member) => member.templateId === template.id) ?? SAMPLE_MEMBERS[0]),
                    templateId: template.id,
                  };
                  const favorite = favoriteTemplates.has(template.id);

                  return (
                    <article key={template.id} className="border border-slate-200 rounded-[18px] bg-white shadow-sm overflow-hidden">
                      <div className="p-5">
                        <div className="group relative h-[220px] flex items-center justify-center rounded-[14px] bg-slate-100 overflow-hidden perspective-1000">
                          <div className="relative w-[280px] h-[176px] preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
                            <div className="absolute inset-0 backface-hidden">
                              <PrintableIDCard member={sample} compact side="front" />
                            </div>
                            <div className="absolute inset-0 backface-hidden rotate-y-180">
                              <PrintableIDCard member={sample} compact side="back" />
                            </div>
                          </div>
                          <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 border border-slate-200 rounded-full text-[10px] font-black text-slate-600">
                            Hover for back
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-4 mt-5">
                          <div className="min-w-0">
                            <h3 className="text-[17px] font-black text-slate-900 truncate">{template.name}</h3>
                            <p className="text-[12px] font-bold text-slate-500 mt-1">{template.category} / {template.subtitle}</p>
                          </div>
                          <button
                            onClick={() => toggleFavoriteTemplate(template.id)}
                            className={`p-2 rounded-lg border transition-colors ${favorite ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'}`}
                            title="Favourite template"
                          >
                            <Star className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-5">
                          <button
                            onClick={() => applyTemplate(template.id)}
                            className="px-4 py-2.5 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[12px] font-black transition-colors"
                          >
                            Use Template
                          </button>
                          <button onClick={() => toast.success(`${template.name} duplicated to My Designs`)} className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600" title="Duplicate template">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button onClick={() => applyTemplate(template.id)} className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600" title="Edit template">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => toast.info('Built-in premium templates are protected. Duplicate first to delete a custom copy.')} className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600" title="Delete template">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {visibleTemplates.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-[18px] font-bold text-slate-400">No templates match your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor View */}
        {designerTab === 'editor' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Secondary Toolbar */}
            <div className="h-[48px] bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-400">
                  <button onClick={handleUndo} className="p-1 hover:text-slate-600 transition-colors"><Undo2 className="w-4 h-4" /></button>
                  <button onClick={handleRedo} className="p-1 hover:text-slate-600 transition-colors"><Redo2 className="w-4 h-4" /></button>
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-500 tracking-widest">PREVIEW:</span>
                  <div 
                    onClick={() => toast.info('Folder dropdown UI coming soon')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 cursor-pointer hover:bg-slate-100"
                  >
                    <Users className="w-4 h-4 text-emerald-600" /> All Folders <span className="text-slate-400 ml-2">⌄</span>
                  </div>
                  <div 
                    onClick={() => toast.info('Template dropdown UI coming soon')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 cursor-pointer hover:bg-slate-100"
                  >
                    <div className="w-4 h-4 rounded-full bg-slate-200"></div> Original Template <span className="text-slate-400 ml-2">⌄</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3 text-slate-500">
                  <button onClick={() => setShowGrid(!showGrid)} className={`p-1 transition-colors ${showGrid ? 'text-[#14764B]' : 'hover:text-slate-700'}`}><Grid className="w-5 h-5" /></button>
                  <button
                    onClick={() => {
                      const sample = SAMPLE_MEMBERS[0];
                      printMembers([sample]);
                      toast.success('Opening print preview...');
                    }}
                    className="p-1 hover:text-slate-700"
                    title="Print sample card"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('bulk')}
                    className="p-1 hover:text-slate-700"
                    title="Bulk print & export"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button onClick={addTextElement} className="p-1 hover:text-slate-700"><Plus className="w-5 h-5" /></button>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-70"
              >
                {isSaving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Navigation (Narrow) */}
              <div className="w-[80px] bg-white border-r border-slate-200 flex flex-col items-center py-4 shrink-0 z-20">
                {[
                  { id: 'card-options', icon: LayoutTemplate, label: 'Card Options' },
                  { id: 'text', icon: Type, label: 'Text' },
                  { id: 'images', icon: ImageIcon, label: 'Images' },
                  { id: 'security', icon: ShieldCheck, label: 'Security' },
                  { id: 'shapes', icon: Shapes, label: 'Shapes' },
                ].map((tool) => {
                  const isActive = activeTool === tool.id;
                  return (
                    <button 
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id as EditorTool)}
                      className={`w-full py-4 flex flex-col items-center gap-1.5 border-l-4 transition-colors ${
                        isActive ? 'border-[#14764B] text-[#14764B] bg-[#F4F8F6]' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                    >
                      <tool.icon className={`w-6 h-6 ${isActive ? 'text-[#14764B]' : 'text-slate-400'}`} />
                      <span className="text-[10px] font-bold">{tool.label}</span>
                    </button>
                  );
                })}
                
                <div className="mt-auto w-full flex flex-col items-center gap-4 py-4 border-t border-slate-100">
                  <button onClick={() => toast.info('Zoom in')} className="text-slate-400 hover:text-slate-600"><ZoomIn className="w-5 h-5" /></button>
                  <span className="text-[12px] font-black text-slate-700">39%</span>
                  <button onClick={() => toast.info('Zoom out')} className="text-slate-400 hover:text-slate-600"><ZoomOut className="w-5 h-5" /></button>
                  <button onClick={() => toast.info('Keyboard shortcuts')} className="text-slate-400 hover:text-slate-600 mt-2"><Keyboard className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Left Flyout Panel */}
              {activeTool && (
                <div className="w-[300px] bg-white border-r border-slate-200 shrink-0 flex flex-col z-10 animate-in slide-in-from-left-4 duration-200">
                  <div className="h-[60px] flex items-center justify-between px-6 border-b border-slate-100">
                    <h2 className="text-[16px] font-black text-slate-900 capitalize">
                      {activeTool.replace('-', ' ')}
                    </h2>
                    <button onClick={() => setActiveTool(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Card Options Content */}
                    {activeTool === 'card-options' && (
                      <div className="space-y-8">
                        {/* Orientation */}
                        <div>
                          <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Orientation</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div 
                              onClick={() => setDesignerOrientation('VERTICAL')}
                              className={`rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${designerOrientation === 'VERTICAL' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6] group'}`}
                            >
                              <div className={`w-8 h-12 rounded-md transition-colors ${designerOrientation === 'VERTICAL' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}></div>
                              <span className={`text-[13px] font-black ${designerOrientation === 'VERTICAL' ? 'text-[#14764B]' : 'text-slate-700'}`}>Vertical</span>
                            </div>
                            <div 
                              onClick={() => setDesignerOrientation('HORIZONTAL')}
                              className={`rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${designerOrientation === 'HORIZONTAL' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6] group'}`}
                            >
                              <div className={`w-12 h-8 rounded-md transition-colors ${designerOrientation === 'HORIZONTAL' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}></div>
                              <span className={`text-[13px] font-black ${designerOrientation === 'HORIZONTAL' ? 'text-[#14764B]' : 'text-slate-700'}`}>Horizontal</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Type */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Card Type</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">?</div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div 
                              onClick={() => setCardType('30MIL')}
                              className={`rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${cardType === '30MIL' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6] group'}`}
                            >
                              <div className={`w-10 h-6 rounded-sm relative transition-colors ${cardType === '30MIL' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}>
                                <div className={`absolute top-1 left-0 right-0 h-0.5 transition-colors ${cardType === '30MIL' ? 'bg-[#14764B]' : 'bg-slate-300 group-hover:bg-[#14764B]'}`}></div>
                              </div>
                              <span className={`text-[13px] font-black ${cardType === '30MIL' ? 'text-[#14764B]' : 'text-slate-700'}`}>30 Mil PVC</span>
                            </div>
                            <div 
                              onClick={() => setCardType('ADHESIVE')}
                              className={`rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${cardType === 'ADHESIVE' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6] group'}`}
                            >
                              <div className={`w-10 h-6 rounded-sm relative transition-colors ${cardType === 'ADHESIVE' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}>
                                <div className={`absolute top-1 left-0 right-0 h-0.5 transition-colors ${cardType === 'ADHESIVE' ? 'bg-[#14764B]' : 'bg-slate-300 group-hover:bg-[#14764B]'}`}></div>
                              </div>
                              <span className={`text-[13px] font-black ${cardType === 'ADHESIVE' ? 'text-[#14764B]' : 'text-slate-700'}`}>Adhesive PVC</span>
                            </div>
                          </div>
                        </div>

                        {/* Backside Printing */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Backside Printing</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">?</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div 
                              onClick={() => setBacksidePrinting('NONE')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${backsidePrinting === 'NONE' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-8 h-6 border border-slate-300 rounded-sm flex items-center justify-center bg-white text-[8px] font-bold text-slate-700">ID</div>
                              <span className={`text-[11px] font-black ${backsidePrinting === 'NONE' ? 'text-[#14764B]' : 'text-slate-700'}`}>No Back</span>
                            </div>
                            <div 
                              onClick={() => setBacksidePrinting('BW')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${backsidePrinting === 'BW' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-black to-slate-400"></div>
                              <span className={`text-[11px] font-black ${backsidePrinting === 'BW' ? 'text-[#14764B]' : 'text-slate-700'}`}>B & W</span>
                            </div>
                            <div 
                              onClick={() => setBacksidePrinting('COLOR')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${backsidePrinting === 'COLOR' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-400"></div>
                              <span className={`text-[11px] font-black ${backsidePrinting === 'COLOR' ? 'text-[#14764B]' : 'text-slate-700'}`}>Full Color</span>
                            </div>
                          </div>
                        </div>

                        {/* Slot Punch */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Slot Punch</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">?</div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div 
                              onClick={() => setSlotPunch('NONE')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${slotPunch === 'NONE' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-8 h-8 rounded-full border-2 border-slate-300 opacity-50 relative before:absolute before:inset-0 before:m-auto before:w-10 before:h-0.5 before:bg-slate-300 before:-rotate-45"></div>
                              <span className={`text-[12px] font-black ${slotPunch === 'NONE' ? 'text-[#14764B]' : 'text-slate-700'}`}>None</span>
                            </div>
                            <div 
                              onClick={() => setSlotPunch('SHORT')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group ${slotPunch === 'SHORT' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className={`w-8 h-5 rounded-full transition-colors ${slotPunch === 'SHORT' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}></div>
                              <span className={`text-[12px] font-black ${slotPunch === 'SHORT' ? 'text-[#14764B]' : 'text-slate-700'}`}>Short</span>
                            </div>
                            <div 
                              onClick={() => setSlotPunch('LONG')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group ${slotPunch === 'LONG' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className={`w-10 h-3 rounded-full transition-colors ${slotPunch === 'LONG' ? 'border-2 border-[#14764B]' : 'border-2 border-slate-300 group-hover:border-[#14764B]'}`}></div>
                              <span className={`text-[12px] font-black ${slotPunch === 'LONG' ? 'text-[#14764B]' : 'text-slate-700'}`}>Long</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Background Color</h3>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <p className="text-[11px] font-black text-slate-900 mb-2">FRONT</p>
                              <div className="flex items-center gap-3 border border-slate-200 p-2 rounded-[16px]">
                                <div className="w-10 h-10 border border-slate-200 bg-white rounded-lg"></div>
                                <span className="text-[13px] font-bold text-slate-700">#FFFFFF</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-black text-slate-900 mb-2">BACK</p>
                              <div className="flex items-center gap-3 border border-slate-200 p-2 rounded-[16px]">
                                <div className="w-10 h-10 border border-slate-200 bg-white rounded-lg"></div>
                                <span className="text-[13px] font-bold text-slate-700">#FFFFFF</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Visual Guides</h3>
                          <div className="border border-slate-200 rounded-[16px] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-slate-700" />
                              <div>
                                <p className="text-[14px] font-black text-slate-900">Safe Zone Margin</p>
                                <p className="text-[11px] font-medium text-slate-500">Dynamic text bleed protection</p>
                              </div>
                            </div>
                            <div 
                              onClick={() => setSafeZone(!safeZone)}
                              className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${safeZone ? 'bg-[#14764B]' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${safeZone ? 'left-5' : 'left-1'}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Images Content */}
                    {activeTool === 'images' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Static Images</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div 
                              onClick={() => addImageElement(false)}
                              className="aspect-square border border-slate-200 rounded-[20px] flex flex-col items-center justify-center gap-2 hover:border-[#14764B] hover:bg-[#F4F8F6] cursor-pointer group transition-all"
                            >
                              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:text-[#14764B]">
                                <Plus className="w-5 h-5" />
                              </div>
                              <span className="text-[12px] font-black text-slate-900">Upload Image</span>
                            </div>
                            <div 
                              onClick={() => addImageElement(false)}
                              className="aspect-square bg-gradient-to-br from-[#179B5A] to-[#0A4A28] rounded-[20px] flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20 hover:-translate-y-1 transition-transform"
                            >
                              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                              <span className="text-[12px] font-black text-white">My Images</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Variable Images</h3>
                            <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">?</div>
                          </div>
                          <div className="space-y-3">
                            {['Headshot', 'Signature', 'QR Code'].map((item) => (
                              <div 
                                key={item} 
                                onClick={() => addImageElement(item === 'Headshot')}
                                className="border border-slate-200 rounded-[16px] p-4 flex items-center gap-4 hover:border-[#14764B] hover:bg-[#F4F8F6] cursor-pointer transition-colors group"
                              >
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:text-[#14764B]">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                                <span className="text-[14px] font-black text-slate-900">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Content */}
                    {activeTool === 'security' && (
                      <div className="space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Backside Lamination</h3>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div 
                              onClick={() => setLamination('NONE')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer relative transition-colors ${lamination === 'NONE' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className={`absolute top-2 right-2 w-4 h-4 rounded-full text-white flex items-center justify-center transition-opacity ${lamination === 'NONE' ? 'bg-[#14764B] opacity-100' : 'opacity-0'}`}>
                                <X className="w-3 h-3" />
                              </div>
                              <div className="w-8 h-8 rounded-full border-2 border-slate-300 opacity-50 relative before:absolute before:inset-0 before:m-auto before:w-10 before:h-0.5 before:bg-slate-300 before:-rotate-45"></div>
                              <span className={`text-[12px] font-black ${lamination === 'NONE' ? 'text-[#14764B]' : 'text-slate-700'}`}>None</span>
                            </div>
                            <div 
                              onClick={() => setLamination('TRANS')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${lamination === 'TRANS' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex flex-col gap-1 items-center justify-center">
                                <div className="w-4 h-0.5 bg-slate-300"></div><div className="w-4 h-0.5 bg-slate-300"></div><div className="w-4 h-0.5 bg-slate-300"></div>
                              </div>
                              <span className={`text-[12px] font-black ${lamination === 'TRANS' ? 'text-[#14764B]' : 'text-slate-700'}`}>Transparent</span>
                            </div>
                            <div 
                              onClick={() => setLamination('HOLO')}
                              className={`rounded-[16px] p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${lamination === 'HOLO' ? 'border-2 border-[#14764B] bg-[#F4F8F6]' : 'border border-slate-200 hover:border-[#14764B] hover:bg-[#F4F8F6]'}`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"></div>
                              <span className={`text-[12px] font-black ${lamination === 'HOLO' ? 'text-[#14764B]' : 'text-slate-700'}`}>Hologram</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase">Magnetic Stripe Encoding</h3>
                          </div>
                          <div 
                            onClick={() => setMagStripe(!magStripe)}
                            className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${magStripe ? 'bg-[#14764B]' : 'bg-slate-200'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${magStripe ? 'left-5' : 'left-1'}`}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Center Canvas Area with Rulers */}
              <div className="flex-1 bg-[#EBE9E2] relative overflow-hidden flex flex-col items-center justify-center">
                {/* Simulated Rulers */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white border-b border-slate-300 z-10 opacity-70 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMjBWMG01IDIwdjEweiIgc3Ryb2tlPSIjY2JkNWUxIi8+PC9zdmc+')]"></div>
                <div className="absolute top-0 left-0 bottom-0 w-6 bg-white border-r border-slate-300 z-10 opacity-70 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTIwIDBIMG0yMCA1aDEweiIgc3Ryb2tlPSIjY2JkNWUxIi8+PC9zdmc+')]"></div>
                
                {/* Background Grid */}
                {showGrid && (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                )}

                {/* The Card Canvas */}
                {selectedTemplatePreview ? (
                  <div className="relative z-20 flex flex-col items-center gap-4">
                    <div className="rounded-[18px] bg-white p-4 shadow-2xl border border-white/80">
                      <PrintableIDCard
                        member={selectedTemplatePreview}
                        side={canvasSide}
                        size="designer"
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white/95 border border-slate-200 px-4 py-2 shadow-sm">
                      <span className="text-[11px] font-black text-slate-500 tracking-widest">CR80</span>
                      <span className="h-4 w-px bg-slate-200" />
                      <span className="text-[11px] font-black text-slate-700">
                        {ID_CARD_TEMPLATES[selectedTemplatePreview.templateId].name}
                      </span>
                      <span className="h-4 w-px bg-slate-200" />
                      <span className="text-[11px] font-black text-[#14764B] uppercase">{canvasSide}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative z-20 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ${
                      designerOrientation === 'HORIZONTAL' ? 'w-[620px] h-[391px]' : 'w-[240px] h-[380px]'
                    }`}
                    onClick={() => setSelectedElementId(null)}
                  >
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-slate-300 font-bold">
                          {canvasSide === 'front' ? 'FRONT DESIGN' : 'BACK DESIGN'}
                        </span>
                      </div>
                    )}

                    {elements.map((el) => (
                      <motion.div
                        key={el.id}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        onDragEnd={(_, info) => handleDragEnd(el.id, info)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElementId(el.id);
                        }}
                        style={{
                          position: 'absolute',
                          x: el.x,
                          y: el.y,
                          fontSize: el.fontSize,
                          fontWeight: el.fontWeight,
                          color: el.color,
                          width: el.width,
                          height: el.height,
                          backgroundColor: el.backgroundColor,
                          borderRadius: el.borderRadius,
                          cursor: 'grab',
                          border: selectedElementId === el.id ? '2px solid #0B7A2E' : '2px solid transparent',
                          padding: el.type === 'text' ? '4px' : '0px',
                          userSelect: 'none',
                          display: el.type === 'image' ? 'flex' : 'block',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
                      >
                        {el.type === 'text' && el.content}
                        {el.type === 'image' && (
                          <ImageIcon className="w-8 h-8 text-slate-400 opacity-50" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Front/Back Tabs inside Canvas Area */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col z-20">
                  <button
                    onClick={() => setCanvasSide('front')}
                    className={`font-black tracking-widest text-[14px] py-8 px-3 rounded-l-2xl shadow-md writing-vertical-rl rotate-180 transition-colors ${
                      canvasSide === 'front' ? 'bg-[#14764B] text-white' : 'bg-white text-slate-700 border border-r-0 border-slate-200'
                    }`}
                  >
                    FRONT
                  </button>
                  <button
                    onClick={() => {
                      setCanvasSide('back');
                      setBacksidePrinting('COLOR');
                    }}
                    className={`font-black tracking-widest text-[14px] py-8 px-3 rounded-l-2xl shadow-sm border border-r-0 border-slate-200 writing-vertical-rl rotate-180 transition-colors ${
                      canvasSide === 'back' ? 'bg-[#14764B] text-white' : 'bg-[#F6EFE5] text-slate-800 hover:bg-white'
                    }`}
                  >
                    BACK
                  </button>
                </div>
              </div>

                {/* Right Properties Panel */}
              <div className="w-[320px] bg-white border-l border-slate-200 shrink-0 flex flex-col z-20">
                <div className="flex border-b border-slate-200">
                  <button 
                    onClick={() => setRightTab('CUSTOMIZE')}
                    className={`flex-1 py-4 text-[13px] font-bold border-b-[3px] transition-colors ${rightTab === 'CUSTOMIZE' ? 'text-[#14764B] border-[#14764B]' : 'text-slate-400 hover:text-slate-600 border-transparent'}`}
                  >
                    CUSTOMIZE
                  </button>
                  <button 
                    onClick={() => setRightTab('LAYERS')}
                    className={`flex-1 py-4 text-[13px] font-bold border-b-[3px] transition-colors ${rightTab === 'LAYERS' ? 'text-[#14764B] border-[#14764B]' : 'text-slate-400 hover:text-slate-600 border-transparent'}`}
                  >
                    LAYERS
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {rightTab === 'LAYERS' ? (
                    <div className="p-6">
                      <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Layers</h3>
                      <div className="space-y-2">
                        {elements.map((el, i) => (
                          <div key={el.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-center gap-3 cursor-pointer hover:border-[#14764B]">
                            <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">{elements.length - i}</div>
                            <span className="text-[13px] font-bold text-slate-700 capitalize">{el.type} Layer</span>
                          </div>
                        )).reverse()}
                      </div>
                    </div>
                  ) : !selectedElementId ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center h-full">
                      <div className="w-24 h-24 rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
                        <AlignHorizontalJustifyStart className="w-10 h-10 text-slate-300" />
                      </div>
                      <h3 className="text-[20px] font-black text-slate-900 mb-4">No Element Selected</h3>
                      <p className="text-[14px] font-medium text-slate-500 mb-8 leading-relaxed">
                        Click any element on the canvas to select it, then edit its properties here.
                      </p>
                      
                      <div className="w-full space-y-3">
                        <button onClick={addTextElement} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-[16px] flex items-center gap-4 hover:bg-slate-200 transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Type className="w-4 h-4" /></div>
                          <span className="text-[13px] font-bold text-slate-600">Add text element</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h3 className="text-[12px] font-black text-slate-700 tracking-widest uppercase mb-4">Text Properties</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[11px] font-black text-slate-500 uppercase block mb-1.5">Content</label>
                          <textarea 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[14px] font-medium text-slate-900 focus:outline-none focus:border-[#14764B] focus:ring-1 focus:ring-[#14764B] transition-shadow resize-none"
                            rows={3}
                            value={elements.find(e => e.id === selectedElementId)?.content || ''}
                            onChange={(e) => updateSelectedElement({ content: e.target.value })}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase block mb-1.5">Font Size</label>
                            <input 
                              type="number"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[14px] font-medium text-slate-900 focus:outline-none focus:border-[#14764B]"
                              value={elements.find(e => e.id === selectedElementId)?.fontSize || 16}
                              onChange={(e) => updateSelectedElement({ fontSize: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-500 uppercase block mb-1.5">Color</label>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5">
                              <input 
                                type="color"
                                className="w-8 h-8 rounded-md cursor-pointer border-0 p-0"
                                value={elements.find(e => e.id === selectedElementId)?.color || '#000000'}
                                onChange={(e) => updateSelectedElement({ color: e.target.value })}
                              />
                              <span className="text-[13px] font-bold text-slate-700 uppercase">
                                {elements.find(e => e.id === selectedElementId)?.color || '#000000'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // SUPER ADMIN DASHBOARD VIEW
  // ==========================================
  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans selection:bg-emerald-500/20 selection:text-emerald-900 overflow-hidden">
      {/* ... previous super admin code remains EXACTLY the same ... */}
      <Helmet>
        <title>Dashboard | IDCraft India</title>
      </Helmet>

      {/* Sidebar */}
      <aside className="w-[280px] h-full bg-white flex flex-col border-r border-slate-100 shrink-0 z-20 overflow-y-auto">
        <div className="p-6 pt-8 pb-4">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 mb-1 cursor-pointer group hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tighter">ID</span>
            </div>
            <div>
              <h1 className="text-[20px] font-black text-slate-900 tracking-tight leading-none">IDCraft India</h1>
              <p className="text-[13px] font-medium text-slate-500 mt-1">Desktop Professional</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[12px] text-[15px] font-bold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#179B5A] to-[#0A4A28] text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 mt-auto">
          {/* User Profile */}
          <div className="bg-white border border-slate-100 rounded-[16px] p-2 shadow-sm">
            <div className="flex items-center gap-3 px-2 py-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E5E2D9] flex items-center justify-center text-[#5A574F] font-bold text-lg">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-slate-900 truncate">{session?.name || 'Admin'}</p>
                <p className="text-[12px] font-medium text-slate-500 truncate">{session?.email || 'admin@idcraftindia.com'}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-[13px] font-bold text-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative z-10">
        <div className="max-w-[1200px] mx-auto px-10 py-10">
          
          {/* Top Header */}
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h2 className="text-[36px] font-black text-slate-900 tracking-tight flex items-center gap-3">
                  Welcome back, Admin <span className="text-4xl animate-wave origin-bottom-right">👋</span>
                </h2>
                <p className="text-[18px] font-semibold text-slate-500 mt-1">Here is your workspace overview.</p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex-[2] py-4 bg-white border border-[#14764B] hover:bg-emerald-50 rounded-[16px] flex items-center justify-center gap-2.5 text-[16px] font-black text-[#14764B] transition-colors shadow-sm">
                  <PlayCircle className="w-5 h-5" /> Replay Tour
                </button>
                <button onClick={() => setActiveTab('designer')} className="flex-1 py-4 bg-gradient-to-r from-[#179B5A] to-[#0A4A28] hover:from-[#14874E] hover:to-[#07361D] rounded-[16px] flex items-center justify-center gap-2.5 text-[16px] font-black text-white transition-colors shadow-md">
                  <PlusCircle className="w-5 h-5" /> New Design
                </button>
                <button onClick={() => setActiveTab('upload')} className="flex-1 py-4 bg-gradient-to-r from-[#179B5A] to-[#0A4A28] hover:from-[#14874E] hover:to-[#07361D] rounded-[16px] flex items-center justify-center gap-2.5 text-[16px] font-black text-white transition-colors shadow-md">
                  <Upload className="w-5 h-5" /> Upload Data
                </button>
                <button onClick={() => setActiveTab('bulk')} className="flex-1 py-4 bg-gradient-to-r from-[#179B5A] to-[#0A4A28] hover:from-[#14874E] hover:to-[#07361D] rounded-[16px] flex items-center justify-center gap-2.5 text-[16px] font-black text-white transition-colors shadow-md">
                  <Files className="w-5 h-5" /> Bulk Print
                </button>
              </div>

              {/* Banner Area (Placeholder for the giant banner) */}
              <div className="w-full h-[360px] bg-gradient-to-br from-slate-900 via-[#0A472E] to-slate-900 rounded-[24px] mb-8 relative overflow-hidden shadow-xl flex flex-col items-center justify-center text-center p-12 border-4 border-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-amber-400 font-black tracking-widest uppercase text-sm mb-4 border border-amber-400/30 px-4 py-1.5 rounded-full bg-amber-400/10">India's No.1 PVC ID Software</h3>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                  Design. Customize.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">PRINT.</span>
                </h2>
                <p className="text-slate-300 text-lg max-w-xl mx-auto font-medium">
                  The all-in-one desktop software to create professional ID cards and manage print jobs with ease.
                </p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat 1 */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-[72px] h-[72px] rounded-[20px] bg-[#0F5A3A] flex items-center justify-center shadow-lg shadow-emerald-900/20">
                    <MonitorCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Templates</h4>
                    <div className="text-[42px] font-black text-slate-900 leading-none mb-2">{Object.keys(ID_CARD_TEMPLATES).length}</div>
                    <div className="text-[13px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="text-lg leading-none">↗</span> +0 this week
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-[72px] h-[72px] rounded-[20px] bg-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Members</h4>
                    <div className="text-[42px] font-black text-slate-900 leading-none mb-2">{SAMPLE_MEMBERS.length}</div>
                    <div className="text-[13px] font-bold text-blue-600 flex items-center gap-1">
                      <span className="text-lg leading-none">↗</span> Sample roster loaded
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-[72px] h-[72px] rounded-[20px] bg-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-900/20">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-slate-500 uppercase tracking-widest mb-1">Departments</h4>
                    <div className="text-[42px] font-black text-slate-900 leading-none mb-2">0</div>
                    <div className="text-[13px] font-bold text-slate-400 flex items-center gap-1">
                      <span className="text-lg leading-none">—</span> No change
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Members Panel */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 min-h-[300px]">
                <div className="flex items-center justify-between mb-16">
                  <h3 className="text-[24px] font-black text-slate-900">Recent Members</h3>
                  <button className="text-[15px] font-black text-[#14764B] hover:text-[#0A472E]">View All</button>
                </div>
                
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-[20px] font-bold text-slate-400">No members found</div>
                </div>
              </div>
            </div>
          )}

          {/* Data Upload Tab */}
          {activeTab === 'upload' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-[32px] font-black text-slate-900 tracking-tight">Data Upload</h2>
                  <p className="text-[16px] font-medium text-slate-500 mt-1">Select a folder to view or add members</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search folders..." 
                      className="w-[300px] pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-[14px] text-[15px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-shadow"
                    />
                  </div>
                  <button className="py-3 px-6 bg-[#14764B] hover:bg-[#0F5A3A] text-white rounded-[14px] font-bold text-[15px] transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/20">
                    <FolderPlus className="w-5 h-5" /> NEW FOLDER
                  </button>
                </div>
              </div>

              {/* Folders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {/* Default Folder */}
                <button className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1">
                  <div className="w-[80px] h-[80px] rounded-[24px] bg-emerald-50 flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-[20px] font-black text-slate-900 mb-1">All Members</h3>
                  <p className="text-[14px] font-bold text-slate-500">0 records</p>
                </button>
              </div>

              {/* Empty State Area */}
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center mb-6">
                  <FolderOpen className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-[28px] font-black text-slate-900 mb-2">No data yet</h3>
                <p className="text-[16px] font-medium text-slate-400 max-w-md">
                  Click "All Members" to add your first record, or create a folder to organise.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'bulk' && <BulkCardGenerator />}

        </div>
      </main>
    </div>
  );
};
