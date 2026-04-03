import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("A valid email is required"),
});

type FormData = z.infer<typeof formSchema>;

const Footer = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "newsletter"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Subscribed!",
        description: "You're now on our newsletter list.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground text-sm">Home</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground text-sm">Services</Link></li>
              <li><Link to="/work" className="text-muted-foreground hover:text-foreground text-sm">Work</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">About</Link></li>
              <li><Link to="/engage" className="text-muted-foreground hover:text-foreground text-sm">Engage</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/oveo.in" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm">Instagram</a></li>
              <li><a href="https://twitter.com/OveoIn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm">X</a></li>
              <li><a href="https://www.linkedin.com/in/ov%C3%A9o-labs-4940783b4/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">Stay updated with our latest insights.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex w-full items-center gap-x-2">
                        <FormControl className="w-full">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-secondary border border-border rounded-md px-4 py-2 w-full text-sm h-10"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="submit"
                          className="bg-primary text-primary-foreground px-4 rounded-md text-sm font-semibold shrink-0 h-10"
                        >
                          Subscribe
                        </button>
                      </div>
                      <FormMessage className="pt-2" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex justify-between items-center">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Ovéo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
