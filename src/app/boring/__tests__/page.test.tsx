import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BoringPortfolioPage from '../page';
import { ABOUT, CONTACT, PROJECTS, SKILLS } from '@/data/content';

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
            screen.getByRole('heading', { level: 2, name: 'Contact & Links' })
        ).toBeInTheDocument();
    });

    it('renders skills and projects from the data source', () => {
        render(<BoringPortfolioPage />);

        // Find the skills section and check for a skill *within* it
        const skillsSection = screen.getByRole('region', {
            name: /technical skills/i,
        });
        expect(
            within(skillsSection).getByText(new RegExp(SKILLS.frontend[0]))
        ).toBeInTheDocument();

        // Check for all projects
        PROJECTS.forEach((project) => {
            // Find each project article by its accessible name (the heading)
            const projectArticle = screen.getByRole('article', {
                name: project.name,
            });
            // Check for the project description *within* that article
            expect(
                within(projectArticle).getByText(
                    project.details || project.description
                )
            ).toBeInTheDocument();
        });
    });

    it('renders contact information with correct links', () => {
        render(<BoringPortfolioPage />);

        const emailLink = screen.getByRole('link', { name: CONTACT.email });
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', `mailto:${CONTACT.email}`);

        const githubLink = screen.getByRole('link', { name: CONTACT.github });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', `https://${CONTACT.github}`);
    });

    it('contains a link back to the terminal version', () => {
        render(<BoringPortfolioPage />);
        const terminalLink = screen.getByRole('link', {
            name: 'terminal version',
        });
        expect(terminalLink).toBeInTheDocument();
        expect(terminalLink).toHaveAttribute('href', '/');
    });
});
