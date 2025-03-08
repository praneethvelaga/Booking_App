import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const id = Cookies.get("id"); // ID stored in cookies

  console.log("Cookie ID:", id, "Type:", typeof id);

  useEffect(() => {
    const getData = async () => {
      try {
        const [usersResponse, employeesResponse] = await Promise.all([
          fetch("https://apsrtc-demo.onrender.com/users"),
          fetch("https://apsrtc-demo.onrender.com/employees"),
        ]);

        if (!usersResponse.ok || !employeesResponse.ok) {
          console.error("Failed to fetch data");
          return;
        }

        const [usersData, employeesData] = await Promise.all([
          usersResponse.json(),
          employeesResponse.json(),
        ]);

        console.log("Users Data:", usersData);
        console.log("Employees Data:", employeesData);

        // Ensure the extracted data is an array
        const usersList = usersData.users || [];
        const employeesList = employeesData.employees || [];

        console.log("Checking all User IDs:", usersList.map(u => u.user_Id));
        console.log("Checking all Employee IDs:", employeesList.map(e => e.employee_id));

        const user = usersList.find((u) => String(u.user_Id) === String(id));
        const employee = employeesList.find((e) => String(e.employee_id) === String(id));

        console.log("User Found:", user);
        console.log("Employee Found:", employee);

        if (!user && !employee) {
          console.warn("No matching user or employee found!");
        }

        setProfileData(user || employee || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id]);

  console.log("Final Profile Data:", profileData);

  return (
    <div>
      <div className="profile-img">
        <img
          src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg"
          alt="avatar"
        />
      </div>
      <h3>{profileData?.full_name || "Unknown"}</h3>
      <p>{profileData?.email || "No Email Provided"}</p>
    </div>
  );
};

export default Profile;



