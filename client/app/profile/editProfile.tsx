import React, { useState } from "react"
import { useUser } from "../Context/UserContext"
import Cookies from 'js-cookie'
import { Pencil, X, Globe, Upload, Lock, Eye, EyeOff } from "lucide-react"
import socket from "../socket"

export default function EditProfile({ setEditMode, editMode, user }: any) {
    // stores the new uploaded img, initially set to user.picture
    // which is the current picture supplied by server
    const [previewPic , setPreviewPic ] = useState( user.picture )
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null) // Store uploaded image URL



    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [submitError, setSubmitError] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState('')

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    // access global user setter so we can update header in real-time
    const { setUser } = useUser();

    

    const handleInputChange = (field: string, value: string) => {
        // enforce max length for name
        if (field === 'name') {
            const max = 24
            if (value.length > max) value = value.slice(0, max)
        }
        // clear submit messages on change
        setSubmitError('')
        setSubmitSuccess('')
        // clear field-specific error while editing
        setErrors(prev => ({ ...prev, [field]: '' }))
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const validatePassword = () => {
        const errs: any = { name: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' }

        // name validation
        if (!formData.name || formData.name.trim().length < 2) {
            errs.name = 'Name must be at least 2 characters.'
        }

        // email validation (required and must be valid format)
        const email = (formData.email || '').trim()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            errs.email = 'Email is required.'
        } else if (!emailRegex.test(email)) {
            errs.email = 'Enter a valid email address.'
        }

        // password validation only if changing
        if (formData.newPassword) {
            if (!formData.currentPassword) {
                errs.currentPassword = 'Current password is required to change password.'
            }
            const strong = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
            if (!strong.test(formData.newPassword)) {
                errs.newPassword = 'Password must be at least 6 chars and include letters and numbers.'
            }
            if (formData.newPassword !== formData.confirmPassword) {
                errs.confirmPassword = 'Passwords do not match.'
            }
        }

        setErrors(errs)
        return !Object.values(errs).some(Boolean)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validatePassword()) return
        
        try {
            // Prepare data to send
            const updateData = {
                userid: user.id,
                name: formData.name,
                email: (formData.email || '').trim(),
                picture: uploadedImageUrl || user.picture, // Use uploaded image or keep current
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }

            console.log("📤 Sending update data:", updateData)

            const response = await fetch('http://localhost:4000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(updateData),
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Update failed:", errorText)
                setSubmitError(errorText || 'Failed to update profile')
                return
            }

            const result = await response.json()
            console.log('✅ Profile updated successfully:', result)
            setSubmitSuccess('Profile updated successfully')
            // If server returned the updated user object, update global user immediately
            if (result && result.id) {
                try {
                    setUser(result)
                } catch (e) {
                    console.warn('Could not set global user from editProfile:', e)
                }
            } else if (result && result.user) {
                try { setUser(result.user) } catch (e) { }
            } else {
                // Fallback: update only name/picture locally in global user
                try {
                    setUser((prev: any) => ({ ...prev, name: updateData.name, picture: updateData.picture }))
                } catch (e) { }
            }
            // Update local preview so the modal shows the saved picture instantly
            setPreviewPic(updateData.picture)
            // emit socket event
            try {
                socket.emit('profile_updated', {
                    userId: user.id,
                    name: updateData.name,
                    picture: updateData.picture
                })
            } catch (e) {
                console.error('Failed to emit socket event', e)
            }
            // close modal after slight delay so user sees success message
            setTimeout(() => setEditMode(false), 700)
        } catch (err) {
            console.error("❌ Error updating profile:", err)
            setSubmitError('An error occurred while updating profile')
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData(); // Create a new FormData object
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Upload failed. Server said:", errorText);
                return;
            }

            const data = await res.json();
            console.log("✅ Image uploaded successfully:", data.url);

            // Only update preview and store the URL, don't save to DB yet
            setPreviewPic(data.url);
            setUploadedImageUrl(data.url);
        } catch (err) {
            console.error("❌ Network/Fetch error:", err);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/30 shadow-2xl w-full max-w-4xl">

                {/* Header */}
                <div className="relative p-6 border-b border-purple-500/20">
                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Edit Profile
                    </h2>
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-200"
                        onClick={() => setEditMode(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <img
                            src={previewPic}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 to-blue-500 shadow-xl ring-4 ring-purple-500/20"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2 shadow-lg">
                            <Pencil size={16} className="text-white" />
                        </div>
                    </div>
                    <label className="relative cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                            <Upload size={18} />
                            Change Picture
                        </div>
                    </label>
                </div>

                {/* Two-column layout */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                    {/* LEFT COLUMN */}
                    <div className="space-y-6">

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                                placeholder="Enter your name"
                            />
                            {/* inline validation message for name */}
                            {errors.name && (
                                <div className="text-xs text-red-400 mt-1">{errors.name}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <div className="text-xs text-red-400 mt-1">{errors.email}</div>
                            )}
                        </div>

                       
                    </div>

                    {/* RIGHT COLUMN - Password Section */}
                    <div className="space-y-6">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium flex items-center gap-2">
                                <Lock size={18} /> Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    value={formData.currentPassword}
                                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                                    placeholder="Enter current password"
                                />
                                <button type="button" onClick={() => togglePasswordVisibility('current')} className="absolute right-3 top-3 text-gray-400">
                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <div className="text-xs text-red-400 mt-1">{errors.currentPassword}</div>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium flex items-center gap-2">
                                <Lock size={18} /> New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                                    placeholder="Enter new password"
                                />
                                <button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute right-3 top-3 text-gray-400">
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <div className="text-xs text-red-400 mt-1">{errors.newPassword}</div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium flex items-center gap-2">
                                <Lock size={18} /> Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                                    placeholder="Confirm new password"
                                />
                                <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="absolute right-3 top-3 text-gray-400">
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <div className="text-xs text-red-400 mt-1">{errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>
                </form>
                {/* Footer Buttons */}
                <div className="p-4">
                    {/* submit messages */}
                    {submitError && <div className="text-sm text-red-400 mb-3">{submitError}</div>}
                    {submitSuccess && <div className="text-sm text-green-400 mb-3">{submitSuccess}</div>}
                </div>
                <div className="flex gap-3 p-6 border-t border-purple-500/20">
                    <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
