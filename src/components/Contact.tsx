"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, Loader2, CheckCircle2, AlertCircle, Instagram, MessageCircle, Github } from "lucide-react";
import styles from "./Contact.module.css";
import { resumeData } from "../utils/resumeData";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMsg(data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setStatus("error");
        setStatusMsg(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setStatusMsg("Server connection failed. Please try again later.");
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="clip">
          <div className={styles.sectionHeader}>
            <span className={styles.headerLabel}>Connection</span>
            <h2 className={styles.headerTitle}>Get In Touch</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Left Column: Info Cards Sidebar */}
          <div className={styles.infoSidebar}>
            <ScrollReveal direction="right" delay={0.1}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Mail size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Email</span>
                  <a href={`mailto:${resumeData.personalInfo.email}`} className={styles.infoValue}>
                    {resumeData.personalInfo.email}
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.16}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MessageCircle size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>WhatsApp</span>
                  <a 
                    href={resumeData.personalInfo.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.infoValue}
                  >
                    +92 314 6071164
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.22}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Instagram size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Instagram</span>
                  <a 
                    href={resumeData.personalInfo.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.infoValue}
                  >
                    @name_isahmad_official
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.28}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Linkedin size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>LinkedIn</span>
                  <a 
                    href={resumeData.personalInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.infoValue}
                  >
                    muhammad-ahmad-amir-9b9556422
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.34}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Github size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>GitHub (Personal)</span>
                  <a 
                    href={resumeData.personalInfo.githubPersonal} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.infoValue}
                  >
                    mahmadamir7
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.40}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Github size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>GitHub (University)</span>
                  <a 
                    href={resumeData.personalInfo.githubUni} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.infoValue}
                  >
                    Ahmad71164
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.46}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MapPin size={20} />
                </div>
                <div className={styles.infoDetails}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>{resumeData.personalInfo.location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Message Form Box */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className={styles.formContainer}>
              <div className={styles.formGlow} />
              
              {/* Form Status Card notifications */}
              {status === "success" && (
                <div className={`${styles.statusMsg} ${styles.statusSuccess}`}>
                  <CheckCircle2 size={18} />
                  <span>{statusMsg}</span>
                </div>
              )}
              {status === "error" && (
                <div className={`${styles.statusMsg} ${styles.statusError}`}>
                  <AlertCircle size={18} />
                  <span>{statusMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  {/* Name Input */}
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={styles.input}
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@example.com"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={styles.input}
                  />
                </div>

                {/* Message TextArea */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project detail..."
                    className={styles.textarea}
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="glow-btn"
                  style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
                >
                  {status === "loading" ? (
                    <>
                      Sending Message <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
