import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  ChevronRight, 
  Cpu, 
  BookOpen, 
  ShieldCheck,
  MessageSquare,
  Menu,
  X,
  TrendingUp,
  Award,
  Users,
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Zap,
  Globe2,
  Database,
  Target,
  CheckCircle,
  Eye,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Tab = 'assistant' | 'dashboard' | 'courses' | 'services' | 'vision';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assistant');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock Data
  const dashboardData = [
    { name: '2020', users: 1.2, literacy: 8 },
    { name: '2021', users: 1.5, literacy: 10 },
    { name: '2022', users: 1.8, literacy: 12 },
    { name: '2023', users: 2.1, literacy: 14 },
    { name: '2024', users: 2.5, literacy: 17 },
  ];

  const regionalGrowth = [
    { city: 'Finfinnee', progress: 85 },
    { city: 'Adama', progress: 72 },
    { city: 'Jimma', progress: 68 },
    { city: 'Bishoftu', progress: 75 },
    { city: 'Diredawa', progress: 64 },
  ];

  const courses = [
    { 
      id: 1, 
      title: "Introduction to AI & Ethics", 
      instructor: "Digital Oromiya Academy",
      category: "AI & Tech", 
      level: "Beginner", 
      duration: "4 weeks", 
      students: 1240,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: 2, 
      title: "Python Programming for Youth", 
      instructor: "Abdulbahar M. Yusuf",
      category: "Programming", 
      level: "Intermediate", 
      duration: "6 weeks", 
      students: 3500,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: 3, 
      title: "Digital Entrepreneurship", 
      instructor: "Oromia Innovation Hub",
      category: "Business", 
      level: "Beginner", 
      duration: "3 weeks", 
      students: 850,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
    },
    { 
      id: 4, 
      title: "Data Science with Oromo Datasets", 
      instructor: "Data Oromia",
      category: "Data Science", 
      level: "Advanced", 
      duration: "8 weeks", 
      students: 1100,
      image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=400"
    },
  ];

  const services = [
    { title: "e-Governance Portal", icon: <ShieldCheck />, desc: "Access regional government services online." },
    { title: "Student Scholarship", icon: <Award />, desc: "Apply for digital transformation grants." },
    { title: "Innovation Hub", icon: <Zap />, desc: "Incubation space for tech startups in Oromia." },
    { title: "Open Data Portal", icon: <Database />, desc: "Get regional datasets for research and apps." },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to the network. Please ensure your Gemini API key is configured correctly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-red-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#c32026] rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <Globe2 size={28} />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight leading-none uppercase">Digital</h1>
              <h1 className="font-black text-lg tracking-tight leading-none text-red-600 uppercase">Oromiya</h1>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <SidebarItem 
              icon={<MessageSquare size={20} />} 
              label="AI Assistant" 
              active={activeTab === 'assistant'} 
              onClick={() => { setActiveTab('assistant'); setIsSidebarOpen(false); }}
            />
            <SidebarItem 
              icon={<Target size={20} />} 
              label="Strategic Vision" 
              active={activeTab === 'vision'} 
              onClick={() => { setActiveTab('vision'); setIsSidebarOpen(false); }}
            />
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="Growth Tracker" 
              active={activeTab === 'dashboard'} 
              onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            />
            <SidebarItem 
              icon={<GraduationCap size={20} />} 
              label="Academy" 
              active={activeTab === 'courses'} 
              onClick={() => { setActiveTab('courses'); setIsSidebarOpen(false); }}
            />
            <SidebarItem 
              icon={<Briefcase size={20} />} 
              label="Digital Services" 
              active={activeTab === 'services'} 
              onClick={() => { setActiveTab('services'); setIsSidebarOpen(false); }}
            />
          </nav>

          <div className="mt-auto pt-8 border-t">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Abdulbahar Yusuf</p>
                <p className="text-[10px] text-gray-500 truncate">Founder & Lead</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 lg:hidden hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold tracking-tight capitalize">
              {activeTab === 'assistant' ? 'Intelligence Portal' : activeTab}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network Status</span>
              <span className="text-xs text-green-500 font-black flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute opacity-75" />
                <span className="w-2 h-2 bg-green-500 rounded-full relative" />
                Connected
              </span>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block" />
            <button className="relative p-2 text-gray-400 hover:text-black transition-colors">
              <Users size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto px-8 py-10 lg:px-16 scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === 'assistant' && (
              <motion.div 
                key="assistant"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto h-full flex flex-col"
              >
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest border border-red-100"
                      >
                        <Zap size={14} /> Driven by Digital Oromia Strategy
                      </motion.div>
                      <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                        Transforming the <br />
                        <span className="text-red-600">Region</span> through AI.
                      </h2>
                      <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Welcome to the Digital Oromiya Intelligence Assistant. I'm here to help you navigate our digital transformation roadmap.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                      <SuggestionCard 
                        title="Regional Infrastructure" 
                        desc="Updates on fiber optic and Wi-Fi expansion"
                        onClick={() => setInput("What is the current status of fiber optic rollout in rural Oromia?")}
                      />
                      <SuggestionCard 
                        title="AI Strategy 2030" 
                        desc="Learn about our ethical AI framework" 
                        onClick={() => setInput("Explain the core pillars of the Oromiya AI Strategy 2030.")}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 pb-10">
                    {messages.map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-6 ${m.role === 'user' ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md
                          ${m.role === 'assistant' ? 'bg-red-600 text-white' : 'bg-white border text-gray-400'}
                        `}>
                          {m.role === 'assistant' ? <Bot size={22} /> : <User size={22} />}
                        </div>
                        <div className={`
                          max-w-2xl px-6 py-4 rounded-3xl text-sm leading-relaxed shadow-sm
                          ${m.role === 'user' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-white border text-gray-800'
                          }
                        `}>
                          <ReactMarkdown className="prose prose-sm max-w-none prose-p:leading-relaxed">
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex-shrink-0 flex items-center justify-center text-white shadow-md">
                          <Bot size={22} className="animate-pulse" />
                        </div>
                        <div className="bg-white border px-6 py-4 rounded-3xl flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'vision' && (
              <motion.div 
                key="vision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-16 pb-20"
              >
                {/* Vision Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                  <span className="text-[#3182CE] font-bold uppercase tracking-[0.2em] text-sm">Digital Ethiopia 2030</span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1A365D] tracking-tight">Ecosystem & University Collaboration</h2>
                  <p className="text-[#4A5568] text-lg leading-relaxed">
                    Building a modern, AI-powered digital education and transformation ecosystem in Oromia and across Ethiopia through strategic synergy with leading institutions.
                  </p>
                </div>

                {/* Vision & Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#3182CE] mb-6 group-hover:bg-[#3182CE] group-hover:text-white transition-colors">
                      <Eye size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A365D] mb-4">Our Vision</h3>
                    <p className="text-[#4A5568] leading-relaxed">
                      To build a modern AI-powered digital education and transformation ecosystem in Oromia and Ethiopia through strategic collaboration with universities, institutions, and innovation centers.
                    </p>
                  </div>
                  <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-[#48BB78] mb-6 group-hover:bg-[#48BB78] group-hover:text-white transition-colors">
                      <Rocket size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A365D] mb-4">Our Mission</h3>
                    <p className="text-[#4A5568] leading-relaxed">
                      Digital Oromiya AI is not only an educational platform, but also a digital transformation ecosystem focused on EdTech, AI-driven solutions, government and institutional digitalization, digital document management, smart verification systems, youth innovation, and driving Digital Ethiopia 2030.
                    </p>
                  </div>
                </div>

                {/* Collaboration Box */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-12">
                  <div className="border-l-4 border-[#3182CE] pl-6">
                    <h3 className="text-2xl font-bold text-[#1A365D]">Strategic University Collaboration Vision</h3>
                    <p className="text-[#4A5568] mt-2">Digital Oromiya AI aims to partner with leading universities in Ethiopia to support digital transformation, AI-powered education, research, and smart institutional systems.</p>
                  </div>

                  {/* Universities */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#1A365D]">Target Partner Universities</h4>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "Addis Ababa University",
                        "Haramaya University",
                        "Adama Science and Technology University",
                        "Jimma University",
                        "Ambo University"
                      ].map((uni) => (
                        <span key={uni} className="px-5 py-2.5 bg-[#EBF8FF] text-[#2B6CB0] rounded-full text-sm font-bold border border-[#BEE3F8] hover:bg-[#3182CE] hover:text-white transition-all cursor-default">
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Areas of Collaboration */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#1A365D]">Areas of Collaboration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <CollaborationItem emoji="💻" text="Digital learning and e-learning systems" />
                      <CollaborationItem emoji="🧠" text="Artificial Intelligence and technology training" />
                      <CollaborationItem emoji="💡" text="Research and innovation programs" />
                      <CollaborationItem emoji="🏫" text="Smart university and campus systems" />
                      <CollaborationItem emoji="🎓" text="Digital student and academic services" />
                      <CollaborationItem emoji="🛡️" text="Certificate verification and anti-fraud systems" />
                      <CollaborationItem emoji="📁" text="Digital document and employee record management" />
                      <CollaborationItem emoji="📚" text="E-library and online education platforms" />
                      <div className="md:col-span-2 flex items-center gap-4 bg-[#E6FFFA] p-5 rounded-xl border-l-[3px] border-[#48BB78]">
                        <span className="text-2xl">🇪🇹</span>
                        <p className="font-bold text-[#2D3748] text-sm">Support for Ethiopia’s Digital Transformation Strategy / Digital Ethiopia 2030</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-12"
              >
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard label="Digital Bank Users" value="4.2M" trend="+22%" icon={<Zap className="text-yellow-500" />} />
                  <StatCard label="AI Literate Youth" value="158K" trend="+45%" icon={<Cpu className="text-blue-500" />} />
                  <StatCard label="School Connectivity" value="78%" trend="+12%" icon={<Globe2 className="text-green-500" />} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp size={20} className="text-red-600" />
                      Digital Literacy Index (Projection)
                    </h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData}>
                          <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#c32026" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#c32026" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="users" stroke="#c32026" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <LayoutDashboard size={20} className="text-red-600" />
                      Regional Hub Progress (%)
                    </h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionalGrowth} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="city" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} width={80} />
                          <Tooltip cursor={{fill: 'transparent'}} />
                          <Bar dataKey="progress" fill="#c32026" radius={[0, 10, 10, 0]} barSize={24} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div 
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tight tracking-tight uppercase italic">Academy</h2>
                    <p className="text-gray-500 font-medium italic">Building the next generation of tech leaders.</p>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <Pill active>AI & ML</Pill>
                    <Pill>Web Dev</Pill>
                    <Pill>Cybersecurity</Pill>
                    <Pill>Data Science</Pill>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  {courses.map((course, i) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border rounded-3xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      <div className="h-56 relative flex items-center justify-center overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-red-600 rounded-md mb-2 inline-block">
                            {course.category}
                          </span>
                          <h4 className="text-xl font-bold leading-tight">{course.title}</h4>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Bot size={14} className="text-red-600" /> {course.instructor}
                          </div>
                          <div className="flex items-center gap-4">
                            <span>{course.duration}</span>
                            <span className="text-red-600">{course.level}</span>
                          </div>
                        </div>
                        <button className="w-full mt-6 py-3 bg-gray-50 text-black border font-black text-xs uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all">
                          Enroll Free
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div 
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-12"
              >
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-black mb-4 italic uppercase">Public Services</h2>
                  <p className="text-gray-500 font-medium">Access tools and certifications directly via the Digital Oromiya regional hub.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-3xl border shadow-sm flex items-start gap-8 hover:bg-red-50 transition-colors group cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-red-600 group-hover:bg-white shadow-inner flex-shrink-0 transition-colors">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-black mb-2 uppercase italic">{service.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {service.desc}
                        </p>
                        <button className="flex items-center gap-2 text-xs font-black uppercase text-red-600">
                          Launch Service <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar (Only Assistant) */}
        {activeTab === 'assistant' && (
          <div className="px-8 pb-8 lg:px-16 lg:pb-12 bg-[#FDFDFD]">
            <div className="max-w-4xl mx-auto relative group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about expansion, strategy, or coding..."
                className="w-full pl-8 pr-16 py-6 rounded-3xl border bg-white shadow-xl shadow-gray-100 focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all text-sm font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-3 h-12 w-12 bg-red-600 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Sub-components
const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all border
      ${active 
        ? 'bg-red-600 text-white shadow-lg shadow-red-200 border-red-600' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-black border-transparent'}
    `}
  >
    {icon}
    <span className="flex-1 text-left">{label}</span>
    {active && <ChevronRight size={16} />}
  </button>
);

const SuggestionCard = ({ title, desc, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border text-left hover:border-red-600 group transition-all shadow-sm"
  >
    <h4 className="font-black text-sm mb-1 group-hover:text-red-600 transition-colors uppercase italic">{title}</h4>
    <p className="text-xs text-gray-400 font-medium">{desc}</p>
  </button>
);

const StatCard = ({ label, value, trend, icon }: any) => (
  <div className="bg-white p-8 rounded-3xl border shadow-sm relative overflow-hidden group">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-baseline gap-3">
        <h3 className="text-4xl font-black tracking-tighter">{value}</h3>
        <span className="text-xs font-black text-green-500">{trend}</span>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-150" />
  </div>
);

const Pill = ({ children, active }: any) => (
  <button className={`
    px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border
    ${active 
      ? 'bg-black text-white border-black shadow-lg' 
      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}
  `}>
    {children}
  </button>
);

const CollaborationItem = ({ emoji, text }: { emoji: string, text: string }) => (
  <div className="flex items-start gap-4 bg-[#F7FAFC] p-5 rounded-xl border-l-[3px] border-gray-300 hover:border-[#3182CE] transition-all group">
    <span className="text-xl leading-none mt-0.5">{emoji}</span>
    <p className="text-sm font-bold text-[#2D3748] leading-tight">{text}</p>
  </div>
);

export default App;
