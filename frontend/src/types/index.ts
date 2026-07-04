export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  thumbnail?: string | null;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  percentage: number;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  cgpa?: string | null;
  startYear: number;
  endYear?: number | null;
}

export type BlogStatus = "DRAFT" | "PUBLISHED";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  category?: string | null;
  status: BlogStatus;
  createdAt: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl?: string | null;
  verifyUrl?: string | null;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  replied: boolean;
  createdAt: string;
}

export interface SiteSettings {
  id: number;
  fullName: string;
  role: string;
  tagline: string;
  bio: string;
  location?: string | null;
  email: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  resumeUrl?: string | null;
  updatedAt: string;
}

export interface DashboardOverview {
  projects: number;
  blogs: number;
  messages: number;
  unreadMessages: number;
  certificates: number;
  visitors: number;
}
