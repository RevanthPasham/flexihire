// DOM Elements
const loginButton = document.getElementById("login-button")
const registerButton = document.getElementById("register-button")
const loginModal = document.getElementById("login-modal")
const registerModal = document.getElementById("register-modal")
const otpModal = document.getElementById("otp-modal")
const profileModal = document.getElementById("profile-modal")
const savedJobsModal = document.getElementById("saved-jobs-modal")
const jobDetailModal = document.getElementById("job-detail-modal")
const applyJobModal = document.getElementById("apply-job-modal")
const internshipPopup = document.getElementById("internship-popup")
const userProfile = document.getElementById("user-profile")
const username = document.getElementById("username")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const jobListings = document.getElementById("job-listings")
const salaryFilter = document.getElementById("salary-filter")
const salaryValue = document.getElementById("salary-value")
const applyFilters = document.getElementById("apply-filters")
const resetFilters = document.getElementById("reset-filters")
const switchToRegister = document.getElementById("switch-to-register")
const switchToLogin = document.getElementById("switch-to-login")
const logoutButton = document.getElementById("logout")
const viewProfileButton = document.getElementById("view-profile")
const viewSavedJobsButton = document.getElementById("view-saved-jobs")
const viewApplicationsButton = document.getElementById("view-applications")
const viewResumeButton = document.getElementById("view-resume")
const closeButtons = document.querySelectorAll(".close")
const closePopupButton = document.querySelector(".close-popup")
const otpInputs = document.querySelectorAll(".otp-input")
const timerElement = document.getElementById("timer")
const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")
const otpForm = document.getElementById("otp-form")
const applyJobForm = document.getElementById("apply-job-form")
const categoryButtons = document.querySelectorAll(".category-btn")
const gridViewButton = document.getElementById("grid-view")
const listViewButton = document.getElementById("list-view")
const sortOptions = document.getElementById("sort-options")
const prevPageButton = document.getElementById("prev-page")
const nextPageButton = document.getElementById("next-page")
const pageNumbers = document.querySelectorAll(".page-number")
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const totalJobsElement = document.getElementById("total-jobs")
const newTodayElement = document.getElementById("new-today")
const urgentHiringElement = document.getElementById("urgent-hiring")
const notificationToast = document.getElementById("notification-toast")
const languageSelector = document.getElementById("language-selector")
const countrySelector = document.getElementById("country-selector")
const companyCards = document.querySelectorAll(".company-card")

// Page elements
const jobApplicationPage = document.getElementById("job-application-page")
const userProfilePage = document.getElementById("user-profile-page")
const savedJobsPage = document.getElementById("saved-jobs-page")
const applicationsPage = document.getElementById("applications-page")
const resumePage = document.getElementById("resume-page")
const companyJobsPage = document.getElementById("company-jobs-page")

// Global variables
let currentPage = 1
const jobsPerPage = 12
let currentCategory = "all"
let currentView = "grid"
let currentSort = "relevance"
let allJobs = []
let filteredJobs = []
let currentLanguage = "en"
let currentCurrency = "$"
let currentCountry = "global"
const featuredCompanies = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com", jobCount: 0 },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", jobCount: 0 },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", jobCount: 0 },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com", jobCount: 0 },
  { name: "Facebook", logo: "https://logo.clearbit.com/facebook.com", jobCount: 0 },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", jobCount: 0 },
]

// Generate a large dataset of jobs (at least 50 per category)
function generateJobs() {
  const categories = [
    "retail",
    "hospitality",
    "tutoring",
    "delivery",
    "cleaning",
    "catering",
    "security",
    "office",
    "healthcare",
    "it",
    "other",
  ]
  const locations = ["Downtown", "North", "South", "East", "West", "Remote"]
  const timings = ["Weekdays", "Weekends", "Evenings", "Mornings", "Afternoons", "Flexible", "Night Shifts"]
  const experienceLevels = ["entry", "intermediate", "experienced"]
  const educationLevels = ["high-school", "associate", "bachelor", "master", "none"]
  const jobTypes = ["part-time", "contract", "temporary", "internship"]
  const benefits = [
    "Health Insurance",
    "Paid Time Off",
    "Flexible Schedule",
    "Employee Discount",
    "Training Opportunities",
    "Career Advancement",
  ]
  const genders = ["Any", "Male", "Female"]

  const jobs = []
  let id = 1

  // Generate at least 50 jobs for each category
  categories.forEach((category) => {
    for (let i = 0; i < 55; i++) {
      const isUrgent = Math.random() < 0.2
      const isNew = Math.random() < 0.3
      const isRemote = category === "it" ? Math.random() < 0.5 : Math.random() < 0.1
      const hasBenefits = Math.random() < 0.4
      const isAccessible = Math.random() < 0.15

      const salary = Math.floor(Math.random() * 30) + 10
      const location = isRemote ? "Remote" : locations[Math.floor(Math.random() * (locations.length - 1))]
      const timing = timings[Math.floor(Math.random() * timings.length)]
      const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)]
      const education = educationLevels[Math.floor(Math.random() * educationLevels.length)]
      const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)]
      const gender = genders[Math.floor(Math.random() * genders.length)]

      // Generate random date within the last 30 days
      const daysAgo = Math.floor(Math.random() * 30)
      const postedDate = new Date()
      postedDate.setDate(postedDate.getDate() - daysAgo)

      // Select random benefits if applicable
      const jobBenefits = []
      if (hasBenefits) {
        const numBenefits = Math.floor(Math.random() * 4) + 1
        const shuffledBenefits = [...benefits].sort(() => 0.5 - Math.random())
        for (let j = 0; j < numBenefits; j++) {
          jobBenefits.push(shuffledBenefits[j])
        }
      }

      // Generate job title and company based on category
      let title, company, description, requirements, eligibility, tags

      // Randomly assign some jobs to featured companies
      const assignToFeatured = Math.random() < 0.2
      if (assignToFeatured) {
        const featuredCompany = featuredCompanies[Math.floor(Math.random() * featuredCompanies.length)]
        company = featuredCompany.name
        featuredCompany.jobCount++
      }

      switch (category) {
        case "retail":
          const retailPositions = [
            "Sales Associate",
            "Cashier",
            "Stock Clerk",
            "Visual Merchandiser",
            "Customer Service Representative",
            "Retail Assistant",
            "Store Associate",
          ]
          const retailCompanies = [
            "Fashion Forward",
            "Urban Outfitters",
            "Target",
            "Walmart",
            "Best Buy",
            "Macy's",
            "Nordstrom",
            "REI",
            "Apple Store",
            "GameStop",
          ]
          title = retailPositions[Math.floor(Math.random() * retailPositions.length)]
          if (!company) company = retailCompanies[Math.floor(Math.random() * retailCompanies.length)]
          description = `Join our team as a ${title} and help provide exceptional customer service. You'll assist customers, process transactions, and maintain store appearance.`
          requirements = [
            "Customer service experience preferred",
            "Ability to work in a fast-paced environment",
            "Strong communication skills",
            "Availability to work evenings and weekends",
          ]
          eligibility = [
            "Must be 16 years or older",
            "High school diploma or equivalent preferred",
            "Ability to stand for extended periods",
            "Basic math skills",
          ]
          tags = ["Retail", "Customer Service", "Sales"]
          break

        case "hospitality":
          const hospitalityPositions = [
            "Server",
            "Bartender",
            "Host/Hostess",
            "Barista",
            "Food Runner",
            "Dishwasher",
            "Hotel Front Desk",
            "Room Attendant",
          ]
          const hospitalityCompanies = [
            "Hilton Hotels",
            "Marriott",
            "Starbucks",
            "Cheesecake Factory",
            "Olive Garden",
            "Local Brew",
            "City Bistro",
            "Grand Hotel",
          ]
          title = hospitalityPositions[Math.floor(Math.random() * hospitalityPositions.length)]
          if (!company) company = hospitalityCompanies[Math.floor(Math.random() * hospitalityCompanies.length)]
          description = `We're looking for a friendly and energetic ${title} to join our team. You'll provide excellent service to our guests and contribute to a positive dining/staying experience.`
          requirements = [
            "Previous hospitality experience preferred",
            "Excellent customer service skills",
            "Ability to work in a fast-paced environment",
            "Team player attitude",
          ]
          eligibility = [
            "Must be 18 years or older (21+ for bartender positions)",
            "Food handler certification (for food service positions)",
            "Flexible availability including nights and weekends",
            "Ability to lift up to 25 pounds",
          ]
          tags = ["Hospitality", "Customer Service", "Food Service"]
          break

        case "tutoring":
          const subjects = [
            "Math",
            "Science",
            "English",
            "History",
            "Spanish",
            "French",
            "Computer Science",
            "Physics",
            "Chemistry",
            "Biology",
          ]
          const tutoringCompanies = [
            "Kumon",
            "Sylvan Learning",
            "Varsity Tutors",
            "Chegg Tutors",
            "TutorMe",
            "Academic Advantage",
            "BrightMinds Learning Center",
          ]
          const subject = subjects[Math.floor(Math.random() * subjects.length)]
          title = `${subject} Tutor`
          if (!company) company = tutoringCompanies[Math.floor(Math.random() * tutoringCompanies.length)]
          description = `Help students excel in ${subject} through personalized tutoring sessions. You'll develop lesson plans, track progress, and provide feedback to students and parents.`
          requirements = [
            `Strong knowledge of ${subject}`,
            "Previous teaching or tutoring experience preferred",
            "Excellent communication skills",
            "Patience and ability to explain complex concepts",
          ]
          eligibility = [
            "Bachelor's degree in related field preferred",
            "Must pass background check",
            "Comfortable working with students of various ages",
            "Reliable transportation",
          ]
          tags = ["Education", "Teaching", subject]
          break

        // Add more cases for other categories
        case "delivery":
          const deliveryPositions = [
            "Delivery Driver",
            "Courier",
            "Food Delivery",
            "Package Delivery",
            "Bike Messenger",
          ]
          const deliveryCompanies = [
            "DoorDash",
            "Uber Eats",
            "Postmates",
            "Amazon Flex",
            "GrubHub",
            "Instacart",
            "Local Eats",
          ]
          title = deliveryPositions[Math.floor(Math.random() * deliveryPositions.length)]
          if (!company) company = deliveryCompanies[Math.floor(Math.random() * deliveryCompanies.length)]
          description = `Deliver food, packages, or other items to customers in a timely and professional manner. You'll be responsible for ensuring orders are complete and customers are satisfied.`
          requirements = [
            "Valid driver's license with clean driving record",
            "Reliable vehicle or bicycle (depending on position)",
            "Smartphone with data plan",
            "Good navigation skills",
          ]
          eligibility = [
            "Must be 18 years or older",
            "Must have auto insurance (for driving positions)",
            "Ability to lift up to 30 pounds",
            "Availability during peak hours",
          ]
          tags = ["Delivery", "Driving", "Customer Service"]
          break

        case "cleaning":
          const cleaningPositions = [
            "House Cleaner",
            "Office Cleaner",
            "Janitor",
            "Housekeeper",
            "Cleaning Technician",
            "Sanitation Worker",
          ]
          const cleaningCompanies = [
            "Merry Maids",
            "Molly Maid",
            "The Cleaning Authority",
            "ServiceMaster Clean",
            "Jani-King",
            "CleanNet USA",
          ]
          title = cleaningPositions[Math.floor(Math.random() * cleaningPositions.length)]
          if (!company) company = cleaningCompanies[Math.floor(Math.random() * cleaningCompanies.length)]
          description = `Perform cleaning duties in residential or commercial settings. You'll be responsible for maintaining cleanliness and sanitation according to our high standards.`
          requirements = [
            "Previous cleaning experience preferred",
            "Attention to detail",
            "Ability to follow instructions",
            "Reliable transportation",
          ]
          eligibility = [
            "Must be 18 years or older",
            "Ability to stand, bend, and lift for extended periods",
            "Comfortable working with cleaning chemicals",
            "Background check may be required",
          ]
          tags = ["Cleaning", "Physical Work", "Independent Work"]
          break

        case "catering":
          const cateringPositions = [
            "Catering Assistant",
            "Event Server",
            "Food Prep",
            "Banquet Staff",
            "Catering Coordinator",
          ]
          const cateringCompanies = [
            "Gourmet Events",
            "Elegant Catering",
            "Premier Events",
            "Tasty Catering",
            "Celebrations Catering",
          ]
          title = cateringPositions[Math.floor(Math.random() * cateringPositions.length)]
          if (!company) company = cateringCompanies[Math.floor(Math.random() * cateringCompanies.length)]
          description = `Assist with food preparation, service, and cleanup for catered events. You'll help ensure events run smoothly and guests have an excellent experience.`
          requirements = [
            "Food service experience preferred",
            "Customer service skills",
            "Ability to work in a fast-paced environment",
            "Availability for evening and weekend events",
          ]
          eligibility = [
            "Must be 18 years or older",
            "Food handler certification preferred",
            "Ability to stand for long periods",
            "Ability to lift up to 25 pounds",
          ]
          tags = ["Food Service", "Events", "Customer Service"]
          break

        case "security":
          const securityPositions = [
            "Security Guard",
            "Loss Prevention Officer",
            "Event Security",
            "Night Watch",
            "Security Patrol",
          ]
          const securityCompanies = [
            "SecureWatch",
            "Allied Universal",
            "Securitas",
            "G4S",
            "Protection One",
            "Guardian Security",
          ]
          title = securityPositions[Math.floor(Math.random() * securityPositions.length)]
          if (!company) company = securityCompanies[Math.floor(Math.random() * securityCompanies.length)]
          description = `Monitor premises to prevent theft, violence, or rule infractions. You'll be responsible for maintaining a safe environment and responding to security concerns.`
          requirements = [
            "Previous security experience preferred",
            "Strong observation skills",
            "Ability to remain calm under pressure",
            "Good communication skills",
          ]
          eligibility = [
            "Must be 21 years or older",
            "High school diploma or equivalent",
            "Must pass background check",
            "Security license may be required",
          ]
          tags = ["Security", "Loss Prevention", "Professional"]
          break

        case "office":
          const officePositions = [
            "Administrative Assistant",
            "Data Entry Clerk",
            "Office Clerk",
            "Receptionist",
            "File Clerk",
            "Office Assistant",
          ]
          const officeCompanies = [
            "TechStart Inc.",
            "Global Solutions",
            "Innovative Systems",
            "Corporate Services",
            "Business Solutions Inc.",
          ]
          title = officePositions[Math.floor(Math.random() * officePositions.length)]
          if (!company) company = officeCompanies[Math.floor(Math.random() * officeCompanies.length)]
          description = `Provide administrative support in an office environment. You'll handle tasks such as data entry, filing, answering phones, and assisting with various office duties.`
          requirements = [
            "Proficiency in Microsoft Office",
            "Excellent organizational skills",
            "Strong attention to detail",
            "Professional communication skills",
          ]
          eligibility = [
            "High school diploma or equivalent",
            "Previous office experience preferred",
            "Typing speed of at least 40 WPM",
            "Basic computer skills",
          ]
          tags = ["Administrative", "Office", "Professional"]
          break

        case "healthcare":
          const healthcarePositions = [
            "Medical Assistant",
            "Home Health Aide",
            "Pharmacy Technician",
            "Dental Assistant",
            "Patient Care Technician",
            "Medical Receptionist",
          ]
          const healthcareCompanies = [
            "City Hospital",
            "MedExpress",
            "CarePlus",
            "HealthFirst",
            "Wellness Medical Center",
            "Community Health Services",
          ]
          title = healthcarePositions[Math.floor(Math.random() * healthcarePositions.length)]
          if (!company) company = healthcareCompanies[Math.floor(Math.random() * healthcareCompanies.length)]
          description = `Assist healthcare professionals in providing patient care. You'll perform duties such as taking vital signs, updating records, and ensuring patient comfort.`
          requirements = [
            "Healthcare certification or training preferred",
            "Compassionate and patient demeanor",
            "Attention to detail",
            "Ability to follow medical protocols",
          ]
          eligibility = [
            "Must be 18 years or older",
            "High school diploma or equivalent",
            "Must pass background check",
            "CPR certification may be required",
          ]
          tags = ["Healthcare", "Patient Care", "Medical"]
          break

        case "it":
          const itPositions = [
            "IT Support",
            "Help Desk Technician",
            "Web Developer",
            "Data Entry Specialist",
            "Social Media Manager",
            "Junior Programmer",
          ]
          const itCompanies = [
            "TechSolutions",
            "DataWorks",
            "Innovative Tech",
            "Digital Dynamics",
            "CodeCraft",
            "ByteWise Solutions",
          ]
          title = itPositions[Math.floor(Math.random() * itPositions.length)]
          if (!company) company = itCompanies[Math.floor(Math.random() * itCompanies.length)]
          description = `Provide technical support and assistance with computer systems, hardware, or software. You'll troubleshoot issues and help implement technology solutions.`
          requirements = [
            "Knowledge of computer systems and software",
            "Problem-solving skills",
            "Customer service orientation",
            "Ability to explain technical concepts clearly",
          ]
          eligibility = [
            "Technical certification or coursework preferred",
            "Experience with relevant software or systems",
            "Strong communication skills",
            "Ability to learn new technologies quickly",
          ]
          tags = ["IT", "Technical", "Computer Skills"]
          break

        default: // other
          const otherPositions = [
            "Dog Walker",
            "Pet Sitter",
            "Landscaping Assistant",
            "Event Staff",
            "Brand Ambassador",
            "Photographer Assistant",
            "Research Assistant",
          ]
          const otherCompanies = [
            "Happy Tails",
            "Green Thumb Landscaping",
            "City Events",
            "Research Institute",
            "Creative Studios",
            "Urban Services",
          ]
          title = otherPositions[Math.floor(Math.random() * otherPositions.length)]
          if (!company) company = otherCompanies[Math.floor(Math.random() * otherCompanies.length)]
          description = `Flexible position with varied responsibilities. You'll assist with specific tasks related to ${title} role and contribute to overall team success.`
          requirements = [
            "Relevant experience preferred",
            "Reliable and responsible attitude",
            "Good communication skills",
            "Ability to follow instructions",
          ]
          eligibility = [
            "Age requirements vary by position",
            "Specific skills related to position",
            "May require background check",
            "Flexible availability",
          ]
          tags = ["Flexible", "Part-time", "Entry Level"]
          break
      }

      jobs.push({
        id,
        title,
        company,
        location,
        salary: `${salary}/hr`,
        timing,
        category,
        description,
        requirements,
        eligibility,
        benefits: jobBenefits,
        gender,
        ageLimit: education === "high-school" ? "16+" : "18+",
        tags,
        experience,
        education,
        jobType,
        isUrgent,
        isNew,
        isRemote,
        isAccessible,
        hasBenefits,
        isDisabilityFriendly: Math.random() < 0.2, // 20% chance of being disability-friendly
        postedDate,
      })

      id++
    }
  })

  // Ensure each featured company has at least 10 jobs
  featuredCompanies.forEach((featuredCompany) => {
    if (featuredCompany.jobCount < 10) {
      const jobsNeeded = 10 - featuredCompany.jobCount

      for (let i = 0; i < jobsNeeded; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)]
        const isUrgent = Math.random() < 0.2
        const isNew = Math.random() < 0.3
        const isRemote = category === "it" ? Math.random() < 0.5 : Math.random() < 0.1
        const hasBenefits = Math.random() < 0.4
        const isAccessible = Math.random() < 0.15

        const salary = Math.floor(Math.random() * 30) + 10
        const location = isRemote ? "Remote" : locations[Math.floor(Math.random() * (locations.length - 1))]
        const timing = timings[Math.floor(Math.random() * timings.length)]
        const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)]
        const education = educationLevels[Math.floor(Math.random() * educationLevels.length)]
        const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)]
        const gender = genders[Math.floor(Math.random() * genders.length)]

        // Generate random date within the last 30 days
        const daysAgo = Math.floor(Math.random() * 30)
        const postedDate = new Date()
        postedDate.setDate(postedDate.getDate() - daysAgo)

        // Select random benefits if applicable
        const jobBenefits = []
        if (hasBenefits) {
          const numBenefits = Math.floor(Math.random() * 4) + 1
          const shuffledBenefits = [...benefits].sort(() => 0.5 - Math.random())
          for (let j = 0; j < numBenefits; j++) {
            jobBenefits.push(shuffledBenefits[j])
          }
        }

        // Generate job title and description based on category
        let title, description, requirements, eligibility, tags

        // Use a generic job title based on the company
        if (
          featuredCompany.name === "Google" ||
          featuredCompany.name === "Microsoft" ||
          featuredCompany.name === "Apple" ||
          featuredCompany.name === "Facebook"
        ) {
          title = ["Software Engineer", "UX Designer", "Product Manager", "Data Analyst", "Marketing Specialist"][
            Math.floor(Math.random() * 5)
          ]
          description = `Join ${featuredCompany.name} as a part-time ${title} and work on cutting-edge technology projects. You'll collaborate with talented professionals in a dynamic environment.`
          requirements = [
            "Knowledge of programming languages or design tools",
            "Problem-solving skills",
            "Ability to work in a team",
            "Strong communication skills",
          ]
          eligibility = [
            "Currently enrolled in a degree program",
            "Available to work 15-20 hours per week",
            "Passion for technology",
            "Basic technical skills",
          ]
          tags = ["Tech", "Part-time", "Student Friendly"]
        } else if (featuredCompany.name === "Amazon") {
          title = [
            "Warehouse Associate",
            "Delivery Driver",
            "Customer Service Rep",
            "Logistics Coordinator",
            "Retail Associate",
          ][Math.floor(Math.random() * 5)]
          description = `Work at Amazon as a part-time ${title} and be part of the world's largest online retailer. Flexible hours and competitive pay.`
          requirements = [
            "Reliable and punctual",
            "Ability to work in a fast-paced environment",
            "Customer service orientation",
            "Basic computer skills",
          ]
          eligibility = [
            "Must be 18 years or older",
            "High school diploma or equivalent",
            "Ability to lift up to 30 pounds",
            "Flexible availability",
          ]
          tags = ["Retail", "Logistics", "Customer Service"]
        } else if (featuredCompany.name === "Netflix") {
          title = [
            "Content Reviewer",
            "Customer Support",
            "Data Entry Specialist",
            "Social Media Assistant",
            "Administrative Assistant",
          ][Math.floor(Math.random() * 5)]
          description = `Join Netflix as a part-time ${title} and contribute to the world's leading streaming service. Flexible schedule and exciting work environment.`
          requirements = [
            "Excellent attention to detail",
            "Strong written and verbal communication",
            "Interest in film and television",
            "Basic technical skills",
          ]
          eligibility = [
            "Must be 18 years or older",
            "High school diploma or equivalent",
            "Available to work 15-25 hours per week",
            "Internet savvy",
          ]
          tags = ["Entertainment", "Media", "Remote Work"]
        }

        jobs.push({
          id,
          title,
          company: featuredCompany.name,
          location,
          salary: `${salary}/hr`,
          timing,
          category,
          description,
          requirements,
          eligibility,
          benefits: jobBenefits,
          gender,
          ageLimit: education === "high-school" ? "16+" : "18+",
          tags,
          experience,
          education,
          jobType,
          isUrgent,
          isNew,
          isRemote,
          isAccessible,
          hasBenefits,
          isDisabilityFriendly: Math.random() < 0.2, // 20% chance of being disability-friendly
          postedDate,
        })

        id++
        featuredCompany.jobCount++
      }
    }
  })

  return jobs
}

// Function to update job statistics
function updateJobStats() {
  const totalJobs = allJobs.length
  const newToday = allJobs.filter((job) => {
    const today = new Date()
    const jobDate = new Date(job.postedDate)
    return (
      jobDate.getDate() === today.getDate() &&
      jobDate.getMonth() === today.getMonth() &&
      jobDate.getFullYear() === today.getFullYear()
    )
  }).length
  const urgentHiring = allJobs.filter((job) => job.isUrgent).length

  totalJobsElement.textContent = totalJobs
  newTodayElement.textContent = newToday
  urgentHiringElement.textContent = urgentHiring
}

// Function to display jobs
function displayJobs(jobs) {
  jobListings.innerHTML = ""

  if (jobs.length === 0) {
    jobListings.innerHTML = "<p>No jobs found matching your criteria.</p>"
    return
  }

  jobs.forEach((job) => {
    const jobCard = document.createElement("div")
    jobCard.className = `job-card ${currentView === "grid" ? "grid-item" : "list-item"}`

    // Format posted date
    const postedDate = new Date(job.postedDate)
    const formattedDate = postedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Create badges for special features
    let badges = ""
    if (job.isUrgent) {
      badges += '<span class="job-badge badge-urgent">Urgent</span>'
    }
    if (job.isNew) {
      badges += '<span class="job-badge badge-new">New</span>'
    }
    if (job.isRemote) {
      badges += '<span class="job-badge badge-remote">Remote</span>'
    }
    if (job.isDisabilityFriendly) {
      badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
    }

    // Removed company logo from job card
    jobCard.innerHTML = `
            <div class="job-header">
                <div class="job-title-container">
                    <h3 class="job-title">${job.title} ${badges}</h3>
                    <p class="company-name">${job.company}</p>
                    <p class="job-posted">Posted on: ${formattedDate}</p>
                </div>
                <button class="like-button" data-id="${job.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            
            <div class="job-info">
                <span>${formatSalary(job.salary)}</span>
                <span>${job.location}</span>
                <span>${job.timing}</span>
            </div>
            
            <div class="job-tags">
                ${job.tags.map((tag) => `<span class="job-tag">${tag}</span>`).join("")}
            </div>
            
            <div class="job-actions">
                <button class="view-details" data-id="${job.id}">View Details</button>
                <button class="save-job" data-id="${job.id}">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
        `

    jobListings.appendChild(jobCard)
  })

  // Add event listeners to view details buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", function () {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      showJobDetails(jobId)
    })
  })

  // Add event listeners to save job buttons
  document.querySelectorAll(".save-job").forEach((button) => {
    button.addEventListener("click", function () {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      toggleSaveJob(jobId, this)
    })
  })

  // Add event listeners to like buttons
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", function () {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      toggleLikeJob(jobId, this)
    })
  })

  // Update pagination
  updatePagination()
}

// Function to get jobs for the current page
function getCurrentPageJobs() {
  const startIndex = (currentPage - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  return filteredJobs.slice(startIndex, endIndex)
}

// Function to update featured companies
function updateFeaturedCompanies() {
  const featuredCompaniesContainer = document.querySelector(".company-list")
  if (!featuredCompaniesContainer) return

  featuredCompaniesContainer.innerHTML = ""

  // Make sure we have companies with jobs
  featuredCompanies.forEach((company) => {
    // Count jobs for this company if not already counted
    if (company.jobCount === 0) {
      company.jobCount = allJobs.filter((job) => job.company === company.name).length
    }

    const companyCard = document.createElement("div")
    companyCard.className = "company-card"
    companyCard.innerHTML = `
      <img src="${company.logo}" alt="${company.name}" onerror="this.src='https://via.placeholder.com/80?text=${company.name.charAt(0)}'">
      <h3>${company.name}</h3>
      <p>${company.jobCount} Jobs</p>
    `
    companyCard.addEventListener("click", () => {
      showCompanyJobs(company.name)
    })
    featuredCompaniesContainer.appendChild(companyCard)
  })
}

// Update the showCompanyJobs function to handle view details properly
function showCompanyJobs(companyName) {
  // Filter jobs to only show those from the selected company
  const companyJobs = allJobs.filter((job) => job.company === companyName)

  // Create the company jobs page content
  companyJobsPage.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Jobs at ${companyName}</h1>
        <button class="back-button" onclick="hideCompanyJobsPage()">
          <i class="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>
      
      <div class="company-header">
        <img src="https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, "")}.com" 
             alt="${companyName}" class="company-detail-logo"
             onerror="this.src='https://via.placeholder.com/100?text=${companyName.charAt(0)}'">
        <div class="company-info">
          <h2>${companyName}</h2>
          <p>${companyJobs.length} available jobs</p>
        </div>
      </div>
      
      <div class="company-jobs-list">
        ${companyJobs
          .slice(0, 20)
          .map(
            (job) => `
          <div class="job-card">
            <div class="job-header">
              <div class="job-title-container">
                <h3 class="job-title">${job.title} 
                  ${job.isUrgent ? '<span class="job-badge badge-urgent">Urgent</span>' : ""}
                  ${job.isNew ? '<span class="job-badge badge-new">New</span>' : ""}
                  ${job.isRemote ? '<span class="job-badge badge-remote">Remote</span>' : ""}
                  ${job.isDisabilityFriendly ? '<span class="job-badge badge-disability">Disability-Friendly</span>' : ""}
                </h3>
                <p class="job-posted">Posted on: ${new Date(job.postedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
            </div>
            
            <div class="job-info">
              <span>${formatSalary(job.salary)}</span>
              <span>${job.location}</span>
              <span>${job.timing}</span>
            </div>
            
            <div class="job-tags">
              ${job.tags.map((tag) => `<span class="job-tag">${tag}</span>`).join("")}
            </div>
            
            <div class="job-actions">
              <button class="view-details" onclick="showJobDetailsInPage(${job.id}, 'company')">View Details</button>
              <button class="apply-now-btn" onclick="showJobApplicationPage(${job.id})">Apply Now</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `

  // Show the company jobs page
  companyJobsPage.style.display = "block"

  // Show a toast notification
  showToast(`Showing ${companyJobs.length} jobs from ${companyName}`)
}

// Update the showDisabilityFriendlyJobs function to properly display jobs
function showDisabilityFriendlyJobs() {
  // Filter to only show disability-friendly jobs
  const disabilityJobs = allJobs.filter((job) => job.isDisabilityFriendly)

  // Get the disability jobs page element
  const disabilityJobsPage = document.getElementById("disability-jobs-page")
  if (!disabilityJobsPage) {
    console.error("Disability jobs page element not found")
    return
  }

  disabilityJobsPage.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1 class="page-title">Disability-Friendly Jobs</h1>
        <button class="back-button" id="disability-back-button">
          <i class="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>
      
      <div class="disability-jobs-header">
        <div class="disability-icon-large">
          <i class="fas fa-wheelchair"></i>
        </div>
        <div class="disability-info">
          <h2>Jobs with Disability Accommodations</h2>
          <p>${disabilityJobs.length} available positions with workplace accommodations</p>
        </div>
      </div>
      
      <div class="disability-jobs-list">
        ${disabilityJobs
          .slice(0, 20)
          .map(
            (job) => `
          <div class="job-card disability-job-card">
            <div class="job-header">
              <div class="job-title-container">
                <h3 class="job-title">${job.title} 
                  ${job.isUrgent ? '<span class="job-badge badge-urgent">Urgent</span>' : ""}
                  ${job.isNew ? '<span class="job-badge badge-new">New</span>' : ""}
                  ${job.isRemote ? '<span class="job-badge badge-remote">Remote</span>' : ""}
                  <span class="job-badge badge-disability">Disability-Friendly</span>
                </h3>
                <p class="company-name">${job.company}</p>
                <p class="job-posted">Posted on: ${new Date(job.postedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
            </div>
            
            <div class="job-info">
              <span>${formatSalary(job.salary)}</span>
              <span>${job.location}</span>
              <span>${job.timing}</span>
            </div>
            
            <div class="job-tags">
              ${job.tags.map((tag) => `<span class="job-tag">${tag}</span>`).join("")}
            </div>
            
            <div class="job-actions">
              <button class="view-details" data-id="${job.id}" data-context="disability">View Details</button>
              <button class="apply-now-btn" data-id="${job.id}">Apply Now</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `

  // Add event listeners for view details buttons
  const viewDetailsButtons = disabilityJobsPage.querySelectorAll(".view-details")
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const jobId = Number(button.getAttribute("data-id"))
      showJobDetailsInPage(jobId, "disability")
    })
  })

  // Add event listeners for apply now buttons
  const applyNowButtons = disabilityJobsPage.querySelectorAll(".apply-now-btn")
  applyNowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const jobId = Number(button.getAttribute("data-id"))
      showApplicationFormInContext(jobId, "disability")
    })
  })

  // Add event listener for back button
  const backButton = document.getElementById("disability-back-button")
  if (backButton) {
    backButton.addEventListener("click", () => {
      hideDisabilityJobsPage()
    })
  }

  // Show the disability jobs page
  disabilityJobsPage.style.display = "block"

  // Show a toast notification
  showToast(`Showing ${disabilityJobs.length} disability-friendly jobs`)
}

// Add a new function to show job details within the current page context
function showJobDetailsInPage(jobId, context) {
  const job = allJobs.find((job) => job.id === jobId)

  if (!job) return

  // Get saved and liked status
  const savedJobs = getSavedJobs()
  const likedJobs = getLikedJobs()
  const isSaved = savedJobs.includes(job.id)
  const isLiked = likedJobs.includes(job.id)

  // Format posted date
  const postedDate = new Date(job.postedDate)
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create badges for special features
  let badges = ""
  if (job.isUrgent) {
    badges += '<span class="job-badge badge-urgent">Urgent</span>'
  }
  if (job.isNew) {
    badges += '<span class="job-badge badge-new">New</span>'
  }
  if (job.isRemote) {
    badges += '<span class="job-badge badge-remote">Remote</span>'
  }
  if (job.isDisabilityFriendly) {
    badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
  }

  // Create the job details HTML
  const jobDetailsHTML = `
    <div class="job-detail-overlay">
      <div class="job-detail-container">
        <div class="job-detail-header">
          <button class="close-job-detail" onclick="closeJobDetailsInPage('${context}')">
            <i class="fas fa-times"></i>
          </button>
          <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com" 
               alt="${job.company}" class="job-detail-logo"
               onerror="this.src='https://via.placeholder.com/80?text=${job.company.charAt(0)}'">
          <div class="job-detail-title-container">
            <h2>${job.title} ${badges}</h2>
            <p class="job-detail-company">${job.company}</p>
            <p class="job-detail-posted">Posted on: ${formattedDate}</p>
          </div>
        </div>
        
        <div class="job-detail-info">
          <div class="detail-item">
            <h4>Salary</h4>
            <p>${formatSalary(job.salary)}</p>
          </div>
          <div class="detail-item">
            <h4>Location</h4>
            <p>${job.location}</p>
          </div>
          <div class="detail-item">
            <h4>Schedule</h4>
            <p>${job.timing}</p>
          </div>
          <div class="detail-item">
            <h4>Job Type</h4>
            <p>${job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Experience</h4>
            <p>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Category</h4>
            <p>${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Gender</h4>
            <p>${job.gender}</p>
          </div>
          <div class="detail-item">
            <h4>Age Limit</h4>
            <p>${job.ageLimit}</p>
          </div>
        </div>
        
        <div class="job-detail-description">
          <h3>Job Description</h3>
          <p>${job.description}</p>
        </div>
        
        <div class="job-detail-requirements">
          <h3>Requirements</h3>
          <ul>
            ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
          </ul>
        </div>
        
        <div class="job-detail-eligibility">
          <h3>Eligibility Criteria</h3>
          <ul>
            ${job.eligibility.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        
        ${
          job.hasBenefits
            ? `
        <div class="job-detail-benefits">
          <h3>Benefits</h3>
          <ul>
            ${job.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
        ${
          job.isDisabilityFriendly
            ? `
        <div class="job-detail-disability">
          <h3>Disability Accommodations</h3>
          <p>This employer provides accommodations for people with disabilities, which may include:</p>
          <ul>
            <li>Flexible work arrangements</li>
            <li>Accessible workplace facilities</li>
            <li>Assistive technology</li>
            <li>Modified work schedules</li>
            <li>Contact the employer for specific accommodation details</li>
          </ul>
        </div>
        `
            : ""
        }
        
        <div class="job-detail-actions">
          <button class="apply-now" onclick="showJobApplicationPageInContext(${job.id}, '${context}')">Apply Now</button>
          <button class="like-job-detail ${isLiked ? "liked" : ""}" onclick="toggleLikeJob(${job.id}, this)">
            ${isLiked ? "Liked" : "Like Job"}
          </button>
          <button class="save-job-detail ${isSaved ? "saved" : ""}" onclick="toggleSaveJob(${job.id}, this)">
            ${isSaved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  `

  // Append the job details to the appropriate container based on context
  if (context === "company") {
    // Add the job details to the company jobs page
    const detailsContainer = document.createElement("div")
    detailsContainer.id = "company-job-details"
    detailsContainer.className = "job-details-overlay"
    detailsContainer.innerHTML = jobDetailsHTML
    companyJobsPage.appendChild(detailsContainer)
  } else if (context === "disability") {
    // Add the job details to the disability jobs page
    const detailsContainer = document.createElement("div")
    detailsContainer.id = "disability-job-details"
    detailsContainer.className = "job-details-overlay"
    detailsContainer.innerHTML = jobDetailsHTML
    document.getElementById("disability-jobs-page").appendChild(detailsContainer)
  }
}

// Function to close job details in the current page context
function closeJobDetailsInPage(context) {
  if (context === "company") {
    const detailsElement = document.getElementById("company-job-details")
    if (detailsElement) {
      detailsElement.remove()
    }
  } else if (context === "disability") {
    const detailsElement = document.getElementById("disability-job-details")
    if (detailsElement) {
      detailsElement.remove()
    }
  }
}

// Function to show job application page within the current context
function showJobApplicationPageInContext(jobId, context) {
  // First close the job details overlay
  closeJobDetailsInPage(context)

  // Then show the job application page
  showJobApplicationPage(jobId)
}

// Update the hideDisabilityJobsPage function
function hideDisabilityJobsPage() {
  const disabilityJobsPage = document.getElementById("disability-jobs-page")
  if (disabilityJobsPage) {
    disabilityJobsPage.style.display = "none"
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Generate jobs data
  allJobs = generateJobs()
  filteredJobs = [...allJobs]

  // Update job statistics
  updateJobStats()

  // Display initial jobs
  displayJobs(getCurrentPageJobs())

  // Update salary filter value display
  salaryFilter.addEventListener("input", function () {
    salaryValue.textContent = `${currentCurrency}${this.value}/hr`
  })

  // Check if user is logged in
  checkLoginStatus()

  // Show internship popup after delay
  setTimeout(showInternshipPopup, 15000)

  // Initialize file input display
  const fileInput = document.getElementById("apply-resume")
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "No file chosen"
      document.querySelector(".file-name").textContent = fileName
    })
  }

  // Initialize language and country selectors
  languageSelector.addEventListener("change", function () {
    currentLanguage = this.value
    translatePage(currentLanguage)
  })

  // Modify the countrySelector event listener in the DOMContentLoaded function
  countrySelector.addEventListener("change", function () {
    const previousCountry = currentCountry
    currentCountry = this.value
    updateCurrency(currentCountry)
    filterJobs()
  })

  // Update featured companies - make sure this is called
  updateFeaturedCompanies()

  // Add event listeners to category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Get selected category
      currentCategory = this.getAttribute("data-category")

      // Special handling for handicapped category
      if (currentCategory === "handicapped") {
        showDisabilityFriendlyJobs()
        return
      }

      // Update category filter dropdown
      document.getElementById("category-filter").value = currentCategory === "handicapped" ? "all" : currentCategory

      // Apply filters
      filterJobs()
    })
  })

  // Immediately show disability-friendly jobs if the page loads with the handicapped category selected
  if (document.querySelector('.category-btn[data-category="handicapped"]').classList.contains("active")) {
    showDisabilityFriendlyJobs()
  }

  // Add these lines at the end of the DOMContentLoaded function
  setupPhoneValidation()
  setupEmailValidation()

  // Add event listener for the disability banner button
  const viewDisabilityJobsBtn = document.querySelector(".view-disability-jobs")
  if (viewDisabilityJobsBtn) {
    viewDisabilityJobsBtn.addEventListener("click", showDisabilityFriendlyJobs)
  }

  // Update the category button for handicapped jobs
  const handicappedBtn = document.querySelector('.category-btn[data-category="handicapped"]')
  if (handicappedBtn) {
    handicappedBtn.addEventListener("click", function () {
      // Update active state
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Show disability-friendly jobs page
      showDisabilityFriendlyJobs()
    })
  }
})

// Add these functions after the updateCurrency function

// Validate phone number input - only allow numbers
function setupPhoneValidation() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]')

  phoneInputs.forEach((input) => {
    // Prevent non-numeric input
    input.addEventListener("input", function (e) {
      const value = this.value
      const numericValue = value.replace(/[^0-9]/g, "")

      if (value !== numericValue) {
        // Show error if non-numeric characters were entered
        this.setCustomValidity("Please enter numbers only")
        this.reportValidity()
        this.classList.add("invalid-input")
        // Replace with numeric-only value
        this.value = numericValue
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })

    // Validate on blur
    input.addEventListener("blur", function () {
      if (this.value && !/^\d+$/.test(this.value)) {
        this.setCustomValidity("Phone number should contain only digits")
        this.reportValidity()
        this.classList.add("invalid-input")
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })

    // Prevent non-numeric characters from being entered
    input.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
        input.setCustomValidity("Please enter numbers only")
        input.reportValidity()
      } else {
        input.setCustomValidity("")
      }
    })
  })
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Setup email validation
function setupEmailValidation() {
  const emailInputs = document.querySelectorAll('input[type="email"]')

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.setCustomValidity("Please enter a valid email address")
        this.reportValidity()
        this.classList.add("invalid-input")
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })
  })
}

// Currency conversion rates (simplified for demo)
const conversionRates = {
  global: 1, // USD (base)
  us: 1, // USD
  in: 83.5, // INR
  uk: 0.79, // GBP
  eu: 0.92, // EUR
  ca: 1.36, // CAD
  au: 1.52, // AUD
}

// Update currency based on selected country with conversion
function updateCurrency(country) {
  const previousCurrency = currentCurrency
  const previousRate = getConversionRate(currentCountry)
  const newRate = getConversionRate(country)

  switch (country) {
    case "in":
      currentCurrency = "₹"
      break
    case "uk":
      currentCurrency = "£"
      break
    case "eu":
      currentCurrency = "€"
      break
    case "ca":
      currentCurrency = "C$"
      break
    case "au":
      currentCurrency = "A$"
      break
    default:
      currentCurrency = "$"
  }

  // Update salary filter display with conversion
  const currentValue = Number.parseInt(salaryFilter.value)
  const convertedValue = convertCurrency(currentValue, previousRate, newRate)
  salaryFilter.value = Math.round(convertedValue)
  salaryValue.textContent = `${currentCurrency}${Math.round(convertedValue)}/hr`

  // Update all displayed salaries
  updateDisplayedSalaries(previousRate, newRate)
}

// Get conversion rate for a country
function getConversionRate(country) {
  return conversionRates[country] || 1
}

// Convert amount between currencies
function convertCurrency(amount, fromRate, toRate) {
  // Convert to base currency (USD) then to target currency
  return amount * (toRate / fromRate)
}

// Update all displayed salaries with conversion
function updateDisplayedSalaries(fromRate, toRate) {
  // Update job listings
  document.querySelectorAll(".job-info span:first-child").forEach((span) => {
    const salaryText = span.textContent
    const salaryMatch = salaryText.match(/[^0-9]*([0-9]+)[^0-9]*/)

    if (salaryMatch && salaryMatch[1]) {
      const amount = Number.parseInt(salaryMatch[1])
      const convertedAmount = Math.round(convertCurrency(amount, fromRate, toRate))
      span.innerHTML = `${currentCurrency}${convertedAmount} <span class="per-hour">/hr</span>`
    }
  })

  // Update job details if visible
  const jobDetailInfo = document.querySelector(".job-detail-info")
  if (jobDetailInfo) {
    const salaryElement = jobDetailInfo.querySelector(".detail-item:first-child p")
    if (salaryElement) {
      const salaryText = salaryElement.textContent
      const salaryMatch = salaryText.match(/[^0-9]*([0-9]+)[^0-9]*/)

      if (salaryMatch && salaryMatch[1]) {
        const amount = Number.parseInt(salaryMatch[1])
        const convertedAmount = Math.round(convertCurrency(amount, fromRate, toRate))
        salaryElement.innerHTML = `${currentCurrency}${convertedAmount} <span class="per-hour">/hr</span>`
      }
    }
  }
}

// Format salary based on current currency
function formatSalary(salary) {
  const amount = Number.parseInt(salary)
  const rate = getConversionRate(currentCountry)
  const convertedAmount = Math.round(amount * rate)
  return `${currentCurrency}${convertedAmount} <span class="per-hour">/hr</span>`
}

// Translate page (placeholder function)
function translatePage(language) {
  // In a real application, this would load translations from a file
  console.log(`Translating page to ${language}`)
  // For demo purposes, we'll just show a notification
  showToast(`Language changed to ${getLanguageName(language)}`)
}

// Get language name from code
function getLanguageName(code) {
  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    ar: "Arabic",
    hi: "Hindi",
    te: "Telugu",
    zh: "Chinese",
  }
  return languages[code] || "Unknown"
}

// Show job application page with split view
function showJobApplicationPage(jobId) {
  const job = allJobs.find((job) => job.id === jobId)

  if (!job) return

  // Hide company jobs page to bring application page to foreground
  companyJobsPage.style.display = "none"

  // Format posted date
  const postedDate = new Date(job.postedDate)
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create badges for special features
  let badges = ""
  if (job.isUrgent) {
    badges += '<span class="job-badge badge-urgent">Urgent</span>'
  }
  if (job.isNew) {
    badges += '<span class="job-badge badge-new">New</span>'
  }
  if (job.isRemote) {
    badges += '<span class="job-badge badge-remote">Remote</span>'
  }
  if (job.isDisabilityFriendly) {
    badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
  }

  // Get saved and liked status
  const savedJobs = getSavedJobs()
  const likedJobs = getLikedJobs()
  const isSaved = savedJobs.includes(job.id)
  const isLiked = likedJobs.includes(job.id)

  jobApplicationPage.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">${job.title}</h1>
            <button class="back-button" onclick="hideJobApplicationPage()">
                <i class="fas fa-arrow-left"></i> Back to Home
            </button>
        </div>
        
        <div class="split-view-container">
            <div class="job-details-panel">
                <div class="job-detail-header">
                    <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com" 
                         alt="${job.company}" class="job-detail-logo"
                         onerror="this.src='https://via.placeholder.com/80?text=${job.company.charAt(0)}'">
                    <div class="job-detail-title-container">
                        <h2>${job.title} ${badges}</h2>
                        <p class="job-detail-company">${job.company}</p>
                        <p class="job-detail-posted">Posted on: ${formattedDate}</p>
                    </div>
                </div>
                
                <div class="job-detail-info">
                    <div class="detail-item">
                        <h4>Salary</h4>
                        <p>${formatSalary(job.salary)}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Location</h4>
                        <p>${job.location}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Schedule</h4>
                        <p>${job.timing}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Job Type</h4>
                        <p>${job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Experience</h4>
                        <p>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Category</h4>
                        <p>${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Gender</h4>
                        <p>${job.gender}</p>
                    </div>
                    <div class="detail-item">
                        <h4>Age Limit</h4>
                        <p>${job.ageLimit}</p>
                    </div>
                </div>
                
                <div class="job-detail-description">
                    <h3>Job Description</h3>
                    <p>${job.description}</p>
                </div>
                
                <div class="job-detail-requirements">
                    <h3>Requirements</h3>
                    <ul>
                        ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="job-detail-eligibility">
                    <h3>Eligibility Criteria</h3>
                    <ul>
                        ${job.eligibility.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
                
                ${
                  job.hasBenefits
                    ? `
                <div class="job-detail-benefits">
                    <h3>Benefits</h3>
                    <ul>
                        ${job.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
                ${
                  job.isDisabilityFriendly
                    ? `
<div class="job-detail-disability">
    <h3>Disability Accommodations</h3>
    <p>This employer provides accommodations for people with disabilities, which may include:</p>
    <ul>
        <li>Flexible work arrangements</li>
        <li>Accessible workplace facilities</li>
        <li>Assistive technology</li>
        <li>Modified work schedules</li>
        <li>Contact the employer for specific accommodation details</li>
    </ul>
</div>
`
                    : ""
                }
                
                <div class="job-detail-actions">
                    <button class="like-job-detail ${isLiked ? "liked" : ""}" data-id="${job.id}" onclick="toggleLikeJob(${job.id}, this)">
                        ${isLiked ? "Liked" : "Like Job"}
                    </button>
                    <button class="save-job-detail ${isSaved ? "saved" : ""}" data-id="${job.id}" onclick="toggleSaveJob(${job.id}, this)">
                        ${isSaved ? "Saved" : "Save Job"}
                    </button>
                </div>
            </div>
            
            <div class="application-form-panel">
                <h2>Apply for this Position</h2>
                <form id="job-application-form" data-job-id="${job.id}">
                    <div class="form-group">
                        <label for="apply-name">Full Name</label>
                        <input type="text" id="apply-name" required>
                    </div>
                    <div class="form-group">
                        <label for="apply-email">Email</label>
                        <input type="email" id="apply-email" required>
                    </div>
                    <div class="form-group">
                        <label for="apply-phone">Phone Number</label>
                        <input type="tel" id="apply-phone" required>
                    </div>
                    <div class="form-group">
                        <label for="apply-resume">Resume</label>
                        <div class="file-input">
                            <input type="file" id="apply-resume" accept=".pdf,.doc,.docx">
                            <label for="apply-resume">Choose File</label>
                            <span class="file-name">No file chosen</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="apply-cover-letter">Cover Letter (Optional)</label>
                        <textarea id="apply-cover-letter" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Why are you interested in this position?</label>
                        <textarea id="apply-interest" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Availability</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" name="availability" value="weekdays"> Weekdays</label>
                            <label><input type="checkbox" name="availability" value="weekends"> Weekends</label>
                            <label><input type="checkbox" name="availability" value="evenings"> Evenings</label>
                            <label><input type="checkbox" name="availability" value="mornings"> Mornings</label>
                        </div>
                    </div>
                    <button type="submit" class="submit-application">Submit Application</button>
                </form>
            </div>
        </div>
    `

  // Pre-fill form with user data if logged in
  if (isLoggedIn()) {
    const userData = JSON.parse(localStorage.getItem("user")) || {}
    if (userData.name) document.getElementById("apply-name").value = userData.name
    if (userData.email) document.getElementById("apply-email").value = userData.email
    if (userData.phone) document.getElementById("apply-phone").value = userData.phone
  }

  // Add event listener to file input
  const fileInput = document.getElementById("apply-resume")
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "No file chosen"
      document.querySelector(".file-name").textContent = fileName
    })
  }

  // Add event listener to form submission
  const applicationForm = document.getElementById("job-application-form")
  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!isLoggedIn()) {
      alert("Please login to apply for this job.")
      hideJobApplicationPage()
      loginModal.style.display = "block"
      return
    }

    // In a real application, this would submit the application to a database
    alert("Your application has been submitted successfully!")

    // Store application in localStorage for demo purposes
    const applications = JSON.parse(localStorage.getItem("applications") || "[]")
    applications.push({
      jobId,
      date: new Date().toISOString(),
      status: "In Review",
    })
    localStorage.setItem("applications", JSON.stringify(applications))

    // Hide job application page
    hideJobApplicationPage()
    showToast("Application submitted successfully!")
  })

  // Add this after the form is created and event listeners are set up
  const phoneInput = document.getElementById("apply-phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      const value = this.value
      const numericValue = value.replace(/[^0-9]/g, "")

      if (value !== numericValue) {
        this.setCustomValidity("Please enter numbers only")
        this.reportValidity()
        this.classList.add("invalid-input")
        this.value = numericValue
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })

    phoneInput.addEventListener("blur", function () {
      if (this.value && !/^\d+$/.test(this.value)) {
        this.setCustomValidity("Phone number should contain only digits")
        this.reportValidity()
        this.classList.add("invalid-input")
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })

    phoneInput.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
        phoneInput.setCustomValidity("Please enter numbers only")
        phoneInput.reportValidity()
      } else {
        phoneInput.setCustomValidity("")
      }
    })
  }

  // Show the job application page
  jobApplicationPage.style.display = "block"
}

// Hide job application page
function hideJobApplicationPage() {
  jobApplicationPage.style.display = "none"
}

// Show user profile page
function showUserProfilePage() {
  const userData = JSON.parse(localStorage.getItem("user"))

  if (!userData) return

  userProfilePage.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">My Profile</h1>
                <button class="back-button" onclick="hideUserProfilePage()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="profile-info-content">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="profile-details">
                    <div class="profile-detail-item">
                        <span class="label">Name:</span>
                        <span>${userData.name}</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Email:</span>
                        <span>${userData.email}</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Phone:</span>
                        <span>${userData.phone}</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Joined:</span>
                        <span>${userData.registrationDate}</span>
                    </div>
                    <div class="profile-detail-item">
                        <span class="label">Location:</span>
                        <span>${userData.location || "Not specified"}</span>
                    </div>
                </div>
            </div>
            
            <div class="profile-actions">
                <button onclick="showSavedJobsPage()">View Saved Jobs</button>
                <button onclick="showApplicationsPage()">View Applications</button>
                <button onclick="showResumePage()">View Resume</button>
            </div>
        </div>
    `

  // Show the user profile page
  userProfilePage.style.display = "block"
}

// Hide user profile page
function hideUserProfilePage() {
  userProfilePage.style.display = "none"
}

// Show saved jobs page
function showSavedJobsPage() {
  const savedJobIds = getSavedJobs()

  savedJobsPage.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">Saved Jobs</h1>
                <button class="back-button" onclick="hideSavedJobsPage()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div id="saved-jobs-list">
                ${
                  savedJobIds.length === 0
                    ? '<p class="no-items">You haven\'t saved any jobs yet.</p>'
                    : savedJobIds
                        .map((jobId) => {
                          const job = allJobs.find((j) => j.id === jobId)
                          if (!job) return ""

                          return `
                            <div class="saved-job-card">
                                <div class="saved-job-info">
                                    <h3 class="saved-job-title">${job.title}</h3>
                                    <p class="saved-job-company">${job.company}</p>
                                    <div class="saved-job-details">
                                        <span>${formatSalary(job.salary)}</span>
                                        <span>${job.location}</span>
                                        <span>${job.timing}</span>
                                    </div>
                                    <div class="saved-job-actions">
                                        <button class="view-saved-job" onclick="showJobApplicationPage(${job.id})">View Details</button>
                                        <button class="remove-saved-job" onclick="removeSavedJob(${job.id})">Remove</button>
                                    </div>
                                </div>
                            </div>
                        `
                        })
                        .join("")
                }
            </div>
        </div>
    `

  // Show the saved jobs page
  savedJobsPage.style.display = "block"
}

// Hide saved jobs page
function hideSavedJobsPage() {
  savedJobsPage.style.display = "none"
}

// Remove saved job
function removeSavedJob(jobId) {
  const savedJobs = getSavedJobs()
  const index = savedJobs.indexOf(jobId)

  if (index !== -1) {
    savedJobs.splice(index, 1)
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
    showSavedJobsPage() // Refresh the page
    showToast("Job removed from saved jobs")
  }
}

// Show applications page
function showApplicationsPage() {
  const applications = JSON.parse(localStorage.getItem("applications") || "[]")

  applicationsPage.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">My Applications</h1>
                <button class="back-button" onclick="hideApplicationsPage()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div id="applications-list">
                ${
                  applications.length === 0
                    ? '<p class="no-items">You haven\'t applied to any jobs yet.</p>'
                    : applications
                        .map((application) => {
                          const job = allJobs.find((j) => j.id === application.jobId)
                          if (!job) return ""

                          const applicationDate = new Date(application.date)
                          const formattedDate = applicationDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })

                          return `
                            <div class="application-card">
                                <div class="application-info">
                                    <h3 class="application-title">${job.title}</h3>
                                    <p class="application-company">${job.company}</p>
                                    <div class="application-details">
                                        <span>Applied on: ${formattedDate}</span>
                                        <span>Status: ${application.status}</span>
                                    </div>
                                    <div class="application-actions">
                                        <button class="view-application" onclick="showJobApplicationPage(${job.id})">View Job</button>
                                    </div>
                                </div>
                            </div>
                        `
                        })
                        .join("")
                }
            </div>
        </div>
    `

  // Show the applications page
  applicationsPage.style.display = "block"
}

// Hide applications page
function hideApplicationsPage() {
  applicationsPage.style.display = "none"
}

// Show resume page
function showResumePage() {
  const userData = JSON.parse(localStorage.getItem("user"))

  if (!userData) return

  resumePage.innerHTML = `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">My Resume</h1>
                <button class="back-button" onclick="hideResumePage()">
                    <i class="fas fa-arrow-left"></i> Back to Home
                </button>
            </div>
            
            <div class="resume-section">
                <h3>Personal Information</h3>
                <div class="resume-info">
                    <div class="resume-info-item">
                        <span class="label">Name:</span>
                        <span>${userData.name}</span>
                    </div>
                    <div class="resume-info-item">
                        <span class="label">Email:</span>
                        <span>${userData.email}</span>
                    </div>
                    <div class="resume-info-item">
                        <span class="label">Phone:</span>
                        <span>${userData.phone}</span>
                    </div>
                    <div class="resume-info-item">
                        <span class="label">Location:</span>
                        <span>${userData.location || "Not specified"}</span>
                    </div>
                </div>
            </div>
            
            <div class="resume-section">
                <h3>Education</h3>
                <p class="no-items">No education information added yet.</p>
                <button class="add-button">Add Education</button>
            </div>
            
            <div class="resume-section">
                <h3>Experience</h3>
                <p class="no-items">No experience information added yet.</p>
                <button class="add-button">Add Experience</button>
            </div>
            
            <div class="resume-section">
                <h3>Skills</h3>
                <p class="no-items">No skills added yet.</p>
                <button class="add-button">Add Skills</button>
            </div>
            
            <div class="resume-actions">
                <button>Upload Resume</button>
                <button>Download Resume</button>
            </div>
        </div>
    `

  // Show the resume page
  resumePage.style.display = "block"
}

// Hide resume page
function hideResumePage() {
  resumePage.style.display = "none"
}

// Show job details in modal
function showJobDetails(jobId) {
  const job = allJobs.find((job) => job.id === jobId)

  if (!job) return

  // Get saved and liked status
  const savedJobs = getSavedJobs()
  const likedJobs = getLikedJobs()
  const isSaved = savedJobs.includes(job.id)
  const isLiked = likedJobs.includes(job.id)

  // Format posted date
  const postedDate = new Date(job.postedDate)
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create badges for special features
  let badges = ""
  if (job.isUrgent) {
    badges += '<span class="job-badge badge-urgent">Urgent</span>'
  }
  if (job.isNew) {
    badges += '<span class="job-badge badge-new">New</span>'
  }
  if (job.isRemote) {
    badges += '<span class="job-badge badge-remote">Remote</span>'
  }
  if (job.isDisabilityFriendly) {
    badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
  }

  const jobDetailContainer = document.getElementById("job-detail-container")
  jobDetailContainer.innerHTML = `
        <div class="job-detail-header">
            <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com" 
                 alt="${job.company}" class="job-detail-logo"
                 onerror="this.src='https://via.placeholder.com/80?text=${job.company.charAt(0)}'">
            <div class="job-detail-title-container">
                <h2>${job.title} ${badges}</h2>
                <p class="job-detail-company">${job.company}</p>
                <p class="job-detail-posted">Posted on: ${formattedDate}</p>
            </div>
        </div>
        
        <div class="job-detail-info">
            <div class="detail-item">
                <h4>Salary</h4>
                <p>${formatSalary(job.salary)}</p>
            </div>
            <div class="detail-item">
                <h4>Location</h4>
                <p>${job.location}</p>
            </div>
            <div class="detail-item">
                <h4>Schedule</h4>
                <p>${job.timing}</p>
            </div>
            <div class="detail-item">
                <h4>Job Type</h4>
                <p>${job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
            </div>
            <div class="detail-item">
                <h4>Experience</h4>
                <p>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)}</p>
            </div>
            <div class="detail-item">
                <h4>Category</h4>
                <p>${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</p>
            </div>
            <div class="detail-item">
                <h4>Gender</h4>
                <p>${job.gender}</p>
            </div>
            <div class="detail-item">
                <h4>Age Limit</h4>
                <p>${job.ageLimit}</p>
            </div>
        </div>
        
        <div class="job-detail-description">
            <h3>Job Description</h3>
            <p>${job.description}</p>
        </div>
        
        <div class="job-detail-requirements">
            <h3>Requirements</h3>
            <ul>
                ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
            </ul>
        </div>
        
        <div class="job-detail-eligibility">
            <h3>Eligibility Criteria</h3>
            <ul>
                ${job.eligibility.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
        
        ${
          job.hasBenefits
            ? `
        <div class="job-detail-benefits">
            <h3>Benefits</h3>
            <ul>
                ${job.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ul>
        </div>
        `
            : ""
        }
        ${
          job.isDisabilityFriendly
            ? `
<div class="job-detail-disability">
    <h3>Disability Accommodations</h3>
    <p>This employer provides accommodations for people with disabilities, which may include:</p>
    <ul>
        <li>Flexible work arrangements</li>
        <li>Accessible workplace facilities</li>
        <li>Assistive technology</li>
        <li>Modified work schedules</li>
        <li>Contact the employer for specific accommodation details</li>
    </ul>
</div>
`
            : ""
        }
        
        <div class="job-detail-actions">
            <button class="apply-now" data-id="${job.id}" data-title="${job.title}">Apply Now</button>
            <button class="like-job-detail ${isLiked ? "liked" : ""}" data-id="${job.id}">
                ${isLiked ? "Liked" : "Like Job"}
            </button>
            <button class="save-job-detail ${isSaved ? "saved" : ""}" data-id="${job.id}">
                ${isSaved ? "Saved" : "Save Job"}
            </button>
        </div>
    `

  jobDetailModal.style.display = "block"

  // Add event listener to apply now button
  document.querySelector(".apply-now").addEventListener("click", function () {
    if (!isLoggedIn()) {
      alert("Please login to apply for this job.")
      jobDetailModal.style.display = "none"
      loginModal.style.display = "block"
    } else {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      showJobApplicationPage(jobId)
      jobDetailModal.style.display = "none"
    }
  })

  // Add event listener to save job button
  document.querySelector(".save-job-detail").addEventListener("click", function () {
    const jobId = Number.parseInt(this.getAttribute("data-id"))
    toggleSaveJob(jobId, this)
  })

  // Add event listener to like job button
  document.querySelector(".like-job-detail").addEventListener("click", function () {
    const jobId = Number.parseInt(this.getAttribute("data-id"))
    toggleLikeJob(jobId, this)
  })
}

// Toggle save job
function toggleSaveJob(jobId, button) {
  if (!isLoggedIn()) {
    alert("Please login to save jobs.")
    return
  }

  const savedJobs = getSavedJobs()
  const index = savedJobs.indexOf(jobId)

  if (index === -1) {
    // Save job
    savedJobs.push(jobId)
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))

    if (button.classList.contains("save-job-detail")) {
      button.textContent = "Saved"
      button.classList.add("saved")
    } else {
      button.innerHTML = '<i class="fas fa-bookmark"></i>'
      button.classList.add("saved")
    }

    showToast("Job saved successfully!")
  } else {
    // Unsave job
    savedJobs.splice(index, 1)
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))

    if (button.classList.contains("save-job-detail")) {
      button.textContent = "Save Job"
      button.classList.remove("saved")
    } else {
      button.innerHTML = '<i class="fas fa-bookmark"></i>'
      button.classList.remove("saved")
    }

    showToast("Job removed from saved jobs")
  }

  // Update saved jobs tab if it's open
  if (document.getElementById("saved-jobs").style.display === "block") {
    displaySavedJobs()
  }
}

// Toggle like job
function toggleLikeJob(jobId, button) {
  if (!isLoggedIn()) {
    alert("Please login to like jobs.")
    return
  }

  const likedJobs = getLikedJobs()
  const index = likedJobs.indexOf(jobId)

  if (index === -1) {
    // Like job
    likedJobs.push(jobId)
    localStorage.setItem("likedJobs", JSON.stringify(likedJobs))

    if (button.classList.contains("like-job-detail")) {
      button.textContent = "Liked"
      button.classList.add("liked")
    } else {
      button.classList.add("liked")
    }

    showToast("Job liked!")
  } else {
    // Unlike job
    likedJobs.splice(index, 1)
    localStorage.setItem("likedJobs", JSON.stringify(likedJobs))

    if (button.classList.contains("like-job-detail")) {
      button.textContent = "Like Job"
      button.classList.remove("liked")
    } else {
      button.classList.remove("liked")
    }

    showToast("Job unliked")
  }
}

// Show toast notification
function showToast(message) {
  const toastIcon = document.querySelector(".toast-icon")
  const toastMessage = document.querySelector(".toast-message")

  toastMessage.textContent = message
  notificationToast.classList.add("show")

  setTimeout(() => {
    notificationToast.classList.remove("show")
  }, 3000)
}

// Get saved jobs from localStorage
function getSavedJobs() {
  return JSON.parse(localStorage.getItem("savedJobs") || "[]")
}

// Get liked jobs from localStorage
function getLikedJobs() {
  return JSON.parse(localStorage.getItem("likedJobs") || "[]")
}

// Display saved jobs
function displaySavedJobs() {
  const savedJobIds = getSavedJobs()
  const savedJobsContainer = document.getElementById("saved-jobs-container")

  if (savedJobIds.length === 0) {
    savedJobsContainer.innerHTML = '<p class="no-items">You haven\'t saved any jobs yet.</p>'
    return
  }

  savedJobsContainer.innerHTML = ""

  savedJobIds.forEach((jobId) => {
    const job = allJobs.find((j) => j.id === jobId)

    if (job) {
      const savedJobCard = document.createElement("div")
      savedJobCard.className = "saved-job-card"
      savedJobCard.innerHTML = `
                <div class="saved-job-info">
                    <h3 class="saved-job-title">${job.title}</h3>
                    <p class="saved-job-company">${job.company}</p>
                    <div class="saved-job-details">
                        <span>${formatSalary(job.salary)}</span>
                        <span>${job.location}</span>
                        <span>${job.timing}</span>
                    </div>
                    <div class="saved-job-actions">
                        <button class="view-saved-job" data-id="${job.id}">View Details</button>
                        <button class="remove-saved-job" data-id="${job.id}">Remove</button>
                    </div>
                </div>
            `
      savedJobsContainer.appendChild(savedJobCard)
    }
  })

  // Add event listeners to view details buttons
  document.querySelectorAll(".view-saved-job").forEach((button) => {
    button.addEventListener("click", function () {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      showJobApplicationPage(jobId)
    })
  })

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-saved-job").forEach((button) => {
    button.addEventListener("click", function () {
      const jobId = Number.parseInt(this.getAttribute("data-id"))
      const savedJobs = getSavedJobs()
      const index = savedJobs.indexOf(jobId)

      if (index !== -1) {
        savedJobs.splice(index, 1)
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
        displaySavedJobs()
        showToast("Job removed from saved jobs")
      }
    })
  })
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Update page numbers
  const pageNumbersContainer = document.getElementById("page-numbers")
  pageNumbersContainer.innerHTML = ""

  // Determine which page numbers to show
  let startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, startPage + 4)

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4)
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button")
    pageButton.className = `page-number ${i === currentPage ? "active" : ""}`
    pageButton.textContent = i
    pageButton.addEventListener("click", () => {
      currentPage = i
      displayJobs(getCurrentPageJobs())
    })
    pageNumbersContainer.appendChild(pageButton)
  }

  // Update previous and next buttons
  prevPageButton.disabled = currentPage === 1
  nextPageButton.disabled = currentPage === totalPages
}

// Filter jobs based on search and filter criteria
function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase()
  const categoryFilter = document.getElementById("category-filter").value
  const locationFilter = document.getElementById("location-filter").value
  const minSalary = Number.parseInt(salaryFilter.value)
  const experienceFilter = document.getElementById("experience-filter").value
  const scheduleFilter = document.getElementById("schedule-filter").value
  const educationFilter = document.getElementById("education-filter").value

  // Get selected job types
  const selectedJobTypes = []
  document.querySelectorAll('input[name="job-type"]:checked').forEach((checkbox) => {
    selectedJobTypes.push(checkbox.value)
  })

  // Get selected features
  const selectedFeatures = []
  document.querySelectorAll('input[name="features"]:checked').forEach((checkbox) => {
    selectedFeatures.push(checkbox.value)
  })

  filteredJobs = allJobs.filter((job) => {
    // Search term filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm)

    // Category filter
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter

    // Location filter
    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && job.isRemote) ||
      (locationFilter !== "remote" && job.location.toLowerCase() === locationFilter.toLowerCase())

    // Salary filter
    const jobSalary = Number.parseInt(job.salary)
    const matchesSalary = jobSalary >= minSalary

    // Experience filter
    const matchesExperience = experienceFilter === "all" || job.experience === experienceFilter

    // Schedule filter
    const matchesSchedule = scheduleFilter === "all" || job.timing.toLowerCase().includes(scheduleFilter.toLowerCase())

    // Education filter
    const matchesEducation = educationFilter === "all" || job.education === educationFilter

    // Job type filter
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType)

    // Features filter
    const matchesFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.every((feature) => {
        if (feature === "urgent") return job.isUrgent
        if (feature === "remote") return job.isRemote
        if (feature === "new") return job.isNew
        if (feature === "benefits") return job.hasBenefits
        if (feature === "accessible") return job.isAccessible
        if (feature === "disability-friendly") return job.isDisabilityFriendly
        return true
      })

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesSalary &&
      matchesExperience &&
      matchesSchedule &&
      matchesEducation &&
      matchesJobType &&
      matchesFeatures
    )
  })

  // Sort filtered jobs
  sortJobs()

  // Reset to first page
  currentPage = 1

  // Display filtered jobs
  displayJobs(getCurrentPageJobs())
}

// Sort jobs based on selected sort option
function sortJobs() {
  const sortOption = sortOptions.value

  switch (sortOption) {
    case "date":
      filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
      break
    case "salary-high":
      filteredJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary)
        const salaryB = Number.parseInt(b.salary)
        return salaryB - salaryA
      })
      break
    case "salary-low":
      filteredJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary)
        const salaryB = Number.parseInt(b.salary)
        return salaryA - salaryB
      })
      break
    case "relevance":
    default:
      // For relevance, prioritize urgent and new jobs
      filteredJobs.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1
        if (!a.isUrgent && b.isUrgent) return 1
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return new Date(b.postedDate) - new Date(a.postedDate)
      })
      break
  }
}

// Check login status
function checkLoginStatus() {
  const userData = JSON.parse(localStorage.getItem("user"))
  if (userData) {
    username.textContent = userData.name
    userProfile.classList.remove("hidden")
    loginButton.style.display = "none"
    registerButton.style.display = "none"
  }
}

// Event Listeners
searchButton.addEventListener("click", filterJobs)
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    filterJobs()
  }
})

applyFilters.addEventListener("click", filterJobs)
resetFilters.addEventListener("click", () => {
  // Reset all filter inputs
  document.getElementById("category-filter").value = "all"
  document.getElementById("location-filter").value = "all"
  salaryFilter.value = 0
  salaryValue.textContent = `${currentCurrency}0/hr`
  document.getElementById("experience-filter").value = "all"
  document.getElementById("schedule-filter").value = "all"
  document.getElementById("education-filter").value = "all"

  // Reset checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = checkbox.name === "job-type" && checkbox.value === "part-time"
  })

  // Apply filters
  filterJobs()
})

// Category buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active state
    categoryButtons.forEach((btn) => btn.classList.remove("active"))
    this.classList.add("active")

    // Get selected category
    currentCategory = this.getAttribute("data-category")

    // Update category filter dropdown
    document.getElementById("category-filter").value = currentCategory

    // Apply filters
    filterJobs()
  })
})

// View toggle buttons
gridViewButton.addEventListener("click", () => {
  if (currentView !== "grid") {
    currentView = "grid"
    jobListings.className = "job-listings grid-view"
    gridViewButton.classList.add("active")
    listViewButton.classList.remove("active")
  }
})

listViewButton.addEventListener("click", () => {
  if (currentView !== "list") {
    currentView = "list"
    jobListings.className = "job-listings list-view"
    listViewButton.classList.add("active")
    gridViewButton.classList.remove("active")
  }
})

// Sort options
sortOptions.addEventListener("change", function () {
  currentSort = this.value
  sortJobs()
  displayJobs(getCurrentPageJobs())
})

// Pagination buttons
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--
    displayJobs(getCurrentPageJobs())
  }
})

nextPageButton.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  if (currentPage < totalPages) {
    currentPage++
    displayJobs(getCurrentPageJobs())
  }
})

// Profile tab buttons
tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab")

    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    this.classList.add("active")

    // Show selected tab content
    tabContents.forEach((content) => {
      content.style.display = content.id === tabId ? "block" : "none"
    })

    // Load tab-specific content
    if (tabId === "saved-jobs") {
      displaySavedJobs()
    }
  })
})

// Modal event listeners
loginButton.addEventListener("click", () => {
  loginModal.style.display = "block"
})

registerButton.addEventListener("click", () => {
  registerModal.style.display = "block"
})

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault()
  loginModal.style.display = "none"
  registerModal.style.display = "block"
})

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault()
  registerModal.style.display = "none"
  loginModal.style.display = "block"
})

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginModal.style.display = "none"
    registerModal.style.display = "none"
    otpModal.style.display = "none"
    profileModal.style.display = "none"
    jobDetailModal.style.display = "none"
    applyJobModal.style.display = "none"
  })
})

closePopupButton.addEventListener("click", () => {
  internshipPopup.style.display = "none"
})

// OTP input handling
otpInputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      // Move to next input
      if (index < otpInputs.length - 1) {
        otpInputs[index + 1].focus()
      }
    } else if (e.key === "Backspace") {
      // Move to previous input
      if (index > 0) {
        otpInputs[index - 1].focus()
      }
    }
  })
})

// Form submissions
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Validate email format
  if (!validateEmail(email)) {
    alert("Please enter a valid email address")
    return
  }

  // In a real application, this would validate against a database
  if (email && password) {
    loginUser(email)
  }
})
const input = document.getElementById("register-confirm-password-1"); // use the correct new ID
if (input) {
  const value = input.value;
  // continue...
} else {
  console.warn("Password input not found!");
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const name = document.getElementById("register-name").value
  const email = document.getElementById("register-email").value
  const phone = document.getElementById("register-phone").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value

  // Validate email format
  if (!validateEmail(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Validate phone number
  if (!/^\d+$/.test(phone)) {
    alert("Phone number should contain only digits")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password
      })
    });

    const data = await response.json();

    if (data.success) {
      // Store email temporarily for OTP verification
      sessionStorage.setItem('registerEmail', email);
      
      // Show OTP verification
      registerModal.style.display = "none"
      otpModal.style.display = "block"
      startOtpTimer()
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please try again.');
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const otpForm = document.getElementById("otp-form");
  const otpInputs = document.querySelectorAll(".otp-input");
  const otpModal = document.getElementById("otp-modal"); // Ensure this exists in your HTML

  if (otpForm) {
    otpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let otp = "";
      otpInputs.forEach((input) => {
        otp += input.value;
      });

      const email = sessionStorage.getItem('registerEmail');

      if (!email || otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
      }

      try {
        const response = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.removeItem('registerEmail');

          if (otpModal) {
            otpModal.style.display = "none";
          }

          loginUser(data.user);
          showToast('Registration successful!');
        } else {
          alert(data.message || 'Invalid OTP');
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        alert('OTP verification failed. Please try again.');
      }
    });
  }
});

applyJobForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const jobId = Number.parseInt(this.getAttribute("data-job-id"))

  // In a real application, this would submit the application to a database
  alert("Your application has been submitted successfully!")

  // Store application in localStorage for demo purposes
  const applications = JSON.parse(localStorage.getItem("applications") || "[]")
  applications.push({
    jobId,
    date: new Date().toISOString(),
    status: "In Review",
  })
  localStorage.setItem("applications", JSON.stringify(applications))

  // Close modal
  applyJobModal.style.display = "none"
})

// View profile
viewProfileButton.addEventListener("click", () => {
  showUserProfilePage()
})

// View saved jobs
viewSavedJobsButton.addEventListener("click", () => {
  showSavedJobsPage()
})

// View applications
viewApplicationsButton.addEventListener("click", () => {
  showApplicationsPage()
})

// View resume
viewResumeButton.addEventListener("click", () => {
  showResumePage()
})

// Logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("user")
  userProfile.classList.add("hidden")
  loginButton.style.display = "inline-block"
  registerButton.style.display = "inline-block"
})

// Helper functions
function loginUser(email) {
  // In a real application, this would fetch user data from a database
  const userData = JSON.parse(localStorage.getItem("user")) || {
    name: email.split("@")[0],
    email: email,
    phone: "Not provided",
    registrationDate: new Date().toLocaleDateString(),
  }

  username.textContent = userData.name
  userProfile.classList.remove("hidden")
  loginButton.style.display = "none"
  registerButton.style.display = "none"
  loginModal.style.display = "none"

  showToast("Login successful!")
}

function isLoggedIn() {
  return !userProfile.classList.contains("hidden")
}

function startOtpTimer() {
  let timeLeft = 60
  const timer = setInterval(() => {
    timeLeft--
    timerElement.textContent = timeLeft

    if (timeLeft <= 0) {
      clearInterval(timer)
      timerElement.parentElement.textContent = "Resend OTP"
      timerElement.parentElement.style.color = "#4a6cf7"
      timerElement.parentElement.style.cursor = "pointer"
      timerElement.parentElement.addEventListener("click", function () {
        this.innerHTML = 'Resend OTP in <span id="timer">60</span> seconds'
        this.style.color = "#666"
        this.style.cursor = "default"
        const newTimerElement = document.getElementById("timer")
        startOtpTimer()
      })
    }
  }, 1000)
}

function showInternshipPopup() {
  internshipPopup.style.display = "block"
}

// Add Font Awesome icons
document.head.innerHTML +=
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">'

// Update the showJobDetailsInPage function to handle the Apply Now button correctly
function showJobDetailsInPage(jobId, context) {
  const job = allJobs.find((job) => job.id === jobId)

  if (!job) return

  // Get saved and liked status
  const savedJobs = getSavedJobs()
  const likedJobs = getLikedJobs()
  const isSaved = savedJobs.includes(job.id)
  const isLiked = likedJobs.includes(job.id)

  // Format posted date
  const postedDate = new Date(job.postedDate)
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create badges for special features
  let badges = ""
  if (job.isUrgent) {
    badges += '<span class="job-badge badge-urgent">Urgent</span>'
  }
  if (job.isNew) {
    badges += '<span class="job-badge badge-new">New</span>'
  }
  if (job.isRemote) {
    badges += '<span class="job-badge badge-remote">Remote</span>'
  }
  if (job.isDisabilityFriendly) {
    badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
  }

  // Create the job details HTML
  const jobDetailsHTML = `
    <div class="job-detail-overlay">
      <div class="job-detail-container">
        <div class="job-detail-header">
          <button class="close-job-detail" onclick="closeJobDetailsInPage('${context}')">
            <i class="fas fa-times"></i>
          </button>
          <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com" 
               alt="${job.company}" class="job-detail-logo"
               onerror="this.src='https://via.placeholder.com/80?text=${job.company.charAt(0)}'">
          <div class="job-detail-title-container">
            <h2>${job.title} ${badges}</h2>
            <p class="job-detail-company">${job.company}</p>
            <p class="job-detail-posted">Posted on: ${formattedDate}</p>
          </div>
        </div>
        
        <div class="job-detail-info">
          <div class="detail-item">
            <h4>Salary</h4>
            <p>${formatSalary(job.salary)}</p>
          </div>
          <div class="detail-item">
            <h4>Location</h4>
            <p>${job.location}</p>
          </div>
          <div class="detail-item">
            <h4>Schedule</h4>
            <p>${job.timing}</p>
          </div>
          <div class="detail-item">
            <h4>Job Type</h4>
            <p>${job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Experience</h4>
            <p>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Category</h4>
            <p>${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</p>
          </div>
          <div class="detail-item">
            <h4>Gender</h4>
            <p>${job.gender}</p>
          </div>
          <div class="detail-item">
            <h4>Age Limit</h4>
            <p>${job.ageLimit}</p>
          </div>
        </div>
        
        <div class="job-detail-description">
          <h3>Job Description</h3>
          <p>${job.description}</p>
        </div>
        
        <div class="job-detail-requirements">
          <h3>Requirements</h3>
          <ul>
            ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
          </ul>
        </div>
        
        <div class="job-detail-eligibility">
          <h3>Eligibility Criteria</h3>
          <ul>
            ${job.eligibility.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        
        ${
          job.hasBenefits
            ? `
        <div class="job-detail-benefits">
          <h3>Benefits</h3>
          <ul>
            ${job.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
          </ul>
        </div>
        `
            : ""
        }
        ${
          job.isDisabilityFriendly
            ? `
        <div class="job-detail-disability">
          <h3>Disability Accommodations</h3>
          <p>This employer provides accommodations for people with disabilities, which may include:</p>
          <ul>
            <li>Flexible work arrangements</li>
            <li>Accessible workplace facilities</li>
            <li>Assistive technology</li>
            <li>Modified work schedules</li>
            <li>Contact the employer for specific accommodation details</li>
          </ul>
        </div>
        `
            : ""
        }
        
        <div class="job-detail-actions">
          <button class="apply-now" onclick="showApplicationFormInContext(${job.id}, '${context}')">Apply Now</button>
          <button class="like-job-detail ${isLiked ? "liked" : ""}" onclick="toggleLikeJob(${job.id}, this)">
            ${isLiked ? "Liked" : "Like Job"}
          </button>
          <button class="save-job-detail ${isSaved ? "saved" : ""}" onclick="toggleSaveJob(${job.id}, this)">
            ${isSaved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  `

  // Append the job details to the appropriate container based on context
  if (context === "company") {
    // Add the job details to the company jobs page
    const detailsContainer = document.createElement("div")
    detailsContainer.id = "company-job-details"
    detailsContainer.className = "job-details-overlay"
    detailsContainer.innerHTML = jobDetailsHTML
    companyJobsPage.appendChild(detailsContainer)
  } else if (context === "disability") {
    // Add the job details to the disability jobs page
    const detailsContainer = document.createElement("div")
    detailsContainer.id = "disability-job-details"
    detailsContainer.className = "job-details-overlay"
    detailsContainer.innerHTML = jobDetailsHTML
    document.getElementById("disability-jobs-page").appendChild(detailsContainer)
  }
}

// Add a new function to show application form within the current context
function showApplicationFormInContext(jobId, context) {
  const job = allJobs.find((job) => job.id === jobId)
  if (!job) return

  // Close the job details overlay first
  closeJobDetailsInPage(context)

  // Format posted date
  const postedDate = new Date(job.postedDate)
  const formattedDate = postedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create badges for special features
  let badges = ""
  if (job.isUrgent) {
    badges += '<span class="job-badge badge-urgent">Urgent</span>'
  }
  if (job.isNew) {
    badges += '<span class="job-badge badge-new">New</span>'
  }
  if (job.isRemote) {
    badges += '<span class="job-badge badge-remote">Remote</span>'
  }
  if (job.isDisabilityFriendly) {
    badges += '<span class="job-badge badge-disability">Disability-Friendly</span>'
  }

  // Create the application form HTML
  const applicationFormHTML = `
    <div class="application-overlay">
      <div class="application-container">
        <button class="close-application" onclick="closeApplicationInContext('${context}')">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="split-view-container">
          <div class="job-details-panel">
            <div class="job-detail-header">
              <img src="https://logo.clearbit.com/${job.company.toLowerCase().replace(/\s+/g, "")}.com" 
                   alt="${job.company}" class="job-detail-logo"
                   onerror="this.src='https://via.placeholder.com/80?text=${job.company.charAt(0)}'">
              <div class="job-detail-title-container">
                <h2>${job.title} ${badges}</h2>
                <p class="job-detail-company">${job.company}</p>
                <p class="job-detail-posted">Posted on: ${formattedDate}</p>
              </div>
            </div>
            
            <div class="job-detail-info">
              <div class="detail-item">
                <h4>Salary</h4>
                <p>${formatSalary(job.salary)}</p>
              </div>
              <div class="detail-item">
                <h4>Location</h4>
                <p>${job.location}</p>
              </div>
              <div class="detail-item">
                <h4>Schedule</h4>
                <p>${job.timing}</p>
              </div>
            </div>
            
            <div class="job-detail-description">
              <h3>Job Description</h3>
              <p>${job.description}</p>
            </div>
          </div>
          
          <div class="application-form-panel">
            <h2>Apply for this Position</h2>
            <form id="job-application-form-context" data-job-id="${job.id}" data-context="${context}">
              <div class="form-group">
                <label for="apply-name-context">Full Name</label>
                <input type="text" id="apply-name-context" required>
              </div>
              <div class="form-group">
                <label for="apply-email-context">Email</label>
                <input type="email" id="apply-email-context" required>
              </div>
              <div class="form-group">
                <label for="apply-phone-context">Phone Number</label>
                <input type="tel" id="apply-phone-context" required>
              </div>
              <div class="form-group">
                <label for="apply-resume-context">Resume</label>
                <div class="file-input">
                  <input type="file" id="apply-resume-context" accept=".pdf,.doc,.docx">
                  <label for="apply-resume-context">Choose File</label>
                  <span class="file-name">No file chosen</span>
                </div>
              </div>
              <div class="form-group">
                <label for="apply-cover-letter-context">Cover Letter (Optional)</label>
                <textarea id="apply-cover-letter-context" rows="5"></textarea>
              </div>
              <div class="form-group">
                <label>Why are you interested in this position?</label>
                <textarea id="apply-interest-context" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label>Availability</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" name="availability" value="weekdays"> Weekdays</label>
                  <label><input type="checkbox" name="availability" value="weekends"> Weekends</label>
                  <label><input type="checkbox" name="availability" value="evenings"> Evenings</label>
                  <label><input type="checkbox" name="availability" value="mornings"> Mornings</label>
                </div>
              </div>
              <button type="submit" class="submit-application">Submit Application</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `

  // Append the application form to the appropriate container based on context
  if (context === "company") {
    // Add the application form to the company jobs page
    const applicationContainer = document.createElement("div")
    applicationContainer.id = "company-application-form"
    applicationContainer.className = "application-overlay-container"
    applicationContainer.innerHTML = applicationFormHTML
    companyJobsPage.appendChild(applicationContainer)
  } else if (context === "disability") {
    // Add the application form to the disability jobs page
    const applicationContainer = document.createElement("div")
    applicationContainer.id = "disability-application-form"
    applicationContainer.className = "application-overlay-container"
    applicationContainer.innerHTML = applicationFormHTML
    document.getElementById("disability-jobs-page").appendChild(applicationContainer)
  }

  // Pre-fill form with user data if logged in
  if (isLoggedIn()) {
    const userData = JSON.parse(localStorage.getItem("user")) || {}
    if (userData.name) document.getElementById("apply-name-context").value = userData.name
    if (userData.email) document.getElementById("apply-email-context").value = userData.email
    if (userData.phone) document.getElementById("apply-phone-context").value = userData.phone
  }

  // Add event listener to file input
  const fileInput = document.getElementById("apply-resume-context")
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "No file chosen"
      this.nextElementSibling.nextElementSibling.textContent = fileName
    })
  }

  // Add event listener to form submission
  const applicationForm = document.getElementById("job-application-form-context")
  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!isLoggedIn()) {
      alert("Please login to apply for this job.")
      closeApplicationInContext(context)
      loginModal.style.display = "block"
      return
    }

    // In a real application, this would submit the application to a database
    alert("Your application has been submitted successfully!")

    // Store application in localStorage for demo purposes
    const applications = JSON.parse(localStorage.getItem("applications") || "[]")
    applications.push({
      jobId,
      date: new Date().toISOString(),
      status: "In Review",
    })
    localStorage.setItem("applications", JSON.stringify(applications))

    // Close the application form
    closeApplicationInContext(context)
    showToast("Application submitted successfully!")
  })

  // Setup phone validation
  const phoneInput = document.getElementById("apply-phone-context")
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      const value = this.value
      const numericValue = value.replace(/[^0-9]/g, "")

      if (value !== numericValue) {
        this.setCustomValidity("Please enter numbers only")
        this.reportValidity()
        this.classList.add("invalid-input")
        this.value = numericValue
      } else {
        this.setCustomValidity("")
        this.classList.remove("invalid-input")
      }
    })

    phoneInput.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
        phoneInput.setCustomValidity("Please enter numbers only")
        phoneInput.reportValidity()
      } else {
        phoneInput.setCustomValidity("")
      }
    })
  }
}

// Add a function to close the application form in context
function closeApplicationInContext(context) {
  if (context === "company") {
    const applicationElement = document.getElementById("company-application-form")
    if (applicationElement) {
      applicationElement.remove()
    }
  } else if (context === "disability") {
    const applicationElement = document.getElementById("disability-application-form")
    if (applicationElement) {
      applicationElement.remove()
    }
  }
}

// Fix the hideCompanyJobsPage function
function hideCompanyJobsPage() {
  // Remove any open job details or application forms first
  const jobDetails = document.getElementById("company-job-details")
  if (jobDetails) jobDetails.remove()

  const applicationForm = document.getElementById("company-application-form")
  if (applicationForm) applicationForm.remove()

  // Hide the company jobs page
  companyJobsPage.style.display = "none"
}

// Fix the hideDisabilityJobsPage function
function hideDisabilityJobsPage() {
  // Remove any open job details or application forms first
  const jobDetails = document.getElementById("disability-job-details")
  if (jobDetails) jobDetails.remove()

  const applicationForm = document.getElementById("disability-application-form")
  if (applicationForm) applicationForm.remove()

  // Hide the disability jobs page
  const disabilityJobsPage = document.getElementById("disability-jobs-page")
  if (disabilityJobsPage) {
    disabilityJobsPage.style.display = "none"
  }
}

// Update applications display
async function displayApplications() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (!userData) return;

  try {
    const response = await fetch(`/api/applications/${userData.id}`);
    const data = await response.json();

    if (data.success) {
      const applicationsContainer = document.getElementById("applications-list");
      
      if (data.applications.length === 0) {
        applicationsContainer.innerHTML = '<p class="no-items">You haven\'t applied to any jobs yet.</p>';
        return;
      }

      applicationsContainer.innerHTML = data.applications.map(app => {
        const job = allJobs.find(j => j.id === app.job_id);
        if (!job) return '';

        return `
          <div class="application-card">
            <div class="application-info">
              <h3 class="application-title">${job.title}</h3>
              <p class="application-company">${job.company}</p>
              <div class="application-details">
                <span>Applied on: ${new Date(app.created_at).toLocaleDateString()}</span>
                <span>Status: ${app.status}</span>
              </div>
              <div class="application-actions">
                <button class="view-application" onclick="showJobApplicationPage(${job.id})">View Job</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error('Error fetching applications:', error);
    showToast('Failed to load applications');
  }
}

