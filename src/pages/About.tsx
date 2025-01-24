import { motion } from 'framer-motion';
import { Code, Database, TestTube2, Cog, Cpu, Zap, Binary, Network } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-16 min-w-full md:min-w-0">
      {/* Video Section - Unchanged */}
      <section className="relative min-h-[80vh] rounded-2xl bg-black/30 backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.15)_0%,transparent_100%)]" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-60"
            src="https://qtfpkbubvqjbwgdyaatk.supabase.co/storage/v1/object/public/media/inga-profile.mp4"
          />
          
          {/* Name container at absolute bottom right */}
          <div className="absolute bottom-0 right-0 z-20">
            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg py-4 px-8 min-w-[400px] text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Inga Palatova
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-cyan-400 font-mono text-lg mt-2"
              >
                <span className="inline-block animate-pulse mr-2">⟨</span>
                Full Stack Developer
                <span className="inline-block animate-pulse ml-2">⟩</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20" />
        <p className="relative text-lg text-gray-300 leading-relaxed tracking-wide font-light whitespace-pre-line">
          {`Nach einer erfolgreichen Karriere in verschiedenen Branchen, wo Computer und digitale Technologien stets ein wichtiger Teil meiner täglichen Arbeit waren, entschied ich mich, meine langjährige Faszination für Technologie in eine professionelle Laufbahn umzuwandeln. Diese konstante Berührung mit digitalen Werkzeugen und mein wachsendes Interesse an ihren Funktionsweisen führten zu meiner Entscheidung, mich bei der `}
          <a href="https://www.ait-tr.de/" className="text-blue-500 underline">AIT TR</a>
          {` zur Full Stack Entwicklerin ausbilden zu lassen.
          Durch ein intensives 16-monatiges Vollzeit-Qualifizierungsprogramm (1300+ Praxisstunden) bei der `}
          <a href="https://www.ait-tr.de/" className="text-blue-500 underline">AIT TR</a>
          {` habe ich mich zur Full Stack Entwicklerin und QA-Spezialistin ausgebildet. Meine technischen Fähigkeiten umfassen die komplette Entwicklungskette vom Backend (Java, Spring Boot) über Frontend (React, TypeScript) bis hin zu Testing und Qualitätssicherung. Diese breite Qualifikation ermöglicht mir, Projekte ganzheitlich zu betrachten und qualitativ hochwertige Lösungen zu entwickeln.
          Im Abschlussprojekt "TakeProfit", einer Krypto-Trading-Plattform, übernahm ich Schlüsselrollen in der Entwicklung des REST APIs, der Benutzerauthentifizierung und Frontend-Optimierung. Meine Fähigkeit, mich schnell in neue Technologien einzuarbeiten und effektiv im Team zu kommunizieren, wurde dabei besonders geschätzt.
          Der Karrierewechsel zeigt meine Anpassungsfähigkeit und Begeisterung für kontinuierliches Lernen. Aus meiner bisherigen Berufserfahrung bringe ich wertvolle Soft Skills mit: strukturiertes Arbeiten, Kundenorientierung und effektive Teamkommunikation. Mein Ziel ist es, zur Entwicklung innovativer Softwarelösungen beizutragen und dabei stetig zu wachsen. Mehr Details zu meinen Projekten und technischen Fähigkeiten finden Sie in meinem Projekte und können das Abschlussprojekt TakeProfit unter live testen`}
        </p>
      </motion.section>

      {/* Core Competencies Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            KERNKOMPETENZEN
          </h2>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Fullstack-Entwicklung mit Java Spring Boot und React/TypeScript",
            "Konzeption und Implementierung von REST-APIs und Microservices",
            "Umfassende QA-Expertise mit manuellen und automatisierten Testmethoden",
            "Agile Entwicklungsmethoden und effektive Teamkollaboration"
          ].map((competency, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="relative flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:animate-pulse" />
                <p className="text-gray-300 group-hover:text-cyan-300 transition-colors">{competency}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Specialization Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            SPEZIALISIERUNG
          </h2>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: <Code className="w-6 h-6" />, title: "Full Stack Development", desc: "Entwicklung kompletter Webanwendungen" },
            { icon: <TestTube2 className="w-6 h-6" />, title: "Quality Assurance Engineering", desc: "Umfassende Qualitätssicherung" },
            { icon: <Database className="w-6 h-6" />, title: "Backend Java Development", desc: "Skalierbare Backend-Systeme" },
            { icon: <Cog className="w-6 h-6" />, title: "DevOps & Cloud Computing", desc: "Moderne Deployment-Prozesse" }
          ].map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-conic from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 w-fit mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-colors">
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {spec.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {spec.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{spec.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Frontend-Entwicklung",
            icon: <Cpu className="w-6 h-6" />,
            skills: [
              "React.js, Redux, TypeScript",
              "Responsive Design mit HTML5/CSS3/Tailwind",
              "Single Page Applications (SPA)",
              "UI/UX-Optimierung"
            ]
          },
          {
            title: "Backend-Entwicklung",
            icon: <Network className="w-6 h-6" />,
            skills: [
              "Java Spring Boot, Spring Security",
              "RESTful API Design und Dokumentation",
              "Microservices-Architektur",
              "Datenbanken: MongoDB, MySQL, PostgreSQL"
            ]
          },
          {
            title: "Testing & QA",
            icon: <Binary className="w-6 h-6" />,
            skills: [
              "Testautomatisierung (Selenium, JUnit)",
              "API Testing (Postman, RestAssured)",
              "Performance und Last-Tests",
              "TestLink und Testmanagement"
            ]
          },
          {
            title: "DevOps & Tools",
            icon: <Zap className="w-6 h-6" />,
            skills: [
              "Git/GitHub für Versionskontrolle",
              "Docker Container und AWS Cloud Services",
              "CI/CD Pipeline-Integration",
              "Maven Build Management"
            ]
          }
        ].map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-conic from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {category.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                    className="flex items-center space-x-3 group/skill"
                  >
                    <div className="relative">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover/skill:animate-pulse" />
                      <div className="absolute inset-0 bg-cyan-500 rounded-full blur opacity-50 group-hover/skill:animate-pulse" />
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;