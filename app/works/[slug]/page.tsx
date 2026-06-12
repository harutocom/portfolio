import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '../../caseStudies';
import CaseStudyView from './CaseStudyView';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(c => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title.ja} | Case Study`,
    description: cs.tagline.ja,
    openGraph: {
      title: `${cs.title.ja} | Case Study`,
      description: cs.tagline.en,
      type: 'article',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return <CaseStudyView caseStudy={cs} />;
}
