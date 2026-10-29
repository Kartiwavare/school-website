import type { Metadata } from 'next';
import TeamPage from '@/components/TeamPage';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the school leadership, teaching and support teams at Residential Highschool & Junior College of Science, Shevgaon.',
};

export default function Page() {
  return <TeamPage />;
}
