export default function Home() {
  return (
    <div>
      <div className="line-before relative flex h-16 items-end px-2 font-mono text-[10px]/6 whitespace-pre text-black/20 max-sm:px-4 sm:h-24 sm:text-xs/6 dark:text-white/25">
        <span className="hidden max-sm:inline">text-2xl </span>
        <span className="hidden sm:max-md:inline">text-5xl </span>
        <span className="hidden lg:inline">text-6xl </span>
        <span className="hidden dark:inline">text-white </span>
        <span className="inline dark:hidden">text-black </span>
        <span>tracking-tighter </span>
        <span>text-balance </span>
      </div>
      <div className="line-before line-after relative">
        <h1 className="px-2 text-2xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:text-5xl lg:text-6xl">
          Turning Ideas into Performant Web & Mobile Apps
        </h1>
      </div>

      <div className="h-[700px]"></div>
    </div>
  );
}
