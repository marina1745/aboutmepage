import { motion } from "framer-motion";
import imgF from "../assets/mypictures/dqisland.jpeg";

export default function Journey() {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-zinc-200 antialiased">
      <main className="mx-auto max-w-5xl px-5 py-20">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-4xl md:text-5xl"
        >
          My Computer Science Journey
        </motion.h1>

        {/* Early life */}
        <section className="mt-10 grid gap-6 md:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-8"
          >
            <h2 className="font-serif text-2xl md:text-3xl">Early spark</h2>
            <p className="mt-3 text-zinc-300 md:text-lg">
              I grew up playing video games endlessly — fascinated by how entire
              worlds could exist inside a computer. In middle school I gravitated
              toward the natural sciences, but I didn’t yet have a clear idea of
              what I wanted to do.
              <br />
              <br />
              That changed when I visited the <em>Tag der offenen Tür</em> at
              HTBLA Kaindorf. I was so captivated by what the teachers showed us
              that I stayed until they closed the doors. From that moment on, I
              had a new goal: to understand <strong>how computers really work</strong>.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="md:col-span-4"
          >
            <img
              src={imgF}
              alt="Early fascination with games and interactive worlds"
              className="w-full rounded-2xl object-cover md:h-64 lg:h-80"
            />
            <p className="mt-2 text-sm text-zinc-400 text-center">
              Early fascination
            </p>
          </motion.aside>
        </section>

        {/* High school */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl"
          >
            HTBLA Kaindorf
          </motion.h2>
          <p className="mt-3 text-zinc-300 md:text-lg">
            I finished high school as <em>Jahrgangsbeste</em> (top of my class).
            I learned software engineering, project management, and programming
            in Java and C/C++. My favorite elective was <em>Games Programming</em>,
            which combined logic, art, and interactivity.
            <br />
            <br />
            Still, even after five years, I felt there was another layer to
            uncover: I wanted a deeper understanding of the foundations behind
            the tools I was using — from systems to graphics.
          </p>
        </section>

        {/* Bachelor */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl"
          >
            Bachelor at TUM – Informatics: Games Engineering
          </motion.h2>
          <p className="mt-3 text-zinc-300 md:text-lg">
            While researching universities, I discovered the{" "}
            <strong>Games Engineering program at TUM</strong>. The curriculum
            immediately clicked: rendering, game physics, a touch of design, and
            a strong foundation in computer science.
            <br />
            <br />
            I moved to Munich to study there and built multiple projects during
            my Bachelor’s. I loved how each one merged <em>creativity</em> and{" "}
            <em>engineering</em> — but over time I realized I didn’t just want to
            apply existing techniques. I wanted to help create new ones.
          </p>
        </section>

        {/* Master */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl"
          >
            Master’s in Informatics – Visual Computing & XR
          </motion.h2>
          <p className="mt-3 text-zinc-300 md:text-lg">
            For my Master’s, I specialized in{" "}
            <strong>visual computing, rendering, and VR/XR</strong>. This is
            where my focus shifted from building experiences to asking research
            questions: what limits today’s real-time rendering pipelines, and
            how can we push them?
            <br />
            <br />
            I worked on research-driven projects, analyzed data in Python, and
            began writing my Master’s thesis in visual computing. I also started
            digging into how learning-based methods are used in graphics — not
            just as tools, but as new ways to represent and render scenes.
          </p>
        </section>

        {/* Theory / Low-level */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl"
          >
            Diving deeper – the low-level side
          </motion.h2>
          <p className="mt-3 text-zinc-300 md:text-lg">
            Alongside graphics, I kept chasing the fundamentals. I took
            theoretical and low-level courses — automata and complexity,
            databases and memory management, GPU programming with CUDA, and even
            assembly-level reasoning — to understand what happens beneath the
            abstractions.
            <br />
            <br />
            This also shaped how I work: I like connecting theory to real
            systems, measuring bottlenecks, and making tradeoffs explicit. I
            started teaching Theory of Computation as a tutor at university,
            which strengthened how I explain and structure complex ideas.
          </p>
        </section>

        {/* Closing reflection */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl"
          >
            Looking ahead
          </motion.h2>
          <p className="mt-3 text-zinc-300 md:text-lg">
            What motivates me today is the same thread that has been there since
            the beginning: curiosity — and the desire to push what’s currently
            possible.
            <br />
            <br />
            I want to contribute to the technologies that make the next
            generation of real-time graphics more physically grounded, more
            expressive, and more visually compelling — especially in areas like
            lighting, appearance, and alternative scene representations. My goal
            is to continue on a research path and help expand the boundaries of
            interactive visual computing.
          </p>
        </section>
      </main>
    </div>
  );
}
