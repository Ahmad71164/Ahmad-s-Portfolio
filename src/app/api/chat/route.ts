import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { resumeData } from "../../../utils/resumeData";

// Context payload for LLM system prompt
const SYSTEM_PROMPT = `
You are an AI personal assistant representing Muhammad Ahmad Amir, a Software Engineering student at FAST-NUCES and Full Stack Developer.
Your purpose is to answer questions about Muhammad's background, education, projects, skills, and contact details in a professional, polite, and helpful manner.
Always write in the third-person or as his representative. Keep your responses concise, readable, and structured using clean Markdown.

Here is Muhammad Ahmad Amir's official resume data:

PERSONAL INFO:
- Name: ${resumeData.personalInfo.name}
- Title: ${resumeData.personalInfo.title}
- Location: ${resumeData.personalInfo.location}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone}
- LinkedIn: ${resumeData.personalInfo.linkedin}
- Bio: ${resumeData.personalInfo.bio}

EDUCATION:
${resumeData.education.map(edu => `- ${edu.title} at ${edu.institution} (${edu.period}): ${edu.description}`).join("\n")}

EXPERIENCE:
${resumeData.experience.map(exp => `- ${exp.title} at ${exp.institution} (${exp.period}): ${exp.description}`).join("\n")}

PROJECTS:
${resumeData.projects.map(proj => `- **${proj.name}** [Category: ${proj.category}] (Tech: ${proj.tech}) (Period: ${proj.period}): ${proj.description}`).join("\n")}

SKILLS:
${resumeData.skills.map(skill => `- ${skill.category}: ${skill.items.join(", ")}`).join("\n")}

If a user asks about something not related to Muhammad or his professional portfolio, politely guide them back to his portfolio, projects, or background.
`;

// Helper for local keyword-based responses (no-API fallback)
function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  
  // Greetings
  if (q.match(/\b(hi|hello|hey|greetings|hola)\b/)) {
    return `Hello! I am Muhammad's AI Portfolio Assistant. I can tell you about his projects, skills, education, experience, or how to contact him. What would you like to know?`;
  }
  
  // Projects
  if (q.includes("project") || q.includes("portfolio") || q.includes("build") || q.includes("make") || q.includes("work")) {
    // Check specific projects
    if (q.includes("satyfinder") || q.includes("saty finder")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase() === "satyfinder");
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("text extraction") || q.includes("extraction")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("text"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("ordering bot") || q.includes("restaurant") || q.includes("ordering")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("restaurant"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("dictionary") || q.includes("arabic") || q.includes("urdu")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("dictionary"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("apple") || q.includes("clone")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("apple"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("store") || q.includes("ecommerce") || q.includes("online store")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("store"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }
    if (q.includes("lost") || q.includes("found") || q.includes("figma")) {
      const p = resumeData.projects.find(x => x.name.toLowerCase().includes("lost"));
      return p ? `**${p.name}** (${p.period}):\n${p.description}\n\n**Tech Stack:** ${p.tech}` : "";
    }

    let response = `Here are some of the notable projects Muhammad has built:\n\n`;
    resumeData.projects.forEach(p => {
      response += `- **${p.name}** (${p.tech}): ${p.description}\n`;
    });
    response += `\nWhich one would you like to know more about?`;
    return response;
  }
  
  // Skills
  if (q.includes("skill") || q.includes("languages") || q.includes("program") || q.includes("code") || q.includes("technolog") || q.includes("database")) {
    let response = `Muhammad's technical skills cover the following areas:\n\n`;
    resumeData.skills.forEach(category => {
      response += `- **${category.category}:** ${category.items.join(", ")}\n`;
    });
    return response;
  }
  
  // Education
  if (q.includes("education") || q.includes("study") || q.includes("university") || q.includes("college") || q.includes("fast") || q.includes("nuces") || q.includes("degree")) {
    let response = `Here is Muhammad's academic history:\n\n`;
    resumeData.education.forEach(edu => {
      response += `- **${edu.title}**\n  ${edu.institution} (${edu.period})\n  ${edu.description}\n\n`;
    });
    return response;
  }
  
  // Experience
  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("employ") || q.includes("freelance")) {
    let response = `Here is Muhammad's professional experience:\n\n`;
    resumeData.experience.forEach(exp => {
      response += `- **${exp.title}** at ${exp.institution} (${exp.period})\n  ${exp.description}\n\n`;
    });
    return response;
  }
  
  // Contact
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin") || q.includes("hire") || q.includes("social")) {
    return `You can get in touch with Muhammad via:\n\n- **Email:** [${resumeData.personalInfo.email}](mailto:${resumeData.personalInfo.email})\n- **Phone:** ${resumeData.personalInfo.phone}\n- **LinkedIn:** [linkedin.com/in/muhammad-ahmad-amir](${resumeData.personalInfo.linkedin})\n\nYou can also use the contact form on this site to send him an instant message!`;
  }
  
  // Fallback default
  return `I can help you with questions about Muhammad Ahmad Amir's portfolio, including:\n- **Projects** (e.g. SatyFinder, Text Extraction System)\n- **Technical Skills** (e.g. C++, Java, Kotlin, React, Python)\n- **Education & Experience**\n- **Contact Information**\n\nWhat would you like to learn about?`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body?.userId;
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages payload" }, { status: 400 });
    }

    if (typeof userId !== "string" || !userId.trim()) {
      return NextResponse.json({ error: "Unauthorized: Invalid user ID" }, { status: 401 });
    }

    // Retrieve or establish secure session from cookies to prevent user impersonation (CWE-862)
    const cookieStore = await cookies();
    let sessionUserId = cookieStore.get("chat-session-id")?.value;

    if (!sessionUserId) {
      sessionUserId = userId;
      cookieStore.set("chat-session-id", sessionUserId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
    }

    // Validate that the request contains the proper authorization check
    if (userId !== sessionUserId) {
      return NextResponse.json(
        { error: "Unauthorized: User ID validation failed" },
        { status: 401 }
      );
    }

    const lastUserMessage = messages[messages.length - 1];
    const userQuery = lastUserMessage?.content || "";

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      // Setup payload for Gemini API
      // Translate messages history into Gemini structure
      const contents = messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return NextResponse.json({ message: text });
        }
      }
      
      console.warn("Gemini API call failed, falling back to local responder");
    }

    // Fallback: Smart Local Matching
    const fallbackText = getLocalFallbackResponse(userQuery);
    // Simulate minor delay for typing feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json({ message: fallbackText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
