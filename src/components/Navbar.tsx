import Link from "next/link";

const styles = {
  LinkStyle: "text-white text-lg font-semibold px-2",
};

const Navbar = () => {
  return (
    <header className="w-full h-14 bg-purple-600 flex px-4 justify-start items-center">
      <Link href="/">
        <a className={styles.LinkStyle}>Home</a>
      </Link>
      <Link href="/order">
        <a className={styles.LinkStyle}>Order</a>
      </Link>
    </header>
  );
};

export default Navbar;
