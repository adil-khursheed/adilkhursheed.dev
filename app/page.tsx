import React from "react";
import RotatingText from "@/components/rotating-text";
import * as motion from "motion/react-client";

export default function Home() {
  return (
    <section>
      <div className="relative flex h-16 items-end px-2 font-mono text-[10px]/6 whitespace-pre text-black/20 max-sm:px-4 sm:h-24 sm:text-xs/6 dark:text-white/25">
        <span className="hidden max-sm:inline">text-2xl </span>
        <span className="hidden sm:max-md:inline">text-5xl </span>
        <span className="hidden lg:max-xl:inline">text-6xl </span>
        <span className="hidden xl:inline">text-8xl </span>
        <span className="hidden dark:inline">text-white </span>
        <span className="inline dark:hidden">text-black </span>
        <span>tracking-tighter </span>
        <span>text-balance </span>
      </div>

      <div className="line-before line-after relative">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 px-2 text-2xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:text-5xl lg:text-6xl xl:text-8xl"
          >
            Hi, I'm <span className="text-primary">Adil</span> — A Full Stack
            Web Developer.
          </motion.h1>
        </div>
      </div>

      <div className="flex h-6 items-end px-2 font-mono text-[10px]/6 whitespace-pre text-black/20 max-sm:px-4 sm:h-10 sm:text-xs/6 dark:text-white/25">
        {"text-lg "}
        <span className="hidden dark:inline">text-white </span>
        <span className="inline dark:hidden">text-black </span>
        font-medium
      </div>

      <div className="line-before line-after relative">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 max-w-(--breakpoint-md) px-2 text-lg leading-9 max-lg:font-medium max-sm:px-4"
          >
            I love turning ideas into fast, scalable, and real-world products. I
            build modern web and mobile apps using{" "}
            <RotatingText
              texts={[
                "TypeScript",
                "Reactjs",
                "Next.js",
                "Node.js",
                "Express.js",
                "MongoDB",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-primary overflow-hidden py-0.5 justify-center rounded-lg inline-flex w-[120px] text-lg font-medium text-primary-foreground"
              staggerFrom={"last"}
              initial={{ y: "100%", filter: "blur(10px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              exit={{ y: "-120%", filter: "blur(10px)" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            . I enjoy solving problems end-to-end, integrating AI, optimizing
            performance, and shipping features that actually make an impact.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
