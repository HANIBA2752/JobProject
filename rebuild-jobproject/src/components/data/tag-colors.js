export const TAG_COLORS = {
  // Learning Platform Types
  "Free": { bg: "#E6F3FF", text: "#1E88E5" },
  "Paid": { bg: "#FFF3E0", text: "#FFA000" },
  
  // Learning Modes
  "Interactive": { bg: "#E8F5E9", text: "#43A047" },
  "Video Tutorials": { bg: "#F3E5F5", text: "#8E24AA" },
  
  // Skill Levels
  "Beginner": { bg: "#E3F2FD", text: "#2196F3" },
  "Professional": { bg: "#FFF8E1", text: "#FF9800" },
  "Advanced": { bg: "#FFEBEE", text: "#E53935" },
  
  // Technical Categories
  "Web Development": { bg: "#E1F5FE", text: "#03A9F4" },
  "Programming": { bg: "#F1F8E9", text: "#4CAF50" },
  "Mobile": { bg: "#F9FBE7", text: "#827717" },
  
  // Specialized Areas
  "Certification": { bg: "#E8EAF6", text: "#3F51B5" },
  "Interview Prep": { bg: "#FAFAFA", text: "#757575" },
  "Coding Practice": { bg: "#F9A825", text: "#FFFFFF" },
  "Algorithms": { bg: "#D1C4E9", text: "#6A1B9A" },
  "Data Structures": { bg: "#B2DFDB", text: "#00796B" },
  
  // Default color for unmatched tags
  "default": { bg: "#E0E0E0", text: "#616161" }
};

export const getTagColor = (tag) => {
  // Try to find an exact match first
  if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  
  // If no exact match, try partial match
  const matchedKey = Object.keys(TAG_COLORS).find(key => 
    tag.toLowerCase().includes(key.toLowerCase())
  );
  
  return matchedKey ? TAG_COLORS[matchedKey] : TAG_COLORS.default;
};