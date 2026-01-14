"use client";

import { Truck } from "lucide-react";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    pagedone: [
      {
        name: "Home",
        href: "#",
      },
      {
        name: "About",
        href: "#",
      },
      {
        name: "Pricing",
        href: "#",
      },
      {
        name: "Features",
        href: "#",
      },
    ],
    products: [
      {
        name: "Figma UI System",
        href: "#",
      },
      {
        name: "Icons Assets",
        href: "#",
      },
      {
        name: "Responsive Blocks",
        href: "#",
      },
      {
        name: "Components Library",
        href: "#",
      },
    ],
    resources: [
      {
        name: "FAQs",
        href: "#",
      },
      {
        name: "Quick Start",
        href: "#",
      },
      {
        name: "Documentation",
        href: "#",
      },
      {
        name: "User Guide",
        href: "#",
      },
    ],
    blogs: [
      {
        name: "News",
        href: "#",
      },
      {
        name: "Tips & Tricks",
        href: "#",
      },
      {
        name: "New Updates",
        href: "#",
      },
      {
        name: "Events",
        href: "#",
      },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: <FaXTwitter />,
    },
    {
      name: "GitHub",
      href: "https://github.com/yourusername",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/yourusername",
      icon: <FaLinkedinIn />,
    },
  ];
  return (
    <section>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Truck className="w-12 h-12 text-primary" />
          <p className="font-bold text-lg mt-2">FastParcel Ltd.</p>
          <p>Reliable logistics since 2024</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <Logo />
              <p className="py-8 text-sm text-neutral lg:max-w-xs text-center lg:text-left">
                Trusted in more than 100 countries & 5 million customers. Have
                any query ?
              </p>
              <Link
                href="contact"
                className="w-fit btn btn-sm btn-secondary rounded-full shadow-sm transition-all duration-500"
              >
                Contact us
              </Link>
            </div>

            {}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:mx-auto text-left">
                <h4 className="text-lg text-base-content font-medium mb-7 capitalize">
                  {title}
                </h4>
                <ul className="text-sm transition-all duration-500">
                  {links.map((link, index) => (
                    <li
                      key={index}
                      className={index === links.length - 1 ? "" : "mb-6"}
                    >
                      <a
                        href={link.href}
                        className="text-neutral hover:text-secondary transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {}
          <div className="py-7 border-t border-base-300">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
              <span className="text-sm text-neutral">
                ©{" "}
                <Link href="#" className="hover:text-primary">
                  FastParcel Ltd.
                </Link>{" "}
                {new Date().getFullYear()}, All rights reserved.
              </span>
              <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-9 h-9 rounded-full bg-neutral flex justify-center items-center hover:bg-primary text-white transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
