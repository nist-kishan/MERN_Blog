import { motion } from "framer-motion";

export default function About() {
  const styles = {
    wrapper: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4",
    card: "max-w-3xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700",
    title: "text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2",
    paragraph: "text-lg leading-relaxed text-gray-600 dark:text-gray-300",
    techStack: {
      react: "font-semibold text-blue-500 dark:text-blue-400",
      tailwind: "font-semibold text-green-500 dark:text-green-400",
      node: "font-semibold text-yellow-500 dark:text-yellow-400",
    },
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👋 About Us
        </motion.h1>

        <motion.p
          className={styles.paragraph}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to our blog platform! We’re a team of passionate developers and creators aiming to make content publishing easier and more powerful for everyone.
          <br /><br />
          Built with <span className={styles.techStack.react}>React</span>,{" "}
          <span className={styles.techStack.tailwind}>Tailwind CSS</span>, and{" "}
          <span className={styles.techStack.node}>Node.js</span>, this app is
          designed for speed, simplicity, and scalability.
        </motion.p>
      </motion.div>
    </div>
  );
}
