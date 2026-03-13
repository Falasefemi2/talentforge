import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Loader } from 'lucide-react';
// Supabase usage disabled — credentials import commented out.
// import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AdminSetupProps {
    onComplete: () => void;
}

export function AdminSetup({ onComplete }: AdminSetupProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

    const handleCreateAdmin = async () => {
        setLoading(true);
        setError('');

        try {
            // Supabase admin bootstrap disabled — skipping network call.
            // Previously this performed a POST to a Supabase Edge Function.
            throw new Error('Supabase disabled: admin bootstrap unavailable.');
        } catch (err: any) {
            console.error('Error creating admin:', err);
            setError(err.message || 'Failed to create admin user');
        } finally {
            setLoading(false);
        }
    };

    if (success && credentials) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Created Successfully!</h2>
                        <p className="text-gray-600">Your administrator account is ready to use.</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Admin Credentials
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-amber-800 mb-1">Email</label>
                                <div className="bg-white border border-amber-300 rounded px-3 py-2 font-mono text-sm text-gray-900">
                                    {credentials.email}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-amber-800 mb-1">Password</label>
                                <div className="bg-white border border-amber-300 rounded px-3 py-2 font-mono text-sm text-gray-900">
                                    {credentials.password}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-amber-700 mt-4 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>Please save these credentials securely. You should change the password after your first login.</span>
                        </p>
                    </div>

                    <button
                        onClick={onComplete}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
                    >
                        Continue to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Shield className="w-10 h-10 text-slate-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup Required</h2>
                    <p className="text-gray-600">Create the initial administrator account for TalentForge</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">What will be created:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>System administrator account with full access</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>User management capabilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>Platform analytics and metrics access</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>Job and candidate oversight</span>
                        </li>
                    </ul>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-red-900">Error</p>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-xs text-amber-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>
                            This will create an admin account with email <strong>admin@talentforge.com</strong>.
                            You can create additional admins later from the admin panel.
                        </span>
                    </p>
                </div>

                <button
                    onClick={handleCreateAdmin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Creating Admin...
                        </>
                    ) : (
                        <>
                            <Shield className="w-5 h-5" />
                            Create Admin Account
                        </>
                    )}
                </button>

                <button
                    onClick={onComplete}
                    className="w-full mt-3 text-gray-600 hover:text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Skip (I already have an admin)
                </button>
            </div>
        </div>
    );
}
