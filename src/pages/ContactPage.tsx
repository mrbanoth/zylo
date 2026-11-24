import React, { useState } from "react";
import { Check, Mail, MapPin, Clock } from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Creator & Brand Demo");
  const [channels, setChannels] = useState("4–10 social channels");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid work or studio email.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Please share a short summary of your social workflow goals.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#5A5D65]">Contact Zylo</p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight">
                  Talk with our growth team
                </h1>
                <p className="text-base text-[#5A5D65] leading-relaxed">
                  Planning a multi-brand agency rollout or custom social automation pipeline? Send us your workflow requirements and we will reply within one business day.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#7CF2B5] flex items-center justify-center text-[#111214] shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#111214]">Email Support</p>
                    <p className="text-sm text-[#5A5D65]">hello@zylo.social</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#B39FF8] flex items-center justify-center text-[#111214] shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#111214]">Response Time</p>
                    <p className="text-sm text-[#5A5D65]">Under 4 business hours for Studio & Agency</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#FCE694] flex items-center justify-center text-[#111214] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#111214]">Headquarters</p>
                    <p className="text-sm text-[#5A5D65]">548 Market St, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 rounded-[36px] border border-neutral-200 bg-neutral-50/70 p-7 sm:p-10">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <span className="w-14 h-14 rounded-full bg-[#7CF2B5] text-[#111214] inline-flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[#111214]">
                    Message received
                  </h2>
                  <p className="text-sm text-[#5A5D65] max-w-md mx-auto leading-relaxed">
                    Thank you, {name}. Our onboarding specialist will email{" "}
                    <span className="font-semibold text-[#111214]">{email}</span> regarding{" "}
                    <span className="font-semibold text-[#111214]">{topic}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#111214] mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Maya Lin"
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#111214] mb-1.5">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="maya@studio.com"
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#111214] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                      >
                        <option>Creator & Brand Demo</option>
                        <option>Agency Network Onboarding</option>
                        <option>OAuth & Security Review</option>
                        <option>Partnership & Cross-Promo</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-channels" className="block text-xs font-semibold text-[#111214] mb-1.5">
                        Channel Volume
                      </label>
                      <select
                        id="contact-channels"
                        value={channels}
                        onChange={(e) => setChannels(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                      >
                        <option>1–3 social channels</option>
                        <option>4–10 social channels</option>
                        <option>11–50 client channels</option>
                        <option>50+ enterprise workspaces</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#111214] mb-1.5">
                      Workflow Goals
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us which social channels you manage and what automations you want to set up..."
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors cursor-pointer"
                  >
                    Request Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
