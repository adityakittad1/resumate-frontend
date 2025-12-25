import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Target,
  TrendingUp,
  AlertTriangle,
  Send,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const useAnimatedCounter = (targetValue, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(easeOutQuart * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration]);

  return count;
};

const ScoreRing = ({ score }) => {
  const animatedScore = useAnimatedCounter(score);
  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  const getScoreColor = () => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 60) return "#2563eb"; // blue
    if (score >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="w-40 h-40 sm:w-48 sm:h-48 score-ring">
          <circle 
            cx="50%" cy="50%" r="56" 
            fill="none" 
            className="score-ring-bg" 
            strokeWidth="10"
          />
          <circle 
            cx="50%" cy="50%" r="56" 
            fill="none" 
            stroke={getScoreColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-5xl sm:text-6xl font-bold text-slate-900" 
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="score-value"
          >
            {animatedScore}
          </span>
          <span className="text-sm text-slate-500 mt-1">out of 100</span>
        </div>
      </div>
      <span 
        className="mt-4 px-4 py-1.5 rounded-full text-sm font-medium"
        style={{ 
          backgroundColor: `${getScoreColor()}15`,
          color: getScoreColor()
        }}
        data-testid="score-label"
      >
        {getScoreLabel()}
      </span>
    </div>
  );
};

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackHelpful, setFeedbackHelpful] = useState(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("analysisResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate("/upload");
    }
  }, [navigate]);

  const handleSubmitFeedback = async () => {
    if (feedbackHelpful === null || !result) return;

    setSubmittingFeedback(true);
    try {
      await axios.post(`${API}/feedback`, {
        analysis_id: result.id,
        helpful: feedbackHelpful,
        comment: feedbackComment || null
      });
      setFeedbackSubmitted(true);
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Feedback error:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem("analysisResult");
    navigate("/upload");
  };

  const getRoleLabel = (role) => {
    const labels = {
      software_engineer: "Software Engineer",
      web_developer: "Web Developer",
      mobile_developer: "Mobile App Developer",
      data_analyst: "Data Analyst",
      data_scientist: "Data Scientist",
      ai_ml_intern: "AI / ML Intern",
      cloud_devops: "Cloud / DevOps Intern",
      cybersecurity_analyst: "Cybersecurity Analyst",
      product_management: "Product Management Intern",
      business_analyst: "Business Analyst",
      product_analyst: "Product Analyst",
      ui_ux_designer: "UI/UX Designer",
      graphic_designer: "Graphic Designer",
      video_editor: "Video Editor / Motion Designer",
      qa_testing: "QA / Software Testing Intern",
      technical_support: "Technical Support / IT Support",
      digital_marketing: "Digital Marketing Intern",
      growth_analyst: "Growth / Marketing Analyst",
      content_writer: "Content / Technical Writer"
    };
    return labels[role] || role;
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container-main py-6">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            data-testid="back-home-btn"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Resumate
            </span>
          </div>
          <Button
            variant="outline"
            onClick={handleStartOver}
            className="rounded-full"
            data-testid="analyze-another-btn"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Analyze Another</span>
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container-main py-8 pb-20">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="label-uppercase text-primary">Analysis Complete</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Your Resume Results
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3 text-slate-600">
            <Target className="w-4 h-4" />
            <span>Target Role: {getRoleLabel(result.target_role)}</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Score Card - Hero */}
          <Card className="lg:col-span-5 card-elevated animate-fade-in-up" data-testid="score-card">
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[350px]">
              <h2 className="label-uppercase mb-6">Resume Score</h2>
              <ScoreRing score={result.score} />
              <p className="text-slate-600 text-center mt-6 max-w-xs">
                {result.score >= 70 
                  ? "Your resume is looking strong! A few tweaks could make it even better."
                  : result.score >= 50
                  ? "Good foundation. Focus on the improvement tips below to boost your score."
                  : "There's room for improvement. Follow our tips to strengthen your resume."}
              </p>
            </CardContent>
          </Card>

          {/* Strengths Card - Tall */}
          <Card className="lg:col-span-7 card-elevated animate-fade-in-up stagger-1" data-testid="strengths-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {result.strengths.length > 0 ? (
                <ul className="space-y-3">
                  {result.strengths.map((strength, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      data-testid={`strength-item-${index}`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-center py-8">
                  We couldn't identify specific strengths. Focus on the improvement tips below.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Missing Sections Card */}
          {result.missing_sections.length > 0 && (
            <Card className="lg:col-span-4 card-elevated animate-fade-in-up stagger-2" data-testid="missing-sections-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  Missing Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {result.missing_sections.map((section, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      data-testid={`missing-section-${index}`}
                    >
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-slate-700 capitalize">{section}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Improvement Tips Card - Wide */}
          <Card className={`${result.missing_sections.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'} card-elevated animate-fade-in-up stagger-3`} data-testid="tips-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                Top Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {result.improvement_tips.map((tip, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/50 hover:bg-blue-50/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-testid={`tip-item-${index}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Feedback Card */}
          <Card className="lg:col-span-12 card-elevated animate-fade-in-up stagger-4" data-testid="feedback-card">
            <CardContent className="p-8">
              {!feedbackSubmitted ? (
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Was this review helpful?
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Your feedback helps us improve our analysis
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button
                      variant={feedbackHelpful === true ? "default" : "outline"}
                      onClick={() => setFeedbackHelpful(true)}
                      className={`rounded-full px-8 py-6 ${feedbackHelpful === true ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      data-testid="feedback-yes-btn"
                    >
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      Yes
                    </Button>
                    <Button
                      variant={feedbackHelpful === false ? "default" : "outline"}
                      onClick={() => setFeedbackHelpful(false)}
                      className={`rounded-full px-8 py-6 ${feedbackHelpful === false ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      data-testid="feedback-no-btn"
                    >
                      <ThumbsDown className="w-5 h-5 mr-2" />
                      No
                    </Button>
                  </div>

                  {feedbackHelpful !== null && (
                    <div className="space-y-4 animate-fade-in">
                      <Textarea
                        placeholder="Any additional comments? (optional)"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="rounded-xl min-h-[100px]"
                        data-testid="feedback-comment"
                      />
                      <Button
                        onClick={handleSubmitFeedback}
                        disabled={submittingFeedback}
                        className="btn-primary"
                        data-testid="submit-feedback-btn"
                      >
                        {submittingFeedback ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Feedback
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Thank you for your feedback!
                  </h3>
                  <p className="text-slate-600">
                    Your input helps us make Resumate better for everyone.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center animate-fade-in-up stagger-5">
          <Button
            onClick={handleStartOver}
            className="btn-primary btn-shine text-lg px-10 py-6"
            data-testid="analyze-new-resume-btn"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Analyze Another Resume
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/aditya-kittad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0A66C2] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a 
                href="https://github.com/adityakittad1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#333] transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#000] transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
            <span className="text-slate-300 hidden sm:block">|</span>
            <p className="text-sm text-slate-500">
              © 2025 Resumate. Built by Aditya Kittad.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
