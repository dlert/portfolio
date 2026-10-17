export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  stack: string[]
  /** Short status shown next to the project number, e.g. 'In development'. Omit when shipped. */
  status?: string
  /** Public GitHub URL. Leave undefined for private repos. */
  repo?: string
  /** Live URL, if deployed. */
  live?: string
  /**
   * Screenshot path. Drop an image at /public/projects/<slug>.png (or change the path)
   * and it replaces the placeholder automatically.
   */
  image: string
}

export const projects: Project[] = [
  {
    slug: 'face-recognition-attendance',
    title: 'Face Recognition Attendance',
    tagline: 'Attendance by face, at 98% validation accuracy',
    description:
      'Paper registers are slow and easy to fake. This system takes attendance by recognising each student’s face, using a FaceNet model fine-tuned with two-stage transfer learning. Built as my final-year project.',
    highlights: [
      'Stage 1 trained a new classifier on frozen FaceNet (~95%); stage 2 fine-tuned its deeper layers (98%)',
      'Trained on 234 face images from 23 students, on CPU only',
      'L2 regularisation, 0.6 dropout and data augmentation held the overfitting gap to 0.01',
      '5.3 points above the 92.7% reported by Verma et al. (2024) for a comparable CNN system',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'FaceNet', 'OpenCV', 'scikit-learn', 'Google Colab'],
    image: '/projects/face-recognition-attendance.png',
  },
  {
    slug: 'daily-loop',
    title: 'Daily Loop',
    tagline: 'An AI buddy that runs your day from a conversation',
    description:
      'Productivity apps make you fill in forms. Daily Loop lets you just talk: things you’ve done go into a self-writing journal, and things you plan to do become tasks with alarms.',
    highlights: [
      'Every message is sorted into a journal entry or a task automatically',
      'Tasks carry real alarms, so “remind me at 3pm” rings at 3pm',
      'One codebase for Android and iOS',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Claude API'],
    status: 'In development',
    image: '/projects/daily-loop.png',
  },
  {
    slug: 'corporate-website',
    title: 'Corporate Website',
    tagline: 'Client website for a limited company',
    description:
      'A corporate website for a private client, built through Ferdar Limited. The client name is withheld at their request; the live link goes up when it launches.',
    highlights: ['Designed and built end to end under Ferdar Limited', 'In progress since July 2026'],
    stack: [],
    status: 'In progress',
    image: '/projects/corporate-website.png',
  },
]
