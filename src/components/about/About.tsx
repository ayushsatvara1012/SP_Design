"use client";

import { motion } from "framer-motion";

const credentials = [
  {
    period: "2019 — 2023",
    title: "B.E. Civil Engineering",
    place: "Nirma University",
  },
  {
    period: "Internship",
    title: "ISRO",
    place: "Space Applications Centre",
  },
];

const AutoCadIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" fill="#E51050" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>AutoCAD</title>
    <path d="M3.8672 1.0527v.0157L0 3.3848v17.914l3.8965-2.332h18.3398V2.3301c0-.702-.5773-1.2774-1.2793-1.2774H3.8672zm7.5058 4.0098h3.3008l2.9844 9.9512h-2.5879l-.5683-2.1895h-2.9844l-.5703 2.1621h-2.416l2.8417-9.9238zm11.8633.0273v14.877H4.172l-2.0684 1.2383v.4648c0 .702.5793 1.2774 1.2813 1.2774H24V5.0898h-.7637zM12.9668 6.6816l-.9941 4.3243h2.0468l-1.0527-4.3243z"/>
  </svg>
);

const RevitIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" fill="#186BFF" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Autodesk Revit</title>
    <path d="M24 22.665H2.994c-.519 0-.838-.293-.835-.723.001.042.002-.148.003-.463.142-.083.283-.165.427-.247l.078-.045.07-.058.015-.013.127-.078 1.294-.804h1.134c3.35 0 11.817 0 16.548.007.159 0 .631 0 1.002-.371.371-.372.37-.853.37-1.011-.008-2.057-.001-4.109.005-6.16.008-2.39.016-4.86 0-7.298v-.063l.61-.007c.169-.003.143.197.143.296.014 5.68-.02 11.36.015 17.038zM14.326 8.982c.006-.281.006-.56.006-.859-.009-.5-.395-1.055-.916-1.055-.435 0-.919.006-1.432.006v3.01h1.432c.52 0 .9-.584.91-1.102zM3.887 19.234 3.853 1.363l.007-.025.026-.003h17.313c.51.232.943.56 1.033 1.16.023 1.052 0 1.896 0 2.854.001.023-.002.036 0 .059.03 4.489-.022 8.963-.005 13.453 0 .285-.072.38-.37.38-5.99-.008-17.97-.007-17.97-.007zm5.624-3.971h2.395l.057-.051v-3.5c.316.001.57-.005.787-.005.075 0 .348.075.449.286.36.757.692 1.531 1.125 2.25.583.967 1.704 1.204 2.469 1.204.528 0 .528-.024.528-.245 0-.423-.006-.935-.006-1.374-.403-.039-.734-.163-.929-.541-.362-.705-.74-1.401-1.119-2.114.248-.072.218-.057.302-.092.859-.357 1.139-.951 1.213-1.71.05-.503.059-1.144.025-1.395-.112-.833-.378-1.454-1.036-1.932-.773-.562-1.678-.657-2.582-.687a62.395 62.395 0 0 0-3.678.012v9.894zm-5.658-13.9C1.631 2.64.98 3.087.223 3.513.025 3.622 0 3.895 0 4.1l.02 17.45c.575-.357 3.293-1.96 3.867-2.316L3.853 1.363z"/>
  </svg>
);

const ThreeDsMaxIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#36697f" d="M23.188.019 114.438 20h9.874v108h-103.5a6.5 6.5 0 0 1-6.5-6.5V94.287L22.996.3Z"/>
    <path fill="#37a5cc" d="M23.188 0h85.75a6.5 6.5 0 0 1 6.5 6.5V90h-92.25z"/>
    <path fill="#7dc6dd" d="M23.188 90V0l-19.5 11.75v90z"/>
    <path fill="#fff" d="M68.53 19c-11.828 0-18.455 6.84-18.81 14.464h11.684c.285-3.135 2.21-5.771 6.413-5.771 3.634 0 5.842 1.639 5.842 4.916v1.71c0 4.133-3.633 5.273-7.196 5.273h-3.848v8.336h3.848c3.563 0 8.978.927 8.978 6.342v1.496c0 4.488-2.85 6.555-7.197 6.555-4.987 0-7.054-2.85-7.41-5.843H49.15c.784 7.34 5.772 14.678 19.737 14.678 10.901 0 18.952-5.914 18.952-13.965v-3.349c0-6.484-5.913-9.833-10.83-10.688 4.917-1.14 8.907-4.773 8.907-8.977v-2.708C85.915 24.13 78.647 19 68.53 19zM41.3 98.865v18.9h4.05v-12.69l3.347 12.69h4.455v-.026l3.16-12.177v12.204h4.481v-18.9h-5.778l.027.053-3.996 15.12-3.807-15.174zm27.318 0-5.4 18.9h4.698l1.053-4.13h5.67l1.16 4.13h4.807l-5.697-18.9Zm13.94 0 5.345 8.91-5.967 9.99h5.184l3.7-7.127 3.644 7.128h5.32l-5.968-10.395 5.373-8.505h-4.995l-3.267 6.02H90.9l-3.186-6.02zm-10.808 3.106 1.97 8.154h-3.887Z"/>
  </svg>
);

const VRayIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" fill="#FF5A00" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>V-Ray</title>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-8h2.5l2.75 6 2.75-6H17.5l-4 8h-2.5z" />
  </svg>
);

const QgisIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" fill="#589632" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Qgis</title>
    <path d="M12.879 13.006v3.65l-3.004-3.048v-3.495h3.582l2.852 2.893h-3.43zm10.886 7.606V24h-3.654l-5.73-5.9v-3.55h3.354l6.03 6.062zm-10.828-1.448l3.372 3.371c-1.309.442-2.557.726-4.325.726C5.136 23.26 0 18.243 0 11.565 0 4.92 5.136 0 11.984 0 18.864 0 24 4.952 24 11.565c0 2.12-.523 4.076-1.457 5.759l-3.625-3.725a8.393 8.393 0 0 0 .24-2.005c0-4.291-3.148-7.527-7.1-7.527-3.954 0-7.248 3.236-7.248 7.527s3.33 7.6 7.247 7.6c.548 0 .661.017.88-.03z"/>
  </svg>
);

const MsOfficeIcon = () => (
  <svg className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 78.799 96" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="16.942" x2="85.671" y1="83.36" y2="89.583">
      <stop offset="0" stopColor="#f32b44"/>
      <stop offset=".6" stopColor="#a4070a"/>
    </linearGradient>
    <linearGradient id="b">
      <stop offset="0" stopOpacity=".4"/>
      <stop offset="1" stopOpacity="0"/>
    </linearGradient>
    <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="63.515" x2="33.003" xlinkHref="#b" y1="87.298" y2="84.535"/>
    <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="44.738" x2="-5.901" y1="-3.312" y2="71.527">
      <stop offset="0" stopColor="#800600"/>
      <stop offset=".6" stopColor="#c72127"/>
      <stop offset=".728" stopColor="#c13959"/>
      <stop offset=".847" stopColor="#bc4b81"/>
      <stop offset=".942" stopColor="#b95799"/>
      <stop offset="1" stopColor="#b85ba2"/>
    </linearGradient>
    <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="45.823" x2="35.099" xlinkHref="#b" y1="-4.81" y2="11.039"/>
    <linearGradient id="f" gradientUnits="userSpaceOnUse" x1="61.486" x2="61.486" y1="-4.887" y2="88.781">
      <stop offset="0" stopColor="#ffb900"/>
      <stop offset=".166" stopColor="#ef8400"/>
      <stop offset=".313" stopColor="#e25c01"/>
      <stop offset=".429" stopColor="#db4401"/>
      <stop offset=".5" stopColor="#d83b01"/>
    </linearGradient>
    <path d="m19.143 75.558c-2.724 0-4.945 2.121-4.945 4.753 0 1.789 1.031 3.322 2.565 4.14l19.118 10.246a10.11 10.11 0 0 0 4.969 1.303c1.164 0 2.275-.204 3.306-.562l6.531-1.814v-18.091c.027.025-31.519.025-31.545.025z" fill="url(#a)"/>
    <path d="m19.143 75.558c-2.724 0-4.945 2.121-4.945 4.753 0 1.789 1.031 3.322 2.565 4.14l19.118 10.246a10.11 10.11 0 0 0 4.969 1.303c1.164 0 2.275-.204 3.306-.562l6.531-1.814v-18.091c.027.025-31.519.025-31.545.025z" fill="url(#c)"/>
    <path d="m43.736.383a9.968 9.968 0 0 0 -2.777-.383c-1.56 0-3.12.307-4.522 1.022-.29.128-31.096 16.864-31.096 16.864-.423.205-.82.46-1.19.716-.052.025-.079.051-.132.077-.238.178-.45.357-.687.536-.106.077-.212.18-.291.256-.132.127-.265.255-.37.383-.37.383-1.005 1.2-1.005 1.2a9.15 9.15 0 0 0 -1.666 5.291v44.46c0 2.633 2.221 4.754 4.945 4.754.687 0 1.322-.128 1.904-.384l8.805-4.778c1.586-.766 2.856-2.07 3.517-3.68.158-.332.29-.74.37-1.15.026-.102.053-.23.053-.332 0-.05.026-.127.026-.178.027-.18.053-.384.053-.562 0-.154.027-.282.027-.435v-23.662-7.385c0-2.07.925-3.935 2.38-5.238 0 0-.688.613 0 0 .687-.613 1.586-1.15 2.644-1.507 1.057-.384 26.072-9.122 26.072-9.122v-14.744z" fill="url(#d)"/>
    <path d="m43.736.383a9.968 9.968 0 0 0 -2.777-.383c-1.56 0-3.12.307-4.522 1.022-.29.128-31.096 16.864-31.096 16.864-.423.205-.82.46-1.19.716-.052.025-.079.051-.132.077-.238.178-.45.357-.687.536-.106.077-.212.18-.291.256-.132.127-.265.255-.37.383-.37.383-1.005 1.2-1.005 1.2a9.15 9.15 0 0 0 -1.666 5.291v44.46c0 2.633 2.221 4.754 4.945 4.754.687 0 1.322-.128 1.904-.384l8.805-4.778c1.586-.766 2.856-2.07 3.517-3.68.158-.332.29-.74.37-1.15.026-.102.053-.23.053-.332 0-.05.026-.127.026-.178.027-.18.053-.384.053-.562 0-.154.027-.282.027-.435v-23.662-7.385c0-2.07.925-3.935 2.38-5.238 0 0-.688.613 0 0 .687-.613 1.586-1.15 2.644-1.507 1.057-.384 26.072-9.122 26.072-9.122v-14.744z" fill="url(#e)"/>
    <path d="m71.898 8.35-27.738-7.843c4.019 1.508 6.53 4.906 6.53 9.046 0 0-.025 75.2 0 77.014.027 4.088-2.67 7.589-6.53 8.892.846-.23 27.738-7.717 27.738-7.717 3.992-1.226 6.875-4.804 6.875-9.07v-61.252c.026-4.24-2.883-7.844-6.875-9.07z" fill="url(#f)"/>
  </svg>
);

const tools = [
  { name: "AutoCAD", icon: <AutoCadIcon /> },
  { name: "Revit", icon: <RevitIcon /> },
  { name: "3ds Max", icon: <ThreeDsMaxIcon /> },
  { name: "V-Ray", icon: <VRayIcon /> },
  { name: "QGIS", icon: <QgisIcon /> },
  { name: "MS Office", icon: <MsOfficeIcon /> },
];

export default function About() {
  return (
    <section id="about" className="px-6 pb-20 pt-16 md:px-14 md:pb-32 md:pt-24">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Header Block */}
        <div className="max-w-3xl">
          {/* Above the fold: animate in CSS so the LCP text paints without waiting
              for hydration. Everything below stays whileInView on framer-motion. */}
          <p
            className="rise-in eyebrow text-ink/75"
            style={
              {
                "--rise-from": "12px",
                "--rise-duration": "0.7s",
              } as React.CSSProperties
            }
          >
            About
          </p>
          <h1
            className="rise-in font-display mt-4 text-[clamp(2.5rem,2rem+4vw,5rem)] font-light leading-tight tracking-tight text-ink"
            style={
              {
                "--rise-from": "16px",
                "--rise-duration": "0.8s",
                "--rise-delay": "0.05s",
              } as React.CSSProperties
            }
          >
            Shalini Prajapati
          </h1>
        </div>

        {/* Central Creed Statement - Replaces visual weight of the image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-12 md:mt-16 border-l-2 border-ink/20 pl-6 md:pl-8 py-2 max-w-4xl"
        >
          <p className="font-display text-[clamp(1.25rem,1rem+1.2vw,2.25rem)] font-light italic leading-relaxed text-ink/90">
            &ldquo;Bringing an engineer&rsquo;s precision to creative architectural visualization. Drawing lines, making realities.&rdquo;
          </p>
        </motion.div>

        {/* Bio Text block spanning full width (constrained max-width) */}
        <div className="mt-16 max-w-4xl flex flex-col gap-6 md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-light leading-relaxed text-ink/95 text-balance"
          >
            Founder of SP Designs and a Civil Engineer turned architectural designer and 3D
            visualizer, based in Mansa, Gujarat. Shalini takes a space end-to-end — from
            technical 2D drafting through photorealistic 3D rendering to on-site execution
            coordination.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-ink/80"
          >
            With academic training in engineering and practical design insight, she specializes in translating blueprints into rich visual stories. She is a Designer &amp; 3D Visualizer, specializing in modern residential, luxury interiors, and detailed exterior architectural visualizations.
          </motion.p>
        </div>

        {/* Experience Section: Now covers the full width below the Bio text */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-ink/15 w-full max-w-4xl">
          <span className="eyebrow text-ink/80 block mb-8 font-semibold tracking-widest text-xs uppercase">
            Experience &amp; Education
          </span>
          
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-24">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                className="flex-1 flex flex-col gap-2"
              >
                <h3 className="font-display text-[clamp(1.2rem,1.1rem+0.3vw,1.45rem)] font-normal text-ink leading-tight">
                  {credential.title}
                </h3>
                <p className="font-sans text-xs md:text-sm font-medium text-ink/85 leading-relaxed">
                  {credential.place} <br />
                  <span className="text-ink/50 font-light">&middot; {credential.period}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools Section: Now placed below the Experience section, full width */}
        <div className="mt-16 pt-10 border-t border-ink/10 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-ink/80 block mb-6 font-semibold tracking-widest text-xs uppercase">
              Technical Toolkit
            </span>
            <div className="flex flex-wrap gap-x-12 gap-y-8 mt-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-2 group w-20 text-center"
                >
                  <div className="flex items-center justify-center h-14 w-14">
                    {tool.icon}
                  </div>
                  <span className="font-sans text-xs md:text-sm font-medium text-ink/70 transition-colors duration-300 group-hover:text-ink">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
