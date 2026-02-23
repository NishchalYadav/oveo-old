import { motion } from "framer-motion";
import Layout from "../components/Layout";

const values = [
  { title: "Precision Over Aesthetics", description: "Every decision is data-informed and intentional. Beauty is a byproduct of engineering excellence." },
  { title: "Zero Bloat", description: "We eliminate redundancy at every level — code, design, process. What remains is essential." },
  { title: "Surgical Execution", description: "We treat every project like a medical-grade operation. Planning, precision, and follow-through." },
  { title: "Scalable Architecture", description: "Systems built to grow. Every component is modular, maintainable, and future-proof." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-surgical mb-4"
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              The Surgeon
              <br />
              Behind the System
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-muted-foreground leading-relaxed font-body"
            >
              <p>
                Ovéo is led by <span className="text-foreground font-medium">Nishchal Yadav</span> — 
                a precision-obsessed architect who treats every digital system like a living organism 
                requiring exact calibration.
              </p>
              <p>
                The philosophy is simple: most digital agencies design for trends. We engineer for 
                permanence. Every pixel, every function, every interaction is a deliberate choice — 
                nothing is decorative, everything is structural.
              </p>
              <p>
                The "Surgical" methodology isn't a metaphor — it's an operational framework. We 
                diagnose, plan, execute, and monitor with the same rigor applied in precision 
                engineering.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="surgical-border p-8"
            >
              <p className="text-surgical mb-4">Profile</p>
              <h3 className="text-xl font-semibold mb-2">Nishchal Yadav</h3>
              <p className="text-sm text-muted-foreground mb-6 font-body">
                Founder & Lead Architect
              </p>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Focus</span>
                  <span>Web Architecture</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Method</span>
                  <span>Surgical Precision</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Base</span>
                  <span>India</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-surgical mb-12"
          >
            Core Values
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-background p-10"
              >
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
