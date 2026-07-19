import Footer from "../components/Footer";
import Header from "../components/Header";
import Chat from "../components/Chat";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Chat />
            <main className="flex-grow bg-gray-50">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
