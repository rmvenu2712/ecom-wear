"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react"
import { useMode } from "@/lib/mode-context"
import Image from "next/image"
import logo from '@/public/logo.png'

type ToastType = "success" | "error" | "info"

interface ToastState {
  show: boolean
  message: string
  type: ToastType
}

interface FormData {
  fullName: string
  email: string
  company: string
  message: string
}

export default function ContactPage() {
  const { mode } = useMode()
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info"
  })

  const getModeGradient = () => {
    if (mode === "men") return "from-blue-50 via-white to-blue-50"
    if (mode === "women") return "from-pink-50 via-white to-pink-50"
    return "from-amber-50 via-white to-amber-50"
  }

  const getModeColor = () => {
    if (mode === "men") return "bg-blue-600 hover:bg-blue-700"
    if (mode === "women") return "bg-pink-500 hover:bg-pink-600"
    return "bg-amber-500 hover:bg-amber-600"
  }

  const getModeTextColor = () => {
    if (mode === "men") return "text-blue-600"
    if (mode === "women") return "text-pink-500"
    return "text-amber-500"
  }

  const getModeBorderColor = () => {
    if (mode === "men") return "border-blue-200 focus:border-blue-500"
    if (mode === "women") return "border-pink-200 focus:border-pink-500"
    return "border-amber-200 focus:border-amber-500"
  }

  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" })
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email) {
      showToast("Please fill in all required fields", "error")
      return
    }

    setIsSubmitting(true)

    const submissionData = {
      access_key: '3b0957a5-dbf4-41ce-91b8-aefd1dc393f6',
      name: formData.fullName,
      email: formData.email,
      company: formData.company || 'Not specified',
      message: formData.message || `Contact from ${formData.fullName} - ${formData.company || 'No company specified'}`,
      subject: `New Contact Form Submission from ${formData.fullName}`,
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        showToast("Message sent successfully! We'll get back to you soon.", "success")
        setFormData({
          fullName: "",
          email: "",
          company: "",
          message: ""
        })
        
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        showToast("Failed to send message. Please try again.", "error")
      }
    } catch (error) {
      showToast("Failed to send message. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen overflow-hidden bg-gradient-to-br ${getModeGradient()} py-12 px-4 sm:px-6 lg:px-8`}>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl px-6 py-4 l animate-in slide-in-from-top-5 ${
          toast.type === "success" ? "bg-green-50 border-2 border-green-200" :
          toast.type === "error" ? "bg-red-50 border-2 border-red-200" :
          "bg-blue-50 border-2 border-blue-200"
        }`}>
          <p className="text-sm font-medium text-gray-800">{toast.message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex justify-center mb-6">
          </div>
          <h1 className="text-5xl uppercase font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6  transition-all duration-300 transform hover:-translate-y-1 animate-in fade-in slide-in-from-left duration-700">
              <div className={`w-14 h-14 rounded-xl ${getModeColor()} flex items-center justify-center mb-4`}>
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">Send us an email anytime</p>
              <a href="mailto:rmvenu001@gmail.com" className={`${getModeTextColor()} font-medium hover:underline`}>
                rmvenu001@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6  transition-all duration-300 transform hover:-translate-y-1 animate-in fade-in slide-in-from-left duration-700 delay-100">
              <div className={`w-14 h-14 rounded-xl ${getModeColor()} flex items-center justify-center mb-4`}>
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3">Mon-Fri from 9am to 6pm</p>
              <a href="tel:+916385538151" className={`${getModeTextColor()} font-medium hover:underline`}>
                +91 6385538151
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-6  transition-all duration-300 transform hover:-translate-y-1 animate-in fade-in slide-in-from-left duration-700 delay-200">
              <div className={`w-14 h-14 rounded-xl ${getModeColor()} flex items-center justify-center mb-4`}>
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Tamil Nadu, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl l p-8 lg:p-10 animate-in fade-in slide-in-from-right duration-700">
              {isSuccess ? (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className={`w-20 h-20 rounded-full ${getModeColor()} flex items-center justify-center mx-auto mb-6`}>
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-600 text-lg">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="group">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${getModeBorderColor()} bg-gray-50 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-400`}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${getModeBorderColor()} bg-gray-50 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-400`}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div className="group">
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${getModeBorderColor()} bg-gray-50 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-400`}
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${getModeBorderColor()} bg-gray-50 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 resize-none`}
                        placeholder="Tell us what you need help with..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${getModeColor()} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <p className="text-gray-600 mb-4">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/venu-rm/" target="_blank" className={`w-12 h-12 rounded-full ${getModeColor()} flex items-center justify-center text-white hover:scale-110 transition-transform duration-300`}>
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com/rmvenu2712" target="_blank" className={`w-12 h-12 rounded-full ${getModeColor()} flex items-center justify-center text-white hover:scale-110 transition-transform duration-300`}>
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://api.whatsapp.com/send?phone=916385538151" target="_blank" className={`w-12 h-12 rounded-full ${getModeColor()} flex items-center justify-center text-white hover:scale-110 transition-transform duration-300`}>
              <span className="sr-only">WhatsApp</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
