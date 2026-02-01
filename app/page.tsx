'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Get hero section element
      const hero = document.getElementById('hero')
      if (!hero) return
      
      const rect = hero.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate distance from center (normalized to -1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)
      
      // Apply tilt (max 15 degrees)
      setTilt({
        x: y * 15, // Rotate on X axis based on Y position (vertical mouse movement)
        y: -x * 15  // Rotate on Y axis based on X position (horizontal mouse movement)
      })
    }

    const handleMouseLeave = () => {
      // Reset tilt when mouse leaves hero section
      setTilt({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    const hero = document.getElementById('hero')
    if (hero) {
      hero.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (hero) {
        hero.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-dark-bg text-gray-100">
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-surface/80 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="text-xl font-semibold gradient-text">
            Interview Playbook
          </a>
          <div className="hidden md:flex gap-6">
            <a href="#insights" className="text-sm hover:text-purple-400 transition-colors">Key Insights</a>
            {/* <a href="#resources" className="text-sm hover:text-purple-400 transition-colors">Resources</a> */}
            <a href="#qa" className="text-sm hover:text-purple-400 transition-colors">Q&A</a>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero with Parallax and 3D Effect */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ perspective: '1000px' }}
      >
        {/* Gradient Blobs with Parallax and 3D */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500 gradient-blob hero-3d"
          style={{
            transform: `
              translateY(${scrollY * 0.3}px) 
              translateX(${scrollY * 0.1}px)
              translateZ(${tilt.y * 2}px)
              rotateX(${tilt.x * 0.3}deg)
              rotateY(${tilt.y * 0.3}deg)
            `,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 gradient-blob hero-3d" 
          style={{ 
            animationDelay: '2s',
            transform: `
              translateY(${scrollY * 0.4}px) 
              translateX(${-scrollY * 0.15}px)
              translateZ(${-tilt.y * 2}px)
              rotateX(${tilt.x * 0.4}deg)
              rotateY(${-tilt.y * 0.4}deg)
            `,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 gradient-blob hero-3d" 
          style={{ 
            animationDelay: '4s',
            transform: `
              translateY(${scrollY * 0.25}px) 
              translateX(${scrollY * 0.2}px)
              translateZ(${tilt.x * 2}px)
              rotateX(${-tilt.x * 0.2}deg)
              rotateY(${tilt.y * 0.2}deg)
            `,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>

        {/* Content with Parallax and 3D Tilt */}
        <div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center parallax-container hero-3d"
          style={{
            transform: `
              translateY(${Math.min(scrollY * 0.3, typeof window !== 'undefined' ? window.innerHeight * 0.2 : 200)}px)
              translateZ(0)
              rotateX(${tilt.x}deg)
              rotateY(${tilt.y}deg)
            `,
            opacity: scrollY < 800 ? Math.max(0.7, 1 - scrollY / 1000) : 0,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            transformStyle: 'preserve-3d'
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            The PM Interview Playbook
            <span className="block text-4xl md:text-5xl mt-4 gradient-text">(2026)</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
            How I Cracked Senior PM & Director Offers in an AI-Driven Hiring Market
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            A practical, honest breakdown of PM hiring — built from real interviews, real rejections, and real offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Commented out for this session - will enable later */}
            {/* <a 
              href="#resources" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Download Free Interview Resources
            </a> */}
            {/* Commented out for this session - will enable later */}
            {/* <a 
              href="#insights" 
              className="px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold hover:bg-purple-500/10 transition-all"
            >
              Jump to Key Insights
            </a> */}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4">
              <div 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"
                style={{
                  transform: `
                    translateY(${scrollY * 0.2}px) 
                    scale(${1 + scrollY * 0.0001})
                    rotateX(${tilt.x * 0.5}deg)
                    rotateY(${tilt.y * 0.5}deg)
                  `,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {!imageError ? (
                  <img
                    src="/profile-photo.jpg"
                    alt="Yash Doshi"
                    className="object-cover w-full h-full object-top"
                    style={{ objectPosition: 'top center' }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                    YD
                  </div>
                )}
              </div>
              <div className="text-left space-y-1">
                <p className="text-lg md:text-xl font-semibold">Yash Doshi</p>
                <p className="text-gray-400 text-sm md:text-base">Director of Product Management – Data & AI @ Spotnana</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Hosted by <span className="text-purple-400">Hello PM</span></p>
          </div>
        </div>
      </section>

      {/* Section 2: Why This Page Exists */}
      {/* Commented out for this session - will enable later */}
      {/* <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Why This Page Exists
          </h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              You're a Product Manager. You've shipped features, led cross-functional teams, and delivered results. 
              You've done everything "right" — optimized your resume, networked strategically, prepared for interviews. 
              Yet you're hearing nothing back.
            </p>
            <p>
              AI tools are making interviews feel impersonal and unfair. Silent rejections are eroding your confidence. 
              The process feels broken, and you're not sure what's real anymore.
            </p>
            <p className="text-xl font-semibold text-purple-400 pt-4">
              This is not a motivation talk. It's a system you can trust.
            </p>
            <p>
              This page exists because PM hiring in 2026 operates differently than it did even two years ago. 
              Recruiters use AI filters. Interview loops test different skills. The bar has shifted. 
              And most advice out there is either outdated or generic.
            </p>
            <p>
              What you'll find here is a transparent, tactical breakdown built from real experience: 
              multiple interview loops, honest rejections, and eventual offers at senior and Director levels.
            </p>
          </div>
        </div>
      </section> */}

      {/* Section 3: My Interview Journey */}
      <section id="journey" className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            My Interview Journey
          </h2>
          <p className="text-center text-gray-400 mb-12 italic">
            Truthful & Grounded
          </p>

          <div className="space-y-8">
            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-2xl font-semibold mb-4">The Beginning: Multiple Loops, Multiple Rejections</h3>
              <p className="text-gray-300 leading-relaxed">
                I interviewed extensively across top-tier companies. Some loops ended after the recruiter screen. 
                Others went deep — product sense, execution, behavioral, technical — only to end in silence or rejection. 
                The pattern was consistent: strong resume, good conversations, but no offer.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-2xl font-semibold mb-4">What Changed: Designing a Process</h3>
              <p className="text-gray-300 leading-relaxed">
                I stopped optimizing individual answers and started designing a system. I built a story bank. 
                I mapped my experiences to PM frameworks without memorizing them. I understood how recruiters 
                actually discover candidates. I prepared for AI interviews as tools, not obstacles.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-2xl font-semibold mb-4">The Outcome: Multiple Offers</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I received multiple senior and Director-level offers from top-tier companies, including large tech 
                and SaaS firms. <strong className="text-white">Important clarity:</strong> Some of these were offers, 
                not employers. I want to be explicit about this because it demonstrates:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Interview mastery — the ability to navigate complex loops successfully</li>
                <li>Market calibration — understanding where I stood in the competitive landscape</li>
                <li>Decision-making clarity — choosing based on role scope, leadership opportunity, and long-term impact</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-8 my-8 border border-purple-500/30">
              <p className="text-2xl font-semibold text-center italic">
                "Once I stopped optimizing answers and started designing a process, everything changed."
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 py-4">
              <h3 className="text-2xl font-semibold mb-4">Why Spotnana</h3>
              <p className="text-gray-300 leading-relaxed">
                I chose Spotnana based on role scope, leadership opportunity, and long-term impact. 
                Currently leading Data & AI product initiatives, I'm applying the same systematic approach 
                to product building that I used in my job search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Reality of PM Hiring in 2026 */}
      <section id="insights" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            The Reality of PM Hiring in 2026
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Reset Expectations
          </p>

          {/* Funnel Visualization */}
          <div className="mb-12 space-y-4">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-lg p-6 border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-semibold">Thousands Apply</span>
                <span className="text-sm text-gray-400">~5,000</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/40 to-yellow-900/40 rounded-lg p-6 border border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-semibold">Hundreds Skimmed</span>
                <span className="text-sm text-gray-400">~500</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/40 to-green-900/40 rounded-lg p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-semibold">Dozens Screened</span>
                <span className="text-sm text-gray-400">~50</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '1%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-semibold">Few Interviewed</span>
                <span className="text-sm text-gray-400">~5</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '0.1%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-6 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-semibold">One Hired</span>
                <span className="text-sm text-gray-400">1</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '0.02%' }}></div>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-lg text-gray-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Key Truths</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-semibold mb-1">Conversion rate for inbound applications is lower</p>
                  <p className="text-gray-400 mb-2">
                    If you don't have referrals or an exact match for skills, the conversion rate is significantly lower. 
                    In that case, you have to somehow prove yourself why you are the best fit for this role. 
                    Most successful PMs are discovered, not applied.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold mb-1">Speed and signal dominate</p>
                  <p className="text-gray-400">Recruiters move fast. Your profile needs to signal relevance immediately.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="font-semibold mb-1">Recruiters optimize for risk reduction</p>
                  <p className="text-gray-400">They're not looking for the best candidate — they're looking for the safest hire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How Recruiters Actually Discover PMs */}
      <section className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            How Recruiters Actually Discover PMs
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Tactical Clarity
          </p>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
              <h3 className="text-2xl font-semibold mb-4">LinkedIn Recruiter Mechanics</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Recruiters use LinkedIn Recruiter with specific filters. Understanding these mechanics 
                is the difference between being discovered and being invisible.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Keyword-Based Discovery</h4>
                  <p className="text-gray-400 mb-3">Your headline, summary, and experience sections are scanned for keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Data PM', 'AI Product Manager', 'Analytics Platform', 'GenAI', 'ML Product', 'Platform PM', 'B2B SaaS', 'Enterprise Product'].map((keyword) => (
                      <span key={keyword} className="px-3 py-1 bg-purple-900/40 rounded-full text-sm border border-purple-500/30">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Title Normalization</h4>
                  <p className="text-gray-400">
                    "Product Manager" vs "Product Lead" vs "PM" — recruiters normalize these. 
                    Use the most common title in your target market.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Location & Recency Filters</h4>
                  <p className="text-gray-400">
                    Recruiters filter by location (or remote), and prioritize profiles with recent activity. 
                    Update your profile regularly, even if just to add a skill or react to a post.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg p-8 border border-blue-500/30">
              <p className="text-xl font-semibold mb-2">💡 Critical Insight</p>
              <p className="text-2xl font-bold gradient-text">
                Your LinkedIn profile is your real resume.
              </p>
              <p className="text-gray-300 mt-4">
                Most recruiters never see your PDF resume until after they've already decided to reach out. 
                Your LinkedIn profile is the first and often only signal they use to discover you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Authenticity Is the Differentiator */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Authenticity Is the Differentiator
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Trust-Building
          </p>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-8 border border-pink-500/30">
              <h3 className="text-2xl font-semibold mb-4">Why Recruiters Distrust AI-Polished Candidates</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                In an AI-driven market, authenticity stands out. Recruiters are increasingly skeptical of profiles 
                and answers that feel too polished, too generic, or too AI-generated. They're looking for signals 
                that you're a real person with real experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
                <h4 className="text-xl font-semibold mb-4 text-green-400">✅ Signals of Authenticity</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Real photos (not AI avatars)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Coherent career story with clear progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Genuine recommendations from colleagues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Writing, portfolios, or talks that show your thinking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Specific metrics and outcomes, not generic claims</span>
                  </li>
                </ul>
              </div>

              <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
                <h4 className="text-xl font-semibold mb-4 text-red-400">❌ Warning Signs</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>AI-generated profile photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Fake projects or exaggerated achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Over-scripted interview answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Generic, buzzword-heavy language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Inconsistent story across platforms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-8 border border-yellow-500/30">
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-white">The bottom line:</strong> Use AI to sharpen your thinking and refine your communication. 
                Don't use it to create a persona that doesn't match who you are. Authenticity builds trust, 
                and trust is what gets you through the door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: AI in Interviews */}
      <section className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            AI in Interviews: Tool vs Dependency
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Balanced Guidance
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-8 border border-green-500/30">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">✅ AI as a Prep Assistant</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Practice answering common PM questions</li>
                <li>• Get feedback on your story structure</li>
                <li>• Identify gaps in your preparation</li>
                <li>• Understand different PM frameworks</li>
                <li>• Simulate interview scenarios</li>
                <li>• Refine your communication clarity</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-lg p-8 border border-red-500/30">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">❌ AI as a Live Performance Crutch</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Using AI to generate answers during interviews</li>
                <li>• Memorizing AI-generated responses verbatim</li>
                <li>• Relying on AI to think for you</li>
                <li>• Using AI to fake expertise you don't have</li>
                <li>• Over-scripting to the point of sounding robotic</li>
                <li>• Avoiding genuine conversation and follow-ups</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
            <p className="text-xl font-semibold mb-4 text-center">
              Clear Stance
            </p>
            <p className="text-2xl font-bold text-center gradient-text mb-4">
              Use AI to sharpen thinking — not to outsource it.
            </p>
            <p className="text-gray-300 text-center leading-relaxed">
              Interview-coaching tools can be valuable for preparation. But in the interview itself, 
              you need to demonstrate genuine thinking, adaptability, and authentic problem-solving. 
              That's what interviewers are actually evaluating.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Designing Your Job Search as a System */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Designing Your Job Search as a System
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Practical Execution
          </p>

          <div className="space-y-6">
            <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">1. Applying Within 24-48 Hours & Leveraging Referrals</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                Job postings get hundreds of applications in the first 48 hours. Apply within 24-48 hours to maximize 
                your visibility. Have a template application ready, but customize it for each role.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Equally important:</strong> Don't just apply — leverage your connections for referrals. 
                Connect with people at target companies, ask them to refer you, and ask them to start a thread with the hiring manager 
                to introduce you. A warm introduction dramatically increases your chances of getting past the initial screening.
              </p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">2. Ethical Resume Tailoring & LinkedIn Matching</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                Tailor your resume to highlight relevant experience, but never fabricate. Use the job description's 
                language to align your achievements with what they're looking for. This isn't gaming the system — 
                it's clear communication.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Critical:</strong> Your LinkedIn and resume should match. If you have AI generate a resume 
                based on a job description and those skills are not present on your LinkedIn profile, it may be difficult to get shortlisted. 
                Recruiters cross-reference your resume with your LinkedIn profile, and inconsistencies raise red flags.
              </p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-green-400">3. Tracking Pipelines</h3>
              <p className="text-gray-300 leading-relaxed">
                Use a spreadsheet to track every application: company, role, date applied, status, next steps, 
                contacts. This helps you follow up strategically and avoid applying to the same role twice.
              </p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">4. Personalized Outreach (Not Generic Emails)</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                One thing I've done throughout my career: I never send a generic email introducing myself. Instead, 
                I spend 5-10 minutes learning about their product, understanding their challenges, and providing a few 
                concrete ideas about how they could improve their product or implement specific features.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This approach gives you a significant upper hand and dramatically higher chances of getting selected for 
                the recruiter round. It shows genuine interest, product thinking, and initiative — exactly what hiring 
                managers are looking for. Don't just ask for referrals — demonstrate value first.
              </p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">5. Doubling Down on Strengths</h3>
              <p className="text-gray-300 leading-relaxed">
                Identify your unique strengths (data, AI, B2B, growth, etc.) and target roles that align. 
                Don't try to be everything to everyone. Depth in a specific area is more valuable than 
                shallow breadth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Interview Craft & Storytelling */}
      <section className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Interview Craft & Storytelling
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Depth
          </p>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
              <h3 className="text-2xl font-semibold mb-4">Story Bank Strategy</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">Step 1:</strong> Take one full day to remember all the projects you have worked on, big or small. 
                Don't skip anything — even small projects can demonstrate important skills.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">Step 2:</strong> Use 5-10 minutes to write down each story. Capture the context, your actions, 
                and the impact. Don't worry about perfecting it yet — just get it documented.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">Step 3:</strong> First use your own judgment to determine which story will be best suitable 
                for what type of interview questions. Think about what each story demonstrates: leadership, conflict resolution, 
                decision-making, learning, etc.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Step 4:</strong> Only after you've done your own analysis, then ask AI to help refine, 
                structure, or suggest which stories work best for specific questions. Build a bank of 8-12 stories that cover different 
                scenarios: launching a product, handling conflict, making a tough decision, learning from failure, working with engineering, etc. 
                Each story should be structured with context, action, and impact.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg p-8 border border-blue-500/30">
              <h3 className="text-2xl font-semibold mb-4">Impact-First Narratives</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Start with the outcome, then explain how you got there. "I increased user engagement by 40% by 
                redesigning the onboarding flow" is more powerful than a chronological story that takes too long 
                to get to the point.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 rounded-lg p-8 border border-green-500/30">
              <h3 className="text-2xl font-semibold mb-4">Learning Signals</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Interviewers want to see that you learn and adapt. Include moments where you changed your mind, 
                received feedback, or pivoted based on data. This shows self-awareness and growth mindset.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-8 border border-yellow-500/30">
              <h3 className="text-2xl font-semibold mb-4">Avoiding Repetitive Examples</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Don't use the same story for every "tell me about a time" question. Have variety. If you're asked 
                about leadership, conflict, and decision-making, use three different stories that showcase different 
                aspects of your experience.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-pink-900/20 rounded-lg p-8 border border-orange-500/30">
              <h3 className="text-2xl font-semibold mb-4">Framework Customization (Not Memorization)</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Know frameworks like CIRCLES, RICE, or HEART, but don't recite them. Adapt them to the question. 
                Show that you understand the underlying principles, not just the acronym.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-8 border border-red-500/30">
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Interview Tools: Why Honesty Matters</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                There are companies using AI tools to record interviews and generate insights about candidates. 
                These tools are getting smarter — if you tell one story to an interviewer and in the next round you 
                say something different for the same story, the AI will catch the inconsistency and flag you as a candidate.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This is why being honest and really knowing what you talk about (both AI and PM skills) is much more 
                important in this era. Don't fabricate stories or exaggerate your experience. Authenticity and consistency 
                are now being measured by AI systems, not just human interviewers.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-8 border border-pink-500/30">
              <h3 className="text-2xl font-semibold mb-4">AI-PM Expectations</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you're interviewing for AI/ML PM roles, be prepared to discuss:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Data quality:</strong> How do you ensure training data is representative and unbiased?</li>
                <li><strong>Trade-offs:</strong> Model accuracy vs. latency, cost vs. performance</li>
                <li><strong>Model evaluation:</strong> Beyond accuracy — fairness, interpretability, robustness</li>
                <li><strong>"Vibe coding":</strong> Reasoning about AI systems is more important than syntax. 
                You don't need to be a data scientist, but you need to think clearly about AI product challenges.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: The Modern PM Interview Loop */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            The Modern PM Interview Loop
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Reduce Anxiety
          </p>

          <div className="space-y-6">
            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3">1. Recruiter Screen</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> Basic fit, communication, interest level</p>
              <p className="text-gray-400 text-sm">Usually 30 minutes. Be clear about why you're interested and what you're looking for.</p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3">2. Product Sense</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> Strategic thinking, user empathy, prioritization</p>
              <p className="text-gray-400 text-sm">Design a product, improve an existing one, or prioritize features. Show your thinking process.</p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3">3. Execution</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> How you ship, handle ambiguity, work cross-functionally</p>
              <p className="text-gray-400 text-sm">Questions about project management, stakeholder alignment, and getting things done.</p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-3">4. Behavioral</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> Past behavior, leadership, conflict resolution</p>
              <p className="text-gray-400 text-sm">"Tell me about a time when..." Use your story bank. Be specific and outcome-focused.</p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-pink-500">
              <h3 className="text-xl font-semibold mb-3">5. AI / Technical</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> Technical depth, AI/ML understanding (if relevant)</p>
              <p className="text-gray-400 text-sm">For AI PM roles, expect questions about model evaluation, data quality, and trade-offs.</p>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3">6. Panel</h3>
              <p className="text-gray-300 mb-2"><strong>What it tests:</strong> Cultural fit, team dynamics, final validation</p>
              <p className="text-gray-400 text-sm">Often includes your potential manager, peers, and stakeholders. Show how you'd collaborate.</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Remember:</strong> Each round is testing something specific. 
              Understanding what they're actually evaluating helps you prepare more effectively and reduces anxiety. 
              You're not trying to be perfect — you're trying to demonstrate fit.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11: Resilience & Mental Models */}
      <section className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Resilience & Mental Models
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Emotional Grounding
          </p>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-8 border border-blue-500/30">
              <h3 className="text-2xl font-semibold mb-4">Rejection as Feedback Loops</h3>
              <p className="text-gray-300 leading-relaxed">
                Rejection isn't failure — it's feedback. Each rejection tells you something: maybe the role wasn't a fit, 
                maybe your story wasn't clear, maybe the timing was off. Treat rejections as data points, not personal judgments. 
                Use them to refine your approach.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-8 border border-purple-500/30">
              <h3 className="text-2xl font-semibold mb-4">Process &gt; Outcomes</h3>
              <p className="text-gray-300 leading-relaxed">
                You can't control whether you get an offer, but you can control your process. Focus on what you can influence: 
                your preparation, your applications, your follow-ups. If you trust your process, the outcomes will follow — 
                even if it takes longer than expected.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-900/20 to-orange-900/20 rounded-lg p-8 border border-pink-500/30">
              <h3 className="text-2xl font-semibold mb-4">Consistency Beats Intensity</h3>
              <p className="text-gray-300 leading-relaxed">
                Job searching is a marathon, not a sprint. Consistent, daily effort — even if it's just 30 minutes — 
                is more effective than intense bursts followed by burnout. Build sustainable habits: apply to one role per day, 
                network with one person per week, practice one story per day.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-lg p-8 border border-orange-500/30">
              <h3 className="text-2xl font-semibold mb-4">Short, Grounded Reflections</h3>
              <p className="text-gray-300 leading-relaxed italic">
                "This is hard. It's supposed to be hard. You're not broken — the process is just competitive. 
                Keep going. Trust your process. One application, one interview, one conversation at a time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Free Downloadable Resources */}
      {/* Commented out for this session - will enable later */}
      {/* <section id="resources" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Free Downloadable Resources
          </h2>
          <p className="text-center text-gray-400 mb-12">
            High-Value Exchange
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30 hover:border-purple-400 transition-all">
              <h3 className="text-xl font-semibold mb-3">📝 Story Bank Template</h3>
              <p className="text-gray-300 mb-4 text-sm">
                A structured template to build your 8-12 interview stories with context, action, and impact sections.
              </p>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                Download →
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg p-6 border border-blue-500/30 hover:border-blue-400 transition-all">
              <h3 className="text-xl font-semibold mb-3">🤖 AI Prep Prompt Pack</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Curated prompts to use with AI tools for interview preparation, story refinement, and framework practice.
              </p>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                Download →
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-yellow-900/30 rounded-lg p-6 border border-green-500/30 hover:border-green-400 transition-all">
              <h3 className="text-xl font-semibold mb-3">📧 Recruiter Outreach Scripts</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Templates for reaching out to recruiters and hiring managers with intent and authenticity.
              </p>
              <button className="text-green-400 hover:text-green-300 text-sm font-semibold">
                Download →
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-400 transition-all">
              <h3 className="text-xl font-semibold mb-3">📊 Job Tracker Spreadsheet</h3>
              <p className="text-gray-300 mb-4 text-sm">
                A comprehensive tracker to manage your job search pipeline, applications, and follow-ups.
              </p>
              <button className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
                Download →
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-pink-900/30 rounded-lg p-6 border border-orange-500/30 hover:border-orange-400 transition-all md:col-span-2">
              <h3 className="text-xl font-semibold mb-3">📋 PM Framework Cheat Sheets</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Quick reference guides for CIRCLES, RICE, HEART, and other PM frameworks — with customization tips.
              </p>
              <button className="text-orange-400 hover:text-orange-300 text-sm font-semibold">
                Download →
              </button>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="#resources" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Download All Resources (Free)
            </a>
          </div>
        </div>
      </section> */}

      {/* Section 13: Live Q&A */}
      <section id="qa" className="relative py-24 px-6 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Live Q&A
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Close the Loop
          </p>

          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-12 border border-purple-500/30 text-center">
            <p className="text-2xl font-semibold mb-6">
              What's the biggest thing blocking your next PM role?
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              During the live session, we'll address your specific questions about PM interviews, 
              job search strategy, and navigating the AI-driven hiring market. This is your chance 
              to get tactical, personalized guidance.
            </p>
            <p className="text-gray-400 text-sm">
              Q&A format: Please come prepared with specific questions. We'll cover as many as time allows, 
              focusing on actionable advice over general motivation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 14: Footer / Connect */}
      <footer className="relative py-16 px-6 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Yash Doshi</h3>
          <p className="text-gray-400 mb-6">Director of Product Management – Data & AI @ Spotnana</p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://linkedin.com/in/yashdoshi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/30 mb-6">
            <p className="text-lg font-semibold mb-2 text-purple-400">Spotnana is Hiring</p>
            <p className="text-gray-300 leading-relaxed mb-3">
              We have <strong className="text-white">100 openings approved</strong> in total, primarily in <strong className="text-white">Product Management and Engineering</strong>. 
              Openings will be majorly in <strong className="text-white">India</strong> and some in the <strong className="text-white">USA</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We have offices in <strong className="text-white">Mumbai, Pune, and Bangalore</strong>. We'll be posting all open positions 
              in the coming weeks. If you're interested in joining our team, feel free to reach out.
            </p>
          </div>

          <p className="text-gray-500 mb-4">
            Thank you for taking the time to explore this playbook. I hope it helps you navigate your PM job search with more clarity and confidence.
          </p>
          
          <p className="text-gray-400 italic">
            If this helped you, pay it forward.
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Hosted by <span className="text-purple-400">Hello PM</span> | Founder: Ankit Shukla
          </p>
        </div>
      </footer>
    </main>
  )
}
