export default function EventTimeline() {
    const timelineEvents = [
    { title: "Registration Opens", date: "June 1, 2025", side: "left" },
    { title: "Registration Opens", date: "June 1, 2025", side: "right" },
    { title: "Registration Opens", date: "June 1, 2025", side: "left" },
    { title: "Registration Opens", date: "June 1, 2025", side: "right" },
    { title: "Registration Opens", date: "June 1, 2025", side: "left" },
  ]
    return (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#2C5282] mb-12">Event Timeline</h2>

          <div className="relative max-w-2xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#E6B85C] h-full"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#E6B85C] rounded-full border-4 border-[#F5F1E8] z-10"></div>

                  {/* Event Content */}
                  <div className={`w-5/12 ${event.side === "left" ? "text-right pr-8" : "text-left pl-8 ml-auto"}`}>
                    <h4 className="text-lg font-bold text-[#2C5282] mb-1">{event.title}</h4>
                    <p className="text-[#2C5282] text-sm">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
    )
    }