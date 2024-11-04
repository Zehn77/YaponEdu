import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

interface SitebarProps {
  collapsed: boolean;
}

const Sitebar: React.FC<SitebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 self-start bg-transparent min-h-screen bg-[#FBFBFB]">
      <Sidebar collapsed={collapsed} className="h-full" width="200px">
        <Menu>
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
            icon={<FaUsers className="w-5 h-5" />}
          >
            Groups
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sitebar;
