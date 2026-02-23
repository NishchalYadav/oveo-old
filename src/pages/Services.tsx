import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const services = [
  {
    id: "01",
    title: "Structural Assembly",
    subtitle: "Web Development",
    description:
      "High-fidelity web development using modern frameworks to build robust, scalable digital architectures. Every line of code is an engineered component in a larger system — no bloat, no redundancy.",
    capabilities: ["React / Next.js", "TypeScript", "Performance Engineering", "API Architecture"],
  },
  {
    id: "02",
    title: "Surgical Interface",
    subtitle: "UI/UX Design",
    description:
      "Precision-driven UI/UX design focusing on high-contrast aesthetics and seamless user interaction. We treat every interface like a surgical instrument — functional, precise, zero waste.",
    capabilities: ["Interface Design", "Interaction Design", "Design Systems", "Prototyping"],
  },
  {
    id: "03",
    title: "Identity Resonance",
    subtitle: "Brand Development",
    description:
      "Strategic brand development that establishes a unique and authoritative market presence through visual and verbal systems. Your brand becomes an unforgettable signal in the noise.",
    capabilities: ["Visual Identity", "Brand Strategy", "Typography Systems", "Guidelines"],
  },
  {
    id: "04",
    title: "Operational Intelligence",
    subtitle: "Maintenance & Growth",
    description:
      "Ongoing technical maintenance and lead-generation systems to ensure peak digital performance. We keep your systems running at surgical-grade efficiency.",
    capabilities: ["Performance Monitoring", "SEO Systems", "Lead Generation", "Analytics"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Services = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-surgical mb-4"
          >
            Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Core Systems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl font-body"
          >
            Four precision-engineered disciplines. No fluff. No "vibe-based" design.
            Just surgical execution.
          </motion.p>
        </div>
      </section>

      {services.map((service, i) => (
        <motion.section
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="border-t border-border"
        >
          <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-1">
              <span className="text-surgical">{service.id}</span>
            </div>
            <div className="lg:col-span-5">
              <p className="text-surgical mb-3">{service.subtitle}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h2>
              <p className="text-muted-foreground leading-relaxed font-body">
                {service.description}
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-8">
              <p className="text-surgical mb-4">Capabilities</p>
              <ul className="space-y-3">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="text-sm text-foreground font-body border-b border-border pb-3"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
              <Link
                to="/engage"
                className="inline-block mt-8 px-6 py-3 border border-foreground text-foreground font-mono-heading text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Request Quote →
              </Link>
            </div>
          </div>
        </motion.section>
      ))}
    </Layout>
  );
};

export default Services;
