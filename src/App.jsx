import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ArrowDownIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon, ServerIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'

const projectsData = [
  {
    id: 'holidaze',
    name: 'Holidaze - Booking Venue',
    shortDescription: 'A React and Tailwind based application for booking venues, featuring venue listing, search, booking/canceling, and venue manager functionality.',
    longDescription: 'Holidaze is a comprehensive React application developed for booking accommodation venues. It offers a seamless user experience for browsing available venues, searching by various criteria, and managing bookings. Key features include user authentication, venue listing with filtering and search capabilities, the ability to book and cancel venues, and a dedicated manager interface for venue owners to add, update, and delete their listings. Built with modern React practices and styled using Tailwind CSS, it focuses on responsiveness and an intuitive design.',
    image: '/HolidazePic.png',
    liveLink: 'https://xnb.netlify.app/',
    sourceCodeLink: 'https://github.com/shiwa4656/projectExam2'
  },
  {
    id: 'auction-site',
    name: 'Auction Site',
    shortDescription: 'A dynamic and interactive auction site application built with Tailwind CSS and JavaScript, allowing users to post, bid on, and manage items, including deleting their own bids.',
    longDescription: 'This auction site is a robust web application where users can create listings, place bids on items, and manage their own posted items and bids. Developed with vanilla JavaScript for core functionality and styled beautifully with Tailwind CSS for a modern, responsive design. It includes features such as user authentication, item creation with image uploads, real-time bidding mechanics, and the ability for users to delete their own bids or listings. The application emphasizes interactivity and a smooth user experience.',
    image: '/Auction.png',
    liveLink: 'https://auction-site16.netlify.app/',
    sourceCodeLink: 'https://github.com/shiwa4656/semesterProject2'
  },
  {
    id: 'shopwave',
    name: 'ShopWave - E-Commerce Store',
    shortDescription: 'A React-based e-commerce store application with product listing, search functionality, cart management, and checkout process.',
    longDescription: 'ShopWave is a functional e-commerce store built using React, designed to provide a complete shopping experience. It features a comprehensive product listing page, robust search and filtering capabilities to help users find items quickly, an intuitive shopping cart system, and a streamlined checkout process. The application focuses on maintainability and a clean user interface, making it easy to browse, select, and purchase products.',
    image: '/Ecommerce.png',
    liveLink: 'https://online-shop46.netlify.app/',
    sourceCodeLink: 'https://github.com/shiwa4656/reactCourseAssignment'
  }
];

// New component for individual project articles
function ProjectArticle({ projectsData }) {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);
  const navigate = useNavigate();

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center text-gray-800">
          <h2 className="text-4xl font-bold mb-4">Project Not Found</h2>
          <p className="text-lg">The project you are looking for does not exist.</p>
          <Link to="/" className="mt-8 inline-block btn btn-primary">Go Home</Link>
        </div>
      </section>
    );
  }

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToProjects: true } });
  };

  return (
    <section className="section pt-32 min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <button
            onClick={handleBackToProjects}
            className="text-primary hover:text-blue-600 transition-colors flex items-center mb-8 bg-transparent border-none p-0 cursor-pointer"
          >
            <ArrowDownIcon className="h-5 w-5 rotate-90 mr-2" /> Back to Projects
          </button>
          
          <img src={project.image} alt={project.name} className="w-full h-auto rounded-lg mb-8 shadow-md" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">{project.name}</h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group"
            >
              View Live Project
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </a>
            <a
              href={project.sourceCodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gray-100 hover:bg-gray-200 group"
            >
              Source Code
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// This component will render the main sections of portfolio
function HomePageContent({ isMobile, handleScroll, animationVariants, activeSection, projectsData }) {
  const location = useLocation();

  // Effect to manage scroll listener for active section
  useEffect(() => {
    if (!isMobile && location.pathname === '/') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, isMobile, location.pathname])


  // NEW EFFECT: Scroll to projects section when navigating back from a project article
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToProjects) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        setTimeout(() => {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState({}, document.title, window.location.pathname); 
        }, 100); 
      }
    }
  }, [location]);

  return (
    <>
      <section id="home" className="section pt-32 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative"
          >
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Hi, I'm <span className="text-primary">Shirwac</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              A passionate developer crafting beautiful digital experiences
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </motion.a>
              <motion.a
                href="#projects"
                className="btn bg-white text-gray-900 hover:bg-gray-100 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Projects</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </motion.a>
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDownIcon className="h-6 w-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section relative overflow-hidden transition-all duration-500 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5"></div>
        <motion.div 
          className="container relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a dedicated developer with a passion for creating beautiful and functional web applications.
                With expertise in modern web technologies, I strive to build solutions that make a difference.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey in web development started with a curiosity about how things work on the internet,
                and it has evolved into a professional pursuit of creating exceptional digital experiences.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'React', icon: <CodeBracketIcon className="h-6 w-6" /> },
                  { name: 'JavaScript', icon: <CommandLineIcon className="h-6 w-6" /> },
                  { name: 'Tailwind CSS', icon: <DevicePhoneMobileIcon className="h-6 w-6" /> },
                  { name: 'Node.js', icon: <ServerIcon className="h-6 w-6" /> },
                  { name: 'Git', icon: <CodeBracketIcon className="h-6 w-6" /> },
                  { name: 'TypeScript', icon: <CommandLineIcon className="h-6 w-6" /> },
                  { name: 'Next.js', icon: <ServerIcon className="h-6 w-6" /> },
                  { name: 'MongoDB', icon: <DevicePhoneMobileIcon className="h-6 w-6" /> }
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all group cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-primary group-hover:text-blue-600 transition-colors">
                        {skill.icon}
                      </div>
                      <span className="text-primary font-medium">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="section transition-all duration-200 bg-gray-50">
        <motion.div 
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
          variants={animationVariants.staggerContainer}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            variants={animationVariants.fadeInUp}
          >
            My Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            variants={animationVariants.fadeInUp}
          >
            These are the lastest projects I have worked on, click the cards to see more about the project's build up, live demo and source code.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dynamically render project cards */}
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={animationVariants.fadeInUp}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                whileHover={isMobile ? {} : { y: -5 }}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  perspective: '1000px'
                }}
              >
                {/* Wrap card content with Link */}
                <Link to={`/projects/${project.id}`} className="block">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                    {!isMobile && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                        style={{
                          willChange: 'transform',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-black">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section relative overflow-hidden transition-all duration-500 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5"></div>
        <motion.div 
          className="container relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-black">Let's Connect!</h3>
                <p className="text-lg mb-8 text-black">
                  I'm always open to new opportunities and collaborations. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  <motion.a
                    href="mailto:shirwacstudy@gmail.com"
                    className="flex items-center justify-center space-x-4 p-4 bg-white backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <EnvelopeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-gray-600 font-semibold text-lg">shirwacstudy@gmail.com</span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/shirwac-q-7297a8198/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-4 p-4 bg-white backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FaLinkedin className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-gray-600 font-semibold text-lg">My LinkedIn Profile</span>
                  </motion.a>
                  <motion.div
                    className="flex items-center justify-center space-x-4 p-4 bg-white backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-gray-600 font-semibold text-lg">+47 46568439</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center space-x-4 p-4 bg-white backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-gray-600 font-semibold text-lg">Stavanger, Norway</span>
                  </motion.div>
                </div>
              </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Simplified scroll progress for mobile
  const scaleX = useSpring(isMobile ? 0 : scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Detect mobile device with debounce
  useEffect(() => {
    let timeoutId
    const checkMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768)
      }, 100)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeoutId)
    }
  }, [])

 
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -25])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -35])

 
  const handleScroll = useCallback(() => {
    if (isMobile) return
    const sections = ['home', 'about', 'projects', 'contact']
    const current = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      }
      return false
    })
    if (current) setActiveSection(current)
  }, [isMobile])

  // Memoized animation variants with mobile optimization
  const animationVariants = useMemo(() => ({
    fadeInUp: {
      hidden: { opacity: 0, y: isMobile ? 10 : 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: isMobile ? 0.1 : 0.3,
          ease: "easeOut"
        }
      }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0 : 0.1
        }
      }
    }
  }), [isMobile])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  // Optimize background animations
  const backgroundAnimation = useMemo(() => {
    if (isMobile || prefersReducedMotion) {
      return {}
    }
    return {
      scale: [1, 1.1, 1],
      x: [0, 50, 0],
      y: [0, 25, 0],
      rotate: [0, 90, 0],
    }
  }, [isMobile, prefersReducedMotion])

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-gray-100`}>
        {/* Optimized Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {!isMobile && (
            <>
              <motion.div
                style={{ y: y1 }}
                className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                animate={isMobile ? {} : {
                  scale: [1, 1.05, 1],
                  x: [0, 25, 0],
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: isMobile ? 0 : 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute top-0 -right-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                animate={isMobile ? {} : {
                  scale: [1.05, 1, 1.05],
                  x: [0, -25, 0],
                  y: [0, 25, 0],
                }}
                transition={{
                  duration: isMobile ? 0 : 25,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                style={{ y: y3 }}
                className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                animate={isMobile ? {} : {
                  scale: [1, 1.05, 1],
                  x: [0, 15, 0],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: isMobile ? 0 : 30,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5"></div>
        </div>

        {/* Progress Bar with enhanced styling */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-600 to-primary origin-left z-50"
          style={{ scaleX }}
        />

        {/* Enhanced Navigation */}
        <nav className={`fixed w-full backdrop-blur-md z-40 border-b transition-all duration-500 bg-white/90 border-gray-200 shadow-lg`}>
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-16">
              <motion.a 
                href="#" 
                className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Portfolio
              </motion.a>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-600 hover:text-primary transition-colors relative group ${
                      activeSection === item.href.slice(1) ? 'text-primary' : ''
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-blue-600 transition-all duration-300 ${
                      activeSection === item.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </motion.a>
                ))}
              </div>

              {/* Mobile Navigation Button */}
              <div className="flex items-center space-x-4 md:hidden">
                <motion.button
                  className="text-gray-600"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden border-b transition-all duration-500 bg-white/95 border-gray-200 shadow-lg`}
              >
                <div className="container mx-auto py-4 space-y-4">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`block text-gray-600 hover:text-primary transition-colors ${
                        activeSection === item.href.slice(1) ? 'text-primary' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 10 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content & Routes */}
        <Routes>
          <Route path="/" element={
            <HomePageContent
              isMobile={isMobile}
              handleScroll={handleScroll}
              animationVariants={animationVariants}
              activeSection={activeSection}
              projectsData={projectsData}
            />
          } />
          <Route path="/projects/:projectId" element={<ProjectArticle projectsData={projectsData} />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <motion.div 
            className="container text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>&copy; {new Date().getFullYear()} Shirwac. All rights reserved.</p>
          </motion.div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
