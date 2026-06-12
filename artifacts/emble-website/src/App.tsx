import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Play, Camera, Video, Palette, Scissors, Sparkles, MapPin, Phone, Instagram, Menu, X, User, Send, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const PROGRAMS = [
  "Photography",
  "Videography & Cinematography",
  "Fashion",
  "Modeling",
  "Content Creation"
];

const GENDERS = ["Male", "Female", "Prefer not to say"];

type ApplyFormData = {
  fullName: string;
  phone: string;
  nickname: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  program: string;
};

const defaultForm: ApplyFormData = {
  fullName: "",
  phone: "",
  nickname: "",
  age: "",
  height: "",
  weight: "",
  gender: "",
  program: ""
};

const ApplyModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState<ApplyFormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplyFormData>>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const validate = () => {
    const newErrors: Partial<ApplyFormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.age.trim()) newErrors.age = "Age is required";
    if (!form.gender) newErrors.gender = "Please select a gender";
    if (!form.program) newErrors.program = "Please select a program";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSending(true);

    const message = encodeURIComponent(
      `*NEW APPLICATION — EMBLE CREATIVE ACADEMY*\n\n` +
      `*Full Name:*        ${form.fullName}\n` +
      `*Phone Number:*     ${form.phone}\n` +
      `*Nickname:*         ${form.nickname || "—"}\n` +
      `*Age:*              ${form.age}\n` +
      `*Height:*           ${form.height || "—"}\n` +
      `*Weight:*           ${form.weight || "—"}\n` +
      `*Gender:*           ${form.gender}\n` +
      `*Program Interest:* ${form.program}\n\n` +
      `_Submitted via Emble Creative Academy website_`
    );

    window.open(`https://wa.me/2349165785355?text=${message}`, "_blank");
    setSending(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof ApplyFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleClose = () => {
    setForm(defaultForm);
    setErrors({});
    setSubmitted(false);
    setSending(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-[#2a2010] rounded-2xl shadow-[0_0_60px_rgba(201,162,39,0.12)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Gold top bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl" />

            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Emble Creative Academy</p>
                  <h2 className="text-2xl md:text-3xl font-serif text-foreground">Apply Now — It's Free</h2>
                </div>
                <button
                  onClick={handleClose}
                  data-testid="button-close-modal"
                  className="text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif mb-3 text-foreground">WhatsApp Ready</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    WhatsApp has opened with your application pre-filled. Just tap <strong className="text-foreground">Send</strong> to deliver it to ECA.
                  </p>
                  <p className="text-xs text-muted-foreground mb-8">
                    If WhatsApp didn't open, tap to chat with us directly:<br />
                    <a href="https://wa.me/2349165785355" target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">+234 916 578 5355</a>
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      data-testid="input-fullname"
                      placeholder="e.g. Chukwuemeka Okafor"
                      value={form.fullName}
                      onChange={e => handleChange("fullName", e.target.value)}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors ${errors.fullName ? "border-red-500/70" : "border-border"}`}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone + Nickname */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        data-testid="input-phone"
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors ${errors.phone ? "border-red-500/70" : "border-border"}`}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Nickname
                      </label>
                      <input
                        type="text"
                        data-testid="input-nickname"
                        placeholder="What they call you"
                        value={form.nickname}
                        onChange={e => handleChange("nickname", e.target.value)}
                        className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Age + Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Age <span className="text-primary">*</span>
                      </label>
                      <input
                        type="number"
                        data-testid="input-age"
                        placeholder="e.g. 22"
                        min="10"
                        max="60"
                        value={form.age}
                        onChange={e => handleChange("age", e.target.value)}
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors ${errors.age ? "border-red-500/70" : "border-border"}`}
                      />
                      {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Gender <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          data-testid="select-gender"
                          value={form.gender}
                          onChange={e => handleChange("gender", e.target.value)}
                          className={`w-full appearance-none bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors pr-9 ${!form.gender ? "text-muted-foreground/50" : ""} ${errors.gender ? "border-red-500/70" : "border-border"}`}
                        >
                          <option value="" disabled className="bg-[#0d0d0d]">Select</option>
                          {GENDERS.map(g => (
                            <option key={g} value={g} className="bg-[#0d0d0d]">{g}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
                    </div>
                  </div>

                  {/* Height + Weight */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Height
                      </label>
                      <input
                        type="text"
                        data-testid="input-height"
                        placeholder="e.g. 5ft 9in or 175cm"
                        value={form.height}
                        onChange={e => handleChange("height", e.target.value)}
                        className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        data-testid="input-weight"
                        placeholder="e.g. 70kg"
                        value={form.weight}
                        onChange={e => handleChange("weight", e.target.value)}
                        className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Program Interest */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Program Interest <span className="text-primary">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROGRAMS.map(prog => (
                        <button
                          key={prog}
                          type="button"
                          data-testid={`button-program-${prog.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                          onClick={() => handleChange("program", prog)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${form.program === prog ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(201,162,39,0.3)]" : "bg-white/5 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
                        >
                          {prog}
                        </button>
                      ))}
                    </div>
                    {errors.program && <p className="text-red-400 text-xs mt-2">{errors.program}</p>}
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      data-testid="button-submit-application"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(201,162,39,0.2)] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]"
                    >
                      Submit Application <Send className="w-4 h-4" />
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      This opens WhatsApp with your details pre-filled — just tap Send.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onApply }: { onApply: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/emble-logo.jpg" alt="ECA Logo" className="w-10 h-10 rounded-full border border-border group-hover:border-primary transition-colors" />
          <span className="font-serif font-bold text-xl tracking-wider text-foreground">ECA</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Programs", "Why ECA", "Admissions"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <button
            onClick={onApply}
            data-testid="button-apply-nav"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            Apply Free
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {["About", "Programs", "Why ECA", "Admissions"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); onApply(); }}
                data-testid="button-apply-mobile"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-semibold mt-4"
              >
                Apply Now — Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onApply }: { onApply: () => void }) => {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center md:text-left flex flex-col items-center md:items-start pt-12 md:pt-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles className="w-3 h-3" />
            <span>Free Creative Arts Training in Nigeria</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] mb-6 text-foreground">
            Create. Capture.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 italic">Inspire.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Empowering the next generation of creatives in Fashion, Modeling, Photography, Videography, Cinematography, and Content Creation.
            <strong className="text-foreground font-medium block mt-2">Bold. Ambitious. Industry-ready.</strong>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onApply}
              data-testid="button-apply-hero"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              Apply Now (Free) <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#programs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-foreground border border-border hover:border-primary/50 hover:bg-white/5 transition-all"
            >
              View Programs <Play className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif mb-6">
              Vision in <span className="text-primary italic">Action.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Emble Creative Academy is a creative learning institution dedicated to training and developing aspiring photographers, videographers, models, fashion creatives, and digital storytellers through practical, hands-on education.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We believe talent is universal, but opportunity is not. That's why we're tearing down the gates to the creative industry, providing top-tier, professional training completely free of charge.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              {[
                { title: "On-site Training", desc: "Immersive studio sessions" },
                { title: "Off-site Training", desc: "Real-world field experience" },
                { title: "Mentorship", desc: "Learn from industry pros" },
                { title: "Collaboration", desc: "Build your network" }
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-border/50 relative group">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
              <img src="/modeling.png" alt="Student behind the scenes" className="object-cover w-full h-full grayscale-[30%] contrast-125 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary/40 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Programs = ({ onApply }: { onApply: () => void }) => {
  const programs = [
    {
      title: "Photography",
      icon: <Camera className="w-6 h-6" />,
      image: "/photography.png",
      topics: ["Camera Fundamentals", "Studio Photography", "Event Photography", "Photo Editing"]
    },
    {
      title: "Videography & Cinematography",
      icon: <Video className="w-6 h-6" />,
      image: "/videography.png",
      topics: ["Camera Operation", "Lighting", "Storytelling", "Color Grading", "Commercial Production"]
    },
    {
      title: "Fashion",
      icon: <Scissors className="w-6 h-6" />,
      image: "/fashion.png",
      topics: ["Fashion Styling", "Fashion Branding", "Creative Direction"]
    },
    {
      title: "Modeling",
      icon: <User className="w-6 h-6" />,
      image: "/modeling.png",
      topics: ["Runway Training", "Posing Techniques", "Portfolio Development", "Model Grooming"]
    },
    {
      title: "Content Creation",
      icon: <Palette className="w-6 h-6" />,
      image: "/hero-bg.png",
      topics: ["Instagram Reels", "TikTok Content", "YouTube Production", "Personal Branding"]
    }
  ];

  return (
    <section id="programs" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif mb-6">Our <span className="text-primary italic">Programs</span></motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
            Master your craft with intensive, specialized tracks designed to take you from passionate beginner to working professional.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-background/40 z-10 group-hover:bg-background/10 transition-colors" />
                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur border border-border p-2 rounded-full text-primary">
                  {prog.icon}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold mb-4">{prog.title}</h3>
                <ul className="space-y-3 mb-6 flex-1">
                  {prog.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">100% Free Tuition</span>
                  <button
                    onClick={onApply}
                    data-testid={`button-apply-program-${prog.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                    className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Apply <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyECA = ({ onApply }: { onApply: () => void }) => {
  const reasons = [
    "Free Courses",
    "Industry-Based Training",
    "Hands-On Practical Sessions",
    "Portfolio Development",
    "Networking Opportunities",
    "Mentorship From Professionals"
  ];

  return (
    <section id="why-eca" className="py-24 md:py-32 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif mb-6">Why Join <span className="text-primary italic">ECA?</span></motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-8">
              We aren't just teaching theory. We are building the next generation of African creative powerhouses. Step into an environment that treats you like a professional from day one.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-card/50 border border-border p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-sm">{reason}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
          >
            <img src="/emble-logo.jpg" alt="ECA Logo" className="w-20 h-20 mx-auto rounded-full border-2 border-primary/50 mb-6" />
            <h3 className="text-2xl font-serif italic mb-4">"Creativity in Every Frame"</h3>
            <p className="text-muted-foreground mb-8">
              The industry requires standard, aesthetic, and profound creativity. We provide the stage, the equipment, and the knowledge. You bring the passion.
            </p>
            <button
              onClick={onApply}
              data-testid="button-apply-why-eca"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Claim Your Spot
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Admissions = ({ onApply }: { onApply: () => void }) => {
  return (
    <section id="admissions" className="py-24 bg-primary text-primary-foreground relative">
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10 mix-blend-multiply" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-xl border border-border p-8 md:p-16 rounded-2xl shadow-2xl text-foreground text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif mb-4"
          >
            Admissions are <span className="text-primary italic">Open</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
          >
            No hidden fees. No gatekeeping. Just pure value for those ready to work hard.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h4 className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Registration Fee</h4>
              <p className="text-2xl font-bold text-primary">FREE</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h4 className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Course Fee</h4>
              <p className="text-2xl font-bold text-primary">FREE</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h4 className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Training Mode</h4>
              <p className="text-xl font-bold">On-site & Off-site</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <button
              onClick={onApply}
              data-testid="button-apply-admissions"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              Apply Now — It's Free <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-left text-sm">
                <a href="https://wa.me/2348056571284" target="_blank" rel="noreferrer" className="font-medium block hover:text-primary transition-colors">+234 805 657 1284</a>
                <a href="https://wa.me/2349165785355" target="_blank" rel="noreferrer" className="font-medium block hover:text-primary transition-colors">+234 916 578 5355</a>
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-10 bg-border" />
            <a href="https://instagram.com/emblecreativeacademy" target="_blank" rel="noreferrer" className="flex items-center gap-3 group hover:text-primary transition-colors">
              <Instagram className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm group-hover:underline">@emblecreativeacademy</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
            <img src="/emble-logo.jpg" alt="ECA Logo" className="w-12 h-12 rounded-full border border-border" />
            <div>
              <h3 className="font-serif font-bold text-xl tracking-wider text-foreground">EMBLE CREATIVE ACADEMY</h3>
              <p className="text-sm text-primary italic font-serif">Vision in Action, Creativity in Every Frame.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-medium uppercase tracking-wider">
            <span>Fashion</span>
            <span className="text-primary">•</span>
            <span>Modeling</span>
            <span className="text-primary">•</span>
            <span>Photography</span>
            <span className="text-primary">•</span>
            <span>Videography</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Emble Creative Academy. All rights reserved.</p>
          <p>Empowering Nigerian Creatives.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
      <Navbar onApply={() => setApplyOpen(true)} />
      <Hero onApply={() => setApplyOpen(true)} />
      <About />
      <Programs onApply={() => setApplyOpen(true)} />
      <WhyECA onApply={() => setApplyOpen(true)} />
      <Admissions onApply={() => setApplyOpen(true)} />
      <Footer />
    </div>
  );
}
