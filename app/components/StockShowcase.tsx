'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import img1 from '@/stock_images/1.webp'
import img2 from '@/stock_images/gettyimages-1305571063-640x640.jpg'
import img3 from '@/stock_images/gettyimages-1305570907-640x640.jpg'
import img4 from '@/stock_images/gettyimages-563563309-640x640.jpg'
import img5 from '@/stock_images/istockphoto-1297824394-612x612.jpg'
import img6 from '@/stock_images/istockphoto-1413169099-612x612.jpg'

const images = [img1, img2, img3, img4, img5, img6]

function MarqueeRow({ reverse = false, speed = 40 }: { reverse?: boolean; speed?: number }) {
  const repeated = [...images, ...images]
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-6 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            className="relative h-40 md:h-56 w-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10"
          >
            <Image
              src={src}
              alt="Showcase image"
              className="h-full w-auto object-cover"
              placeholder="blur"
              sizes="(max-width: 768px) 60vw, 30vw"
            />
          </motion.div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}

export default function StockShowcase() {
  const features = [
    'Source, classify, and track opportunities automatically',
    'Assemble compliant responses with your data',
    'Route for approval and submit on time',
    'Hand off to fulfillment with clean structure',
  ]

  const steps = [
    { n: '1', title: 'Ingest', desc: 'We pull from your sources and normalize' },
    { n: '2', title: 'Prepare', desc: 'We classify, draft responses, and fill forms' },
    { n: '3', title: 'Submit', desc: 'You review, approve, and submit. We track.' },
  ]

  const audience = [
    "SMBs selling to federal agencies that need fewer steps",
    'Teams with scattered documents and repeated forms',
    'Leads who want clarity on what to bid and when',
    "Operators who just want procurement to be easy",
  ]

  return (
    <section id="showcase" className="relative py-24 md:py-32 px-6">
      {/* Ambient gradient behind rows */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-900/40 via-black to-orange-900/30" />

      <div className="max-w-7xl mx-auto space-y-14 md:space-y-20">
        {/* Row 1 */}
        <MarqueeRow speed={42} />

        {/* Features */}
        <motion.div
          id="what"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 scroll-mt-28 md:scroll-mt-40"
        >
          {features.map((text, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="flex items-start gap-3 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-4 md:p-6"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/80" />
              <p className="text-white/90 text-base md:text-lg leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <MarqueeRow reverse speed={48} />

        {/* Steps */}
        <motion.ol
          id="how"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-28 md:scroll-mt-40"
        >
          {steps.map((s, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-6 text-center space-y-2"
            >
              <div className="text-2xl text-white/80">{s.n}. {s.title}</div>
              <p className="text-white/80">{s.desc}</p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Row 3 */}
        <MarqueeRow speed={44} />

        {/* Audience */}
        <motion.ul
          id="who"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 scroll-mt-28 md:scroll-mt-40"
        >
          {audience.map((text, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="flex items-start gap-3 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-4 md:p-6"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/80" />
              <p className="text-white/90 text-base md:text-lg leading-relaxed">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}


