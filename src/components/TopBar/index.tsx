import { useState } from "react";
import { Menu } from "../../base-components/Headless";
import { useAccountProfile } from "../../hooks";
import { useAppSelector } from "../../redux/hooks";
import { FA_IR } from "../../language";
import { useLogout } from "../../hooks/useLogout";

function Main() {
	const { data: profile } = useAccountProfile();
	const auth = useAppSelector((state) => state.auth);
	const [searchDropdown, setSearchDropdown] = useState(false);
	const {logout} = useLogout();
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };
  return (
		<>
			{/* BEGIN: Top Bar */}
			<div className="h-[67px] z-[51] flex items-center justify-end relative border-b border-slate-200">
				<div className="mr-auto">
					{FA_IR.Uid} : {profile?.id}
				</div>
				{/* BEGIN: Account Menu */}
				<Menu>
					<Menu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
						<img
							alt={profile?.first_name + ' ' + profile?.last_name}
							// api to get first name and last name and generate avatar
							src={`https://ui-avatars.com/api/?name=${profile?.first_name}+${profile?.last_name}&color=000&background=ccc`}
						/>
					</Menu.Button>
			
				</Menu>
			</div>
			{/* END: Top Bar */}
		</>
	);
}

export default Main;
