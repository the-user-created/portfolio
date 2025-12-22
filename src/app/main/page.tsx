import { Metadata } from 'next';
import { ABOUT, PROJECTS, SKILLS } from '@/data/content';
import ProjectsGrid from '@/components/ProjectsGrid';
import Header from '@/components/Header';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import AwardsVolunteering from '@/components/AwardsVolunteering';
import Interests from '@/components/Interests';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Developer Portfolio',
    description: `The professional portfolio for ${ABOUT.name}, a ${ABOUT.role}. Showcasing skills in ${SKILLS.languages.join(', ')}, and more.`,
};

export default function PortfolioPage() {
    return (
        <div className="mx-auto max-w-4xl bg-white p-8 font-sans text-gray-800">
            <Header />

            <main className="space-y-16">
                <Experience />

                <section id="projects" aria-labelledby="projects-heading">
                    <h2
                        id="projects-heading"
                        className="mb-6 border-b pb-2 text-3xl font-semibold"
                    >
                        Featured Projects
                    </h2>
                    <ProjectsGrid projects={PROJECTS} />
                </section>

                <Skills />
                <Education />
                <AwardsVolunteering />
                <Interests />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}
