// Testimonials module
const testimonials = [
    {
        quote: "Luis built our company website in record time. The design is clean, professional, and our clients love it.",
        author: "Carlos M.",
        company: "YCC Cleaning Services"
    },
    {
        quote: "The chess course on Udemy was exactly what I needed. Clear explanations and practical code from day one.",
        author: "María P.",
        company: "Udemy Student"
    },
    {
        quote: "Our invoicing system works flawlessly. Luis understood our requirements and delivered beyond expectations.",
        author: "Roberto A.",
        company: "FacturaAmerica"
    },
    {
        quote: "Mentores Virtuales helped us launch our online presence quickly and affordably. Highly recommended!",
        author: "Ana G.",
        company: "Farmacia Central"
    },
    {
        quote: "Professional, responsive, and always available. The best web developer we've worked with in El Salvador.",
        author: "David L.",
        company: "E.M.A Tire & Auto"
    },
    {
        quote: "The English platform he built for our call center training has been a game changer for our students.",
        author: "Sandra V.",
        company: "EnglishForCallCenter"
    }
];

export function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    // Show 3 random testimonials
    const shuffled = testimonials.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    container.innerHTML = selected.map(t => `
        <article class="testimonial-card">
            <blockquote>"${t.quote}"</blockquote>
            <cite>— ${t.author}, ${t.company}</cite>
        </article>
    `).join('');
}
