import { ABOUT } from '@/data/content';

export default function Footer() {
    return (
        <footer className="mt-20 border-t pt-8 text-center text-sm text-gray-500">
            <p>
                &copy; {new Date().getFullYear()} {ABOUT.name}. All rights
                reserved.
            </p>
        </footer>
    );
}
