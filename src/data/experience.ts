export type Role = {
  company: string
  role: string
  /** e.g. '2024 — 2025' or '2025 — Now' */
  period: string
}

/** Most recent first. The Experience section stays hidden while this is empty. */
export const experience: Role[] = [
  { company: 'Ferdar Limited', role: 'Founder', period: 'Sep 2026 — Now' },
  { company: 'Private client', role: 'Freelance Web Developer', period: 'Jul 2026 — Now' },
  { company: 'Great Brands Nigeria Limited', role: 'IT Support', period: 'SIWES' },
  { company: 'Independent', role: 'Web3 Writer', period: 'X · Substack · Medium · Reddit' },
]
