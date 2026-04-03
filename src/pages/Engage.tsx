import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  businessName: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().min(10, "Tell us more about your project"),
});

type FormData = z.infer<typeof formSchema>;

const Engage = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", businessName: "", projectType: "", budget: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Message received",
        description: "We'll respond within 24 hours.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-surgical mb-4"
            >
              Contact
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Engage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed font-body mb-8"
            >
              Every project begins with a precise diagnosis. Share your requirements 
              and we'll architect a custom solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 text-sm font-body"
            >
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Response Time</span>
                <span>{"< 24 hours"}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Currency</span>
                <span>₹ INR</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Pricing</span>
                <span>Custom Quote</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="bg-secondary border-border rounded-none h-12 font-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-secondary border-border rounded-none h-12 font-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Business Name <span className="text-muted-foreground">(Optional)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company's name"
                          className="bg-secondary border-border rounded-none h-12 font-body"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-border rounded-none h-12 font-body">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-secondary border-border rounded-none">
                          <SelectItem value="structural">Structural Assembly</SelectItem>
                          <SelectItem value="interface">Surgical Interface</SelectItem>
                          <SelectItem value="identity">Identity Resonance</SelectItem>
                          <SelectItem value="intelligence">Operational Intelligence</SelectItem>
                          <SelectItem value="full">Full System Build</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Budget Range (₹ INR)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-border rounded-none h-12 font-body">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-secondary border-border rounded-none">
                          <SelectItem value="5k-15k">₹5,000 – ₹15,000</SelectItem>
                          <SelectItem value="15k-30k">₹15,000 – ₹30,000</SelectItem>
                          <SelectItem value="30k-50k">₹30,000 – ₹50,000</SelectItem>
                          <SelectItem value="50k-1l">₹50,000 – ₹1,00,000</SelectItem>
                          <SelectItem value="1l-3l">₹1,00,000 – ₹3,00,000</SelectItem>
                          <SelectItem value="3l-5l">₹3,00,000 – ₹5,00,000</SelectItem>
                          <SelectItem value="5l+">₹5,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-surgical">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project requirements..."
                          className="bg-secondary border-border rounded-none min-h-[120px] font-body resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background font-mono-heading text-sm uppercase tracking-widest hover:bg-muted-foreground transition-all duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Engage;
