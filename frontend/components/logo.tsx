import Image from "next/image";

const Logo = () => {
   return (
      <div className="flex items-center gap-1.5">
         <Image
            src="/assets/logo.svg"
            alt="Todo Miner"
            width={25}
            height={25}
         />
         <span className="text-xl font-black font-secondary">
            Todo <span className="text-primary">Miner</span>
         </span>
      </div>
   );
};

export { Logo };
