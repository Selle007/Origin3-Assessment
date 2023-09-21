import React from "react";
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/tiktok'
import 'react-social-icons/facebook'
import 'react-social-icons/behance'
import 'react-social-icons/instagram'
import 'react-social-icons/linkedin'
import 'react-social-icons/twitter'


export const Social = () => {
  return (
    <div className="fixed top-1/2 right-0 mr-24 transform -translate-y-1/2 p-4">
      <ul className="list-none p-0 m-0 flex flex-col gap-4">
        <li>
          <SocialIcon network="tiktok" bgColor="#000"  url="https://www.tiktok.com/@origin3agency"/>
        </li>
        <li>
          <SocialIcon network="facebook" bgColor="#000" url="https://www.facebook.com/origin3marketingagency/"/>
        </li>
        <li>
          <SocialIcon network="behance" bgColor="#000" url="https://www.behance.net/origineagency?tracking_source=search_users%7Corigin3%20agency"/>
        </li>
        <li>
          <SocialIcon network="instagram" bgColor="#000" url="https://www.instagram.com/origin3agency/"/>
        </li>
        <li>
          <SocialIcon network="linkedin" bgColor="#000" url="https://www.linkedin.com/company/origin3-agency/"/>
        </li>
        <li>
          <SocialIcon network="twitter" bgColor="#000" url="https://twitter.com/origin3agency?lang=en"/>
        </li>
      </ul>
    </div>
  );
};
