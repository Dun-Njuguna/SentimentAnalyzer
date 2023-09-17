import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "Contact Us",
        redirect: "",
      },
      {
        name: "About Us",
        redirect: "",
      },
      {
        name: "Careers",
        redirect: "",
      },
    ],
  },
  {
    title: "help",
    links: [
      {
        name: "Payments",
        redirect: "",
      },
      {
        name: "Shipping",
        redirect: "",
      },
      {
        name: "Cancellation & Returns",
        redirect: "",
      },
      {
        name: "FAQ",
        redirect: "",
      },
    ],
  },
  {
    title: "policy",
    links: [
      {
        name: "Return Policy",
        redirect: "",
      },
      {
        name: "Terms Of Use",
        redirect: "",
      },
      {
        name: "Security",
        redirect: "",
      },
      {
        name: "Privacy Policy",
        redirect: "",
      },
    ],
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "",
      },
      {
        name: "Twitter",
        redirect: "",
      },
      {
        name: "YouTube",
        redirect: "",
      },
    ],
  },
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className='mt-20 w-full py-10 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row items-center justify-between'>
            {footerLinks.map((el, i) => (
              <div
                className='w-full sm:w-1/5 flex flex-col items-center gap-5 my-6 sm:my-0 ml-5'
                key={i}
              >
                <h2 className='text-primary-grey mb-2 uppercase'>{el.title}</h2>
                {el.links.map((item, i) => (
                  <a
                    href={item.redirect}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:underline'
                    key={i}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            ))}
          </footer>

          {/* <!-- footer ends --> */}
        </>
      )}
    </>
  );
};

export default Footer;
