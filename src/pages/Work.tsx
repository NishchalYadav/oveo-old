import { motion } from "framer-motion";
import Layout from "../components/Layout";

const projects = [
  { title: "Lumina", description: "Dental Clinic Portfolio Website", year: "2026", url: "https://luminadental.vercel.app", imageUrl: "/thumbnail/Lumina.png" },
  { title: "Broducers", description: "Community for music producers, artists", year: "2025", url: "https://broducers.vercel.app", imageUrl: "/thumbnail/broducershub.png" },
  { title: "GamerCrew", description: "Tournament Community for Esports Players", year: "2025", url: "https://gamercrew.vercel.app", imageUrl: "/thumbnail/gamercrew.png" },
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <a href={project.url} target="_blank" rel="noopener noreferrer" key={project.title}>
            <motion.div
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-background group cursor-pointer overflow-hidden rounded-lg border border-border"
            >
              <div className="aspect-[4/3] bg-secondary border-b border-border overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-muted-foreground text-sm">{project.year}</span>
                </div>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </motion.div>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
