import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageTitle } from '@/hooks/usePageTitle';
import { useToast } from '@/hooks/use-toast';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen,
  Video,
  Users,
  Clock,
  CheckCircle,
  Send,
  ExternalLink,
  Download
} from 'lucide-react';

const Help = () => {
  const { toast } = useToast();
  usePageTitle('Help & Support');

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const faqs = [
    {
      question: "How do I start my onboarding process?",
      answer: "Navigate to the dashboard and choose between 'Pro Checklist Suite' for comprehensive onboarding or 'Coop Welcome Experience' for the standard journey. Each path is designed to guide you through the complete KFC onboarding process."
    },
    {
      question: "Can I save my progress and continue later?",
      answer: "Yes! The Pro Checklist Suite includes automatic save functionality. You can save your form at any point, give it a name, and resume later. Your progress is automatically backed up as you work."
    },
    {
      question: "What's the difference between the two onboarding types?",
      answer: "The Pro Checklist Suite offers advanced features like form saving, comprehensive analytics, and detailed tracking. The Coop Welcome Experience focuses on KFC's culture and provides a more interactive, personality-driven journey."
    },
    {
      question: "How do I track my progress and activities?",
      answer: "Your dashboard provides real-time statistics including forms completed, activities tracked, and success rate. The activity feed shows your recent actions with precise timestamps and details."
    },
    {
      question: "Can I export my onboarding data?",
      answer: "Yes, you can export your data from the Settings page. This includes your form responses, activity history, and personal settings in a downloadable JSON format."
    },
    {
      question: "Who can I contact for additional support?",
      answer: "You can reach our support team through multiple channels: live chat, email support, or phone. Our team is available during business hours to assist with any questions or technical issues."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use industry-standard encryption and security measures. Your data is protected and only used for onboarding purposes. You can review our privacy settings in your account settings."
    },
    {
      question: "How long does the onboarding process take?",
      answer: "The complete onboarding process typically takes 2-4 hours spread over several days. You can work at your own pace and save your progress at any time."
    }
  ];

  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM EST",
      action: "Start Chat",
      primary: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      primary: false
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9 AM - 5 PM EST",
      action: "Call Now",
      primary: false
    }
  ];

  const resources = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      count: "12 videos"
    },
    {
      icon: BookOpen,
      title: "User Manual",
      description: "Complete documentation",
      count: "45 pages"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users",
      count: "500+ members"
    }
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond within 24 hours.",
    });
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600">Get the help you need for your KFC Coop Hub experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Support */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up">
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
                <CardDescription>
                  Choose the best way to get support for your question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {supportChannels.map((channel, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all hover-lift ${
                        channel.primary
                          ? 'bg-gradient-primary text-white border-transparent shadow-glow'
                          : 'glass-card border-gray-200'
                      }`}
                    >
                      <channel.icon className={`h-6 w-6 mb-3 ${channel.primary ? 'text-white' : 'text-primary'}`} />
                      <h3 className={`font-semibold mb-2 ${channel.primary ? 'text-white' : 'text-gray-900'}`}>
                        {channel.title}
                      </h3>
                      <p className={`text-sm mb-3 ${channel.primary ? 'text-white/90' : 'text-gray-600'}`}>
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs mb-4">
                        <Clock className={`h-3 w-3 ${channel.primary ? 'text-white/80' : 'text-gray-500'}`} />
                        <span className={channel.primary ? 'text-white/80' : 'text-gray-500'}>
                          {channel.availability}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={channel.primary ? "secondary" : "outline"}
                        className={`w-full ${channel.primary ? 'bg-white text-primary hover:bg-gray-100' : 'glass-card'}`}
                      >
                        {channel.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Send us a message and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="glass-card"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="glass-card"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="glass-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="glass-card"
                      placeholder="Please describe your question or issue in detail..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-primary hover-lift hover-glow shadow-medium"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resources */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="p-3 glass-card rounded-lg hover-lift">
                    <div className="flex items-start gap-3">
                      <resource.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {resource.count}
                          </Badge>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-card hover-lift">
                  <Download className="h-4 w-4 mr-2" />
                  Download User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start glass-card hover-lift">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="outline" className="w-full justify-start glass-card hover-lift">
                  <Users className="h-4 w-4 mr-2" />
                  Community Forum
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Platform</span>
                    <Badge className="bg-green-100 text-green-700">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-100 text-green-700">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Support</span>
                    <Badge className="bg-green-100 text-green-700">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;