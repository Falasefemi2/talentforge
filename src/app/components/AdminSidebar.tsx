import {
    Shield,
    Users,
    Briefcase,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

export type AdminPage =
    | "overview"
    | "user-management"
    | "job-management"
    | "platform-metrics"
    | "settings"
    | "profile";

interface AdminSidebarProps {
    currentPage: AdminPage;
    onPageChange: (page: AdminPage) => void;
    onLogout?: () => void;
    user?: any;
    isOpen?: boolean;
    onClose?: () => void;
}

export function AdminSidebar({
    currentPage,
    onPageChange,
    onLogout,
    user,
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const menuItems = [
        { id: "overview" as AdminPage, icon: BarChart3, label: "Dashboard" },
        {
            id: "user-management" as AdminPage,
            icon: Users,
            label: "User Management",
        },
        {
            id: "job-management" as AdminPage,
            icon: Briefcase,
            label: "Job Management",
        },
        {
            id: "platform-metrics" as AdminPage,
            icon: BarChart3,
            label: "Platform Metrics",
        },
        { id: "settings" as AdminPage, icon: Settings, label: "Settings" },
    ];

    const userName =
        user?.user_metadata?.name || user?.email?.split("@")[0] || "Admin";
    const userCompany = user?.user_metadata?.company || "Administrator";
    const userInitials =
        userName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2) || "AD";

    return (
        <>
            <div className="hidden md:flex w-[280px] bg-gradient-to-b from-emerald-950 to-green-950 text-white flex-col border-r border-emerald-800 h-screen">
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold leading-none">
                            TalentForge
                        </span>
                        <span className="text-xs text-emerald-200 mt-1">Admin Portal</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => onPageChange(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                ? "bg-yellow-400 text-gray-900 font-semibold"
                                                : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-emerald-800">
                    <button
                        onClick={() => onPageChange("profile" as AdminPage)}
                        className="w-full flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 flex-shrink-0">
                            <span className="text-sm font-semibold">{userInitials}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <div className="font-medium truncate text-white">{userName}</div>
                            <div className="text-xs text-emerald-200 truncate">
                                {userCompany}
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    </button>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-green-100 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                        </button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => onClose && onClose()}
                    />
                    <div className="relative w-[280px] bg-gradient-to-b from-emerald-950 to-green-950 text-white flex flex-col border-r border-emerald-800 h-full">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-semibold leading-none">
                                        TalentForge
                                    </span>
                                    <span className="text-xs text-emerald-200 mt-1">
                                        Admin Portal
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onClose && onClose()}
                                className="p-2 rounded-md hover:bg-emerald-900"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="flex-1 px-4 py-6">
                            <ul className="space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentPage === item.id;

                                    return (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => {
                                                    onPageChange(item.id);
                                                    onClose && onClose();
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                        ? "bg-yellow-400 text-gray-900 font-semibold"
                                                        : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span>{item.label}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="p-4 border-t border-emerald-800">
                            <button
                                onClick={() => {
                                    onPageChange("profile" as AdminPage);
                                    onClose && onClose();
                                }}
                                className="w-full flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 flex-shrink-0">
                                    <span className="text-sm font-semibold">{userInitials}</span>
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="font-medium truncate text-white">
                                        {userName}
                                    </div>
                                    <div className="text-xs text-emerald-200 truncate">
                                        {userCompany}
                                    </div>
                                </div>
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            </button>
                            {onLogout && (
                                <button
                                    onClick={() => {
                                        onLogout();
                                        onClose && onClose();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-green-100 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
