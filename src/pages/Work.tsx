import { motion } from "framer-motion";
import Layout from "../components/Layout";

const projects = [
  { title: "Nexus Platform", category: "Structural Assembly", year: "2025" },
  { title: "Apex Interface", category: "Surgical Interface", year: "2025" },
  { title: "Meridian Brand", category: "Identity Resonance", year: "2024" },
  { title: "Pulse Analytics", category: "Operational Intelligence", year: "2024" },
  { title: "Vertex Systems", category: "Structural Assembly", year: "2024" },
  { title: "Cipher Identity", category: "Identity Resonance", year: "2024" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Work = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-surgical mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Selected Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl font-body"
          >
            A curated selection of precision-engineered projects.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-background group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-secondary flex items-center justify-center border-b border-border overflow-hidden">
                <span className="font-mono-heading text-6xl font-bold text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors duration-500 group-hover:scale-110 transform">
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-surgical">{project.category}</span>
                  <span className="text-surgical">{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
