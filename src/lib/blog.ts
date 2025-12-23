import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
    tags: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR);

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const filePath = path.join(BLOG_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace('.mdx', ''),
                title: data.title,
                date: data.date,
                description: data.description,
                tags: data.tags || [],
                content,
            };
        })
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title,
            date: data.date,
            description: data.description,
            tags: data.tags || [],
            content,
        };
    } catch {
        return null;
    }
}
