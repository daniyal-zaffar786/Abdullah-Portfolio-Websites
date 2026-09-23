import { useState, useEffect, useRef, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu, X, ArrowRight, MessageCircle, CheckCircle,
  TrendingUp, Users, Globe, Award, Mail, Phone,
  Linkedin, ChevronDown, Zap, Target, BarChart3, Bot,
  Shield, Clock, FileText, Star, AlertCircle, Info, Search,
  Lightbulb, ChartNoAxesColumn, Crosshair, WalletCards, ClipboardList, Rocket, Sun, Moon
} from "lucide-react";

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PLATFORMS = ["Upwork", "Fiverr", "Freelancer.com", "Guru", "PeoplePerHour"];

const HERO_ROLES = [
  "Senior Staff Augmentation Specialist",
  "B2B Lead Generation Specialist",
  "Business Development Manager (BDM)",
  "Business Development Representative (BDR)",
  "Sales Development Representative (SDR)",
  "B2B Sales Specialist",
  "Lead Generation Specialist",
  "B2B Account Executive",
  "B2B Growth Specialist",
];

const HERO_TITLES = [
  "Want to 3X Your B2B or Upwork Revenue?",
  "Ready to 3X Your Current B2B Revenue?",
  "Turn Your B2B Business Into a 3X Revenue Engine",
  "3X Your B2B Revenue With a Smarter Growth Strategy",
  "Want More Revenue From Your B2B Business or Upwork Profile?",
  "From Current Revenue to 3X Growth, Let’s Build It",
  "Unlock 3X Revenue Growth for Your B2B Business",
  "3X Your Upwork Revenue With a Proven Growth System",
  "Scale Your B2B Business From Where You Are to 3X",
  "Is Your B2B Business Ready for 3X Revenue Growth?",
  "Stop Leaving Revenue on the Table, Target 3X Growth",
  "Build a Predictable 3X Revenue Pipeline",
  "Turn Your Upwork Profile Into a Revenue Generating Machine",
  "3X Your Client Acquisition. 3X Your Revenue Potential.",
  "Want to Go From Inconsistent Leads to 3X Revenue?",
  "What Would 3X Revenue Do for Your Business?",
  "Your Next 3X Revenue Growth Starts Here",
  "You Have the Skills. Let’s Build 3X the Revenue.",
  "From Profile Views to Clients. From Clients to 3X Revenue.",
  "Your Business Doesn’t Need More Effort, It Needs More Revenue.",
];

const WORLD_COUNTRIES = [
  { flag: "🇦🇫", name: "Afghanistan", code: "+93" },
  { flag: "🇦🇱", name: "Albania", code: "+355" },
  { flag: "🇩🇿", name: "Algeria", code: "+213" },
  { flag: "🇦🇩", name: "Andorra", code: "+376" },
  { flag: "🇦🇴", name: "Angola", code: "+244" },
  { flag: "🇦🇬", name: "Antigua and Barbuda", code: "+1-268" },
  { flag: "🇦🇷", name: "Argentina", code: "+54" },
  { flag: "🇦🇲", name: "Armenia", code: "+374" },
  { flag: "🇦🇺", name: "Australia", code: "+61" },
  { flag: "🇦🇹", name: "Austria", code: "+43" },
  { flag: "🇦🇿", name: "Azerbaijan", code: "+994" },
  { flag: "🇧🇸", name: "Bahamas", code: "+1-242" },
  { flag: "🇧🇭", name: "Bahrain", code: "+973" },
  { flag: "🇧🇩", name: "Bangladesh", code: "+880" },
  { flag: "🇧🇧", name: "Barbados", code: "+1-246" },
  { flag: "🇧🇾", name: "Belarus", code: "+375" },
  { flag: "🇧🇪", name: "Belgium", code: "+32" },
  { flag: "🇧🇿", name: "Belize", code: "+501" },
  { flag: "🇧🇯", name: "Benin", code: "+229" },
  { flag: "🇧🇹", name: "Bhutan", code: "+975" },
  { flag: "🇧🇴", name: "Bolivia", code: "+591" },
  { flag: "🇧🇦", name: "Bosnia and Herzegovina", code: "+387" },
  { flag: "🇧🇼", name: "Botswana", code: "+267" },
  { flag: "🇧🇷", name: "Brazil", code: "+55" },
  { flag: "🇧🇳", name: "Brunei", code: "+673" },
  { flag: "🇧🇬", name: "Bulgaria", code: "+359" },
  { flag: "🇧🇫", name: "Burkina Faso", code: "+226" },
  { flag: "🇧🇮", name: "Burundi", code: "+257" },
  { flag: "🇨🇻", name: "Cabo Verde", code: "+238" },
  { flag: "🇰🇭", name: "Cambodia", code: "+855" },
  { flag: "🇨🇲", name: "Cameroon", code: "+237" },
  { flag: "🇨🇦", name: "Canada", code: "+1" },
  { flag: "🇨🇫", name: "Central African Republic", code: "+236" },
  { flag: "🇹🇩", name: "Chad", code: "+235" },
  { flag: "🇨🇱", name: "Chile", code: "+56" },
  { flag: "🇨🇳", name: "China", code: "+86" },
  { flag: "🇨🇴", name: "Colombia", code: "+57" },
  { flag: "🇰🇲", name: "Comoros", code: "+269" },
  { flag: "🇨🇬", name: "Congo", code: "+242" },
  { flag: "🇨🇷", name: "Costa Rica", code: "+506" },
  { flag: "🇭🇷", name: "Croatia", code: "+385" },
  { flag: "🇨🇺", name: "Cuba", code: "+53" },
  { flag: "🇨🇾", name: "Cyprus", code: "+357" },
  { flag: "🇨🇿", name: "Czech Republic", code: "+420" },
  { flag: "🇩🇰", name: "Denmark", code: "+45" },
  { flag: "🇩🇯", name: "Djibouti", code: "+253" },
  { flag: "🇩🇴", name: "Dominican Republic", code: "+1-809" },
  { flag: "🇪🇨", name: "Ecuador", code: "+593" },
  { flag: "🇪🇬", name: "Egypt", code: "+20" },
  { flag: "🇸🇻", name: "El Salvador", code: "+503" },
  { flag: "🇬🇶", name: "Equatorial Guinea", code: "+240" },
  { flag: "🇪🇷", name: "Eritrea", code: "+291" },
  { flag: "🇪🇪", name: "Estonia", code: "+372" },
  { flag: "🇸🇿", name: "Eswatini", code: "+268" },
  { flag: "🇪🇹", name: "Ethiopia", code: "+251" },
  { flag: "🇫🇯", name: "Fiji", code: "+679" },
  { flag: "🇫🇮", name: "Finland", code: "+358" },
  { flag: "🇫🇷", name: "France", code: "+33" },
  { flag: "🇬🇦", name: "Gabon", code: "+241" },
  { flag: "🇬🇲", name: "Gambia", code: "+220" },
  { flag: "🇬🇪", name: "Georgia", code: "+995" },
  { flag: "🇩🇪", name: "Germany", code: "+49" },
  { flag: "🇬🇭", name: "Ghana", code: "+233" },
  { flag: "🇬🇷", name: "Greece", code: "+30" },
  { flag: "🇬🇩", name: "Grenada", code: "+1-473" },
  { flag: "🇬🇹", name: "Guatemala", code: "+502" },
  { flag: "🇬🇳", name: "Guinea", code: "+224" },
  { flag: "🇬🇼", name: "Guinea, Bissau", code: "+245" },
  { flag: "🇬🇾", name: "Guyana", code: "+592" },
  { flag: "🇭🇹", name: "Haiti", code: "+509" },
  { flag: "🇭🇳", name: "Honduras", code: "+504" },
  { flag: "🇭🇺", name: "Hungary", code: "+36" },
  { flag: "🇮🇸", name: "Iceland", code: "+354" },
  { flag: "🇮🇳", name: "India", code: "+91" },
  { flag: "🇮🇩", name: "Indonesia", code: "+62" },
  { flag: "🇮🇷", name: "Iran", code: "+98" },
  { flag: "🇮🇶", name: "Iraq", code: "+964" },
  { flag: "🇮🇪", name: "Ireland", code: "+353" },
  { flag: "🇮🇱", name: "Israel", code: "+972" },
  { flag: "🇮🇹", name: "Italy", code: "+39" },
  { flag: "🇯🇲", name: "Jamaica", code: "+1-876" },
  { flag: "🇯🇵", name: "Japan", code: "+81" },
  { flag: "🇯🇴", name: "Jordan", code: "+962" },
  { flag: "🇰🇿", name: "Kazakhstan", code: "+7" },
  { flag: "🇰🇪", name: "Kenya", code: "+254" },
  { flag: "🇰🇮", name: "Kiribati", code: "+686" },
  { flag: "🇽🇰", name: "Kosovo", code: "+383" },
  { flag: "🇰🇼", name: "Kuwait", code: "+965" },
  { flag: "🇰🇬", name: "Kyrgyzstan", code: "+996" },
  { flag: "🇱🇦", name: "Laos", code: "+856" },
  { flag: "🇱🇻", name: "Latvia", code: "+371" },
  { flag: "🇱🇧", name: "Lebanon", code: "+961" },
  { flag: "🇱🇸", name: "Lesotho", code: "+266" },
  { flag: "🇱🇷", name: "Liberia", code: "+231" },
  { flag: "🇱🇾", name: "Libya", code: "+218" },
  { flag: "🇱🇮", name: "Liechtenstein", code: "+423" },
  { flag: "🇱🇹", name: "Lithuania", code: "+370" },
  { flag: "🇱🇺", name: "Luxembourg", code: "+352" },
  { flag: "🇲🇬", name: "Madagascar", code: "+261" },
  { flag: "🇲🇼", name: "Malawi", code: "+265" },
  { flag: "🇲🇾", name: "Malaysia", code: "+60" },
  { flag: "🇲🇻", name: "Maldives", code: "+960" },
  { flag: "🇲🇱", name: "Mali", code: "+223" },
  { flag: "🇲🇹", name: "Malta", code: "+356" },
  { flag: "🇲🇭", name: "Marshall Islands", code: "+692" },
  { flag: "🇲🇷", name: "Mauritania", code: "+222" },
  { flag: "🇲🇺", name: "Mauritius", code: "+230" },
  { flag: "🇲🇽", name: "Mexico", code: "+52" },
  { flag: "🇫🇲", name: "Micronesia", code: "+691" },
  { flag: "🇲🇩", name: "Moldova", code: "+373" },
  { flag: "🇲🇨", name: "Monaco", code: "+377" },
  { flag: "🇲🇳", name: "Mongolia", code: "+976" },
  { flag: "🇲🇪", name: "Montenegro", code: "+382" },
  { flag: "🇲🇦", name: "Morocco", code: "+212" },
  { flag: "🇲🇿", name: "Mozambique", code: "+258" },
  { flag: "🇲🇲", name: "Myanmar", code: "+95" },
  { flag: "🇳🇦", name: "Namibia", code: "+264" },
  { flag: "🇳🇷", name: "Nauru", code: "+674" },
  { flag: "🇳🇵", name: "Nepal", code: "+977" },
  { flag: "🇳🇱", name: "Netherlands", code: "+31" },
  { flag: "🇳🇿", name: "New Zealand", code: "+64" },
  { flag: "🇳🇮", name: "Nicaragua", code: "+505" },
  { flag: "🇳🇪", name: "Niger", code: "+227" },
  { flag: "🇳🇬", name: "Nigeria", code: "+234" },
  { flag: "🇰🇵", name: "North Korea", code: "+850" },
  { flag: "🇲🇰", name: "North Macedonia", code: "+389" },
  { flag: "🇳🇴", name: "Norway", code: "+47" },
  { flag: "🇴🇲", name: "Oman", code: "+968" },
  { flag: "🇵🇰", name: "Pakistan", code: "+92" },
  { flag: "🇵🇼", name: "Palau", code: "+680" },
  { flag: "🇵🇸", name: "Palestine", code: "+970" },
  { flag: "🇵🇦", name: "Panama", code: "+507" },
  { flag: "🇵🇬", name: "Papua New Guinea", code: "+675" },
  { flag: "🇵🇾", name: "Paraguay", code: "+595" },
  { flag: "🇵🇪", name: "Peru", code: "+51" },
  { flag: "🇵🇭", name: "Philippines", code: "+63" },
  { flag: "🇵🇱", name: "Poland", code: "+48" },
  { flag: "🇵🇹", name: "Portugal", code: "+351" },
  { flag: "🇶🇦", name: "Qatar", code: "+974" },
  { flag: "🇷🇴", name: "Romania", code: "+40" },
  { flag: "🇷🇺", name: "Russia", code: "+7" },
  { flag: "🇷🇼", name: "Rwanda", code: "+250" },
  { flag: "🇰🇳", name: "Saint Kitts and Nevis", code: "+1-869" },
  { flag: "🇱🇨", name: "Saint Lucia", code: "+1-758" },
  { flag: "🇻🇨", name: "Saint Vincent", code: "+1-784" },
  { flag: "🇼🇸", name: "Samoa", code: "+685" },
  { flag: "🇸🇲", name: "San Marino", code: "+378" },
  { flag: "🇸🇹", name: "Sao Tome and Principe", code: "+239" },
  { flag: "🇸🇦", name: "Saudi Arabia", code: "+966" },
  { flag: "🇸🇳", name: "Senegal", code: "+221" },
  { flag: "🇷🇸", name: "Serbia", code: "+381" },
  { flag: "🇸🇨", name: "Seychelles", code: "+248" },
  { flag: "🇸🇱", name: "Sierra Leone", code: "+232" },
  { flag: "🇸🇬", name: "Singapore", code: "+65" },
  { flag: "🇸🇰", name: "Slovakia", code: "+421" },
  { flag: "🇸🇮", name: "Slovenia", code: "+386" },
  { flag: "🇸🇧", name: "Solomon Islands", code: "+677" },
  { flag: "🇸🇴", name: "Somalia", code: "+252" },
  { flag: "🇿🇦", name: "South Africa", code: "+27" },
  { flag: "🇰🇷", name: "South Korea", code: "+82" },
  { flag: "🇸🇸", name: "South Sudan", code: "+211" },
  { flag: "🇪🇸", name: "Spain", code: "+34" },
  { flag: "🇱🇰", name: "Sri Lanka", code: "+94" },
  { flag: "🇸🇩", name: "Sudan", code: "+249" },
  { flag: "🇸🇷", name: "Suriname", code: "+597" },
  { flag: "🇸🇪", name: "Sweden", code: "+46" },
  { flag: "🇨🇭", name: "Switzerland", code: "+41" },
  { flag: "🇸🇾", name: "Syria", code: "+963" },
  { flag: "🇹🇼", name: "Taiwan", code: "+886" },
  { flag: "🇹🇯", name: "Tajikistan", code: "+992" },
  { flag: "🇹🇿", name: "Tanzania", code: "+255" },
  { flag: "🇹🇭", name: "Thailand", code: "+66" },
  { flag: "🇹🇱", name: "Timor, Leste", code: "+670" },
  { flag: "🇹🇬", name: "Togo", code: "+228" },
  { flag: "🇹🇴", name: "Tonga", code: "+676" },
  { flag: "🇹🇹", name: "Trinidad and Tobago", code: "+1-868" },
  { flag: "🇹🇳", name: "Tunisia", code: "+216" },
  { flag: "🇹🇷", name: "Turkey", code: "+90" },
  { flag: "🇹🇲", name: "Turkmenistan", code: "+993" },
  { flag: "🇹🇻", name: "Tuvalu", code: "+688" },
  { flag: "🇺🇬", name: "Uganda", code: "+256" },
  { flag: "🇺🇦", name: "Ukraine", code: "+380" },
  { flag: "🇦🇪", name: "United Arab Emirates", code: "+971" },
  { flag: "🇬🇧", name: "United Kingdom", code: "+44" },
  { flag: "🇺🇸", name: "United States", code: "+1" },
  { flag: "🇺🇾", name: "Uruguay", code: "+598" },
  { flag: "🇺🇿", name: "Uzbekistan", code: "+998" },
  { flag: "🇻🇺", name: "Vanuatu", code: "+678" },
  { flag: "🇻🇦", name: "Vatican City", code: "+39" },
  { flag: "🇻🇪", name: "Venezuela", code: "+58" },
  { flag: "🇻🇳", name: "Vietnam", code: "+84" },
  { flag: "🇾🇪", name: "Yemen", code: "+967" },
  { flag: "🇿🇲", name: "Zambia", code: "+260" },
  { flag: "🇿🇼", name: "Zimbabwe", code: "+263" },
];

const PAIN_POINTS = [
  { num: "01", title: "I can help you win more qualified work", desc: "I can analyze your Upwork presence, sharpen your positioning, and build a proposal strategy that puts your expertise in front of better fit clients." },
  { num: "02", title: "I can help you scale without unnecessary overhead", desc: "I can source and coordinate pre vetted offshore professionals so you can expand delivery capacity without carrying the full cost and risk of local hiring." },
  { num: "03", title: "I can build a pipeline you can rely on", desc: "I can develop a practical business development system across LinkedIn, email, and freelance platforms so your next opportunity does not depend on referrals or luck." },
];

const WHO_I_SERVE_PAINS = [
  "I can help you scale offshore teams without sacrificing quality",
  "I can reduce the pressure of high local hiring costs",
  "I can help you access specialized technology talent faster",
  "I can give you flexible resources for changing project demands",
  "I can build a consistent lead and revenue pipeline",
  "I can optimize low conversion Upwork and Fiverr profiles",
];

const PERSONAS = [
  { role: "CTOs", desc: "I can help you build and manage the engineering capacity needed to execute your architecture roadmap across borders." },
  { role: "VPs of Engineering", desc: "I can add the right offshore resources at the right time so your team can hit delivery commitments with confidence." },
  { role: "IT Directors", desc: "I can help you coordinate flexible talent across multiple projects without creating unnecessary operational complexity." },
  { role: "Founders & CEOs", desc: "I can build a repeatable business development engine that gives you more control over your next stage of growth." },
];

const SERVICES = [
  { icon: <Users className="w-7 h-7" />, title: "Offshore Team Scaling & Staff Augmentation", desc: "I can source, vet, and coordinate IT professionals who fit your workflows and delivery standards. I can help you add capacity quickly while keeping quality, communication, and cost under control.", tag: "Staff Augmentation", video: "/animations/service-staff.mp4", poster: "/animations/service-staff.jpg", videoLabel: "Build delivery capacity" },
  { icon: <Target className="w-7 h-7" />, title: "Precision Lead Generation", desc: "I can build targeted B2B lead lists and outreach campaigns using LinkedIn Sales Navigator, Apollo.io, and ZoomInfo, then refine the messaging that turns cold prospects into qualified conversations.", tag: "Lead Generation", video: "/animations/service-growth.mp4", poster: "/animations/service-growth.jpg", videoLabel: "Create a qualified pipeline" },
  { icon: <TrendingUp className="w-7 h-7" />, title: "Upwork Profile & Platform Optimization", desc: "I can optimize your Upwork, Fiverr, Freelancer, Guru, and PeoplePerHour presence with stronger positioning, search friendly copy, focused proposals, and a bidding process designed to improve conversion.", tag: "Upwork Expert", video: "/animations/service-growth.mp4", poster: "/animations/service-growth.jpg", videoLabel: "Win better fit work" },
  { icon: <BarChart3 className="w-7 h-7" />, title: "Long Term Revenue Pipelines", desc: "I can develop a practical business development system across LinkedIn, email, and freelance platforms so you have a consistent flow of qualified opportunities instead of one off wins.", tag: "Sales Pipeline", video: "/animations/service-revenue.mp4", poster: "/animations/service-revenue.jpg", videoLabel: "Turn activity into revenue" },
  { icon: <Globe className="w-7 h-7" />, title: "Resource Outsourcing", desc: "I can design and coordinate outsourcing support for your IT operation, from individual specialists to complete offshore pods, matched to your project scope, timelines, and long term goals.", tag: "Outsourcing", video: "/animations/service-staff.mp4", poster: "/animations/service-staff.jpg", videoLabel: "Scale without overhead" },
  { icon: <Bot className="w-7 h-7" />, title: "AI Driven Sales Automation", desc: "I can develop practical workflows, chatbots, and multi channel sequences that keep your pipeline responsive and organized without requiring you to add another layer of headcount.", tag: "Sales Automation", video: "/animations/service-revenue.mp4", poster: "/animations/service-revenue.jpg", videoLabel: "Keep follow up moving" },
];

const ENGAGEMENT_STEPS = [
  { step: "01", title: "Diagnose the constraint", desc: "We identify the bottleneck in your pipeline, platform presence, or delivery capacity before adding more activity.", icon: <Search className="w-5 h-5" /> },
  { step: "02", title: "Build the right system", desc: "I shape the message, process, talent plan, and tools around the outcome you actually need.", icon: <Rocket className="w-5 h-5" /> },
  { step: "03", title: "Improve from evidence", desc: "We review the signals that matter, keep what works, and make the next decision with more confidence.", icon: <ChartNoAxesColumn className="w-5 h-5" /> },
];

const PRICING_PLANS = [
  {
    category: "Upwork, Platform Focused", name: "Starter", price: "Rs. 25,000",
    subtitle: "Upwork Profile, Lead Generation", commission: "35% Commission", popular: false, badge: null,
    desc: "I can give you a strong starting point on Upwork: a clearer profile, better positioning, and a focused process for attracting quality international clients.",
    features: [
      "I can set up and comprehensively optimize your Upwork profile",
      "I can position your profile around strategic, high intent keywords",
      "I can write a professional bio and service descriptions that convert",
      "I can structure your portfolio and present stronger case studies",
      "I can define a targeted job search and disciplined bid strategy",
      "I can review monthly performance and give you clear next actions",
    ],
  },
  {
    category: null, name: "Growth", price: "Rs. 50,000",
    subtitle: "Upwork Dominance, Multi Platform Presence", commission: "25% Commission", popular: true, badge: "Most Popular",
    desc: "I can help you strengthen your Upwork performance and build a credible, consistent presence across the global freelance platforms that matter to your business.",
    features: [
      "I can optimize and manage your Upwork profile in depth",
      "I can set up and align your Fiverr, Guru, PPH, and Freelancer profiles",
      "I can create proposal frameworks and improve bid quality",
      "I can target better job invites and strengthen client responses",
      "I can build a strategy to improve your Job Success Score",
      "I can analyze profile conversion and refine what is not working",
      "I can lead biweekly performance reviews and growth planning",
    ],
  },
  {
    category: null, name: "Scale", price: "Rs. 80,000",
    subtitle: "Platform Mastery, Campaign Optimization", commission: "20% Commission", popular: false, badge: null,
    desc: "I can give you a complete platform strategy to accelerate lead flow, improve win rates, and build a stronger presence across every major freelance marketplace.",
    features: [
      "I can optimize and manage your profiles across all five major platforms",
      "I can test proposal copy and outreach sequences against real responses",
      "I can analyze platform data and benchmark you against competitors",
      "I can plan your path toward Rising Talent and Top Rated status",
      "I can manage bids and track opportunities across platforms",
      "I can give you transparent, regularly updated performance reporting",
      "I can lead weekly strategy sessions and growth planning",
    ],
  },
  {
    category: "Upwork, Staff Augmentation, Email, LinkedIn", name: "Professional", price: "Rs. 120,000",
    subtitle: "Upwork, Email Marketing, LinkedIn Outreach", commission: "15% Commission", popular: false, badge: "Best for Mid Size Teams",
    desc: "I can combine platform growth with targeted LinkedIn outreach, professional email marketing, and the first layer of staff augmentation support.",
    features: [
      "I can deliver everything included in the Scale package",
      "I can optimize LinkedIn profiles and strengthen your personal brand",
      "I can set up Sales Navigator and targeted connection campaigns",
      "I can build cold email outreach with Instantly.ai and Mailchimp",
      "I can build curated lead lists using ZoomInfo",
      "I can set up and manage your HubSpot or Salesforce pipeline",
      "I can lead focused biweekly executive strategy sessions",
      "I can provide direct account management and proactive communication",
    ],
  },
  {
    category: null, name: "Enterprise", price: "Rs. 175,000",
    subtitle: "B2B Lead Generation, Client Acquisition, Staff Augmentation", commission: "12% Commission", popular: false, badge: null,
    desc: "I can build a complete, ICP driven B2B lead generation and client acquisition strategy, focused on finding companies with genuine hiring and development needs, not simple lead scraping or contact list building.",
    features: [
      "I can deliver everything included in the Professional package",
      "I can define ICPs by industry, company size, location, tech stack, growth, and hiring needs",
      "I can conduct market research, competitor research, and ICP based gap analysis to identify talent shortages, project demands, high hiring costs, and skill gaps",
      "I can identify hiring signals, especially companies hiring 5 or more technical resources, and position staff augmentation or dedicated teams as the solution",
      "I can research companies and extract decision makers with verified contact information using LinkedIn Sales Navigator, Apollo.io, ZoomInfo, Wellfound, and SignalHire",
      "I can target CTOs, CEOs, VPs, Heads of Engineering, HR and Talent leaders, and other relevant decision makers",
      "I can identify IT agencies and software companies for white label development, subcontracting, and dedicated team partnerships",
      "I can build qualified prospect lists and execute multi channel outreach through LinkedIn, email, follow ups, and calls",
      "I can personalize outreach around each company’s specific hiring signals, business gaps, and resource requirements",
      "I can manage follow ups, qualify prospects, and convert opportunities into sales meetings and long term B2B clients",
      "I can leverage existing client expansion, referrals, and introductions to generate additional opportunities",
      "Core B2B Acquisition Framework: ICP, Market Research, Gap Analysis, Hiring Signal, Decision Maker, Personalized Outreach, Follow up, Meeting, Conversion",
    ],
  },
  {
    category: "Best for Enterprise Teams", name: "Elite", price: "Rs. 245,000",
    subtitle: "Complete B2B Acquisition, Growth Partnership, Full Outsourcing", commission: "6% Commission", popular: false, badge: null,
    desc: "I can act as your embedded senior business development partner, leading a complete, ICP driven B2B lead generation and client acquisition system focused on genuine hiring and development needs.",
    features: [
      "I can deliver everything included in the Enterprise package",
      "I can define ICPs by industry, company size, location, tech stack, growth, and hiring needs",
      "I can conduct market research, competitor research, and ICP based gap analysis to identify talent shortages, project demands, high hiring costs, and skill gaps",
      "I can identify hiring signals, especially companies hiring 5 or more technical resources, and position staff augmentation or dedicated teams as the solution",
      "I can research companies and extract decision makers with verified contact information using LinkedIn Sales Navigator, Apollo.io, ZoomInfo, Wellfound, and SignalHire",
      "I can target CTOs, CEOs, VPs, Heads of Engineering, HR and Talent leaders, and other relevant decision makers",
      "I can identify IT agencies and software companies for white label development, subcontracting, and dedicated team partnerships",
      "I can build qualified prospect lists and execute multi channel outreach through LinkedIn, email, follow ups, and calls",
      "I can personalize outreach around each company’s specific hiring signals, business gaps, and resource requirements",
      "I can manage follow ups, qualify prospects, and convert opportunities into sales meetings and long term B2B clients",
      "I can leverage existing client expansion, referrals, and introductions to generate additional opportunities",
      "Core B2B Acquisition Framework: ICP, Market Research, Gap Analysis, Hiring Signal, Decision Maker, Personalized Outreach, Follow up, Meeting, Conversion",
      "I can build, lead, and manage your complete BD function",
      "I can manage staff augmentation from sourcing through retention",
      "I can oversee outsourcing from single hires to full delivery pods",
      "I can support executive deal negotiation and strategic closing",
      "I can plan long term talent retention and team culture systems",
      "I can develop custom AI chatbots and advanced workflows",
      "I can provide priority support for time sensitive growth needs",
      "I can lead quarterly executive reviews and forward strategy",
      "I can help you adopt new platforms, tools, and proven methods early",
    ],
  },
];

const TOOL_STACKS = [
  { category: "Lead Generation", tools: "LinkedIn Sales Navigator, ZoomInfo, Apollo.io, Skrapp.io, ContactOut, SignalHire, Snov.io" },
  { category: "Email & Outreach", tools: "Instantly.ai, Mailchimp, ZeroBounce" },
  { category: "CRM & Sales Operations", tools: "Salesforce, HubSpot" },
  { category: "Automation & AI", tools: "AI driven workflows, chatbots, and automated outreach sequences" },
];

const FOOTER_PLATFORM_GROUPS = [
  {
    label: "Research & ICP",
    platforms: [
      { name: "LinkedIn Sales Navigator", href: "https://www.linkedin.com/sales/navigator/" },
      { name: "LinkedIn Jobs", href: "https://www.linkedin.com/jobs/" },
      { name: "Apollo", href: "https://www.apollo.io/" },
      { name: "ZoomInfo", href: "https://www.zoominfo.com/" },
      { name: "Crunchbase", href: "https://www.crunchbase.com/" },
      { name: "Clutch", href: "https://clutch.co/" },
      { name: "Clay", href: "https://www.clay.com/" },
      { name: "BuiltWith", href: "https://builtwith.com/" },
    ],
  },
  {
    label: "Data & Contact Discovery",
    platforms: [
      { name: "Wellfound", href: "https://wellfound.com/" },
      { name: "Clearbit", href: "https://clearbit.com/" },
      { name: "Seamless.AI", href: "https://seamless.ai/" },
      { name: "LeadIQ", href: "https://leadiq.com/" },
      { name: "UpLead", href: "https://www.uplead.com/" },
      { name: "Hunter", href: "https://hunter.io/" },
      { name: "Snov.io", href: "https://snov.io/" },
      { name: "ContactOut", href: "https://contactout.com/" },
      { name: "SignalHire", href: "https://www.signalhire.com/" },
      { name: "Kaspr", href: "https://kaspr.io/" },
      { name: "SalesQL", href: "https://salesql.com/" },
    ],
  },
  {
    label: "Outreach & Follow Up",
    platforms: [
      { name: "Instantly", href: "https://instantly.ai/" },
      { name: "Smartlead", href: "https://smartlead.ai/" },
      { name: "Lemlist", href: "https://www.lemlist.com/" },
      { name: "Reply.io", href: "https://reply.io/" },
      { name: "HubSpot", href: "https://www.hubspot.com/" },
      { name: "Salesforce", href: "https://www.salesforce.com/" },
    ],
  },
  {
    label: "Talent & Remote",
    platforms: [
      { name: "We Work Remotely (WWR)", href: "https://weworkremotely.com/" },
      { name: "Remote OK", href: "https://remoteok.com/" },
      { name: "FlexJobs", href: "https://www.flexjobs.com/" },
      { name: "Upwork", href: "https://www.upwork.com/" },
      { name: "Fiverr", href: "https://www.fiverr.com/" },
      { name: "Freelancer.com", href: "https://www.freelancer.com/" },
      { name: "Guru", href: "https://www.guru.com/" },
      { name: "PeoplePerHour", href: "https://www.peopleperhour.com/" },
    ],
  },
];

const WHY_ME = [
  { icon: <Zap className="w-5 h-5" />, title: "I move quickly", desc: "I can help you integrate the right offshore professionals in 2 to 4 weeks, not months." },
  { icon: <Shield className="w-5 h-5" />, title: "I protect quality", desc: "I only introduce qualified, carefully screened professionals who fit your requirements." },
  { icon: <Globe className="w-5 h-5" />, title: "I work globally", desc: "I can support clients across time zones, markets, and technology sectors." },
  { icon: <Award className="w-5 h-5" />, title: "I bring experience", desc: "I bring 8+ years of business development experience and a focus on measurable outcomes." },
];

const FAQS = [
  { q: "How quickly can you deploy offshore teams?", a: "I can usually introduce pre vetted professionals within 2 to 4 weeks, depending on the roles, volume, geography, and onboarding requirements." },
  { q: "Which clients can you help most?", a: "I work best with IT and software companies that want stronger platform performance, a more predictable pipeline, or flexible offshore delivery capacity." },
  { q: "How do you calculate commission?", a: "Where a package includes commission, I apply it only to net new revenue directly generated through our engagement, not to your existing accounts or self sourced deals." },
  { q: "Can I upgrade as my business grows?", a: "Yes. I can start with the most relevant engagement for your current stage and expand the scope as your pipeline, team, and goals develop." },
  { q: "What happens if I do not see results?", a: "I set clear deliverables and review progress with you regularly. My work is designed around measurable improvement, and I will adjust the strategy when the data shows something is not working." },
];

const BEFORE_CONTACT = [
  { icon: Lightbulb, title: "Tell me where you want to grow", desc: "I can use our first conversation more effectively when I understand your target market, preferred services, and the kind of clients you want to win." },
  { icon: ChartNoAxesColumn, title: "Share your current baseline", desc: "If you already have an Upwork or LinkedIn presence, I can analyze your current profile, performance, earnings, active contracts, and outreach results." },
  { icon: Crosshair, title: "Define your ideal client", desc: "When you tell me the industry, company size, geography, and project type you want to target, I can build a more focused strategy from the first call." },
  { icon: WalletCards, title: "Be ready to invest in the right system", desc: "I can build a real pipeline, but consistent results require commitment to the right tools, positioning, outreach, and follow through." },
  { icon: ClipboardList, title: "Prepare a short company brief", desc: "A few lines about your services, technology, average project size, and past clients help me understand your business and recommend the fastest path forward." },
];

/* ─── ANIMATIONS ─── */
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
};
const slideLeft: any = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const slideRight: any = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1, ease: "backOut" } }),
};
const staggerContainer: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── PERFORMANCE-SAFE VIDEO LAYER ─── */
function AmbientVideo({
  src,
  poster,
  className = "",
  eager = false,
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: false, margin: "240px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldLoad = eager || isInView;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (isInView || eager) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [eager, isInView, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={`ambient-video ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      autoPlay={!prefersReducedMotion}
      loop
      muted
      playsInline
      preload={eager ? "auto" : "none"}
      poster={poster}
      {...(shouldLoad ? { src } : {})}
    />
  );
}

/* ─── SQUIGGLY UNDERLINE ─── */
function SquiggleUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none"
        className="absolute -bottom-2 left-0 w-full" style={{ height: "10px" }}>
        <motion.path
          d="M2,6 C20,1 40,11 60,6 C80,1 100,11 120,6 C140,1 160,11 180,6 C190,3 196,7 198,6"
          fill="none" stroke="#F5C518" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </span>
  );
}

/* ─── ANIMATED HEXAGON MIND MAP ─── */
function HexMindMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const nodes = [
    { x: -200, y: -110, icon: <Target className="w-4 h-4" />, label: "Target Market", sub: null, side: "left" },
    { x: -210, y: 10, icon: <FileText className="w-4 h-4" />, label: "Proposal Strategy", sub: null, side: "left" },
    { x: -195, y: 130, icon: <MessageCircle className="w-4 h-4" />, label: "Client Follow Up", sub: null, side: "left" },
    { x: 200, y: -110, icon: <Users className="w-4 h-4" />, label: "Qualified Prospect", sub: "● Ready", subColor: "#22c55e", side: "right" },
    { x: 210, y: 10, icon: <TrendingUp className="w-4 h-4" />, label: "New Opportunity", sub: "● In Progress", subColor: "#22c55e", side: "right" },
    { x: 195, y: 130, icon: <Clock className="w-4 h-4" />, label: "Fast Response", sub: "● Managed", subColor: "#22c55e", side: "right" },
  ];

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ height: 340 }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="lineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#318B43" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#318B43" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        {nodes.map((node, i) => (
          <motion.line key={i}
            x1="50%" y1="50%"
            x2={`calc(50% + ${node.x}px)`} y2={`calc(50% + ${node.y}px)`}
            stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Center hexagon */}
      <motion.div className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0, rotate: -30 }} animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, ease: "backOut" }}>
        <motion.div className="absolute inset-0 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #318B43 0%, transparent 70%)", width: 100, height: 100, margin: "auto" }}
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <svg width="68" height="68" viewBox="0 0 68 68">
          <motion.path
            d="M34 4 L60 19 L60 49 L34 64 L8 49 L8 19 Z"
            fill="none" stroke="#318B43" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4"
            animate={{ rotate: 360 }} style={{ transformOrigin: "34px 34px" }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <path d="M34 10 L56 23 L56 45 L34 58 L12 45 L12 23 Z" fill="#318B43" opacity="0.12" />
          <path d="M34 16 L52 27 L52 41 L34 52 L16 41 L16 27 Z" fill="#318B43" opacity="0.9" />
          <text x="34" y="38" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Poppins, sans-serif">AMS</text>
        </svg>
      </motion.div>

      {/* Floating nodes */}
      {nodes.map((node, i) => (
        <motion.div key={i}
          className="absolute flex items-center gap-2.5 px-3 py-2.5 rounded-xl shadow-md border"
          style={{
            left: `calc(50% + ${node.x}px)`,
            top: `calc(50% + ${node.y}px)`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            borderColor: "#e0e8d0",
            minWidth: "148px",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.12, ease: "backOut" }}
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(49,139,67,0.14)", borderColor: "#318B43" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#e8f5eb", color: "#034751" }}>
            {node.icon}
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: "#034751" }}>{node.label}</div>
            {node.sub && <div className="text-xs mt-0.5 font-medium" style={{ color: node.subColor }}>{node.sub}</div>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── COUNTER ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── FAQ ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="border rounded-xl overflow-hidden cursor-pointer"
      style={{ borderColor: "#d0e8d3" }} onClick={() => setOpen(!open)}
      whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <div className="flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: open ? "#e8f5eb" : "#ffffff" }}>
        <span className="font-semibold text-sm pr-4" style={{ color: "#034751" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: "#318B43" }} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="px-6 pb-4" style={{ backgroundColor: "#f8fffe" }}>
            <p className="text-sm leading-relaxed pt-2" style={{ color: "#4a6b70" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── PHONE FIELD ─── */
function PhoneField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [dialCode, setDialCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const selected = WORLD_COUNTRIES.find(c => c.code === dialCode) || WORLD_COUNTRIES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { onChange(phone ? `${dialCode} ${phone}` : ""); }, [dialCode, phone]);
  useEffect(() => {
    if (!value) setPhone("");
  }, [value]);

  const filtered = WORLD_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  return (
    <div className="flex gap-0 relative" ref={dropRef}>
      <button type="button"
        className="flex items-center gap-1.5 px-3 py-3 rounded-l-lg text-sm border flex-shrink-0 hover:bg-gray-50 transition-colors"
        style={{ border: "1.5px solid #d0e8d3", borderRight: "none", color: "#034751", backgroundColor: "#f8fffe", minWidth: "100px" }}
        onClick={() => setShowDropdown(!showDropdown)}>
        <Globe className="w-4 h-4" style={{ color: "#318B43" }} />
        <span className="font-medium text-xs">{dialCode}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      <input id="contact-phone" name="phone" autoComplete="tel" type="tel" placeholder="Phone number" value={phone}
        onChange={e => {
          const cleaned = e.target.value.replace(/[^\d\s\-\+\(\)]/g, "");
          setPhone(cleaned);
        }}
        onKeyDown={e => {
          if (!/[\d\s\-\+\(\)\b]/.test(e.key) && !["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        inputMode="tel"
        className="flex-1 px-4 py-3 rounded-r-lg text-sm outline-none"
        style={{ border: "1.5px solid #d0e8d3", borderLeft: "1px solid #d0e8d3", color: "#034751", backgroundColor: "#f8fffe" }}
        onFocus={e => { e.target.style.borderColor = "#318B43"; }}
        onBlur={e => { e.target.style.borderColor = "#d0e8d3"; }} />
      <AnimatePresence>
        {showDropdown && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.18 }}
            className="absolute top-full left-0 z-50 mt-1 rounded-xl shadow-xl border overflow-hidden"
            style={{ backgroundColor: "#fff", borderColor: "#d0e8d3", width: "260px" }}>
            <div className="p-2 border-b" style={{ borderColor: "#e0f0e3" }}>
              <input type="text" placeholder="Search country..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ border: "1px solid #d0e8d3", backgroundColor: "#f8fffe", color: "#034751" }}
                autoFocus />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.map(c => (
                <button key={`${c.code}-${c.name}`} type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-green-50 transition-colors"
                  style={{ color: "#034751" }}
                  onClick={() => { setDialCode(c.code); setShowDropdown(false); setSearch(""); }}>
                  <Globe className="w-4 h-4 flex-shrink-0" style={{ color: "#318B43" }} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="opacity-60 ml-auto">{c.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── COUNTRY FIELD ─── */
function CountryField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = WORLD_COUNTRIES.find(c => c.name === value) || null;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (showDropdown && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [showDropdown]);

  const filtered = WORLD_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  return (
    <div className="relative" ref={dropRef}>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-left transition-colors hover:bg-[#f0faf2]"
        style={{
          border: `1.5px solid ${showDropdown ? "#318B43" : "#d0e8d3"}`,
          backgroundColor: "#f8fffe",
          color: selected ? "#034751" : "#848484",
        }}
      >
        {selected ? (
          <>
            <span className="text-lg leading-none">{selected.flag}</span>
            <span className="flex-1 font-medium truncate">{selected.name}</span>
            <span className="text-xs opacity-60 flex-shrink-0">{selected.code}</span>
          </>
        ) : (
          <span className="flex-1">Select your country</span>
        )}
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 opacity-60"
          style={{ transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl shadow-2xl border overflow-hidden"
            style={{ backgroundColor: "#fff", borderColor: "#d0e8d3" }}
          >
            {/* Search */}
            <div className="p-2 border-b" style={{ borderColor: "#e8f5eb", backgroundColor: "#f8fffe" }}>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" aria-hidden="true" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search country or dial code..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg text-xs outline-none"
                  style={{ border: "1px solid #d0e8d3", backgroundColor: "#ffffff", color: "#034751" }}
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs" style={{ color: "#848484" }}>
                  No countries found
                </div>
              ) : (
                filtered.map(c => (
                  <button
                    key={`${c.name}-${c.code}`}
                    type="button"
                    onClick={() => { onChange(c.name); setShowDropdown(false); setSearch(""); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs transition-colors hover:bg-green-50 active:bg-green-100"
                    style={{
                      backgroundColor: value === c.name ? "#edfaf0" : "transparent",
                      color: "#034751",
                    }}
                  >
                    <span className="text-base leading-none flex-shrink-0">{c.flag}</span>
                    <span className="flex-1 font-medium truncate">{c.name}</span>
                    <span
                      className="flex-shrink-0 font-mono text-[11px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}
                    >
                      {c.code}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── SCROLL PROGRESS ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left"
      style={{ scaleX: scrollYProgress, backgroundColor: "#318B43" }} />
  );
}

/* ─── WAVE ─── */
function WaveDivider({ topColor = "#ffffff", bottomColor = "#f0faf2", flip = false }: { topColor?: string; bottomColor?: string; flip?: boolean }) {
  return (
    <div className="relative h-10 overflow-hidden -mb-1" style={{ backgroundColor: topColor }}>
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-10"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}>
        <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}

/* ─── MAIN ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = window.localStorage.getItem("abdullah-portfolio-theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const [heroTitleIndex, setHeroTitleIndex] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", company: "", email: "", phone: "", message: "" });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 2)
      errors.fullName = "Full name is required (min 2 characters).";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (!formData.message || formData.message.trim().length < 10)
      errors.message = "Message is required (min 10 characters).";
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormStatus("loading");
    const subject = `Strategy conversation request from ${formData.fullName.trim()}`;
    const body = [
      `Name: ${formData.fullName.trim()}`,
      `Company: ${formData.company.trim() || "Not provided"}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim() || "Not provided"}`,
      `Country: ${selectedCountry || "Not provided"}`,
      "",
      formData.message.trim(),
    ].join("\n");
    const mailto = `mailto:abdullahmasghar1995@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.open(mailto, "_blank", "noopener,noreferrer");
      setFormStatus("success");
      setFormData({ fullName: "", company: "", email: "", phone: "", message: "" });
      setSelectedCountry("");
    } catch (err) {
      setFormStatus("error");
      setFormErrorMsg(err instanceof Error ? err.message : "Could not open your email app. Please use WhatsApp.");
    }
  };
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.dataset.theme = theme;
    try {
      window.localStorage.setItem("abdullah-portfolio-theme", theme);
    } catch {
      // Theme still works when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroRoleIndex(index => (index + 1) % HERO_ROLES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroTitleIndex(index => (index + 1) % HERO_TITLES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className={`site-shell min-h-screen ${theme === "dark" ? "dark-mode" : "light-mode"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      <ScrollProgress />

      {/* WHATSAPP */}
      <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
        aria-label="Open WhatsApp chat" title="Open WhatsApp chat"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 no-underline"
        whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(37,211,102,0.4)" }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
        <img src="/whatsapp-icon.png" alt="" className="w-14 h-14 object-contain" />
      </motion.a>

      {/* ── NAVBAR (hexaa.ai style) ── */}
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
         style={{
           backgroundColor: scrolled ? "#ffffff" : "rgba(248,255,254,0.72)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 1px 24px rgba(3,71,81,0.08)" : "none",
          borderBottom: scrolled ? "1px solid rgba(49,139,67,0.10)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo("#home"); }}
            className="hidden lg:flex items-center gap-2.5 no-underline min-w-40">
            <img src="/logo.png" alt="AMA Logo" className="w-9 h-9 object-contain" />
            <span className="text-lg font-bold" style={{ color: "#034751" }}>
              abdullah<span style={{ color: "#318B43" }}>.</span>
            </span>
          </a>

          {/* Centered nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.a key={link.href} href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                className="px-4 py-2 rounded-lg text-sm font-medium no-underline relative"
                style={{ color: activeSection === link.href.replace("#", "") ? "#318B43" : "#4a6b70" }}
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                whileHover={{ color: "#318B43" }}>
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#318B43", transform: "translateX(-50%)" }} />
                )}
              </motion.a>
            ))}
          </div>

          {/* Theme + CTA */}
          <div className="hidden lg:flex items-center justify-end gap-2 min-w-40">
            <motion.button
              type="button"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              onClick={() => setTheme(current => current === "light" ? "dark" : "light")}
              className="w-10 h-10 rounded-full flex items-center justify-center border"
              style={{ color: "#318B43", backgroundColor: "rgba(49,139,67,0.08)", borderColor: "#d0e8d3" }}
              whileHover={{ scale: 1.08, rotate: 12 }}
              whileTap={{ scale: 0.92 }}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </motion.button>
            <motion.a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white no-underline"
              style={{ backgroundColor: "#318B43", borderRadius: "50px" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.04, backgroundColor: "#276e35", boxShadow: "0 4px 20px rgba(49,139,67,0.35)" }}
              whileTap={{ scale: 0.97 }}>
              Let's Talk <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="lg:hidden ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              onClick={() => setTheme(current => current === "light" ? "dark" : "light")}
              className="p-2 rounded-full"
              style={{ color: "#318B43" }}>
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className="p-2" style={{ color: "#034751" }} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t px-4 pb-4 pt-2 overflow-hidden"
              style={{ backgroundColor: "#ffffff", borderColor: "#e0f0e3" }}>
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  className="block px-4 py-3 text-sm font-medium rounded-lg mb-1 no-underline" style={{ color: "#034751" }}>
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
                className="block w-full mt-2 px-4 py-3 text-sm font-semibold text-center text-white rounded-full no-underline"
                style={{ backgroundColor: "#318B43" }}>Let's Talk →</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef}
        className="min-h-screen flex items-center pt-16 relative overflow-hidden"
         style={{ minHeight: "clamp(700px, 100svh, 1080px)", background: "linear-gradient(135deg, #f8fffe 0%, #edfaf0 48%, #e8f4ff 100%)" }}>
        <AmbientVideo
          src="/animations/hero-network.mp4"
          poster="/animations/hero-network.jpg"
          eager
          className="hero-ambient-video absolute inset-0 h-full w-full object-cover"
          label="Subtle animated network background"
        />
        <div className="hero-ambient-scrim absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[{ size: 500, x: "68%", y: "8%", color: "rgba(49,139,67,0.07)", dur: 8 },
            { size: 350, x: "8%", y: "58%", color: "rgba(37,117,252,0.06)", dur: 11 },
            { size: 220, x: "82%", y: "72%", color: "rgba(3,71,81,0.05)", dur: 9 }].map((orb, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, backgroundColor: orb.color, filter: "blur(60px)" }}
              animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14 lg:py-20 w-full relative z-10">
          {/* Mobile: stacked; tablet and desktop: side-by-side */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 items-center gap-6">

            {/* ── LEFT: Text content ── */}
            <div className="w-full text-center md:text-left order-1 md:order-1">
              {/* Slug badge */}
              <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold"
                  style={{ backgroundColor: "#034751", color: "#ffffff" }}>
                  <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#6ee893" }} />
                    B2B Growth & Talent Partner
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#e8f5eb", color: "#318B43", border: "1px solid #c3e6cb" }}>
                  <Globe className="w-3 h-3" /> Available Worldwide
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 min-h-[10rem] sm:min-h-[9rem] md:min-h-[10rem] lg:min-h-[13rem] flex items-center"
                style={{ color: "#034751" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={HERO_TITLES[heroTitleIndex]}
                    className="block w-full"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}>
                    {HERO_TITLES[heroTitleIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.h1>

              <div className="min-h-8 sm:min-h-10 mb-3 sm:mb-4 flex justify-center md:justify-start items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={HERO_ROLES[heroRoleIndex]}
                    initial={false}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(5px)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-sm sm:text-lg font-semibold text-center md:text-left"
                    style={{ color: "#318B43" }}>
                    {HERO_ROLES[heroRoleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.p initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                className="text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-5 text-center md:text-left"
                style={{ color: "#318B43" }}>
                Strategy, systems, and execution for B2B growth, qualified pipeline, and senior tech talent.
              </motion.p>

              <motion.p initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0" style={{ color: "#4a6b70" }}>
                I help IT and software companies find qualified B2B conversations, win better clients, and build flexible senior technical teams through <strong style={{ color: "#318B43" }}>staff augmentation</strong>.
              </motion.p>

              <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 mb-6 sm:mb-8">
                <motion.a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white no-underline w-full sm:w-auto"
                  style={{ backgroundColor: "#318B43", borderRadius: "50px" }}
                  whileHover={{ scale: 1.04, backgroundColor: "#276e35", boxShadow: "0 8px 24px rgba(49,139,67,0.35)" }}
                  whileTap={{ scale: 0.97 }}>
                   Let's Talk <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white no-underline w-full sm:w-auto"
                  style={{ backgroundColor: "#276e35", borderRadius: "50px" }}
                  whileHover={{ scale: 1.04, backgroundColor: "#1e5529", boxShadow: "0 8px 24px rgba(49,139,67,0.35)" }}
                  whileTap={{ scale: 0.97 }}>
                  <MessageCircle className="w-4 h-4" /> WhatsApp Now
                </motion.a>
              </motion.div>

              <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                className="hidden sm:flex flex-wrap justify-center md:justify-start gap-2">
                {PLATFORMS.map((p, i) => (
                  <motion.span key={p} className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full"
                    style={{ border: "1px solid #d0e8d3", color: "#034751", backgroundColor: "#f8fffe" }}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.07 }}
                    whileHover={{ scale: 1.07, backgroundColor: "#e8f5eb" }}>
                    {p}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo + Stats ── */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }}
              className="flex flex-col items-center gap-6 w-full order-2 md:order-2">

              {/* Photo */}
              <motion.div initial={{ opacity: 0, scale: 0.85, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }} className="relative">
                <motion.div className="absolute -inset-2 rounded-full opacity-30"
                  style={{ background: "conic-gradient(from 0deg, #318B43, #2575FC, #034751, #318B43)" }}
                  animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                <div className="w-32 h-32 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 relative z-10"
                  style={{ borderColor: "#318B43", boxShadow: "0 20px 60px rgba(49,139,67,0.25)" }}>
                  <img src="/abdullah-profile.jpg" alt="Abdullah M. Asghar, Upwork Expert and BD Leader" className="w-full h-full object-cover object-top" />
                </div>
                <motion.div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white whitespace-nowrap z-10"
                  style={{ backgroundColor: "#318B43" }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  8+ Years on Upwork
                </motion.div>
              </motion.div>

              {/* Stats */}
                <div className="hidden sm:grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm mt-4 sm:mt-6">
                {[{ value: 8, suffix: "+", label: "Years on Upwork" }, { value: 5, suffix: "+", label: "Years Leading B2B Sales" },
                  { value: 196, suffix: "+", label: "Professionals Supported" }, { value: 5, suffix: "", label: "Global Platforms" }].map((stat, i) => (
                  <motion.div key={stat.label} className="rounded-xl p-3 sm:p-4 text-center border"
                    style={{ backgroundColor: "#ffffff", borderColor: "#d0e8d3", boxShadow: "0 2px 12px rgba(49,139,67,0.08)" }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(49,139,67,0.14)" }}>
                    <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: "#318B43" }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs font-medium leading-tight" style={{ color: "#034751" }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Worldwide badge */}
                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 sm:mt-14 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#318B43" }}>
              I Support IT Companies Worldwide
            </p>
            <p className="text-xs sm:text-sm" style={{ color: "#4a6b70" }}>I can work across time zones, industries, and geographies.</p>
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <div className="py-4 overflow-hidden" style={{ backgroundColor: "#034751" }}>
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[...Array(5)].flatMap(() => ["I can optimize Upwork", "I can generate leads", "I can scale teams", "I can build LinkedIn outreach", "I can coordinate outsourcing", "I can automate sales", "I can strengthen B2B growth", "I work worldwide"]).map((p, i) => (
            <span key={i} className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>✦ {p}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>

      <WaveDivider topColor="#034751" bottomColor="#ffffff" />

       {/* ── GROWTH PARTNER ── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
                style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>A Better Growth Question</span>
              <h2 className="text-4xl font-bold mb-6 leading-snug" style={{ color: "#034751" }}>
                Is Your Growth Still Depending on{" "}
                <SquiggleUnderline><span style={{ color: "#318B43" }}>Referrals Alone?</span></SquiggleUnderline>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#4a6b70" }}>
                You may already have strong delivery capability, a capable team, and a service clients need. The challenge is building a reliable path from that capability to the right opportunities.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#4a6b70" }}>
                I can help you turn your expertise into a clearer market position, a stronger sales process, and a pipeline that reaches decision-makers who are ready to buy.
              </p>
              <p className="text-base leading-relaxed mb-8 font-medium" style={{ color: "#034751" }}>
                My role is to give you the strategy, systems, and execution support to make growth more predictable while you stay focused on delivering excellent client work.
              </p>
              <motion.a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white no-underline"
                style={{ backgroundColor: "#318B43", borderRadius: "50px" }}
                whileHover={{ scale: 1.04, backgroundColor: "#276e35" }} whileTap={{ scale: 0.97 }}>
                 Build Your Growth Plan <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <div className="space-y-4">
                {[
                   { icon: "01", title: "I can clarify your market position", desc: "I can help you present your services in a way that makes your expertise easier for international buyers to understand and trust." },
                   { icon: "02", title: "I can create a stronger route to revenue", desc: "I can combine platform optimization, targeted outreach, and better follow up so your team has more than one way to create qualified conversations." },
                   { icon: "03", title: "I can make your growth process repeatable", desc: "I can turn scattered business development activity into a practical system with clear priorities, ownership, and measurable progress." },
                   { icon: "04", title: "I can help you reach global clients", desc: "I can connect your strengths to the platforms, markets, and decision-makers most relevant to your next stage of growth." },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    className="flex gap-4 p-4 rounded-xl border"
                    style={{ backgroundColor: "#f8fffe", borderColor: "#d0e8d3" }}
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -3, borderColor: "#318B43", boxShadow: "0 6px 20px rgba(49,139,67,0.10)" }}>
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm mb-1" style={{ color: "#034751" }}>{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "#4a6b70" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider topColor="#ffffff" bottomColor="#f0f4ff" flip />

      {/* ── THE REALITY ── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #f8fffe 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>Where I Create Value</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              I Can Help You{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>Scale With Confidence.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: "#4a6b70" }}>
              I can help you compete for better opportunities with a stronger market position, a more disciplined outreach process, and access to offshore talent that supports delivery.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {PAIN_POINTS.map((p, i) => (
              <motion.div key={p.num} variants={scaleIn} custom={i}
                className="rounded-2xl p-6 border group"
                style={{ borderColor: "#d0e8d3", backgroundColor: "#ffffff" }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(49,139,67,0.12)", borderColor: "#318B43" }}>
                <div className="text-5xl font-black mb-4" style={{ color: "rgba(49,139,67,0.12)" }}>{p.num}</div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "#034751" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6b70" }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#f8fffe" bottomColor="#f5f0ff" />

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fafffe 0%, #f5f0ff 100%)" }}>
        <AmbientVideo
          src="/animations/services-wave.mp4"
          poster="/animations/services-wave.jpg"
          className="services-ambient-video absolute inset-0 h-full w-full object-cover"
          label="Subtle animated flow background for the services section"
        />
        <div className="services-ambient-scrim absolute inset-0 pointer-events-none" />
        <div className="services-orbit-field absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.span key={i} animate={{ rotate: i % 2 ? -360 : 360 }}
              transition={{ duration: 24 + i * 3, repeat: Infinity, ease: "linear" }}
              style={{ "--orbit-size": `${180 + i * 100}px`, "--orbit-delay": `${i * -1.8}s` } as CSSProperties} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>How I Can Help</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              Six High Impact Services.{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>One Accountable Partner.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
              I can tailor the engagement to your priorities, then deliver practical support across platform growth, lead generation, team scaling, and outsourcing.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i}
                className="group rounded-xl p-6 border relative overflow-hidden"
                style={{ borderColor: "#e0e8ff", backgroundColor: "#ffffff" }}
                whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(49,139,67,0.14)", borderColor: "#318B43" }}>
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(49,139,67,0.03) 0%, rgba(37,117,252,0.03) 100%)" }} />
                <div className="service-media relative h-28 sm:h-32 rounded-lg overflow-hidden mb-5 border"
                  style={{ borderColor: "#e0e8ff", backgroundColor: "#f5f0ff" }}>
                  <AmbientVideo src={s.video} poster={s.poster} className="service-card-video absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 service-media-scrim" />
                  <span className="absolute bottom-2 left-3 right-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white drop-shadow-sm">
                    {s.videoLabel}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>{s.icon}</motion.div>
                </div>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-bold mb-2" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>{s.tag}</span>
                <h3 className="text-base font-semibold mb-3 relative z-10" style={{ color: "#034751" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed relative z-10" style={{ color: "#4a6b70" }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#f5f0ff" bottomColor="#ffffff" flip />

      {/* ── ENGAGEMENT PATH ── */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>A Clearer Way Forward</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              From First Conversation to{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>Measurable Progress.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
              The process is designed to reduce uncertainty early, create momentum quickly, and make every next step easier to evaluate.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-5" variants={staggerContainer}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {ENGAGEMENT_STEPS.map((item, i) => (
              <motion.div key={item.step} variants={scaleIn} custom={i}
                className="engagement-step relative rounded-2xl border p-6"
                style={{ background: "linear-gradient(145deg, #ffffff 0%, #f3fbf5 100%)", borderColor: "#d0e8d3" }}
                whileHover={{ y: -7, borderColor: "#318B43", boxShadow: "0 18px 40px rgba(49,139,67,0.12)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>{item.icon}</div>
                  <span className="font-mono text-sm font-bold" style={{ color: "#8bb998" }}>{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#034751" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6b70" }}>{item.desc}</p>
                {i < ENGAGEMENT_STEPS.length - 1 && (
                  <ArrowRight className="engagement-arrow hidden md:block absolute -right-5 top-1/2 z-10 w-9 h-9 rounded-full p-2"
                    style={{ backgroundColor: "#ffffff", color: "#318B43", border: "1px solid #d0e8d3" }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO I SERVE ── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>Who I Help</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              Built for IT Leaders Who Want{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>More Control Over Growth</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: "#4a6b70" }}>
              I work directly with technology leaders who need a clearer route to revenue, stronger delivery capacity, or a more reliable way to reach international clients.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="space-y-3">
              {WHO_I_SERVE_PAINS.map((item, i) => (
                <motion.div key={item} className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <motion.div whileHover={{ scale: 1.2 }}><CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#318B43" }} /></motion.div>
                  <span className="text-sm" style={{ color: "#034751" }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div className="grid sm:grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {PERSONAS.map((p, i) => (
                <motion.div key={p.role} variants={scaleIn} custom={i}
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: "#f8fffe", borderColor: "#d0e8d3", boxShadow: "0 4px 16px rgba(49,139,67,0.07)" }}
                  whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(49,139,67,0.14)", borderColor: "#318B43" }}>
                  <h4 className="font-bold text-base mb-2" style={{ color: "#318B43" }}>{p.role}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a6b70" }}>{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HEX MIND MAP SECTION ── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #f8fffe 0%, #edfaf0 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>How I Work</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              Your Growth Engine,{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>Running With Clarity</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
            I can manage the moving parts of your business development process, from targeting and outreach to proposals, follow up, and talent coordination, so you can stay focused on delivery.
            </p>
          </motion.div>
          <HexMindMap />
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { num: "01", unit: "Clear Strategy", label: "built around your market, offer, and growth priorities" },
              { num: "02", unit: "Focused Execution", label: "across the channels that can create qualified demand" },
              { num: "03", unit: "Regular Reviews", label: "so we can improve decisions using real performance data" },
            ].map((s, i) => (
              <motion.div key={s.unit} className="text-center p-5 rounded-xl border"
                style={{ backgroundColor: "#ffffff", borderColor: "#d0e8d3" }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4, borderColor: "#318B43", boxShadow: "0 8px 24px rgba(49,139,67,0.10)" }}>
                <div className="text-3xl font-black mb-1" style={{ color: "#318B43" }}>{s.num}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: "#034751" }}>{s.unit}</div>
                <div className="text-xs" style={{ color: "#4a6b70" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #034751 0%, #318B43 100%)" }}>
        <AmbientVideo
          src="/animations/cta-grid.mp4"
          poster="/animations/cta-grid.jpg"
          className="cta-ambient-video absolute inset-0 h-full w-full object-cover"
          label="Subtle animated network background for the consultation call to action"
        />
        <div className="cta-ambient-scrim absolute inset-0 pointer-events-none" />
        <motion.div className="absolute inset-0 opacity-10 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #fff 0%, transparent 60%), radial-gradient(circle at 70% 60%, #2575FC 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
             <h2 className="text-3xl font-bold text-white mb-4">You Do Not Need Another Vendor. You Need a Growth Partner.</h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
               I can spend 20 focused minutes understanding your current position and tell you what I would fix first across your pipeline, platform presence, or delivery capacity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-full no-underline"
                style={{ color: "#318B43" }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(255,255,255,0.3)" }} whileTap={{ scale: 0.97 }}>
                 Let's Build Your Plan <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full no-underline"
                style={{ color: "#ffffff", border: "2px solid rgba(255,255,255,0.5)" }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.97 }}>
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#318B43" bottomColor="#f8fffe" />

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20" style={{ background: "linear-gradient(180deg, #f8fffe 0%, #f0f4ff 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>Service Packages</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
               Clear Engagements.{" "}
               <SquiggleUnderline><span style={{ color: "#318B43" }}>Built Around Your Goals.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
               I can start with the scope that fits your current priorities and expand the engagement as your needs grow. Each package is designed to give you clear deliverables, direct communication, and practical execution support.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={plan.name} variants={scaleIn} custom={i}
                className={`rounded-2xl border overflow-hidden flex flex-col ${plan.popular ? "ring-2 ring-[#318B43]" : ""}`}
                style={{ borderColor: plan.popular ? "#318B43" : "#d0e8d3", backgroundColor: "#ffffff", boxShadow: plan.popular ? "0 8px 40px rgba(49,139,67,0.2)" : "0 4px 16px rgba(3,71,81,0.05)" }}
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(49,139,67,0.16)" }}>
                {plan.badge && (
                  <div className="px-4 py-1.5 text-xs font-bold text-center text-white"
                    style={{ backgroundColor: plan.popular ? "#318B43" : "#034751" }}>{plan.badge}</div>
                )}
                {plan.category && !plan.badge && (
                  <div className="px-4 py-1.5 text-xs font-semibold text-center"
                    style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>{plan.category}</div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: "#034751" }}>{plan.name}</h3>
                  <div className="text-2xl font-black mb-1" style={{ color: "#318B43" }}>{plan.price}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "#034751" }}>{plan.subtitle}</div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 self-start"
                    style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>{plan.commission}</span>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: "#4a6b70" }}>{plan.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#318B43" }} />
                        <span className="text-xs" style={{ color: "#4a6b70" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                    className="block w-full py-3 text-sm font-semibold text-center no-underline rounded-full"
                    style={{ backgroundColor: plan.popular ? "#318B43" : "transparent", color: plan.popular ? "#ffffff" : "#318B43", border: plan.popular ? "none" : "1.5px solid #318B43" }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                     Discuss This Package
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#f0f4ff" bottomColor="#ffffff" flip />

      {/* ── THE STACK ── */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>My Working Toolkit</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              The Tools I Use.{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>The Process I Deliver.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
              I use proven platforms for research, outreach, CRM, and automation, then apply them to a process built around your market, offer, and sales goals.
            </p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {TOOL_STACKS.map((t, i) => (
              <motion.div key={t.category} variants={fadeUp} custom={i}
                className="rounded-xl p-5 border"
                style={{ borderColor: "#d0e8d3", backgroundColor: "#f8fffe" }}
                whileHover={{ y: -4, borderColor: "#318B43", boxShadow: "0 8px 24px rgba(49,139,67,0.10)" }}>
                <h4 className="font-bold text-sm mb-3" style={{ color: "#034751" }}>{t.category}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#4a6b70" }}>{t.tools}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#ffffff" bottomColor="#034751" />

      {/* ── WHY WORK WITH ME ── */}
      <section id="about" className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #034751 0%, #0a5e6e 100%)" }}>
        <motion.div className="absolute inset-0 opacity-10 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #318B43 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2575FC 0%, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "rgba(49,139,67,0.3)", color: "#6ee893" }}>Why Clients Choose Me</span>
            <h2 className="text-4xl font-bold mb-4 text-white">
              I Bring Strategic Thinking. Practical Execution.{" "}
              <span style={{ color: "#6ee893" }}>Measurable Results.</span>
            </h2>
            <p className="text-base max-w-3xl mx-auto mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
              I do not take on every project. I take on the engagements where I can create meaningful value through Upwork optimization, lead generation, staff augmentation, and outsourcing. I work with clear expectations, direct communication, and a focus on results you can see.
            </p>
            <motion.a href="https://www.linkedin.com/in/abdullahmasghar" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold no-underline rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.35)" }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.22)", scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Linkedin className="w-4 h-4" /> Review My Experience
            </motion.a>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {WHY_ME.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i}
                className="rounded-xl p-5 text-center border"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.14)", y: -5, borderColor: "rgba(110,232,147,0.4)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "rgba(49,139,67,0.25)", color: "#6ee893" }}>
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm mb-1 text-white">{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
             <h3 className="text-2xl font-bold text-center mb-8 text-white">Questions Clients Ask Me</h3>
            <div className="space-y-3">
              {FAQS.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#0a5e6e" bottomColor="#f8fffe" flip />

      {/* ── BEFORE YOU CONTACT ME ── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #f8fffe 0%, #f0f4ff 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>Before We Speak</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              Give Me Context. Get{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>A Better Plan Faster.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
              I respect your time. A little context before our first conversation helps me move past the basics and give you more useful, specific guidance from the start.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {BEFORE_CONTACT.map((item, i) => (
              <motion.div key={item.title} variants={scaleIn} custom={i}
                className="rounded-xl p-5 border"
                style={{ backgroundColor: "#ffffff", borderColor: "#d0e8d3" }}
                whileHover={{ y: -5, borderColor: "#318B43", boxShadow: "0 10px 28px rgba(49,139,67,0.12)" }}>
                <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm mb-2" style={{ color: "#034751" }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#4a6b70" }}>{item.desc}</p>
              </motion.div>
            ))}
            <motion.div variants={scaleIn} custom={5}
              className="rounded-xl p-5 border md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center"
              style={{ background: "linear-gradient(135deg, #e8f5eb 0%, #e0eeff 100%)", borderColor: "#c3e6cb" }}
              whileHover={{ y: -5, boxShadow: "0 10px 28px rgba(49,139,67,0.12)" }}>
              <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                style={{ backgroundColor: "rgba(49,139,67,0.14)", color: "#318B43" }}>
                <Rocket className="w-5 h-5" />
              </div>
               <h4 className="font-bold text-base mb-2" style={{ color: "#034751" }}>Ready? Let's Build Your Pipeline.</h4>
               <p className="text-xs mb-4" style={{ color: "#4a6b70" }}>Tell me what you are trying to achieve, and I will help you identify the next practical step.</p>
              <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white no-underline rounded-full"
                style={{ backgroundColor: "#318B43" }}
                whileHover={{ scale: 1.05, backgroundColor: "#276e35" }} whileTap={{ scale: 0.97 }}>
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WaveDivider topColor="#f0f4ff" bottomColor="#edfaf0" />

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20" style={{ background: "linear-gradient(180deg, #edfaf0 0%, #f8fffe 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>Start a Conversation</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#034751" }}>
              Tell Me Where You Want to Go.{" "}
              <SquiggleUnderline><span style={{ color: "#318B43" }}>I Can Help You Get There.</span></SquiggleUnderline>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "#4a6b70" }}>
              No pitch decks and no pressure. Just a focused 20-minute conversation about your goals, the constraints in your current pipeline, and how I can help you move forward.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft} className="space-y-4">
              {[
                { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", value: "+92 320 411 6821", sub: "Tap to open WhatsApp directly", href: "https://wa.me/923204116821" },
                { icon: <Phone className="w-5 h-5" />, label: "Direct Call", value: "+92 320 411 6821", sub: null, href: "tel:+923204116821" },
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "abdullahmasghar1995@gmail.com", sub: null, href: "mailto:abdullahmasghar1995@gmail.com" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "Abdullah M. Asghar", sub: "Connect on LinkedIn", href: "https://www.linkedin.com/in/abdullahmasghar" },
              ].map((item, i) => (
                <motion.a key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl border no-underline"
                  style={{ backgroundColor: "#ffffff", borderColor: "#d0e8d3" }}
                  whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(49,139,67,0.12)", borderColor: "#318B43" }}
                  initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#e8f5eb", color: "#318B43" }}>{item.icon}</div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "#318B43" }}>{item.label}</div>
                    <div className="font-semibold text-sm" style={{ color: "#034751" }}>{item.value}</div>
                    {item.sub && <div className="text-xs" style={{ color: "#4a6b70" }}>{item.sub}</div>}
                  </div>
                </motion.a>
              ))}
              <motion.div className="rounded-xl p-4 border"
                style={{ backgroundColor: "#e8f5eb", borderColor: "#c3e6cb" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4" style={{ color: "#318B43" }} />
                  <span className="text-sm font-bold" style={{ color: "#034751" }}>Response Guarantee</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#4a6b70" }}>
                  I respond to all messages within 24 hours, often sooner. For anything urgent, WhatsApp is the fastest way to reach me directly.
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <motion.form className="rounded-2xl p-6 border space-y-4"
                style={{ backgroundColor: "#ffffff", borderColor: "#d0e8d3", boxShadow: "0 4px 24px rgba(49,139,67,0.08)" }}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}>

                {/* Success state */}
                {formStatus === "success" && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-5 text-center"
                    style={{ backgroundColor: "#e8f5eb", border: "1.5px solid #c3e6cb" }}>
                   <div className="text-3xl mb-2"><CheckCircle className="w-8 h-8 mx-auto" style={{ color: "#318B43" }} /></div>
                    <h4 className="font-bold text-base mb-1" style={{ color: "#034751" }}>Your email draft is ready.</h4>
                    <p className="text-sm" style={{ color: "#4a6b70" }}>Your email app should open with the details filled in. Please send it to complete your request.</p>
                    <button type="button" onClick={() => setFormStatus("idle")}
                      className="mt-3 text-xs font-semibold underline" style={{ color: "#318B43" }}>
                      Send another message
                    </button>
                  </motion.div>
                )}

                {formStatus !== "success" && (<>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-full-name" className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Full Name *</label>
                      <input id="contact-full-name" name="fullName" autoComplete="name" type="text" placeholder="Your full name"
                        value={formData.fullName}
                        onChange={e => { setFormData({ ...formData, fullName: e.target.value }); setFormErrors(p => ({ ...p, fullName: "" })); }}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={{ border: `1.5px solid ${formErrors.fullName ? "#e53e3e" : "#d0e8d3"}`, color: "#034751", backgroundColor: "#f8fffe" }}
                        onFocus={e => { e.target.style.borderColor = formErrors.fullName ? "#e53e3e" : "#318B43"; }}
                        onBlur={e => { e.target.style.borderColor = formErrors.fullName ? "#e53e3e" : "#d0e8d3"; }} />
                      {formErrors.fullName && <p className="text-xs mt-1" style={{ color: "#e53e3e" }}>{formErrors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Company</label>
                      <input id="contact-company" name="company" autoComplete="organization" type="text" placeholder="Your company (optional)"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                        style={{ border: "1.5px solid #d0e8d3", color: "#034751", backgroundColor: "#f8fffe" }}
                        onFocus={e => { e.target.style.borderColor = "#318B43"; }}
                        onBlur={e => { e.target.style.borderColor = "#d0e8d3"; }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Email Address *</label>
                    <input id="contact-email" name="email" autoComplete="email" type="email" placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => { setFormData({ ...formData, email: e.target.value }); setFormErrors(p => ({ ...p, email: "" })); }}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                      style={{ border: `1.5px solid ${formErrors.email ? "#e53e3e" : "#d0e8d3"}`, color: "#034751", backgroundColor: "#f8fffe" }}
                      onFocus={e => { e.target.style.borderColor = formErrors.email ? "#e53e3e" : "#318B43"; }}
                      onBlur={e => { e.target.style.borderColor = formErrors.email ? "#e53e3e" : "#d0e8d3"; }} />
                    {formErrors.email && <p className="text-xs mt-1" style={{ color: "#e53e3e" }}>{formErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Phone Number <span style={{ color: "#4a6b70", fontWeight: 400 }}>(digits only)</span></label>
                    <PhoneField value={formData.phone} onChange={v => setFormData({ ...formData, phone: v })} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Country</label>
                    <CountryField value={selectedCountry} onChange={setSelectedCountry} />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5" style={{ color: "#034751" }}>Your Message *</label>
                       <textarea id="contact-message" name="message" rows={4} placeholder="Tell me what you are trying to achieve, what is holding growth back, and where you would like my support..."
                      value={formData.message}
                      onChange={e => { setFormData({ ...formData, message: e.target.value }); setFormErrors(p => ({ ...p, message: "" })); }}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                      style={{ border: `1.5px solid ${formErrors.message ? "#e53e3e" : "#d0e8d3"}`, color: "#034751", backgroundColor: "#f8fffe" }}
                      onFocus={e => { e.target.style.borderColor = formErrors.message ? "#e53e3e" : "#318B43"; }}
                      onBlur={e => { e.target.style.borderColor = formErrors.message ? "#e53e3e" : "#d0e8d3"; }} />
                    {formErrors.message && <p className="text-xs mt-1" style={{ color: "#e53e3e" }}>{formErrors.message}</p>}
                  </div>

                  {formStatus === "error" && (
                    <div className="rounded-lg px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: "#fff5f5", border: "1px solid #fed7d7", color: "#c53030" }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {formErrorMsg}
                    </div>
                  )}

                  <motion.button type="submit" disabled={formStatus === "loading"}
                    className="w-full py-3.5 font-semibold text-white rounded-full flex items-center justify-center gap-2"
                    style={{ backgroundColor: formStatus === "loading" ? "#4a9b5a" : "#318B43", cursor: formStatus === "loading" ? "not-allowed" : "pointer" }}
                    whileHover={formStatus !== "loading" ? { scale: 1.02, backgroundColor: "#276e35" } : {}}
                    whileTap={formStatus !== "loading" ? { scale: 0.98 } : {}}>
                    {formStatus === "loading" ? (
                      <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending...</>
                    ) : "Send Message →"}
                  </motion.button>

                  <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold no-underline rounded-full"
                    style={{ backgroundColor: "transparent", color: "#318B43", border: "1.5px solid #318B43" }}
                    whileHover={{ backgroundColor: "#318B43", color: "#fff" }} whileTap={{ scale: 0.97 }}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp Now
                  </motion.a>
                </>)}
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#021f26", fontFamily: "'Poppins', sans-serif" }}>
        {/* Top CTA strip */}
        <div className="py-10 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #034751 0%, #0a5e6e 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <motion.div className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #318B43 0%, transparent 60%), radial-gradient(circle at 80% 50%, #2575FC 0%, transparent 60%)" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Build Your Next Growth Channel?</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Tell me where you want to improve, platform growth, lead generation, team scaling, or outsourcing, and I will help you define the right next step.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white no-underline rounded-full text-sm"
                style={{ backgroundColor: "#318B43" }}
                whileHover={{ scale: 1.04, backgroundColor: "#276e35" }} whileTap={{ scale: 0.97 }}>
                 Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://wa.me/923204116821" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold no-underline rounded-full text-sm"
                style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.12)", scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </motion.a>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Column 1: Brand + About */}
            <div className="lg:col-span-1">
              <a href="#home" onClick={e => { e.preventDefault(); scrollTo("#home"); }} className="no-underline flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-white">
                  abdullah<span style={{ color: "#6ee893" }}>.</span>
                </span>
              </a>
              <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                 I am Abdullah M. Asghar, a Senior Business Development Leader with 8+ years of experience. I can help you build scalable offshore teams, generate enterprise leads, and win more opportunities through Upwork, LinkedIn, and global outsourcing marketplaces.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { href: "https://www.linkedin.com/in/abdullahmasghar", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                  { href: "https://wa.me/923204116821", icon: <MessageCircle className="w-4 h-4" />, label: "WhatsApp" },
                  { href: "mailto:abdullahmasghar1995@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
                  { href: "tel:+923204116821", icon: <Phone className="w-4 h-4" />, label: "Call" },
                ].map(s => (
                  <motion.a key={s.label} href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="no-underline w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
                    whileHover={{ backgroundColor: "#318B43", color: "#ffffff", scale: 1.12 }}
                    title={s.label}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2.5">
                {[
                  "I can optimize your Upwork profile",
                  "I can build your lead generation system",
                  "I can scale your team with staff augmentation",
                  "I can develop your LinkedIn BD strategy",
                  "I can coordinate offshore resource outsourcing",
                  "I can manage your freelance platforms",
                  "I can advise on enterprise sales",
                  "I can train your BD team",
                ].map(s => (
                  <li key={s}>
                    <a href="#services" onClick={e => { e.preventDefault(); scrollTo("#services"); }}
                      className="no-underline text-xs flex items-center gap-2 group"
                      style={{ color: "rgba(255,255,255,0.58)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0 transition-colors"
                        style={{ backgroundColor: "#318B43" }} />
                      <span className="group-hover:text-white transition-colors">{s}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 mb-7">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Services", href: "#services" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "About Me", href: "#about" },
                  { label: "Experience", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map(link => (
                  <li key={`${link.href}-${link.label}`}>
                    <a href={link.href} onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                      className="no-underline text-xs flex items-center gap-2 group"
                      style={{ color: "rgba(255,255,255,0.58)" }}>
                      <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: "#318B43" }} />
                      <span className="group-hover:text-white transition-colors">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Work With Me</h4>
              <ul className="space-y-4">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: "abdullahmasghar1995@gmail.com", href: "mailto:abdullahmasghar1995@gmail.com" },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone / WhatsApp", value: "+92 320 411 6821", href: "tel:+923204116821" },
                  { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", value: "/in/abdullahmasghar", href: "https://www.linkedin.com/in/abdullahmasghar" },
                   { icon: <Globe className="w-4 h-4" />, label: "Availability", value: "I work worldwide", href: null },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(49,139,67,0.2)", color: "#6ee893" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="no-underline text-xs font-medium hover:underline break-all"
                          style={{ color: "rgba(255,255,255,0.85)" }}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{item.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {/* Response guarantee */}
              <div className="mt-6 rounded-lg p-3" style={{ backgroundColor: "rgba(49,139,67,0.15)", border: "1px solid rgba(49,139,67,0.3)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5" style={{ color: "#6ee893" }} />
                  <span className="text-xs font-semibold" style={{ color: "#6ee893" }}>24-Hour Response</span>
                </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>I respond to every message within 24 hours. WhatsApp is the fastest way to reach me.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platforms</h4>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.48)" }}>
                  The research, prospecting, outreach, and talent platforms I use to build qualified B2B opportunities.
                </p>
              </div>
              <span className="text-xs font-medium" style={{ color: "#6ee893" }}>Research, reach, and revenue</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FOOTER_PLATFORM_GROUPS.map(group => (
                <div key={group.label}>
                  <h5 className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.72)" }}>{group.label}</h5>
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {group.platforms.map(platform => (
                      <a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer"
                        className="text-xs no-underline hover:underline"
                        style={{ color: "rgba(255,255,255,0.52)" }}>
                        {platform.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", backgroundColor: "#011519" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.35)" }}>
              © {new Date().getFullYear()} Abdullah M. Asghar. All rights reserved.
            </p>
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
               I can optimize Upwork, generate leads, scale IT teams, and coordinate global outsourcing
            </p>
            <p className="text-xs text-center sm:text-right" style={{ color: "rgba(255,255,255,0.35)" }}>
               I work worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
