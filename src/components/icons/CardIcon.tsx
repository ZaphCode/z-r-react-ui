const CardIcon = () => {
  return (
    <svg
      className="h-8 w-8"
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
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <rect x="3" y="5" width="18" height="14" rx="3" />{" "}
      <line x1="3" y1="10" x2="21" y2="10" />{" "}
      <line x1="7" y1="15" x2="7.01" y2="15" />{" "}
      <line x1="11" y1="15" x2="13" y2="15" />
    </svg>
  );
};

export default CardIcon;
