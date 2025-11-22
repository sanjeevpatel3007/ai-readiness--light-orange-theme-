
import React from 'react';
import { AiLevel, GeminiRoadmap } from '../types';
import { RefreshCcw, Download, Calendar, MessageCircle, Rocket, CheckCircle2, Clock, Target, ArrowRight, ChevronRight, Layers, Video, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  score: number;
  level: AiLevel;
  roadmap: GeminiRoadmap | null;
  onRetake: () => void;
}

export const ResultDashboard: React.FC<Props> = ({ score, level, roadmap, onRetake }) => {
  
  const safeRoadmap = roadmap || {
    roleTitle: "Professional",
    profileSummary: "Loading...",
    currentState: "",
    progressSteps: [],
    frameworks: [],
    exampleProjects: [],
    estimatedTime: "",
    careerPath: { from: "Start", to: "Goal", milestones: [] },
    launchPadCurriculum: [],
    summaryQuote: ""
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 bg-white min-h-screen shadow-2xl md:my-8 md:rounded-[2.5rem] overflow-hidden font-sans text-gray-900">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-[#111827] text-white p-8 md:p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
         
         <div className="relative z-10">
             <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-2">AI Readiness Report</div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">{safeRoadmap.roleTitle}</h1>
                </div>
                <div className="hidden md:block">
                   <div className="w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                      <span className="text-3xl font-black">{score}</span>
                   </div>
                </div>
             </div>

             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Profile Summary</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                   {safeRoadmap.profileSummary}
                </p>
             </div>
         </div>
      </div>

      <div className="p-8 md:p-12 space-y-16">

        {/* --- SECTION 1: WHERE YOU ARE --- */}
        <section>
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><Target size={20}/></div>
              Where You Are & What's Next
           </h2>
           <p className="text-gray-600 mb-6 text-lg leading-relaxed">{safeRoadmap.currentState}</p>
           
           <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-4">How you can progress:</h3>
              <ul className="space-y-3">
                 {safeRoadmap.progressSteps?.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                       <CheckCircle2 className="text-orange-500 mt-0.5 shrink-0" size={20} />
                       <span className="text-gray-800 font-medium">{step}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </section>

        {/* --- SECTION 2: FRAMEWORKS & TOOLS --- */}
        <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><Layers size={20}/></div>
              Frameworks & Tools to Supercharge Growth
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safeRoadmap.frameworks?.map((fw, i) => (
                 <div key={i} className="bg-white border border-gray-100 shadow-sm p-4 rounded-xl flex items-center gap-3 hover:border-blue-200 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">{fw}</span>
                 </div>
              ))}
           </div>
        </section>

        {/* --- SECTION 3: EXAMPLE PROJECTS --- */}
        <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><Rocket size={20}/></div>
              Example Projects for You
           </h2>
           <div className="grid grid-cols-1 gap-4">
               {safeRoadmap.exampleProjects?.map((proj, i) => (
                   <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow group">
                       <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{proj.title}</h3>
                       <p className="text-gray-600">{proj.description}</p>
                   </div>
               ))}
           </div>
           <div className="mt-6 flex items-center gap-3 text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
               <Clock size={20} />
               <span className="font-medium">{safeRoadmap.estimatedTime}</span>
           </div>
        </section>

        {/* --- SECTION 4: CAREER PATH --- */}
        <section>
           <h2 className="text-2xl font-bold mb-8">Your Career Acceleration Path</h2>
           <div className="bg-gray-900 text-white rounded-3xl p-8 relative overflow-hidden">
               {/* Path Visualization */}
               <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                   
                   {/* Start */}
                   <div className="flex flex-col items-center text-center z-10">
                       <div className="bg-white/10 p-4 rounded-full mb-3 backdrop-blur-md border border-white/20">
                           <div className="w-4 h-4 bg-gray-400 rounded-full" />
                       </div>
                       <div className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-1">Current Role</div>
                       <div className="font-bold text-lg">{safeRoadmap.careerPath?.from}</div>
                   </div>

                   {/* Arrow / Path */}
                   <div className="hidden md:flex flex-1 h-1 bg-gray-700 mx-4 relative items-center">
                       <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-purple-500 w-full opacity-50" />
                       <div className="absolute right-0 -mr-1 w-3 h-3 border-t-2 border-r-2 border-purple-500 rotate-45" />
                   </div>

                   {/* Milestones (Vertical on mobile, simplified) */}
                   <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:absolute md:inset-0 md:items-center md:justify-center z-0 opacity-100">
                        <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700 md:w-64 text-center shadow-xl mx-auto backdrop-blur-md">
                            <div className="text-xs text-orange-400 font-bold uppercase mb-2">Key Milestones</div>
                            <ul className="text-sm space-y-1 text-gray-300">
                                {safeRoadmap.careerPath?.milestones?.slice(0, 3).map((m, i) => (
                                    <li key={i}>• {m}</li>
                                ))}
                            </ul>
                        </div>
                   </div>

                   {/* End */}
                   <div className="flex flex-col items-center text-center z-10 mt-8 md:mt-0">
                       <div className="bg-orange-500 p-4 rounded-full mb-3 shadow-lg shadow-orange-500/40">
                           <Rocket className="text-white" size={20} />
                       </div>
                       <div className="font-bold text-orange-400 uppercase text-xs tracking-wider mb-1">Next Level</div>
                       <div className="font-bold text-lg">{safeRoadmap.careerPath?.to}</div>
                   </div>
               </div>
           </div>
        </section>

        {/* --- SECTION 5: LAUNCH PAD (Curriculum) --- */}
        <section>
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-8 md:p-10">
                <div className="mb-8">
                    <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wide mb-2">Recommended Program</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Accelerate Your Journey with Gen AI Launch Pad 🚀</h2>
                    <p className="text-gray-600 mt-2">A structured 6+2 week guided program tailored to your level.</p>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-orange-200 before:to-transparent">
                    {safeRoadmap.launchPadCurriculum?.map((item, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <span className="text-xs font-bold">{i + 1}</span>
                            </div>
                            {/* Content */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{item.week}</span>
                                </div>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- SECTION 6: SUMMARY --- */}
        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
             <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <MessageCircle size={16} /> Coach's Summary
             </h3>
             <p className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed">
                "{safeRoadmap.summaryQuote}"
             </p>
        </section>

        {/* --- FOOTER: NEXT STEPS --- */}
        <section className="bg-[#1F2937] text-white rounded-t-[2.5rem] -mx-8 -mb-12 md:mx-0 md:mb-0 md:rounded-[2.5rem] p-8 md:p-12">
             <h2 className="text-2xl font-bold mb-8 text-center">Recommended Next Steps</h2>
             
             <div className="grid md:grid-cols-3 gap-6">
                 <a href="#" onClick={(e) => e.preventDefault()} className="bg-orange-600 hover:bg-orange-500 transition-colors p-6 rounded-2xl text-center group">
                     <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Calendar className="text-white" size={24} />
                     </div>
                     <h3 className="font-bold text-lg mb-2">Book Consultation</h3>
                     <p className="text-orange-100 text-sm mb-4">Get expert 1:1 guidance on your career path.</p>
                     <div className="inline-flex items-center text-sm font-bold">Schedule Free Call <ArrowRight size={16} className="ml-2"/></div>
                 </a>

                 <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 hover:bg-white/20 transition-colors p-6 rounded-2xl text-center group border border-white/10">
                     <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <MessageCircle className="text-green-400" size={24} />
                     </div>
                     <h3 className="font-bold text-lg mb-2">Join AI Community</h3>
                     <p className="text-gray-400 text-sm mb-4">Get resources, templates & workshop invites.</p>
                     <div className="flex items-center justify-center gap-3 text-xs font-bold text-gray-400">
                        <span className="flex items-center gap-1"><Video size={12}/> Videos</span>
                        <span className="flex items-center gap-1"><FileText size={12}/> Templates</span>
                     </div>
                 </a>

                 <a href="#" onClick={(e) => e.preventDefault()} className="bg-white/10 hover:bg-white/20 transition-colors p-6 rounded-2xl text-center group border border-white/10">
                     <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Rocket className="text-purple-400" size={24} />
                     </div>
                     <h3 className="font-bold text-lg mb-2">Explore Launchpad</h3>
                     <p className="text-gray-400 text-sm mb-4">6+2 week guided program with real projects.</p>
                     <div className="inline-flex items-center text-sm font-bold text-purple-300">View Curriculum <ChevronRight size={16} className="ml-1"/></div>
                 </a>
             </div>
        </section>

      </div>

      {/* Floating Action Bar for Print/Retake */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-between items-center md:hidden z-50">
         <button onClick={onRetake} className="text-gray-500 font-bold text-sm flex items-center gap-2">
            <RefreshCcw size={16} /> Retake
         </button>
         <button onClick={() => window.print()} className="text-orange-600 font-bold text-sm flex items-center gap-2">
            <Download size={16} /> Save PDF
         </button>
      </div>
    </div>
  );
};
