import React from 'react'
import { useAccountProfile } from '../../hooks'
import { useAppSelector } from '../../redux/hooks'
import { FA_IR_ROLES } from '../../language'
import { Role } from '../../constants'
import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormSwitch } from "../../base-components/Form";
import Progress from "../../base-components/Progress";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab } from "../../base-components/Headless";
import { Tab as HeadlessTab } from "@headlessui/react";

const Main = () => {
  const { data } = useAccountProfile()
  const auth = useAppSelector((state) => state.auth)
  FA_IR_ROLES[auth.role as Role]
  console.log(auth)
  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Profile Layout</h2>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="ml-5">
                <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                   {data?.first_name} {data?.last_name } 
                </div>
                <div className="text-slate-500 py-2">{FA_IR_ROLES[auth.role as Role]}</div>
              </div>
            </div>
            <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Contact Details
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div className="flex items-center truncate sm:whitespace-normal">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {data?.email}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Phone" className="w-4 h-4 mr-2" /> 
                  {data?.phone_number}
                </div>
              </div>
            </div>

          </div>

        </div>
        {/* END: Profile Info */}
      </Tab.Group>
    </>
  )
}

export default Main