export default function Footer() {
    return (
        <footer className="mt-10 flex items-center justify-between px-4 py-10 bg-gradient-to-r from-gradient-left-primary to-gradient-right-primary text-[#0F3064]">
            <div className="container mx-auto text-center">
                <p className="text-2xl">
                    &copy; {new Date().getFullYear()} BurnCup Bekasi. All rights reserved.
                </p>
                <p className="text-xl mt-2">
                    Made with ❤️ by Software Engineering Major BurnCup
                </p>
            </div>
        </footer>
    );
}