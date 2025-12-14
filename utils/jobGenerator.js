// Job generation utility - moved from frontend to backend
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

  // Generate 20-30 jobs total across all categories
  const totalJobs = Math.floor(Math.random() * 11) + 20; // 20-30 jobs
  let jobsGenerated = 0;

  while (jobsGenerated < totalJobs) {
    const category = categories[Math.floor(Math.random() * categories.length)];
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
        company = retailCompanies[Math.floor(Math.random() * retailCompanies.length)]
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
        company = hospitalityCompanies[Math.floor(Math.random() * hospitalityCompanies.length)]
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
        company = tutoringCompanies[Math.floor(Math.random() * tutoringCompanies.length)]
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
        company = deliveryCompanies[Math.floor(Math.random() * deliveryCompanies.length)]
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
        company = cleaningCompanies[Math.floor(Math.random() * cleaningCompanies.length)]
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
        company = cateringCompanies[Math.floor(Math.random() * cateringCompanies.length)]
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
        company = securityCompanies[Math.floor(Math.random() * securityCompanies.length)]
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
        company = officeCompanies[Math.floor(Math.random() * officeCompanies.length)]
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
        company = healthcareCompanies[Math.floor(Math.random() * healthcareCompanies.length)]
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
        company = itCompanies[Math.floor(Math.random() * itCompanies.length)]
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
        company = otherCompanies[Math.floor(Math.random() * otherCompanies.length)]
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
    jobsGenerated++
  }

  return jobs
}

module.exports = { generateJobs }
