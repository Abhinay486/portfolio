
const projectItems = document.querySelectorAll(".project-item");
const detailTitle = document.querySelector("#project-title");
const detailDescription = document.querySelector("#project-description");
const highlightList = document.querySelector("#highlight-list");
const techList = document.querySelector("#tech-list");

projectItems.forEach(item => {
    item.addEventListener("click", () => {
        const index = item.getAttribute("data-index");
        const project = projects[index];

        // Update title and description
        detailTitle.textContent = project.title;
        detailDescription.textContent = project.description;

        // Update highlights
        highlightList.innerHTML = "";
        project.highlights.forEach(h => {
            const li = document.createElement("li");
            li.className = "flex gap-2 items-start text-xs md:text-sm";
            li.innerHTML = `<span class="text-light opacity-50 mt-1">→</span><span>${h}</span>`;
            highlightList.appendChild(li);
        });

        // Update technologies
        techList.innerHTML = "";
        project.technologies.forEach(tech => {
            const techItem = document.createElement("span");
            techItem.className = "inline-block bg-muted bg-opacity-10 px-2 py-1 rounded text-xs mr-2 mb-2";
            techItem.textContent = tech;
            techList.appendChild(techItem);
        });

        // Highlight active item
        projectItems.forEach(p => p.classList.remove("bg-secondary", "bg-opacity-30", "border-accent"));
        item.classList.add("bg-secondary", "bg-opacity-30", "border-accent");
    });
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// CTA button smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Message Sent!';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
});

// Add some interactive cursor effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.5;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }

    const cursorElement = document.querySelector('.cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    element.style.width = 'fit-content';
    element.style.margin = '0 auto';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Get the h1 element
const nameElement = document.querySelector('.hero h1');
const originalText = "Abhinay Silaparasetti";

// Start the typing effect when the page loads
window.addEventListener('load', () => {
    typeEffect(nameElement, originalText, 50);
});

function renderProjects() {
    const desktopList = document.getElementById('desktop-project-list');
    desktopList.innerHTML = '';
    projects.forEach((project, idx) => {
        const item = document.createElement('div');
        item.className = `project-item p-4 cursor-pointer rounded-md ${idx === 0 ? 'bg-secondary bg-opacity-30 border-l-4 border-accent' : 'border-l-4 border-transparent hover:border-accent'}`;
        item.setAttribute('data-index', idx);
        item.innerHTML = `<h3 class="font-medium text-sm mb-1 ${idx === 0 ? 'text-light' : 'text-muted'}">${project.title.split(' - ')[0]}</h3><p class="text-xs text-muted line-clamp-1">${project.technologies.join(', ')}</p>`;
        item.addEventListener('click', () => selectProject(idx));
        desktopList.appendChild(item);
    });
}

function selectProject(idx) {
    // Highlight selected
    document.querySelectorAll('#desktop-project-list .project-item').forEach((el, i) => {
        if (i === idx) {
            el.classList.add('bg-secondary', 'bg-opacity-30', 'border-accent');
            el.querySelector('h3').classList.remove('text-muted');
            el.querySelector('h3').classList.add('text-light');
        } else {
            el.classList.remove('bg-secondary', 'bg-opacity-30', 'border-accent');
            el.querySelector('h3').classList.remove('text-light');
            el.querySelector('h3').classList.add('text-muted');
        }
    });
    // Update details
    const project = projects[idx];
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-description').textContent = project.description;
    const highlightList = document.getElementById('highlight-list');
    highlightList.innerHTML = '';
    project.highlights.forEach(h => {
        const li = document.createElement('li');
        li.className = 'flex gap-2 items-start text-xs md:text-sm';
        li.innerHTML = `<span class="text-light opacity-50 mt-1">→</span><span>${h}</span>`;
        highlightList.appendChild(li);
    });
    const techList = document.getElementById('tech-list');
    techList.innerHTML = '';
    project.technologies.forEach(tech => {
        const techItem = document.createElement('span');
        techItem.className = 'inline-block bg-muted bg-opacity-10 px-2 py-1 rounded text-xs mr-2 mb-2';
        techItem.textContent = tech;
        techList.appendChild(techItem);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    selectProject(0);
});
const projectsData = [
  {
    id: 1,
    title: 'Fav Image Share',
    description:
      'A social image-sharing platform where users can upload photos, write captions, comment, follow others, and discover posts through smart hashtag search.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['web app', 'AI', 'social'],
    techStack: [
      'React',
      'Node.js',
      'MongoDB',
      'Tailwind CSS',
      'Cloudinary',
      'Gemini API',
      'JWT'
    ],
    githubUrl: 'https://github.com/Abhinay486/fav-image-share-main',
    liveUrl: 'https://fav-image-share-main.vercel.app',
  },
  {
    id: 2,
    title: 'Medical Image Analyzer',
    description:
      'AI-powered medical image analyzer providing diagnoses, causes, treatment plans, and precautions from user-uploaded images with multi-image comparison and user history tracking.',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['web app', 'AI', 'medical'],
    techStack: [
      'React',
      'Node.js',
      'Express',
      'Tailwind CSS',
      'Gemini API',
      'Clerk Auth'
    ],
    githubUrl: 'https://github.com/Abhinay486/hacktblkn',
    liveUrl: 'https://hacktblkn.vercel.app',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'Personal portfolio built to showcase skills, certifications, and projects using a clean, component-based architecture and optimized for SEO and performance.',
    image: 'https://images.pexels.com/photos/3584999/pexels-photo-3584999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['portfolio', 'websites', 'design'],
    techStack: ['React', 'Tailwind CSS', 'Git', 'Netlify'],
    githubUrl: 'https://github.com/Abhinay486/Portfolio',
    liveUrl: 'https://portfolio-seven-peach-18.vercel.app',
  },
  {
    id: 4,
    title: 'Notes Sphere',
    description:
      'Personal portfolio built to showcase skills, certifications, and projects using a clean, component-based architecture and optimized for SEO and performance.',
    image: 'https://res.cloudinary.com/dlfy95xyl/image/upload/f_auto,q_auto/v1750901568/pins/y8a1lrpli8hmz8xxxp0l.png',
    categories: ['portfolio', 'websites', 'design'],
    techStack: ['React', 'Tailwind CSS', 'Git', 'Netlify'],
    githubUrl: 'https://github.com/Abhinay486/noteai',
    liveUrl: 'https://notes1ai.vercel.app',
  },
];

  
  const techColors = {
    'React': 'bg-blue-900/50 text-blue-300 border-blue-600/50',
    'TypeScript': 'bg-blue-800/50 text-blue-200 border-blue-500/50',
    'JavaScript': 'bg-yellow-900/50 text-yellow-300 border-yellow-600/50',
    'Node.js': 'bg-green-900/50 text-green-300 border-green-600/50',
    'Express': 'bg-gray-800/50 text-gray-300 border-gray-600/50',
    'MongoDB': 'bg-green-900/50 text-green-300 border-green-600/50',
    'Next.js': 'bg-gray-900/50 text-gray-300 border-gray-700/50',
    'Vue': 'bg-emerald-900/50 text-emerald-300 border-emerald-600/50',
    'TailwindCSS': 'bg-cyan-900/50 text-cyan-300 border-cyan-600/50',
    'SASS': 'bg-pink-900/50 text-pink-300 border-pink-600/50',
    'Redux': 'bg-purple-900/50 text-purple-300 border-purple-600/50',
    'Firebase': 'bg-amber-900/50 text-amber-300 border-amber-600/50',
    'GraphQL': 'bg-pink-900/50 text-pink-300 border-pink-600/50',
    'AWS': 'bg-orange-900/50 text-orange-300 border-orange-600/50',
    'Docker': 'bg-blue-900/50 text-blue-300 border-blue-600/50',
  };
  
  const createTechBadge = (tech) => {
    const classes = techColors[tech] || 'bg-gray-800/50 text-gray-300 border-gray-600/50';
    return `<span class="px-3 py-1 text-xs font-medium rounded-full border ${classes}">${tech}</span>`;
  };
  
  const createProjectCard = (project) => {
    const categories = project.categories.map(
      (cat) => `<span class="px-2 py-1 text-xs font-medium rounded-md bg-gray-700/80 text-gray-300">${cat}</span>`
    ).join('');
  
    const techBadges = project.techStack.map(createTechBadge).join('');
  
    return `
      <div class="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 h-full">
        <div class="relative h-60 overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          <div class="absolute top-3 left-3 flex flex-wrap gap-2">
            ${categories}
          </div>
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="absolute top-3 right-3 p-2 rounded-full bg-gray-700/80 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 3h7v7m0 0L10 21l-7-7L17 3z"/>
            </svg>
          </a>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
          <p class="text-gray-400 mb-5">${project.description}</p>
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-400 mb-2">Tech Stack</h4>
            <div class="flex flex-wrap gap-2">${techBadges}</div>
          </div>
          <div class="flex gap-4 justify-between">
            <a href="${project.githubUrl}" target="_blank" class="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.373 0 12a12.01 12.01 0 008.208 11.386c.6.11.82-.26.82-.577v-2.1c-3.338.728-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.204.085 1.837 1.238 1.837 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.42-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.933 0-1.31.468-2.38 1.235-3.22-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.53 11.53 0 013.004-.404c1.02.005 2.047.137 3.004.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.476 5.922.43.37.814 1.102.814 2.222v3.293c0 .32.218.694.825.576A12.01 12.01 0 0024 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="${project.liveUrl}" target="_blank" class="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 3h7v7m0 0L10 21l-7-7L17 3z"/>
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    `;
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = projectsData.map(createProjectCard).join('');
  });
  