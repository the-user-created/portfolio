import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BoringPortfolioPage from '../page';
import {
    ABOUT,
    AWARDS,
    CONTACT,
    EXPERIENCE,
    PROJECTS,
    SKILLS,
    VOLUNTEER,
} from '@/data/content';

// Mock next/dynamic to bypass the loading state and render a dummy button synchronously.
// This ensures the test finds the "Download Resume" button immediately.
vi.mock('next/dynamic', () => ({
    default: () => {
        const MockComponent = () => <button>Download Resume</button>;
        MockComponent.displayName = 'LoadableComponent';
        return MockComponent;
    },
}));

describe('BoringPortfolioPage', () => {
    it('renders all main sections of the portfolio', () => {
        render(<BoringPortfolioPage />);

        // Check for header content
        expect(
            screen.getByRole('heading', { level: 1, name: ABOUT.name })
        ).toBeInTheDocument();
        expect(screen.getByText(ABOUT.role)).toBeInTheDocument();

        // Check for section headings
        expect(
            screen.getByRole('heading', { level: 2, name: 'Technical Skills' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: 'Featured Projects' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: 'Experience' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: 'Education' })
        ).toBeInTheDocument();
    });

    it('renders skills and projects from the data source', () => {
        render(<BoringPortfolioPage />);

        const skillsSection = screen.getByRole('region', {
            name: /technical skills/i,
        });

        const firstSkill = SKILLS.languages[0].replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
        );

        expect(
            within(skillsSection).getByText(new RegExp(firstSkill))
        ).toBeInTheDocument();

        PROJECTS.forEach((project) => {
            const projectArticle = screen.getByRole('article', {
                name: project.title,
            });

            expect(
                within(projectArticle).getByText(
                    project.overview || project.description
                )
            ).toBeInTheDocument();
        });
    });

    it('renders experience items', () => {
        render(<BoringPortfolioPage />);
        const expSection = screen.getByRole('region', { name: /experience/i });

        EXPERIENCE.forEach((job) => {
            expect(
                within(expSection).getByText(job.company)
            ).toBeInTheDocument();
            expect(within(expSection).getByText(job.role)).toBeInTheDocument();
        });
    });

    it('renders contact information with correct links', () => {
        render(<BoringPortfolioPage />);

        // There may be multiple links (header and footer), grabbing all
        const emailLinks = screen.getAllByRole('link', { name: CONTACT.email });
        expect(emailLinks[0]).toBeInTheDocument();
        expect(emailLinks[0]).toHaveAttribute(
            'href',
            `mailto:${CONTACT.email}`
        );

        // Checking GitHub link in header
        const githubLink = screen.getByRole('link', { name: 'GitHub' });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', `https://${CONTACT.github}`);
    });

    it('contains a link back to the terminal version', () => {
        render(<BoringPortfolioPage />);
        const terminalLink = screen.getByRole('link', {
            name: /switch to terminal mode/i,
        });
        expect(terminalLink).toBeInTheDocument();
        expect(terminalLink).toHaveAttribute('href', '/');
    });

    it('renders experience items with optional links', () => {
        render(<BoringPortfolioPage />);
        const expSection = screen.getByRole('region', { name: /experience/i });

        EXPERIENCE.forEach((job) => {
            if (job.link) {
                const link = within(expSection).getByRole('link', {
                    name: job.company,
                });
                expect(link).toBeInTheDocument();
                expect(link).toHaveAttribute('href', job.link);
            } else {
                expect(
                    within(expSection).getByText(job.company)
                ).toBeInTheDocument();
            }
            expect(within(expSection).getByText(job.role)).toBeInTheDocument();
        });
    });

    it('renders project links including PDF reports', () => {
        render(<BoringPortfolioPage />);

        PROJECTS.forEach((project) => {
            const projectArticle = screen.getByRole('article', {
                name: project.title,
            });

            if (project.github) {
                expect(
                    within(projectArticle).getByRole('link', {
                        name: /view source/i,
                    })
                ).toHaveAttribute('href', project.github);
            }

            if (project.reportUrl) {
                expect(
                    within(projectArticle).getByRole('link', {
                        name: /download pdf/i,
                    })
                ).toHaveAttribute('href', project.reportUrl);
            }
        });
    });

    it('renders awards and volunteer links correctly', () => {
        render(<BoringPortfolioPage />);
        // Check Awards links
        AWARDS.forEach((award) => {
            if (award.link) {
                const link = screen.getByRole('link', { name: award.title });
                expect(link).toHaveAttribute('href', award.link);
            } else {
                expect(screen.getByText(award.title)).toBeInTheDocument();
            }
        });

        // Check Volunteer links
        VOLUNTEER.forEach((vol) => {
            if (vol.link) {
                const link = screen.getByRole('link', {
                    name: vol.organization,
                });
                expect(link).toHaveAttribute('href', vol.link);
            } else {
                expect(screen.getByText(vol.organization)).toBeInTheDocument();
            }
        });
    });

    it('renders the resume download button', () => {
        render(<BoringPortfolioPage />);
        const resumeBtn = screen.getByRole('button', {
            name: /download resume/i,
        });
        expect(resumeBtn).toBeInTheDocument();
    });
});
