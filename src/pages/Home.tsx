// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, BookOpen, FileText, Linkedin, Github } from 'lucide-react';
import ThreeSphere from '../components/ThreeSphere';
import DocumentViewer from '../components/DocumentViewer';
import AnimatedCard from '../components/AnimatedCard';

const container = {
 hidden: { opacity: 0 },
 show: {
   opacity: 1,
   transition: {
     staggerChildren: 0.2
   }
 }
};

const item = {
 hidden: { opacity: 0, y: 20 },
 show: { opacity: 1, y: 0 }
};

const Home = () => {
 return (
   <div className="max-w-6xl mx-auto">
     {/* Hero Section */}
     <motion.section 
       initial="hidden"
       animate="show"
       variants={container}
       className="mb-16 text-center py-20 bg-black/30 backdrop-blur rounded-2xl border border-cyan-500/20"
     >
       <motion.h1 
         variants={item}
         className="text-7xl mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow font-['Great_Vibes'] leading-relaxed"
       >
         Inga Palatova
       </motion.h1>
       <motion.p
         variants={item}
         className="text-2xl text-gray-300 mb-8"
       >
         Full Stack Developer • QA Engineer
       </motion.p>
       {/* Navigation Buttons */}
       <motion.div 
         variants={item}
         className="flex gap-4 justify-center mb-8"
       >
         <Link
           to="/portfolio"
           className="glow-button inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
         >
           <Code className="w-5 h-5" />
           Projekte ansehen
         </Link>
         <Link
           to="/contact"
           className="neon-button inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
         >
           <BookOpen className="w-5 h-5" />
           Kontakt aufnehmen
         </Link>
       </motion.div>
       {/* Documents */}
       <motion.div 
         variants={item}
         className="flex justify-center gap-4 mb-6"
       >
         <DocumentViewer 
           title="Zertifikat 1" 
           fileUrl="/docs/certificate1.pdf"
           icon={<FileText className="w-4 h-4" />}
           className="neon-button"
         />
         <DocumentViewer 
           title="Zertifikat 2" 
           fileUrl="/docs/certificate2.pdf"
           icon={<FileText className="w-4 h-4" />}
           className="neon-button"
         />
         <DocumentViewer 
           title="Zertifikat 3" 
           fileUrl="/docs/certificate3.pdf"
           icon={<FileText className="w-4 h-4" />}
           className="neon-button"
         />
         <DocumentViewer 
           title="Lebenslauf" 
           fileUrl="/docs/cv.pdf"
           isDownloadable={true}
           className="neon-button"
         />
         <DocumentViewer 
           title="Arbeitszeugnis" 
           fileUrl="/docs/Arbeitszeugnis.pdf"
           isDownloadable={true}
           className="neon-button"
         />
       </motion.div>
       {/* Social Links */}
       <motion.div
         variants={item}
         className="flex justify-center gap-4"
       >
         <a 
           href="https://www.linkedin.com/in/inga-palatova-a78645216"
           target="_blank"
           rel="noopener noreferrer"
           className="neon-button inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
         >
           <Linkedin className="w-4 h-4" />
           LinkedIn
         </a>
         <a 
           href="https://github.com/IngaPal"
           target="_blank"
           rel="noopener noreferrer"
           className="neon-button inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform"
         >
           <Github className="w-4 h-4" />
           GitHub
         </a>
       </motion.div>
     </motion.section>
     {/* Three.js Sphere */}
     <div className="py-8">
       <ThreeSphere />
     </div>
     {/* Technologies Section */}
     <motion.section 
       initial="hidden"
       whileInView="show"
       viewport={{ once: true }}
       variants={container}
       className="mt-8 mb-16"
     >
        <motion.h2 
          variants={item}
          className="text-4xl font-bold mb-8 text-center"
        >
          <div className="floating-text">
          <div className="spiral-layer">
            {"Technologien".split('').map((letter, index) => (
        <span key={`layer1-${index}`} className="floating-letter">
            {letter}
        </span>
      ))}
        </div>
        <div className="spiral-layer">
          {"Technologien".split('').map((letter, index) => (
        <span key={`layer2-${index}`} className="floating-letter">
          {letter}
       </span>
     ))}
   </div>
 </div>
</motion.h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>*]:h-full [&>div]:flex [&>div]:flex-col">
         <AnimatedCard>
         <h3 
  className="text-xl font-semibold mb-4" 
  style={{ background: 'linear-gradient(45deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
>
  Frontend
</h3>
           <div className="flex flex-wrap gap-2">
             {[
               'HTML/CSS',
               'JavaScript ES6',
               'TypeScript',
               'React',
               'Redux',
               'Basic Programming',
               'Internet Protocols',
               'DSVGO/Privacy',
               'Responsive Design'
             ].map((tech) => (
               <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                 {tech}
               </span>
             ))}
           </div>
         </AnimatedCard>
         <AnimatedCard>
         <h3 
  className="text-xl font-semibold mb-4" 
  style={{ background: 'linear-gradient(45deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
>
  Backend
</h3>
           <div className="flex flex-wrap gap-2">
             {[
               'Java Core',
               'Spring Boot',
               'Hibernate',
               'Maven',
               'SQL',
               'NoSQL',
               'Algorithm Complexity',
               'MongoDB',
               'PostgreSQL',
               'REST APIs',
               'GraphQL'
             ].map((tech) => (
               <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                 {tech}
               </span>
             ))}
           </div>
         </AnimatedCard>
         <AnimatedCard>
         <h3 
  className="text-xl font-semibold mb-4" 
  style={{ background: 'linear-gradient(45deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
>
  Testing
</h3>
           <div className="flex flex-wrap gap-2">
             {[
               'Selenium',
               'JUnit',
               'TestLink',
               'Postman',
               'Fiddler',
               'RestAssured',
               'Cucumber',
               'Appium',
               'Cypress',
               'Jest',
               'Test Design',
               'Httpclient',
               'TestNG',
               'Okhttp'
             ].map((tech) => (
               <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                 {tech}
               </span>
             ))}
           </div>
         </AnimatedCard>
         <AnimatedCard className="h-full">
         <h3 
          className="text-xl font-semibold mb-4" 
          style={{ background: 'linear-gradient(45deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
         >
          DevOps & Tools
         </h3>
           <div className="flex flex-wrap gap-2">
             {[
               'Git/Github',
               'Linux',
               'Docker',
               'AWS',
               'CI/CD',
               'Jenkins',
               'Digital Ocean',
               'Kubernetes',
               'Technical English',
               'Project Management'
             ].map((tech) => (
               <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                 {tech}
               </span>
             ))}
           </div>
         </AnimatedCard>
       </div>
     </motion.section>
   </div>
 );
};

export default Home;