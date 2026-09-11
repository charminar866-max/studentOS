export type UserRole = 'student' | 'job_seeker' | 'teacher' | 'employer' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  mobile_number?: string | null;
  country: string;
  state?: string | null;
  role: UserRole;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeedbackItem {
  id: string;
  user_id?: string | null;
  email?: string | null;
  rating: number;
  category: string;
  message: string;
  page_url: string;
  user_agent?: string | null;
  status: 'new' | 'reviewed' | 'resolved';
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string | null;
  description: string;
  category: string;
  created_at: string;
}

export interface ResumeData {
  id: string;
  user_id: string;
  title: string;
  content: {
    personalDetails: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
    }>;
    skills: string[];
  };
  created_at: string;
  updated_at: string;
}
