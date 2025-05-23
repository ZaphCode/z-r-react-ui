const UserIcon = () => {
  return (
    <svg
      className="h-8 w-8 text-neutral-600"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />{" "}
      <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
      <line x1="15" y1="9" x2="15.01" y2="9" />{" "}
      <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
    </svg>
  );
};

export default UserIcon;
