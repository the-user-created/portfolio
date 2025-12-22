import React from 'react';
import {
    Document,
    Font,
    Link,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';
import {
    ABOUT,
    CONTACT,
    EDUCATION,
    EXPERIENCE,
    INTERESTS,
    PROJECTS,
    SKILLS,
} from '@/data/content';

// Register standard fonts
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/1.ttf' }, // Fallback to standard
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 8,
        color: '#000',
    },
    role: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        fontSize: 9,
        color: '#555',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
        paddingBottom: 2,
        color: '#000',
    },
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#222',
    },
    itemSubtitle: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#444',
    },
    itemDate: {
        fontSize: 9,
        color: '#666',
        textAlign: 'right',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 5,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletContent: {
        flex: 1,
        fontSize: 9,
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
    },
    skillsRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    skillCategory: {
        width: 80,
        fontWeight: 'bold',
        fontSize: 9,
    },
    skillList: {
        flex: 1,
        fontSize: 9,
    },
});

const ResumeDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{ABOUT.name}</Text>
                <Text style={styles.role}>{ABOUT.role}</Text>
                <View style={styles.contactRow}>
                    <Link src={`mailto:${CONTACT.email}`} style={styles.link}>
                        {CONTACT.email}
                    </Link>
                    <Link src={`https://${CONTACT.github}`} style={styles.link}>
                        GitHub
                    </Link>
                    <Link
                        src={`https://${CONTACT.linkedin}`}
                        style={styles.link}
                    >
                        LinkedIn
                    </Link>
                    <Link src="https://davidyoung.co.za" style={styles.link}>
                        Portfolio
                    </Link>
                </View>
                <Text style={{ marginTop: 8, fontSize: 9 }}>{ABOUT.bio}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {EXPERIENCE.map((job, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemHeader}>
                            <View>
                                <Text style={styles.itemTitle}>
                                    {job.company}
                                </Text>
                                <Text style={styles.itemSubtitle}>
                                    {job.role}
                                </Text>
                            </View>
                            <Text style={styles.itemDate}>{job.period}</Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 9,
                                marginBottom: 4,
                                color: '#444',
                            }}
                        >
                            {job.description}
                        </Text>
                        {job.details.map((detail, idx) => (
                            <View key={idx} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletContent}>
                                    {detail}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                <View style={styles.skillsRow}>
                    <Text style={styles.skillCategory}>Languages</Text>
                    <Text style={styles.skillList}>
                        {SKILLS.languages.join(', ')}
                    </Text>
                </View>
                <View style={styles.skillsRow}>
                    <Text style={styles.skillCategory}>Frameworks</Text>
                    <Text style={styles.skillList}>
                        {SKILLS.frameworks.join(', ')}
                    </Text>
                </View>
                <View style={styles.skillsRow}>
                    <Text style={styles.skillCategory}>Tools & Cloud</Text>
                    <Text style={styles.skillList}>
                        {[...SKILLS.tools, ...SKILLS.cloud].join(', ')}
                    </Text>
                </View>
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Selected Projects</Text>
                {PROJECTS.slice(0, 3).map((proj, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{proj.title}</Text>
                        </View>
                        <Text style={{ fontSize: 9, marginBottom: 2 }}>
                            {proj.description}
                        </Text>
                        <Text
                            style={{
                                fontSize: 8,
                                color: '#666',
                                fontStyle: 'italic',
                            }}
                        >
                            Stack: {proj.stack.join(', ')}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {EDUCATION.map((edu, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemHeader}>
                            <View>
                                <Text style={styles.itemTitle}>
                                    {edu.school}
                                </Text>
                                <Text style={styles.itemSubtitle}>
                                    {edu.degree}
                                </Text>
                            </View>
                            <Text style={styles.itemDate}>{edu.year}</Text>
                        </View>
                        <Text style={{ fontSize: 9 }}>{edu.details}</Text>
                    </View>
                ))}
            </View>

            {/* Interests */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interests</Text>
                {INTERESTS.map((interest, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{interest.title}</Text>
                        <Text style={{ fontSize: 9, color: '#444' }}>
                            {interest.description}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ResumeDocument;
