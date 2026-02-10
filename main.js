const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Data Analyst","SQL Developer", "Business Analyst", "BI Developer", "Product Analyst", "Analytics Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

// PROJECT MODAL FUNCTIONALITY
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

// Project data (dummy content for now)
const projectData = {
    ecommerce: {
        title: "E-Commerce Analytics Dashboard",
        image: "images/Cleveroad.jpg",
        objective: "Built a comprehensive analytics dashboard to track customer behavior, sales trends, and inventory management for an e-commerce platform. The goal was to provide real-time insights to drive strategic business decisions and optimize operations.",
        techStack: ["SQL", "Python", "Power BI", "Pandas", "MySQL"],
        insights: [
            "Identified 35% increase in customer retention through cohort analysis",
            "Discovered peak shopping hours leading to 22% improvement in ad campaign timing",
            "Reduced cart abandonment by 18% through behavioral pattern analysis",
            "Optimized inventory levels resulting in 15% cost reduction"
        ],
        impact: "The dashboard enabled stakeholders to make data-driven decisions in real-time, resulting in a 28% increase in overall revenue and improved operational efficiency across all departments."
    },
    portfolio: {
        title: "Portfolio Performance Analytics",
        image: "images/Capture d'écran 2025-10-22 182207.png",
        objective: "Developed an advanced analytics solution to track portfolio website performance, user engagement metrics, and conversion rates. Aimed to optimize user experience and increase visitor-to-client conversion rates.",
        techStack: ["Python", "Google Analytics API", "Tableau", "SQL"],
        insights: [
            "Identified optimal content types increasing engagement by 45%",
            "Discovered key user journey patterns leading to 32% higher conversions",
            "Analyzed bounce rates across pages, reducing them by 27%",
            "Tracked A/B test results showing 40% improvement in CTA effectiveness"
        ],
        impact: "Delivered comprehensive insights that helped redesign the portfolio structure, resulting in 3x more client inquiries and significantly improved user retention metrics."
    },
    weather: {
        title: "Weather Data Analytics Platform",
        image: "images/Weather Forecast Dashboard.jpg",
        objective: "Created a real-time weather analytics platform integrating multiple API sources to provide accurate forecasting and historical trend analysis. The system helps users make informed decisions based on weather patterns.",
        techStack: ["Python", "REST APIs", "PostgreSQL", "React", "Chart.js"],
        insights: [
            "Integrated 5+ weather APIs to improve forecast accuracy by 23%",
            "Analyzed 10 years of historical data to identify seasonal patterns",
            "Built predictive models with 89% accuracy for 7-day forecasts",
            "Created interactive visualizations for complex weather data"
        ],
        impact: "Enabled users to plan activities with greater confidence, with 94% user satisfaction rating and over 10,000 active monthly users relying on the platform for weather insights."
    },
    blog: {
        title: "Blog Content Analytics System",
        image: "images/WordPress dashboard design concept.jpg",
        objective: "Engineered a content analytics system to measure blog performance, reader engagement, and SEO effectiveness. The solution provides writers with actionable insights to optimize their content strategy.",
        techStack: ["Python", "SQL", "Power BI", "Google Analytics", "NLP"],
        insights: [
            "Identified top-performing content topics with 3x higher engagement",
            "Analyzed reader behavior showing optimal post length of 1,200-1,500 words",
            "Discovered best publishing times resulting in 56% more views",
            "Used sentiment analysis to improve content tone and reader satisfaction"
        ],
        impact: "Content creators achieved 67% increase in organic traffic and 45% improvement in average time on page, significantly boosting overall blog performance and reader loyalty."
    },
    game: {
        title: "Game Analytics Dashboard",
        image: "images/Game Dashboard Design.jpg",
        objective: "Developed a comprehensive gaming analytics platform to track player behavior, monetization metrics, and game performance indicators. Designed to help game developers optimize user experience and increase revenue.",
        techStack: ["SQL", "Python", "Unity Analytics", "Power BI", "MongoDB"],
        insights: [
            "Identified player retention patterns improving day-7 retention by 41%",
            "Analyzed in-game purchase behavior increasing revenue per user by 34%",
            "Discovered optimal difficulty curves reducing player churn by 28%",
            "Tracked A/B test results for new features with 95% statistical confidence"
        ],
        impact: "Game developers achieved 52% increase in player lifetime value and 38% improvement in overall engagement metrics, leading to sustainable growth and higher player satisfaction."
    },
    task: {
        title: "Task Management Analytics",
        image: "images/Task manager app.jpg",
        objective: "Built an analytics layer for a task management application to provide insights into productivity patterns, task completion rates, and team collaboration metrics. Helps teams optimize their workflows and improve efficiency.",
        techStack: ["SQL", "Python", "Flask", "PostgreSQL", "D3.js"],
        insights: [
            "Identified peak productivity hours for team members increasing output by 31%",
            "Analyzed task completion patterns showing bottlenecks in workflow",
            "Discovered collaboration patterns improving team efficiency by 25%",
            "Tracked project timelines with 92% accuracy in deadline predictions"
        ],
        impact: "Teams using the analytics platform reported 43% improvement in project delivery times and 36% increase in overall productivity, with better resource allocation and task prioritization."
    }
};

// Open modal when clicking on project card
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on buttons
        if (e.target.closest('.btn')) {
            return;
        }
        
        const projectId = this.dataset.project;
        const project = projectData[projectId];
        
        if (project) {
            // Update modal content
            document.getElementById('modal-project-title').textContent = project.title;
            document.getElementById('modal-project-image').src = project.image;
            document.getElementById('modal-objective').textContent = project.objective;
            document.getElementById('modal-impact').textContent = project.impact;
            
            // Update tech stack
            const techStackContainer = document.getElementById('modal-tech-stack');
            techStackContainer.innerHTML = '';
            project.techStack.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.textContent = tech;
                techStackContainer.appendChild(badge);
            });
            
            // Update insights
            const insightsList = document.getElementById('modal-insights');
            insightsList.innerHTML = '';
            project.insights.forEach(insight => {
                const li = document.createElement('li');
                li.textContent = insight;
                insightsList.appendChild(li);
            });
            
            // Show modal with animation
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal when clicking X button
modalClose.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});