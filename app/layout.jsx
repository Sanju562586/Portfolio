import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Interactive3DCursor from '../components/Interactive3DCursor';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'Sanjay Kumar — AI & Systems Engineer | 3D Portfolio',
  description:
    'Sanjay Kumar is an AI & Systems Engineer specializing in Agentic AI, Google MCP protocols, Vision-Language Models (PaliGemma, LLaVA), and high-throughput distributed systems.',
  keywords: [
    'Sanjay Kumar',
    'AI Engineer',
    'Systems Engineer',
    'Model Context Protocol',
    'MCP Agent',
    'PaliGemma',
    'LLaVA',
    'Framer Motion 3D',
    'Next.js Portfolio',
    'Glassmorphism',
  ],
  authors: [{ name: 'Sanjay Kumar' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#07090e] text-[#f8fafc] font-sans antialiased selection:bg-blue-600 selection:text-white">
        <SmoothScroll>
          {/* Dynamic 3D Spatial Spring Cursor */}
          <Interactive3DCursor />

          {/* Global Floating Glass Navbar */}
          <Navbar />

          {/* Main Routed Page Content */}
          <div className="pt-20">
            {children}
          </div>

          {/* Global Modern Footer */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
