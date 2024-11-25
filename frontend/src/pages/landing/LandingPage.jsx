import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BarChart3,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const features = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Smart Assessment",
    description: "Advanced testing tools with AI-powered analysis"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-time Analytics",
    description: "Comprehensive insights into student performance"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Platform",
    description: "Bank-grade security for your assessments"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborative Learning",
    description: "Connect instructors and students seamlessly"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white stylish-scrollbar">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-20 bg-palatte-dark flex flex-row ">
        <div className="container mx-auto px-4 pt-20 pb-32 bg-gray-500">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Transform Assessment Management with TestCo
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              The next-generation platform for creating, managing, and analyzing educational assessments
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-gray-600 hover:border-gray-400 rounded-lg font-semibold transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-32 bg-gray-50"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">About TestCo</h2>
            <p className="text-gray-300 mb-8">
              TestCo is revolutionizing the way educational institutions handle assessments.
              Our platform combines cutting-edge technology with user-friendly interfaces to
              create a seamless assessment experience for educators and students alike.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gray-800/40 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-400">To make assessment management effortless and effective</p>
              </div>
              <div className="p-6 bg-gray-800/40 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-gray-400">To be the global leader in educational assessment solutions</p>
              </div>
              <div className="p-6 bg-gray-800/40 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-gray-400">Innovation, integrity, and student success</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-800/40 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all"
              >
                <div className="mb-4 text-blue-400">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blogs" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "The Future of Online Assessment",
                  excerpt: "Discover how AI is transforming educational assessment...",
                  date: "Mar 15, 2024"
                },
                {
                  title: "Best Practices for Remote Testing",
                  excerpt: "Learn how to conduct effective remote assessments...",
                  date: "Mar 12, 2024"
                },
                {
                  title: "Analytics in Education",
                  excerpt: "Understanding the impact of data-driven decisions...",
                  date: "Mar 10, 2024"
                }
              ].map((post, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-6">
                    <div className="text-sm text-gray-400 mb-2">{post.date}</div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-palatte-secondary" />
                    <span>contact@testco.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-blue-400" />
                    <span>123 Education Street, Learning City, 12345</span>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default LandingPage;