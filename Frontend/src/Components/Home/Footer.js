import React from "react";
import "../../App.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-[var(--dark-blue)]">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 ">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="/Images/logo.png" className="h-16 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Easy Solution</span>
                        </a>
                        <label className="text-white"> Whenever someone needs help,<br />
                            Our platform is always with you, my friends!</label>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-500 dark:text-white font-medium">
                                <li className="mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="/" className="hover:underline">Home</a>
                                </li>
                                <li className="mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="/category" className="hover:underline">Category</a>
                                </li>
                                <li className="mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="/help" className="hover:underline">Help</a>
                                </li>
                                <li className="mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="/contact" className="hover:underline">Contact as</a>
                                </li>
                                <li className="mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="/about" className="hover:underline">About as</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2 hover:text-[var(--mid-blue)] text-white">
                                    <a href="https://linkedin.com/" className="hover:underline ">Linkedin</a>
                                </li>
                                <li className="text-white mb-2 hover:text-[var(--mid-blue)]">
                                    <a href="https://github.com/" className="hover:underline">GitHub</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-2">
                                    <h1> Email : deepakmeenaa78@gmail.com</h1>
                                </li>
                                <li className="mb-2">
                                    <h2>Phone : 6260576040</h2>
                                </li>
                                <li className="mb-2">
                                    <h2>Address : Aamla Khategaon Dewas</h2>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <img src="/Images/logo.png" alt="Flowbite Logo" className="inline h-6 w-auto" /> Flowbi. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="https://facebook.com" className="text-white hover:text-[var(--mid-blue)] dark:hover:text-[var(--mid-blue)]">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://wa.me/yourwhatsapplink" className="text-white hover:text-[var(--mid-blue)] dark:hover:text-[var(--mid-blue)] ms-5">
                            <svg className="w-6 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32">
                                <path d="M16.004 2.667c-7.364 0-13.333 5.969-13.333 13.333 0 2.363.618 4.583 1.693 6.521L2.667 29.333l6.938-1.653a13.22 13.22 0 0 0 6.398 1.653c7.364 0 13.333-5.969 13.333-13.333s-5.969-13.333-13.333-13.333zm0 2.666c5.891 0 10.667 4.776 10.667 10.667s-4.776 10.667-10.667 10.667c-2.02 0-3.901-.553-5.522-1.48l-4.153 1.014 1.107-4.035c-1.155-1.66-1.898-3.673-1.898-5.865 0-5.891 4.776-10.667 10.667-10.667zm-3.192 5.531c-.213-.002-.49.004-.797.361s-1.045 1.023-1.045 2.489 1.07 2.883 1.22 3.081c.149.198 2.179 3.49 5.418 4.761 2.681 1.036 3.228.83 3.809.779.582-.051 1.882-.768 2.149-1.509.267-.741.267-1.375.187-1.51s-.347-.248-.732-.434c-.384-.186-2.179-1.074-2.517-1.196s-.583-.186-.828.186-.949 1.196-1.166 1.434c-.217.237-.428.267-.813.081-.385-.186-1.645-.608-3.136-1.936-1.158-1.028-1.94-2.294-2.172-2.688-.23-.395-.023-.606.162-.79.149-.149.347-.384.52-.581.173-.198.227-.298.347-.496s.067-.395-.033-.581c-.101-.186-.887-2.191-1.263-2.99-.323-.69-.687-.715-.899-.717z" />
                            </svg>
                            <span className="sr-only">WhatsApp</span>
                        </a>
                        <a href="https://www.linkedin.com/in/your-profile" className="text-white hover:text-[var(--mid-blue)] dark:hover:text-[var(--mid-blue)] ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.451 20.452h-3.897v-5.873c0-1.398-.027-3.199-1.952-3.199-1.954 0-2.253 1.526-2.253 3.1v5.972H8.451V9h3.739v1.561h.054c.522-.988 1.798-2.03 3.705-2.03 3.966 0 4.693 2.611 4.693 6.011v5.91zM5.337 7.433c-1.253 0-2.27-1.017-2.27-2.27s1.017-2.271 2.27-2.271c1.254 0 2.27 1.018 2.27 2.271s-1.017 2.27-2.27 2.27zM7.285 20.452h-3.897V9h3.897v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.453C23.207 24 24 23.226 24 22.271V1.729C24 .774 23.207 0 22.225 0z" />
                            </svg>
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="/" className="text-white hover:text-[var(--mid-blue)] dark:hover:text-[var(--mid-blue)] ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-white hover:text-[var(--mid-blue)] dark:hover:text-[var(--mid-blue)] ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 6.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8zm5.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                            </svg>
                            <span className="sr-only">Instagram account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
