import Image from "next/image";

const Logo = () => {
    return <Image
        width={50}
        height={50}
        alt="logo"
        src='/lifexbook-logo.png'
        className="rounded-full"
    />;
}
 
export default Logo;