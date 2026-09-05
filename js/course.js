const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program design and development using Python.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to simple software design and programming concepts.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students write code with functions and test their code using pytest.',
        technology: ['Python', 'pytest'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces object-oriented programming using C#.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic web pages using JavaScript, HTML, and CSS.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, compliance, and API integration.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseContainer = document.getElementById('course-container');
    const totalCreditsElement = document.getElementById('total-credits');
    
    const allBtn = document.getElementById('all-btn');
    const cseBtn = document.getElementById('cse-btn');
    const wddBtn = document.getElementById('wdd-btn');

    function displayCourses(courseList) {
        courseContainer.innerHTML = '';

        courseList.forEach(course => {
            const card = document.createElement('div');
            card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
            
            const title = document.createElement('p');
            title.textContent = `${course.subject} ${course.number}`;
            
            card.appendChild(title);
            courseContainer.appendChild(card);
        });

        const totalCredits = courseList.reduce((acc, course) => acc + course.credits, 0);
        totalCreditsElement.textContent = `Total Credits Required: ${totalCredits}`;
    }

    function setActiveButton(activeBtn) {
        [allBtn, cseBtn, wddBtn].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    allBtn.addEventListener('click', () => {
        displayCourses(courses);
        setActiveButton(allBtn);
    });

    cseBtn.addEventListener('click', () => {
        const filtered = courses.filter(course => course.subject === 'CSE');
        displayCourses(filtered);
        setActiveButton(cseBtn);
    });

    wddBtn.addEventListener('click', () => {
        const filtered = courses.filter(course => course.subject === 'WDD');
        displayCourses(filtered);
        setActiveButton(wddBtn);
    });

    // Initial Display
    displayCourses(courses);
});