import React,{ useState } from 'react'
import NavigationBar from './NavigationBarClient';
import Heading from '../../components/Heading';
import BasicTable from '../../components/BasicTable';

const ClientSaved = () => {

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="flex w-full justify-end bg-white-A700 py-[63px] md:py-5">
        {/* favorite projects header section */}
        <div className=" flex w-[100%] flex-col items-start  md:w-full md:p-5">
          {/* favorite projects title section */}
          <Heading as="h1" className="ml-[20px] tracking-[-0.90px]">
            Your Favourite
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
            

            {/* collaborator button section */}
            <div className="ml-[30px] font-poppin border-4 border-grey rounded-lg p-3 mb-6">
              Collaborator
            </div>

            <BasicTable />
            
          </div>
        </div>
      </div>
    
  )
}

export default ClientSaved;