"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real implementation, you would send the form data to your backend
    console.log(values)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: "support@zoro.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-5pm EST",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      details: "123 Design Street, San Francisco, CA 94103",
      description: "By appointment only",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      details: "Monday - Friday: 9am - 5pm EST",
      description: "Closed on weekends and holidays",
    },
  ]

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unused items in their original packaging. Custom orders are non-refundable."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account to view order status."
    },
    {
      question: "Are your products environmentally friendly?",
      answer: "Yes, sustainability is one of our core values. We use recycled materials whenever possible and minimize packaging waste."
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          We'd love to hear from you. Get in touch with our team.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <Card key={index} className="border">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="font-medium text-foreground mt-1">{item.details}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-primary/10 p-8 rounded-lg text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. We'll get back to you soon!
                </p>
                <Button 
                  className="mt-6"
                  onClick={() => {
                    setIsSubmitted(false)
                    form.reset()
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how we can help..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group border rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 focus:outline-none">
                    <h3 className="font-medium">{faq.question}</h3>
                    <span className="ml-2 flex-shrink-0 rounded-full bg-white p-1 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition duration-300 group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Map would be displayed here</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground text-center">
            123 Design Street, San Francisco, CA 94103
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          
          <Tabs defaultValue="support" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="support">Customer Support</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="support" className="p-4 border rounded-lg mt-2">
              <h3 className="font-medium mb-2">Customer Support Team</h3>
              <p className="mb-2">Need help with your order or have questions about our products?</p>
              <p className="font-medium">Email: support@zoro.com</p>
              <p className="font-medium">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground mt-2">Response time: Within 24 hours</p>
            </TabsContent>
            
            <TabsContent value="sales" className="p-4 border rounded-lg mt-2">
              <h3 className="font-medium mb-2">Sales Team</h3>
              <p className="mb-2">Interested in bulk orders or business partnerships?</p>
              <p className="font-medium">Email: sales@zoro.com</p>
              <p className="font-medium">Phone: +1 (555) 987-6543</p>
              <p className="text-sm text-muted-foreground mt-2">Business hours: Monday-Friday, 9am-5pm EST</p>
            </TabsContent>
            
            <TabsContent value="careers" className="p-4 border rounded-lg mt-2">
              <h3 className="font-medium mb-2">Careers</h3>
              <p className="mb-2">Interested in joining our team?</p>
              <p className="font-medium">Email: careers@zoro.com</p>
              <p className="text-sm text-muted-foreground mt-2">View our current openings on our careers page</p>
              <Button variant="outline" className="mt-4">View Open Positions</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}