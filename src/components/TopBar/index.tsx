import { useState, Fragment } from "react";
import Lucide from "../../base-components/Lucide";
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import fakerData from "../../utils/faker";
import _ from "lodash";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import { FA_IR, FA_IR_ROLES } from "../../language";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAccountProfile } from "../../hooks";
import { useAppSelector } from "../../redux/hooks";
import { Role } from "../../constants";

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
