"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story")
  
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Alex founded Zoro with a vision to create high-quality products that make a difference in people's lives.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Maya Patel",
      role: "Chief Design Officer",
      bio: "Maya brings over 15 years of design experience to create products that are both beautiful and functional.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Luis Garcia",
      role: "Head of Operations",
      bio: "Luis ensures that Zoro's supply chain and manufacturing processes are efficient and sustainable.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Sarah Kim",
      role: "Customer Experience Director",
      bio: "Sarah is dedicated to making sure every customer has an exceptional experience with Zoro.",
      image: "/api/placeholder/400/400"
    }
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Zoro</h1>
        
        <div className="mb-12">
          <p className="text-xl text-muted-foreground mb-6">
            Zoro is committed to creating products that combine innovation, quality, and sustainability.
          </p>
          
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image 
              src="/api/placeholder/1000/600"
              alt="Zoro headquarters"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <Tabs defaultValue="story" className="mb-16" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="story">Our Story</TabsTrigger>
            <TabsTrigger value="mission">Mission & Values</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="story" className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p>
              Founded in 2015, Zoro began with a simple idea: create products that solve everyday problems in thoughtful ways. Our founder, Alex Johnson, started the company in a small garage with just three employees and a vision to revolutionize the industry.
            </p>
            <p>
              Over the years, we've grown from that small garage to an international company with offices in five countries. Throughout our journey, we've remained committed to our founding principles of innovation, quality, and customer satisfaction.
            </p>
            <p>
              Today, Zoro is recognized as a leader in our field, with a dedication to pushing boundaries and creating products that make a real difference in people's lives.
            </p>
          </TabsContent>
          
          <TabsContent value="mission" className="space-y-4">
            <h2 className="text-2xl font-semibold">Mission & Values</h2>
            <p>
              <strong>Our Mission:</strong> To create innovative products that enhance people's lives while respecting our planet.
            </p>
            <h3 className="text-xl font-medium mt-6 mb-2">Our Core Values:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Innovation:</strong> We constantly seek new ideas and better solutions.</li>
              <li><strong>Quality:</strong> We never compromise on the excellence of our products.</li>
              <li><strong>Integrity:</strong> We conduct business with honesty and transparency.</li>
              <li><strong>Sustainability:</strong> We prioritize environmentally responsible practices.</li>
              <li><strong>Community:</strong> We value our relationships with customers, employees, and partners.</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="sustainability" className="space-y-4">
            <h2 className="text-2xl font-semibold">Sustainability</h2>
            <p>
              At Zoro, sustainability isn't just a buzzword—it's a core part of our business model. We believe that creating excellent products shouldn't come at the expense of our planet.
            </p>
            <p>
              Our sustainability initiatives include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using recycled and responsibly sourced materials wherever possible</li>
              <li>Minimizing packaging waste and using biodegradable packaging materials</li>
              <li>Reducing our carbon footprint through energy-efficient manufacturing processes</li>
              <li>Partnering with environmental organizations to offset our impact</li>
              <li>Designing products with longevity in mind to reduce waste</li>
            </ul>
            <p className="mt-4">
              We're proud of our progress, but we know there's always more work to be done. We're committed to continuously improving our environmental impact.
            </p>
          </TabsContent>
        </Tabs>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="mb-4">
            We're always looking for talented individuals to join our team. If you're passionate about innovation and want to make a difference, check out our careers page.
          </p>
          <p>
            Have questions? Feel free to <a href="/contact" className="text-primary hover:underline">contact us</a>. We'd love to hear from you!
          </p>
        </section>
      </div>
    </div>
  )
}