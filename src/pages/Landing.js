import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Target, 
  MessageSquare, 
  CheckCircle2, 
  FileText,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/upload");
  };

  const steps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Drop your PDF, DOC, or DOCX file"
    },
    {
      icon: Target,
      title: "Choose Role",
      description: "Select your target position"
    },
    {
      icon: MessageSquare,
      title: "Get Feedback",
      description: "Receive actionable insights"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "ATS-Friendly Checks",
      description: "Ensure your resume passes automated screening systems"
    },
    {
      icon: Sparkles,
      title: "Clear Scoring",
      description: "Understand exactly where you stand with a 0-100 score"
    },
    {
      icon: Zap,
      title: "Actionable Tips",
      description: "Get specific improvements you can make right now"
    },
    {
      icon: Users,
      title: "Student-Focused",
      description: "Tailored advice for freshers and internship seekers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container-main py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Resumate
            </span>
          </div>
          <Button 
            onClick={handleGetStarted}
            className="btn-primary hidden sm:flex"
            data-testid="header-cta-btn"
          >
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-pattern py-16 sm:py-24 lg:py-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="label-uppercase text-primary">For Students & Freshers</span>
                <h1 className="section-heading animate-fade-in-up">
                  Get honest feedback<br />
                  <span className="text-gradient">on your resume.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 max-w-xl animate-fade-in-up stagger-1">
                  Built for students. Clear, practical, and recruiter-focused.
                  Know exactly what's working and what needs improvement.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-2">
                <Button 
                  onClick={handleGetStarted}
                  className="btn-primary btn-shine text-lg px-10 py-6"
                  data-testid="hero-cta-btn"
                >
                  Review My Resume
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 text-slate-500">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">No signup required</span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4 animate-fade-in-up stagger-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  Trusted by <span className="font-semibold text-slate-900">1,000+</span> students
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <Card className="card-glass p-8 relative animate-scale-in">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Resume Analysis</p>
                        <p className="text-sm text-slate-500">Just completed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center py-6">
                      <div className="relative">
                        <svg className="w-32 h-32 score-ring">
                          <circle 
                            cx="64" cy="64" r="56" 
                            fill="none" 
                            className="score-ring-bg" 
                            strokeWidth="8"
                          />
                          <circle 
                            cx="64" cy="64" r="56" 
                            fill="none" 
                            className="score-ring-progress"
                            strokeWidth="8"
                            strokeDasharray="352"
                            strokeDashoffset="88"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            85
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Strong technical skills</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Good project descriptions</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="label-uppercase text-primary">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
                )}
                
                <Card className="card-elevated card-hover p-8 text-center relative z-10" data-testid={`step-card-${index + 1}`}>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="label-uppercase text-primary">Why Resumate</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Built for Your Success
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="card-elevated card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`benefit-card-${index + 1}`}
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-12 sm:p-16 text-center">
            <div className="absolute inset-0 hero-glow opacity-50" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to improve your resume?
              </h2>
              <p className="text-slate-300 text-lg">
                Get your personalized feedback in under 30 seconds.
                No signup, no payment, just honest results.
              </p>
              <Button 
                onClick={handleGetStarted}
                className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-10 py-6 text-lg font-medium transition-all duration-300 hover:shadow-xl"
                data-testid="cta-section-btn"
              >
                Analyze My Resume Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
              <span className="text-slate-600 font-medium">Resumate</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/aditya-kittad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0A66C2] transition-colors duration-200"
                data-testid="social-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a 
                href="https://github.com/adityakittad1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#333] transition-colors duration-200"
                data-testid="social-github"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#000] transition-colors duration-200"
                data-testid="social-twitter"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
            
            <p className="text-sm text-slate-500">
              © 2025 Resumate. Built by Aditya Kittad.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
