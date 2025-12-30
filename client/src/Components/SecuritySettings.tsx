import { useState } from 'react';
import { Lock, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const SecuritySettings = () => {
    const { getAuthHeader, logout } = useAuth();

    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const toggleVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!formData.current_password || !formData.password || !formData.password_confirmation) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setError('New password and confirmation do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://round8-cure-php-team-two.huma-volve.com/api/patient/profile/password', {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    current_password: formData.current_password,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                }),
            });

            const data = await response.json();

            // Check for both HTTP status error AND logical error in response body
            if (!response.ok || (data && data.status === 'error')) {
                if (response.status === 401) {
                    logout();
                    window.location.href = '/'; // Force redirect
                    throw new Error('Session expired. Please login again.');
                }
                throw new Error(data.message || 'Failed to update password');
            }

            setSuccess('Password updated successfully!');
            setFormData({
                current_password: '',
                password: '',
                password_confirmation: ''
            });

        } catch (err: any) {
            console.error('Password update error:', err);
            setError(err.message || 'An error occurred while updating password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 p-8 md:p-12">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Security Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your password and account security</p>
                </div>
            </div>

            {/* Alerts */}
            {error && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}
            {success && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <PasswordInput
                    label="Current Password"
                    value={formData.current_password}
                    onChange={(v) => setFormData(prefix => ({ ...prefix, current_password: v }))}
                    isVisible={showPassword.current}
                    onToggle={() => toggleVisibility('current')}
                    placeholder="Enter current password"
                />

                <hr className="border-slate-100 my-6" />

                <PasswordInput
                    label="New Password"
                    value={formData.password}
                    onChange={(v) => setFormData(prefix => ({ ...prefix, password: v }))}
                    isVisible={showPassword.new}
                    onToggle={() => toggleVisibility('new')}
                    placeholder="Enter new password"
                />

                <PasswordInput
                    label="Confirm New Password"
                    value={formData.password_confirmation}
                    onChange={(v) => setFormData(prefix => ({ ...prefix, password_confirmation: v }))}
                    isVisible={showPassword.confirm}
                    onToggle={() => toggleVisibility('confirm')}
                    placeholder="Confirm new password"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200/50 hover:bg-blue-700 hover:-translate-y-0.5 disabled:bg-slate-200 disabled:shadow-none disabled:translate-y-0 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating Password...
                        </>
                    ) : (
                        'Update Password'
                    )}
                </button>
            </form>
        </div>
    );
};

const PasswordInput = ({ label, value, onChange, isVisible, onToggle, placeholder }: {
    label: string,
    value: string,
    onChange: (val: string) => void,
    isVisible: boolean,
    onToggle: () => void,
    placeholder: string
}) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock className="w-5 h-5" />
            </div>
            <input
                type={isVisible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
                {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
    </div>
);

export default SecuritySettings;
