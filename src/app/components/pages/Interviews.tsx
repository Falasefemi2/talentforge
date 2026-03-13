import { useState } from "react";
import { Calendar, Clock, Video, MapPin, User, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useScheduleInterview } from "@/api/hooks/useInterview";
import { toast } from "sonner";

interface Interview {
  id: number;
  title: string;
  candidate: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "phone" | "in-person";
  status: "scheduled" | "completed" | "cancelled";
}

export function Interviews() {
  const [selectedView, setSelectedView] = useState<"upcoming" | "past">(
    "upcoming",
  );
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    applicationId: "",
    candidateName: "",
    scheduledTime: "",
    meetingLink: "",
  });
  const scheduleInterview = useScheduleInterview();

  const interviews: Interview[] = [
    {
      id: 1,
      title: "Technical Screen - Backend Role",
      candidate: "David Kim",
      position: "Tech Lead",
      interviewer: "Sarah Recruiter",
      date: "2024-10-24",
      time: "2:00 PM",
      duration: "60 min",
      type: "video",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Cultural Fit Interview",
      candidate: "Michael Chen",
      position: "Senior .NET Developer",
      interviewer: "John Smith",
      date: "2024-10-25",
      time: "10:00 AM",
      duration: "45 min",
      type: "video",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Design Portfolio Review",
      candidate: "Sarah Jones",
      position: "UX Designer",
      interviewer: "Emily Davis",
      date: "2024-10-25",
      time: "3:00 PM",
      duration: "90 min",
      type: "video",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Final Round - Product Strategy",
      candidate: "Elena Rodriguez",
      position: "Product Manager",
      interviewer: "Sarah Recruiter",
      date: "2024-10-20",
      time: "11:00 AM",
      duration: "60 min",
      type: "video",
      status: "completed",
    },
  ];

  const upcomingInterviews = interviews.filter((i) => i.status === "scheduled");
  const pastInterviews = interviews.filter((i) => i.status === "completed");

  const displayedInterviews =
    selectedView === "upcoming" ? upcomingInterviews : pastInterviews;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "phone":
        return <User className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const handleFormChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setFormError(null);

    const scheduledDate = new Date(formValues.scheduledTime);
    if (Number.isNaN(scheduledDate.getTime())) {
      setFormError("Please provide a valid scheduled time.");
      return;
    }

    try {
      await scheduleInterview.mutateAsync({
        title: formValues.title.trim(),
        applicationId: formValues.applicationId.trim(),
        candidateName: formValues.candidateName.trim(),
        scheduledTime: scheduledDate.toISOString(),
        meetingLink: formValues.meetingLink.trim(),
      });
      toast.success("Interview scheduled.");
      setIsScheduleOpen(false);
      setFormValues({
        title: "",
        applicationId: "",
        candidateName: "",
        scheduledTime: "",
        meetingLink: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to schedule interview.";
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Interviews
          </h1>
          <p className="text-gray-600">
            Schedule and manage candidate interviews.
          </p>
        </div>
        <button
          onClick={() => setIsScheduleOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">UPCOMING</div>
          <div className="text-3xl font-semibold text-teal-600">
            {upcomingInterviews.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">TODAY</div>
          <div className="text-3xl font-semibold text-orange-600">4</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">THIS WEEK</div>
          <div className="text-3xl font-semibold text-gray-900">12</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">COMPLETED</div>
          <div className="text-3xl font-semibold text-emerald-600">
            {pastInterviews.length}
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedView("upcoming")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedView === "upcoming"
              ? "bg-teal-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Upcoming ({upcomingInterviews.length})
        </button>
        <button
          onClick={() => setSelectedView("past")}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedView === "past"
              ? "bg-teal-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Past ({pastInterviews.length})
        </button>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {displayedInterviews.map((interview) => (
          <div
            key={interview.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-6 flex-1">
                {/* Date */}
                <div className="text-center min-w-[80px]">
                  <div className="text-sm text-teal-600 font-medium uppercase">
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                  <div className="text-3xl font-semibold text-teal-600">
                    {new Date(interview.date).getDate()}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {interview.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>
                          <strong>Candidate:</strong> {interview.candidate}
                        </span>
                      </div>
                      <div className="text-gray-400">•</div>
                      <div>{interview.position}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {interview.time} ({interview.duration})
                        </span>
                      </div>
                      <div className="text-gray-400">•</div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        <strong>Interviewer:</strong> {interview.interviewer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <Badge
                  className={
                    interview.status === "scheduled"
                      ? "bg-teal-100 text-teal-700 border-0"
                      : "bg-emerald-100 text-emerald-700 border-0"
                  }
                >
                  {interview.status}
                </Badge>
                {interview.status === "scheduled" && (
                  <div className="flex gap-2 mt-2">
                    <button className="px-4 py-2 text-sm bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors">
                      Join Meeting
                    </button>
                    <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Reschedule
                    </button>
                  </div>
                )}
                {interview.status === "completed" && (
                  <button className="px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                    View Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedInterviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No {selectedView} interviews.</p>
        </div>
      )}

      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Enter the interview details and send the schedule to the candidate.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interview-title">Title</Label>
              <Input
                id="interview-title"
                value={formValues.title}
                onChange={(event) =>
                  handleFormChange("title", event.target.value)
                }
                placeholder="Technical Interview"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview-application-id">Application ID</Label>
              <Input
                id="interview-application-id"
                value={formValues.applicationId}
                onChange={(event) =>
                  handleFormChange("applicationId", event.target.value)
                }
                placeholder="3fa85f64-5717-4562-b3fc-2c963f66afa6"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview-candidate">Candidate Name</Label>
              <Input
                id="interview-candidate"
                value={formValues.candidateName}
                onChange={(event) =>
                  handleFormChange("candidateName", event.target.value)
                }
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview-time">Scheduled Time</Label>
              <Input
                id="interview-time"
                type="datetime-local"
                value={formValues.scheduledTime}
                onChange={(event) =>
                  handleFormChange("scheduledTime", event.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interview-link">Meeting Link</Label>
              <Input
                id="interview-link"
                value={formValues.meetingLink}
                onChange={(event) =>
                  handleFormChange("meetingLink", event.target.value)
                }
                placeholder="https://meet.example.com/abc"
                required
              />
            </div>
            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsScheduleOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={scheduleInterview.isPending}>
                {scheduleInterview.isPending ? "Scheduling..." : "Schedule"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
