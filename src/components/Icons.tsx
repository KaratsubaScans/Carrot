import React from 'react';
import classNames from 'classnames';

interface IconProps {
  className?: string
}

export const BookmarkIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21L12 17.5L19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const BookOpenIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.253V19.253M12 6.253C10.832 5.477 9.246 5 7.5 5C5.754 5 4.168 5.477 3 6.253V19.253C4.168 18.477 5.754 18 7.5 18C9.246 18 10.832 18.477 12 19.253M12 6.253C13.168 5.477 14.754 5 16.5 5C18.247 5 19.832 5.477 21 6.253V19.253C19.832 18.477 18.247 18 16.5 18C14.754 18 13.168 18.477 12 19.253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

export const CheckMarkIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current inline-block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.99997 12L11 14L15 10M7.83497 4.697C8.55228 4.63975 9.23325 4.35771 9.78097 3.891C10.3999 3.36327 11.1866 3.07339 12 3.07339C12.8133 3.07339 13.6001 3.36327 14.219 3.891C14.7667 4.35771 15.4477 4.63975 16.165 4.697C16.9757 4.7615 17.737 5.11283 18.312 5.68793C18.8871 6.26303 19.2385 7.02425 19.303 7.835C19.3602 8.55231 19.6423 9.23328 20.109 9.781C20.6367 10.3999 20.9266 11.1866 20.9266 12C20.9266 12.8134 20.6367 13.6001 20.109 14.219C19.6423 14.7667 19.3602 15.4477 19.303 16.165C19.2385 16.9758 18.8871 17.737 18.312 18.3121C17.737 18.8872 16.9757 19.2385 16.165 19.303C15.4477 19.3603 14.7667 19.6423 14.219 20.109C13.6001 20.6367 12.8133 20.9266 12 20.9266C11.1866 20.9266 10.3999 20.6367 9.78097 20.109C9.23325 19.6423 8.55228 19.3603 7.83497 19.303C7.02422 19.2385 6.263 18.8872 5.6879 18.3121C5.1128 17.737 4.76147 16.9758 4.69697 16.165C4.63972 15.4477 4.35767 14.7667 3.89097 14.219C3.36324 13.6001 3.07336 12.8134 3.07336 12C3.07336 11.1866 3.36324 10.3999 3.89097 9.781C4.35767 9.23328 4.63972 8.55231 4.69697 7.835C4.76147 7.02425 5.1128 6.26303 5.6879 5.68793C6.263 5.11283 7.02422 4.7615 7.83497 4.697Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

export const ColorSwatchIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V15C2 15.7956 2.31607 16.5587 2.87868 17.1213C3.44129 17.6839 4.20435 18 5 18C5.79565 18 6.55871 17.6839 7.12132 17.1213C7.68393 16.5587 8 15.7956 8 15V4C8 3.46957 7.78929 2.96086 7.41421 2.58579C7.03914 2.21071 6.53043 2 6 2H4ZM5 16C5.26522 16 5.51957 15.8946 5.70711 15.7071C5.89464 15.5196 6 15.2652 6 15C6 14.7348 5.89464 14.4804 5.70711 14.2929C5.51957 14.1054 5.26522 14 5 14C4.73478 14 4.48043 14.1054 4.29289 14.2929C4.10536 14.4804 4 14.7348 4 15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8946 4.73478 16 5 16ZM10 14.243L14.9 9.343C15.2749 8.96795 15.4856 8.45933 15.4856 7.929C15.4856 7.39867 15.2749 6.89006 14.9 6.515L13.485 5.1C13.1099 4.72506 12.6013 4.51443 12.071 4.51443C11.5407 4.51443 11.0321 4.72506 10.657 5.1L10 5.757V14.243ZM16 18H9.071L15.071 12H16C16.5304 12 17.0391 12.2107 17.4142 12.5858C17.7893 12.9609 18 13.4696 18 14V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18Z" fill="#2E3A59" />
    </svg>

  )
}

export const PhotographIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

export const LeftArrowIcon = ({ className }: IconProps) => {
  return (
    <svg className="fill-current" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 40.3333C11.8748 40.3333 3.66666 32.1252 3.66666 22C3.66666 11.8748 11.8748 3.66667 22 3.66667C32.1252 3.66667 40.3333 11.8748 40.3333 22C40.3222 32.1206 32.1206 40.3222 22 40.3333ZM22 7.33333C13.9432 7.33537 7.3965 13.8359 7.33743 21.8925C7.27836 29.949 13.7291 36.5449 21.7849 36.665C29.8408 36.7852 36.4854 30.3847 36.6667 22.33V25.5988V22C36.6576 13.9036 30.0964 7.34243 22 7.33333ZM24.6583 30.9833L15.5833 21.9083L24.6583 12.8333L27.2507 15.4257L20.768 21.9083L27.2488 28.391L24.6602 30.9833H24.6583Z" />
    </svg>
  )
}

export const RightArrowIcon = ({ className }: IconProps) => {
  return (
    <svg className="fill-current" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9999 0.666667C29.1251 0.666667 37.3333 8.87478 37.3333 19C37.3333 29.1252 29.1251 37.3333 18.9999 37.3333C8.8747 37.3333 0.666584 29.1252 0.666584 19C0.677699 8.87939 8.8793 0.677781 18.9999 0.666667ZM18.9999 33.6667C27.0567 33.6646 33.6034 27.1641 33.6625 19.1075C33.7215 11.051 27.2708 4.45514 19.215 4.33497C11.1591 4.21479 4.51453 10.6153 4.33325 18.67V15.4012V19C4.34234 27.0964 10.9035 33.6576 18.9999 33.6667ZM16.3416 10.0167L25.4166 19.0917L16.3416 28.1667L13.7493 25.5743L20.2319 19.0917L13.7511 12.609L16.3398 10.0167H16.3416Z" />
    </svg>
  )
}

export const DownloadIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 13V14C1 14.7956 1.31607 15.5587 1.87868 16.1213C2.44129 16.6839 3.20435 17 4 17H14C14.7956 17 15.5587 16.6839 16.1213 16.1213C16.6839 15.5587 17 14.7956 17 14V13M13 9L9 13M9 13L5 9M9 13V1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const ShareIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
  )
}

export const RssIcon = ({ className }: IconProps) => {
  return (
    <svg className="stroke-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.50002 1.41666C10.2784 1.41666 16.5834 7.72166 16.5834 15.5M2.50002 7.91666C4.51125 7.91666 6.4401 8.71561 7.86225 10.1378C9.2844 11.5599 10.0834 13.4888 10.0834 15.5M3.58335 15.5C3.58335 15.7873 3.46922 16.0629 3.26605 16.266C3.06289 16.4692 2.78734 16.5833 2.50002 16.5833C2.2127 16.5833 1.93715 16.4692 1.73399 16.266C1.53082 16.0629 1.41669 15.7873 1.41669 15.5C1.41669 15.2127 1.53082 14.9371 1.73399 14.734C1.93715 14.5308 2.2127 14.4167 2.50002 14.4167C2.78734 14.4167 3.06289 14.5308 3.26605 14.734C3.46922 14.9371 3.58335 15.2127 3.58335 15.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const TitleIcon = ({ className }: IconProps) => {
  return (
    <svg className={classNames("stroke-current", className)} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.3333 35H6.66665C4.8257 35 3.33331 33.5076 3.33331 31.6667V8.33333C3.33331 6.49238 4.8257 5 6.66665 5H33.3333C35.1743 5 36.6666 6.49238 36.6666 8.33333V31.6667C36.6666 33.5076 35.1743 35 33.3333 35ZM16.6666 11.6667V31.6667H33.3333V11.6667H16.6666ZM6.66665 11.6667V31.6667H13.3333V11.6667H6.66665Z" fill="#2E3A59" />
    </svg>
  )
}

export const ChevronLeftIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export const ChevronRightIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export const MoonIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}

export const SunIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  )
}

export const CopyLinkIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  )
}

export const CopyLinkSuccessIcon = ({ className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}