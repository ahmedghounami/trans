import { Pencil, X, Globe, Upload, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function EditProfile({ setEditMode, editMode, user }) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        language: user.language || 'English',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
        { code: 'ar', name: 'العربية' }
    ]

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const validatePassword = () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            alert('New passwords do not match!')
            return false
        }
        if (formData.newPassword && formData.newPassword.length < 6) {
            alert('Password must be at least 6 characters long!')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validatePassword()) return
        console.log('Form submitted:', formData)
        setEditMode(false)
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


            const update = await fetch('/api//profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    picture: data.url, // Use the URL returned from the upload
                    userid: user.id, // Assuming you have the user ID available
                }),
            });
            // if (!update.ok) {
            //     const errorText = await res.text();
            //     console.error("Upload failed. Server said:", errorText);
            //     return;
            // }

            console.log("✅ Uploaded successfully:", data.url);
        } catch (err) {
            console.error("❌ Network/Fetch error:", err);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/30 shadow-2xl w-full max-w-4xl">

                {/* Header */}
                <div className="relative p-6 border-b border-purple-500/20">
                    <h2 className="text-white text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                            src={user.picture}
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
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <label className="text-gray-300 font-medium flex items-center gap-2">
                                <Globe size={18} /> Language
                            </label>
                            <select
                                value={formData.language}
                                onChange={(e) => handleInputChange('language', e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/40 text-white border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.name} className="bg-gray-900">
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
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
                        </div>
                    </div>
                </form>

                {/* Footer Buttons */}
                <div className="flex gap-3 p-6 border-t border-purple-500/20">
                    <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
