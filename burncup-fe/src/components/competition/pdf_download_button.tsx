"use client";

export default function PdfDownloadButton({
    bookletLink,
    competitionName,
}: {
    bookletLink: string;
    competitionName: string;
}) {
    const handleDownload = () => {
        // Convert Google Drive view link to direct download link
        let downloadUrl = bookletLink;
        
        if (bookletLink.includes('drive.google.com')) {
            // Extract file ID from Google Drive URL
            const fileIdMatch = bookletLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (fileIdMatch) {
                const fileId = fileIdMatch[1];
                downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
        }

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${competitionName}-Booklet.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button 
            onClick={handleDownload}
            className="group w-full bg-[#001F54] hover:bg-[#003875] text-[#E6B85C] font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
        >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M7 20h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm sm:text-base">Download PDF Booklet</span>
        </button>
    );
}