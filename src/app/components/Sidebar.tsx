import {
    Layers,
    Briefcase,
    Users,
    Calendar,
    Brain,
    LogOut,
    User,
    Mail,
} from "lucide-react";

export type RecruiterPage =
    | "overview"
    | "job-postings"
    | "candidates"
    | "interviews"
    | "ai-screening"
    | "profile";

interface RecruiterSidebarProps {
    currentPage: RecruiterPage;
    onPageChange: (page: RecruiterPage) => void;
    onLogout?: () => void;
    user?: any;
    isOpen?: boolean;
    onClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export function RecruiterSidebar({
    currentPage,
    onPageChange,
    onLogout,
    user,
    isOpen,
    onClose,
    isCollapsed = false,
    onToggleCollapse,
}: RecruiterSidebarProps) {
    const menuItems = [
        { id: "overview" as RecruiterPage, icon: Layers, label: "Overview" },
        {
            id: "job-postings" as RecruiterPage,
            icon: Briefcase,
            label: "Job Postings",
        },
        { id: "candidates" as RecruiterPage, icon: Users, label: "Candidates" },
        { id: "interviews" as RecruiterPage, icon: Calendar, label: "Interviews" },
        { id: "ai-screening" as RecruiterPage, icon: Brain, label: "AI Screening" },
        { id: "profile" as RecruiterPage, icon: User, label: "Profile" },
    ];

    const userName =
        user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
    const userCompany = user?.user_metadata?.company || "Recruiter";
    const userInitials =
        userName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2) || "US";

    return (
        <>
            {/* Desktop sidebar - responsive width */}
            <div
                className={`hidden md:flex bg-gradient-to-b from-emerald-950 to-green-950 text-white flex-col border-r border-emerald-800 h-screen transition-all duration-300 ${isCollapsed ? "w-20" : "w-[280px]"
                    }`}
            >
                {/* Logo */}
                <div
                    className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
                >
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 flex-shrink-0">
                        <Layers className="w-6 h-6" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold leading-none">
                                TalentForge
                            </span>
                            <span className="text-xs text-emerald-200 mt-1">
                                Recruiter Portal
                            </span>
                        </div>
                    )}
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
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isCollapsed ? "justify-center px-2" : ""
                                            } ${isActive
                                                ? "bg-yellow-400 text-gray-900 font-semibold"
                                                : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
                                            }`}
                                        title={isCollapsed ? item.label : ""}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-emerald-800 space-y-2">
                    {onToggleCollapse && (
                        <button
                            onClick={onToggleCollapse}
                            className="w-full flex items-center justify-center gap-2 px-2 py-2 text-emerald-100 hover:bg-emerald-900 rounded-lg transition-all"
                            title={isCollapsed ? "Expand" : "Collapse"}
                        >
                            <span className="text-lg">{isCollapsed ? "→" : "←"}</span>
                        </button>
                    )}
                    <button
                        onClick={() => onPageChange("profile" as RecruiterPage)}
                        className={`w-full flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity ${isCollapsed ? "justify-center" : ""
                            }`}
                        title={isCollapsed ? "Profile" : ""}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 flex-shrink-0">
                            <span className="text-sm font-semibold">{userInitials}</span>
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0 text-left">
                                <div className="font-medium truncate text-white">
                                    {userName}
                                </div>
                                <div className="text-xs text-emerald-200 truncate">
                                    {userCompany}
                                </div>
                            </div>
                        )}
                        {!isCollapsed && (
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        )}
                    </button>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-green-100 hover:bg-red-600 hover:text-white rounded-lg transition-all ${isCollapsed ? "px-2" : ""
                                }`}
                            title={isCollapsed ? "Logout" : ""}
                        >
                            <LogOut className="w-4 h-4" />
                            {!isCollapsed && <span className="text-sm">Logout</span>}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile drawer */}
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
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-semibold leading-none">
                                        TalentForge
                                    </span>
                                    <span className="text-xs text-emerald-200 mt-1">
                                        Recruiter Portal
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onClose && onClose()}
                                className="p-2 rounded-md hover:bg-emerald-900"
                                aria-label="Close sidebar"
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
                                    onPageChange("profile");
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
