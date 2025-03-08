import React, { useState, useEffect } from "react";
import { Home, XCircle, Map, Calendar, Menu, User } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../../imgs/MainBGImg.jpg";
import './index.css'
import { useNavigate,useParams} from "react-router-dom";

import Profile from "../Profile";

function HomeComponent() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [profileView,setProfileView] = useState(false)
  const profileClass = profileView ? 'profile-view' : ''
  const today = new Date().toISOString().split("T")[0];
  const navigation=useNavigate();
  const {id}=useParams()
  console.log(id)
  const handelHomeClick=()=>{
    navigation('/home')
  }
  // Auto-close sidebar when clicking "From" input on small screens
  const handleInputFocus = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  // Highlight selected menu item
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="vh-100 vw-100 d-flex flex-column flex-md-row position-relative" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.8)" }}>
      {/* Light overlay for brightness */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(247, 191, 161, 0.2)" }}></div>

      {/* Profile Section (Top Right Corner) */}
      <div className="btn-pro position-absolute top-0 end-0 p-3" style={{zIndex:20}}>
        <button onClick={() => setProfileView(pre => !pre)} className="btn">
            <User size={24} /><br/><span>profile</span>
          </button>
      </div>
      <div className={`profile ${profileClass}`}>
         <Profile/>
      </div>

      {/* Sidebar */}
      <div className={`position-absolute h-100 p-3 d-flex flex-column shadow-lg ${collapsed ? "sidebar-collapsed" : "sidebar-expanded"}`} style={{ background: "rgba(235, 236, 237, 0.6)", backdropFilter: "blur(5px)", transition: "width 0.3s ease-in-out", zIndex: 10 }}>
        <div className="d-flex align-items-center">
          <button className="btn btn-light mb-3" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
          {!collapsed && <h1 className="fs-5 fw-bold ms-3 text-dark">Booking Portal</h1>}
        </div>
        <nav className="d-flex flex-column gap-3 mt-3">
          {[{ id: "home", icon: <Home size={20} onClick={handelHomeClick} />, text: "Home" },
            { id: "cancel", icon: <XCircle size={20} />, text: "Cancel Ticket" },
            { id: "track", icon: <Map size={20} />, text: "Track Service" },
            { id: "timetable", icon: <Calendar size={20} />, text: "Time Table / Track" }].map((menu) => (
            <a key={menu.id} href="#123" className={`d-flex align-items-center gap-2 text-decoration-none text-dark ${selectedMenu === menu.id ? "fw-bold text-primary" : ""}`} onClick={() => handleMenuClick(menu.id)}>
              {menu.icon} {!collapsed && <span>{menu.text}</span>}
            </a>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="content flex-grow-1 d-flex align-items-center justify-content-center p-4 text-dark position-relative">
        {/* Booking Form */}
        <div className="container position-relative" style={{ zIndex: 5 }}>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 p-4 rounded shadow d-flex flex-column justify-content-between" style={{ background: "rgba(255, 255, 255, 0.7)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
              <h4 className="text-center mb-4 text-dark">Book Your Ticket</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">From</label>
                  <input type="text" className="form-control" placeholder="Enter departure city" onFocus={handleInputFocus} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">To</label>
                  <input type="text" className="form-control" placeholder="Enter destination city" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold text-dark">Depart On</label>
                  <input type="date" className="form-control" min={today} />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success fw-bold">Check Availability</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;