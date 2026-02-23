// Pages/ProfilePage/ProfilePage.jsx
import { useParams } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import { useSelfProfile } from "../../hooks/useAuth";
import { useUserProfile } from "../../hooks/useUser";

const ProfilePage = () => {
  const { username } = useParams();

  const hook = username ? useUserProfile : useSelfProfile;

  return <Profile hook={hook} username={username} />;
};

export default ProfilePage;