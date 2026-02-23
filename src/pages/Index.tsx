import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroOrb from "../components/HeroOrb";
import Layout from "../components/Layout";

const services = [
  {
    id: "01",
    title: "Structural Assembly",
    description: "High-fidelity web development using modern frameworks.",
  },
  {
    id: "02",
    title: "Surgical Interface",
    description: "Precision-driven UI/UX design with clinical aesthetics.",
  },
  {
    id: "03",
    title: "Identity Resonance",
    description: "Strategic brand development for market authority.",
  },
  {
    id: "04",
    title: "Operational Intelligence",
    description: "Ongoing maintenance and lead-generation systems.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroOrb />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-surgical mb-6"
          >
            Precision Digital Architecture
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            We don't describe
            <br />
            the work.
            <br />
            <span className="text-muted-foreground">We execute it.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto font-body"
          >
            Ovéo builds high-fidelity digital systems with surgical precision.
            Every pixel is a critical component.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              to="/engage"
              className="inline-block px-8 py-4 border border-foreground text-foreground font-mono-heading text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Engage →
            </Link>
          </motion.div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-20" />
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-surgical mb-12"
          >
            Core Systems
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-background p-8 group"
              >
                <span className="text-surgical block mb-4">{service.id}</span>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-muted-foreground transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready for surgical precision?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/engage"
              className="inline-block px-8 py-4 bg-foreground text-background font-mono-heading text-sm uppercase tracking-widest hover:bg-muted-foreground transition-all duration-300"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
