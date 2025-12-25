import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const API = "https://resumate-backend-vao1.onrender.com/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Upload as UploadIcon,
  FileText,
  X,
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  File,
  Code,
  Database,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  Briefcase,
  Palette,
  TestTube,
  Megaphone,
  PenTool,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";



const roleCategories = [
  {
    category: "Core Tech Roles",
    roles: [
      { value: "software_engineer", label: "Software Engineer", icon: Code, description: "Frontend / Backend / Full Stack" },
      { value: "web_developer", label: "Web Developer", icon: Code, description: "HTML, CSS, JavaScript, React" },
      { value: "mobile_developer", label: "Mobile App Developer", icon: Smartphone, description: "Android / iOS / Flutter / React Native" },
    ]
  },
  {
    category: "Data & AI Roles",
    roles: [
      { value: "data_analyst", label: "Data Analyst", icon: Database, description: "SQL, Python, Visualization" },
      { value: "data_scientist", label: "Data Scientist (Entry-Level)", icon: Database, description: "ML, Statistics, Python" },
      { value: "ai_ml_intern", label: "AI / ML Intern", icon: Brain, description: "Machine Learning, Deep Learning" },
    ]
  },
  {
    category: "Cloud & Security Roles",
    roles: [
      { value: "cloud_devops", label: "Cloud / DevOps Intern", icon: Cloud, description: "AWS, Docker, CI/CD" },
      { value: "cybersecurity_analyst", label: "Cybersecurity Analyst", icon: Shield, description: "Security, Networking, Compliance" },
    ]
  },
  {
    category: "Product & Business-Tech Roles",
    roles: [
      { value: "product_management", label: "Product Management Intern", icon: Briefcase, description: "Roadmaps, User Research" },
      { value: "business_analyst", label: "Business Analyst", icon: Briefcase, description: "Requirements, Process Analysis" },
      { value: "product_analyst", label: "Product Analyst", icon: Database, description: "Metrics, A/B Testing, Analytics" },
    ]
  },
  {
    category: "Design & Creative-Tech Roles",
    roles: [
      { value: "ui_ux_designer", label: "UI/UX Designer", icon: Palette, description: "Figma, User Research, Prototyping" },
      { value: "graphic_designer", label: "Graphic Designer", icon: Palette, description: "Visual Design, Branding" },
      { value: "video_editor", label: "Video Editor / Motion Designer", icon: PenTool, description: "After Effects, Premiere Pro" },
    ]
  },
  {
    category: "QA & Support Roles",
    roles: [
      { value: "qa_testing", label: "QA / Software Testing Intern", icon: TestTube, description: "Testing, Automation, QA" },
      { value: "technical_support", label: "Technical Support / IT Support", icon: Briefcase, description: "Troubleshooting, Customer Service" },
    ]
  },
  {
    category: "Marketing & Growth Roles",
    roles: [
      { value: "digital_marketing", label: "Digital Marketing Intern", icon: Megaphone, description: "SEO, Social Media, Ads" },
      { value: "growth_analyst", label: "Growth / Marketing Analyst", icon: Megaphone, description: "Growth Metrics, Campaigns" },
      { value: "content_writer", label: "Content / Technical Writer", icon: PenTool, description: "Documentation, Blogs, Copy" },
    ]
  }
];

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    const hasValidType = validTypes.includes(file.type) || hasValidExtension;
    
    if (!hasValidType) {
      toast.error("Invalid file format. Please upload PDF, DOC, or DOCX files.");
      return false;
    }
    
    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB.");
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      toast.success("File uploaded successfully!");
    }
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload your resume first.");
      return;
    }
    
    if (!targetRole) {
      toast.error("Please select a target role.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post(
        `${API}/analyze?target_role=${targetRole}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Store results in sessionStorage
      sessionStorage.setItem("analysisResult", JSON.stringify(response.data));
      
      toast.success("Analysis complete!");
      
      // Navigate to results
      setTimeout(() => {
        navigate("/results");
      }, 500);

    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error.response?.data?.detail || "Failed to analyze resume. Please try again.";
      toast.error(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    const ext = file.name.split('.').pop().toLowerCase();
    return ext === 'pdf' ? 'PDF' : ext.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container-main py-6">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            data-testid="back-btn"
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
          <div className="w-20" /> {/* Spacer for centering */}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container-main py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="label-uppercase text-primary">Step 1 of 2</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Upload Your Resume
            </h1>
            <p className="text-slate-600 mt-3">
              We'll analyze your resume and provide personalized feedback
            </p>
          </div>

          {/* Upload Zone */}
          <Card className="card-elevated mb-8 animate-fade-in-up stagger-1">
            <CardContent className="p-6 sm:p-8">
              {!file ? (
                <div
                  className={`upload-zone py-16 sm:py-20 ${isDragging ? 'upload-zone-active' : ''} ${!isDragging ? 'dropzone-pulse' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  data-testid="upload-dropzone"
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    data-testid="file-input"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 float-animation">
                      <UploadIcon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="text-lg font-medium text-slate-900 mb-2">
                      Drag & drop your resume here
                    </p>
                    <p className="text-slate-500 mb-4">
                      or click to browse
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="px-2 py-1 bg-slate-100 rounded">PDF</span>
                      <span className="px-2 py-1 bg-slate-100 rounded">DOC</span>
                      <span className="px-2 py-1 bg-slate-100 rounded">DOCX</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      Maximum file size: 5MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl" data-testid="file-preview">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <File className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded font-medium">
                          {getFileIcon()}
                        </span>
                        <span className="text-sm text-slate-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                    data-testid="remove-file-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role Selection */}
          <Card className="card-elevated mb-8 animate-fade-in-up stagger-2">
            <CardContent className="p-6 sm:p-8">
              <label className="label-uppercase mb-4 block">Target Role</label>
              <Select value={targetRole} onValueChange={setTargetRole} data-testid="role-select">
                <SelectTrigger className="w-full h-14 rounded-xl text-left" data-testid="role-select-trigger">
                  <SelectValue placeholder="Select the role you're applying for" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  {roleCategories.map((category) => (
                    <SelectGroup key={category.category}>
                      <SelectLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-2">
                        {category.category}
                      </SelectLabel>
                      {category.roles.map((role) => (
                        <SelectItem 
                          key={role.value} 
                          value={role.value}
                          data-testid={`role-option-${role.value}`}
                        >
                          <div className="flex items-center gap-3">
                            <role.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            <div>
                              <p className="font-medium">{role.label}</p>
                              <p className="text-xs text-slate-500">{role.description}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Analyzing your resume...</span>
                <span className="text-sm font-medium text-primary">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" data-testid="upload-progress" />
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!file || !targetRole || isUploading}
            className="w-full btn-primary btn-shine py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            data-testid="analyze-btn"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* File & Role Status */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className={`flex items-center gap-2 ${file ? 'text-green-600' : 'text-slate-400'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Resume uploaded</span>
            </div>
            <div className={`flex items-center gap-2 ${targetRole ? 'text-green-600' : 'text-slate-400'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Role selected</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 mt-auto">
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
