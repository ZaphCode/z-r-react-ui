export const RenderChecker = () => {
  return (
    <div className="absolute bg-red-400">
      {(Math.random() * 1000).toFixed(0)}
    </div>
  );
};
