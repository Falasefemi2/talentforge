import { Search, Globe, Bell, Menu } from "lucide-react";

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onToggleSidebar?: () => void;
}

export function Header({
    searchQuery,
    onSearchChange,
    onToggleSidebar,
}: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs, candidates, or reports..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                </div>

                {/* Right section */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Globe className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
