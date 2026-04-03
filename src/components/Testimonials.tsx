import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";

const testimonials = [
  {
    name: "Sagar Waghmare",
    title: "Broducer's Founder",
    review: "Ovéo's strategic approach to branding has been instrumental in our success. Their team is both creative and professional, and they delivered a brand identity that truly resonates with our audience.",
    stars: 5,
  },
  {
    name: "Hridyanash Awasthi",
    title: "Lumina.",
    review: "The website Ovéo developed for us is not only beautiful but also highly functional. It has significantly improved our online presence and patient engagement.",
    stars: 5,
  },
  {
    name: "Sahil Karn",
    title: "Gamer Crew",
    review: "Working with Ovéo was a game-changer for us. Their expertise in web development and design helped us create a platform that our community loves.",
    stars: 5,
  },
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const renderTestimonialCard = (testimonial, i) => (
    <motion.div
      key={i}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="bg-black border border-white/20 p-8 rounded-3xl h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center mb-4">
          {[...Array(testimonial.stars)].map((_, j) => (
            <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.073 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          ))}
        </div>
        <p className="text-muted-foreground mb-6">"{testimonial.review}"</p>
      </div>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-mono-heading-black text-center mb-12"
        >
          What Our Clients Say
        </motion.h2>
        {isMobile ? (
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, i) => (
                <CarouselItem key={i} className="basis-4/5">
                  {renderTestimonialCard(testimonial, i)}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(renderTestimonialCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
