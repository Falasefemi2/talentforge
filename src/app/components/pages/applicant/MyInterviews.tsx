import { Calendar, Clock, Video, MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { useGetApplicantInterviews } from '@/api/hooks/useInterview';
import { Interview as ApiInterview } from '@/api/types';

// map numeric status to string labels used in UI
const statusMap: Record<number, 'upcoming' | 'completed' | 'cancelled'> = {
    0: 'upcoming',
    1: 'completed',
    2: 'cancelled',
    3: 'completed',
    4: 'cancelled',
};

interface Interview {
    id: string;
    position: string;
    company?: string;
    date: string;
    time: string;
    type: 'Phone' | 'Video' | 'In-Person' | 'Technical';
    interviewer?: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    notes?: string;
}
export function MyInterviews() {
    const { data: ivResponse, isLoading, error } = useGetApplicantInterviews();

    const interviews: Interview[] = ivResponse?.data?.items?.map((i: ApiInterview) => {
        const dt = new Date(i.scheduledTime);
        const date = dt.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
        const time = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        const type: Interview['type'] = i.meetingLink ? 'Video' : 'Phone';
        return {
            id: i.id,
            position: i.title,
            date,
            time,
            type,
            status: statusMap[i.status] ?? 'upcoming',
            // company and interviewer unknown from API
        };
    }) || [];

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Loading interviews...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load interviews</h3>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        );
    }

    // derive sections from fetched data
    const upcomingInterviews = interviews.filter((i) => i.status === 'upcoming');
    const completedInterviews = interviews.filter((i) => i.status === 'completed');


    const getTypeIcon = (type: Interview['type']) => {
        switch (type) {
            case 'Video':
                return Video;
            case 'Phone':
                return Phone;
            case 'In-Person':
                return MapPin;
            case 'Technical':
                return Video;
            default:
                return Video;
        }
    };

    const getTypeColor = (type: Interview['type']) => {
        switch (type) {
            case 'Video':
                return 'bg-emerald-100 text-emerald-700';
            case 'Phone':
                return 'bg-teal-100 text-teal-700';
            case 'In-Person':
                return 'bg-amber-100 text-amber-700';
            case 'Technical':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Interviews</h1>
                <p className="text-gray-600">Manage and prepare for your upcoming interviews.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">UPCOMING INTERVIEWS</div>
                    <div className="text-4xl font-semibold text-emerald-600">{upcomingInterviews.length}</div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">COMPLETED</div>
                    <div className="text-4xl font-semibold text-gray-600">{completedInterviews.length}</div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">TOTAL INTERVIEWS</div>
                    <div className="text-4xl font-semibold text-gray-900">{interviews.length}</div>
                </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
                <div className="space-y-4">
                    {upcomingInterviews.map((interview) => {
                        const TypeIcon = getTypeIcon(interview.type);
                        return (
                            <div
                                key={interview.id}
                                className="bg-white rounded-lg border-2 border-emerald-200 p-6 hover:border-emerald-400 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{interview.position}</h3>
                                            <Badge className={`${getTypeColor(interview.type)} border-0 flex items-center gap-1`}>
                                                <TypeIcon className="w-3 h-3" />
                                                {interview.type}
                                            </Badge>
                                        </div>
                                        {interview.company && (
                                            <p className="text-gray-600 font-medium mb-3">{interview.company}</p>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Calendar className="w-4 h-4 text-emerald-600" />
                                                <span>
                                                    {new Date(interview.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock className="w-4 h-4 text-emerald-600" />
                                                <span>{interview.time}</span>
                                            </div>
                                        </div>

                                        {interview.interviewer && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{interview.interviewer}</span>
                                            </div>
                                        )}

                                        {interview.notes && (
                                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-amber-900">Notes: </span>
                                                    {interview.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2">
                                        <Video className="w-4 h-4" />
                                        Join Interview
                                    </button>
                                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-all">
                                        Reschedule
                                    </button>
                                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-all">
                                        Add to Calendar
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {upcomingInterviews.length === 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming interviews</h3>
                            <p className="text-gray-600">Your scheduled interviews will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Interviews */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Completed Interviews</h2>
                <div className="space-y-4">
                    {completedInterviews.map((interview) => {
                        const TypeIcon = getTypeIcon(interview.type);
                        return (
                            <div
                                key={interview.id}
                                className="bg-gray-50 rounded-lg border border-gray-200 p-6"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{interview.position}</h3>
                                            <Badge className={`${getTypeColor(interview.type)} border-0 flex items-center gap-1`}>
                                                <TypeIcon className="w-3 h-3" />
                                                {interview.type}
                                            </Badge>
                                            <Badge className="bg-gray-200 text-gray-700 border-0">Completed</Badge>
                                        </div>
                                        <p className="text-gray-600 mb-2">{interview.company}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span>
                                                {new Date(interview.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            <span>•</span>
                                            <span>{interview.time}</span>
                                            <span>•</span>
                                            <span>{interview.interviewer}</span>
                                        </div>

                                        {interview.notes && (
                                            <div className="bg-white border border-gray-200 rounded-lg p-3">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold">Notes: </span>
                                                    {interview.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
