import { CONTACT } from '@/data/content';
import ResumeButton from './ResumeButton';

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="mt-8 rounded-xl bg-gray-50 p-8 text-center"
        >
            <h2 className="mb-4 text-2xl font-bold">Get In Touch</h2>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                I am always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
            </p>
            <div className="flex justify-center gap-4">
                <a
                    href={`mailto:${CONTACT.email}`}
                    className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                    Email Me
                </a>
                <ResumeButton />
            </div>
        </section>
    );
}
