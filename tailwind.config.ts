import { type Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import { fontFamily } from "tailwindcss/defaultTheme";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}) satisfies Config;